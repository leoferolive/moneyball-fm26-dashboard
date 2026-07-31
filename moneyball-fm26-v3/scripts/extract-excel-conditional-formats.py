#!/usr/bin/env python3
"""Extrai as regras de conditionalFormatting do Moneyball FM26.xlsm,
por aba, na ordem das colunas de fórmula (antes do marcador "Inf").
Saída: JSON com {posKey: [{col, label, format}, ...]}.
Sem dependências externas (só stdlib): zipfile + xml.etree + colorsys.
"""
import zipfile
import re
import json
import colorsys
import xml.etree.ElementTree as ET
from collections import defaultdict, deque
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
XLSX = SCRIPT_DIR / '..' / '..' / 'Moneyball FM26.xlsm'
OUTPUT_JSON = SCRIPT_DIR / 'excel-conditional-formats-extracted.json'
NS = {
    'm': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

SHEET_TO_POSKEY = {
    'worksheets/sheet1.xml': 'goleiros',
    'worksheets/sheet2.xml': 'zagueiros',
    'worksheets/sheet3.xml': 'laterais',
    'worksheets/sheet4.xml': 'volantes',
    'worksheets/sheet5.xml': 'b2b',
    'worksheets/sheet6.xml': 'armadores',
    'worksheets/sheet7.xml': 'avancados',
    'worksheets/sheet8.xml': 'time',
    'worksheets/sheet9.xml': 'esforco',
    'worksheets/sheet10.xml': 'overall',
}

THEME_ORDER = ['lt1', 'dk1', 'lt2', 'dk2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink']


def col_to_num(col):
    n = 0
    for ch in col:
        n = n * 26 + (ord(ch) - 64)
    return n


def num_to_col(n):
    s = ''
    while n > 0:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s


def apply_tint(hexrgb, tint):
    r = int(hexrgb[0:2], 16) / 255.0
    g = int(hexrgb[2:4], 16) / 255.0
    b = int(hexrgb[4:6], 16) / 255.0
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    if tint < 0:
        l = l * (1.0 + tint)
    else:
        l = l * (1.0 - tint) + tint
    r2, g2, b2 = colorsys.hls_to_rgb(h, l, s)
    return '#{:02X}{:02X}{:02X}'.format(round(r2 * 255), round(g2 * 255), round(b2 * 255))


def load_theme_colors(z):
    xml = z.read('xl/theme/theme1.xml').decode('utf-8')
    root = ET.fromstring(xml)
    a_ns = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
    scheme = root.find(f'.//{a_ns}clrScheme')
    colors = {}
    for child in scheme:
        tag = child.tag.replace(a_ns, '')
        srgb = child.find(f'{a_ns}srgbClr')
        sysclr = child.find(f'{a_ns}sysClr')
        if srgb is not None:
            colors[tag] = srgb.attrib['val'].upper()
        elif sysclr is not None:
            colors[tag] = sysclr.attrib['lastClr'].upper()
    return [colors[name] for name in THEME_ORDER]


def resolve_color(color_el_str, theme_colors):
    """color_el_str: attribute string from a <color .../> tag, e.g. 'rgb="FFF8696B"' or 'theme="5" tint="0.4"'."""
    rgb_m = re.search(r'rgb="([0-9A-Fa-f]{8})"', color_el_str)
    if rgb_m:
        argb = rgb_m.group(1)
        return '#' + argb[2:].upper()
    theme_m = re.search(r'theme="(\d+)"', color_el_str)
    if theme_m:
        idx = int(theme_m.group(1))
        base = theme_colors[idx] if idx < len(theme_colors) else 'FFFFFF'
        tint_m = re.search(r'tint="(-?[\d.eE+-]+)"', color_el_str)
        tint = float(tint_m.group(1)) if tint_m else 0.0
        return apply_tint(base, tint) if tint else '#' + base
    return None


def load_shared_strings(z):
    xml = z.read('xl/sharedStrings.xml').decode('utf-8')
    root = ET.fromstring(xml)
    m = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
    strings = []
    for si in root.findall(f'{m}si'):
        text = ''.join(t.text or '' for t in si.iter(f'{m}t'))
        strings.append(text)
    return strings


def extract_headers(xml, shared_strings):
    """Retorna {col_letter: header_text} da linha 1."""
    headers = {}
    row1_m = re.search(r'<row r="1"[^>]*>(.*?)</row>', xml, re.S)
    if not row1_m:
        return headers
    row1 = row1_m.group(1)
    for cm in re.finditer(r'<c r="([A-Z]+)1"([^>]*)(?:/>|>(.*?)</c>)', row1, re.S):
        col, attrs, inner = cm.groups()
        inner = inner or ''
        is_string = 't="s"' in attrs
        is_inline = 't="str"' in attrs or 't="inlineStr"' in attrs
        v_m = re.search(r'<v>([^<]*)</v>', inner)
        if is_string and v_m:
            try:
                headers[col] = shared_strings[int(v_m.group(1))]
            except (ValueError, IndexError):
                pass
        elif v_m:
            headers[col] = v_m.group(1)
        else:
            t_m = re.search(r'<t[^>]*>([^<]*)</t>', inner)
            if t_m:
                headers[col] = t_m.group(1)
    return headers


def extract_cf_rules(xml, theme_colors):
    """Retorna {col_letter: {'colorScale': {...,'priority':n}, 'dataBar': {...}, 'iconSet': {...}}}."""
    best = defaultdict(dict)  # col -> kind -> (priority, data)

    for m in re.finditer(r'<conditionalFormatting[^>]*sqref="([^"]+)"[^>]*>(.*?)</conditionalFormatting>', xml, re.S):
        sqref, body = m.groups()
        cols_in_range = set()
        for part in sqref.split(' '):
            a, b = (part.split(':') + [part])[:2]
            ca = re.match(r'([A-Z]+)', a).group(1)
            cb = re.match(r'([A-Z]+)', b).group(1)
            for n in range(col_to_num(ca), col_to_num(cb) + 1):
                cols_in_range.add(num_to_col(n))

        for rule_m in re.finditer(r'<cfRule type="(\w+)"([^>]*)>(.*?)</cfRule>|<cfRule type="(\w+)"([^>]*)/>', body, re.S):
            rtype = rule_m.group(1) or rule_m.group(4)
            attrs = rule_m.group(2) or rule_m.group(5) or ''
            inner = rule_m.group(3) or ''
            pr_m = re.search(r'priority="(\d+)"', attrs)
            priority = int(pr_m.group(1)) if pr_m else 999999

            data = None
            if rtype == 'colorScale':
                color_tags = re.findall(r'<color ([^/]+)/>', inner)
                stops = [resolve_color(c, theme_colors) for c in color_tags]
                stops = [s for s in stops if s]
                if stops:
                    data = {'kind': 'colorScale', 'colors': stops}
            elif rtype == 'dataBar':
                color_tags = re.findall(r'<color ([^/]+)/>', inner)
                stops = [resolve_color(c, theme_colors) for c in color_tags]
                if stops:
                    data = {'kind': 'dataBar', 'color': stops[0]}
            elif rtype == 'iconSet':
                variant_m = re.search(r'iconSet="(\w+)"', inner)
                variant = variant_m.group(1) if variant_m else '3TrafficLights1'
                cfvo_count = len(re.findall(r'<cfvo ', inner))
                data = {'kind': 'iconSet', 'variant': variant, 'bands': cfvo_count}

            if data is None:
                continue

            for col in cols_in_range:
                existing = best[col].get(rtype)
                if existing is None or priority < existing[0]:
                    best[col][rtype] = (priority, data)

    result = {}
    for col, kinds in best.items():
        result[col] = {k: v[1] for k, v in kinds.items()}
    return result


def main():
    z = zipfile.ZipFile(str(XLSX))
    theme_colors = load_theme_colors(z)
    shared_strings = load_shared_strings(z)

    output = {}
    for sheet_path, pos_key in SHEET_TO_POSKEY.items():
        xml = z.read(f'xl/{sheet_path}').decode('utf-8')
        headers = extract_headers(xml, shared_strings)
        cf_rules = extract_cf_rules(xml, theme_colors)

        # Encontrar a coluna "Inf" (início da área bruta) para restringir à área de fórmula
        inf_col = None
        for col, label in headers.items():
            if label == 'Inf':
                inf_col = col
                break
        inf_num = col_to_num(inf_col) if inf_col else 99999

        # Ordenar colunas de fórmula (antes de "Inf") por número de coluna
        formula_cols = sorted(
            (col for col in headers if col_to_num(col) < inf_num),
            key=col_to_num,
        )

        entries = []
        for col in formula_cols:
            label = headers[col]
            fmt = cf_rules.get(col)
            entries.append({'col': col, 'label': label, 'format': fmt})

        output[pos_key] = entries
        formatted = sum(1 for e in entries if e['format'])
        print(f'{pos_key}: {len(entries)} colunas de fórmula, {formatted} com formatação condicional')

    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
