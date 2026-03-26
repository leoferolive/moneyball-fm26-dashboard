import type { PositionConfig } from './types.ts'

export const goleirosConfig: PositionConfig = {
  key: 'goleiros',
  emoji: '🧤',
  name: 'Goleiros',

  rawColumns: [
    'Inf', 'Nação', 'Clube', 'Idade', 'Jogador', 'Valor Estimado',
    'Pé Preferido', 'Salário', 'Altura', 'Expira', 'HdJ', 'Minutos',
    'Golos Sofridos', 'Ds', 'Dft', 'Dfa', 'Press. tent.', 'Poss Con/90',
    'Poss Perd/90', 'Sem golos sofridos', 'Amr', 'Cartões vermelhos',
    'Faltas Cometidas', 'Faltas Contra', 'PeP', 'Passes Ch', 'Pas A',
    'Ps C', 'xGD', 'Press. conc.', 'EPG', 'T Desa', 'Des C', 'Crt D',
    'Pen. Enfrentados', 'Pen. Defendidos', 'Classificação',
  ],

  identityColumns: {
    Jogador: 'Jogador',
    Nação: 'Nação',
    Clube: 'Clube',
    Idade: 'Idade',
    Salário: 'Salário',
    Valor: 'Valor Estimado',
  },

  defaultTableColumns: [
    'Jogos completos',
    'Defesas Totais/Jogo',
    '% Def Seguras',
    'xG Def/90',
    '% Jogos Clean Sheet',
    '% Passes Certos',
    'Min p/ Sofrer Gol',
    'Falhas/90',
    'Posse Ganha/90',
    '% Acerto Goleiro',
    'Nota Média',
    '% Pênaltis Def',
    'Índice Defesas Críticas',
  ],

  metrics: [
    // ── General ────────────────────────────────────────────────
    {
      key: 'jogos_completos',
      label: 'Jogos completos',
      category: 'general',
      formula: (_r, ctx) => {
        return ctx.rnd(ctx.j90, 1)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
      description: 'Jogos completos (Minutos / 90)',
    },
    {
      key: 'man_of_the_match',
      label: 'Man of the match',
      category: 'general',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['HdJ'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
      description: 'Prêmios Homem do Jogo',
    },
    {
      key: 'min_p_hdj',
      label: 'Min p/ HdJ',
      category: 'general',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        if (ctx.j90 <= 0) return 5400
        const hdj = pf(r['HdJ'])
        return hdj > 0 ? sDiv(pf(r['Minutos']), hdj) : 5400
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 0,
      description: 'Minutos por prêmio Homem do Jogo',
    },
    {
      key: 'pct_hdj',
      label: '% HdJ',
      category: 'general',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['HdJ']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Percentual de jogos como Homem do Jogo',
    },

    // ── Passing ────────────────────────────────────────────────
    {
      key: 'passes_tentados',
      label: 'Passes Tentados',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Pas A'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passes_completados',
      label: 'Passes Completados',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Ps C'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passes_c_90',
      label: 'Passes C/90',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Ps C']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'passes_errados',
      label: 'Passes Errados',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Pas A']) - pf(r['Ps C'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'passes_certos_menos_errados',
      label: 'Passes Certos - Errados',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        const certos = pf(r['Ps C'])
        const errados = pf(r['Pas A']) - certos
        return certos - errados
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pct_passes_errados',
      label: '% Passes Errados',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Pas A']) - pf(r['Ps C']), pf(r['Pas A']))
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'pct_passes_certos',
      label: '% Passes Certos',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Ps C']), pf(r['Pas A']))
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'passes_curtos',
      label: 'Passes Curtos',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Pas A']) - pf(r['PeP'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passes_curtos_90',
      label: 'Passes Curtos/90',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Pas A']) - pf(r['PeP']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'passes_progressao',
      label: 'Passes Progressão',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['PeP'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pass_prog_90',
      label: 'Pass Prog/90',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['PeP']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'pct_passes_progressao',
      label: '% Passes Progressão',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['PeP']), pf(r['Pas A']) - pf(r['PeP']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'posse_perdida_total',
      label: 'Posse Perdida Total',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf, rnd } = ctx
        return rnd(pf(r['Poss Perd/90']) * ctx.j90, 0)
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'posse_perdida_90',
      label: 'Posse Perdida/90',
      category: 'passing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Poss Perd/90'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },

    // ── Creation ───────────────────────────────────────────────
    {
      key: 'passes_decisivos',
      label: 'Passes Decisivos',
      category: 'creation',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Passes Ch'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pass_d_90',
      label: 'Pass D/90',
      category: 'creation',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Passes Ch']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── Goalkeeping ────────────────────────────────────────────
    {
      key: 'defesas_seguras',
      label: 'Defesas Seguras',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Ds'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'defesas_seguras_90',
      label: 'Defesas Seguras/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Ds']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pct_def_seguras',
      label: '% Def Seguras',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const total = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
        return pct(pf(r['Ds']), total)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Percentual de defesas seguras sobre total de defesas',
    },
    {
      key: 'defesas_ponta_dedos',
      label: 'Defesas Ponta Dedos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Dft'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'def_ponta_dedos_90',
      label: 'Def Ponta Dedos/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Dft']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pct_def_ponta_dedos',
      label: '% Def Ponta Dedos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const total = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
        return pct(pf(r['Dft']), total)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'defesas_desviadas',
      label: 'Defesas Desviadas',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Dfa'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'defesas_desviadas_90',
      label: 'Defesas Desviadas/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Dfa']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pct_def_desviadas',
      label: '% Def Desviadas',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const total = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
        return pct(pf(r['Dfa']), total)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'pct_jogos_clean_sheet',
      label: '% Jogos Clean Sheet',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Sem golos sofridos']), ctx.j90)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Percentual de jogos sem sofrer gol',
    },
    {
      key: 'clean_sheets',
      label: 'Clean Sheets',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Sem golos sofridos'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'clean_sheets_90',
      label: 'Clean Sheets/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Sem golos sofridos']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'defesas_totais',
      label: 'Defesas Totais',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'defesas_totais_jogo',
      label: 'Defesas Totais/Jogo',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const defTotais = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
        return sDiv(defTotais, ctx.j90)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Defesas totais por jogo de 90 minutos',
    },
    {
      key: 'bolas_enfrentadas',
      label: 'Bolas Enfrentadas',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Dft']) + pf(r['Dfa']) + pf(r['Ds']) + pf(r['Golos Sofridos'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'bolas_enf_90',
      label: 'Bolas Enf/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const bolasEnf = pf(r['Dft']) + pf(r['Dfa']) + pf(r['Ds']) + pf(r['Golos Sofridos'])
        return sDiv(bolasEnf, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'proporcao_def_vs_chutes',
      label: 'Proporção Def vs Chutes',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const defTotais = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa'])
        const bolasEnf = defTotais + pf(r['Golos Sofridos'])
        return sDiv(defTotais, bolasEnf)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 3,
    },
    {
      key: 'pct_def_dificeis',
      label: '% Def Difíceis',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const bolasEnf = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Golos Sofridos'])
        const defDificeis = pf(r['Dft']) + pf(r['Dfa']) + pf(r['Pen. Defendidos'])
        const naoSeguras = bolasEnf - pf(r['Ds'])
        return pct(defDificeis, naoSeguras)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'chances_sofrer_gol_90',
      label: 'Chances Sofrer Gol/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const bolasEnf = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Golos Sofridos'])
        const result = sDiv(pf(r['Golos Sofridos']), bolasEnf)
        return result === 0 ? 1 : result
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 3,
      description: 'Proporção de gols sofridos por bolas enfrentadas (menor é melhor)',
    },
    {
      key: 'indice_defesas_criticas',
      label: 'Índice Defesas Críticas',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const bolasEnf = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Golos Sofridos'])
        const peso = pf(r['Dft']) * 2 + pf(r['Dfa']) * 1.5 + pf(r['Ds'])
        return sDiv(peso, bolasEnf)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 3,
      description: 'Índice ponderado de defesas críticas (Dft*2 + Dfa*1.5 + Ds) / bolas enfrentadas',
    },
    {
      key: 'min_p_sofrer_gol',
      label: 'Min p/ Sofrer Gol',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Minutos']), pf(r['Golos Sofridos']))
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 0,
      description: 'Minutos jogados para cada gol sofrido (maior é melhor)',
    },
    {
      key: 'bolas_enf_p_sofrer_gol',
      label: 'Bolas enf p/ sofrer gol',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const bolasEnf = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Golos Sofridos'])
        return sDiv(bolasEnf, pf(r['Golos Sofridos']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'bolas_dificeis_enf_p_sofrer_gol',
      label: 'Bolas difíceis enf p/ sofrer gol',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const numerator = pf(r['Golos Sofridos']) + pf(r['Dft']) + pf(r['Dfa'])
        return sDiv(numerator, pf(r['Golos Sofridos']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xg_defendidos',
      label: 'xG Defendidos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['xGD'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xg_def_90',
      label: 'xG Def/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['xGD']), ctx.j90)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'xG defendidos por jogo de 90 minutos',
    },
    {
      key: 'xg_def_sem_pen',
      label: 'xG Def sem Pen',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['xGD']) - pf(r['Pen. Defendidos']) * 0.79
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xg_def_sem_pen_90',
      label: 'xG Def sem Pen/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const xgDSemPen = pf(r['xGD']) - pf(r['Pen. Defendidos']) * 0.79
        return sDiv(xgDSemPen, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xpg_ratio',
      label: 'xPG Ratio',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const xgDSemPen = pf(r['xGD']) - pf(r['Pen. Defendidos']) * 0.79
        const golosSofridos = pf(r['Golos Sofridos'])
        return golosSofridos === 0 ? xgDSemPen : sDiv(xgDSemPen, golosSofridos)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 3,
      description: 'Razão entre xG defendidos (sem pênaltis) e gols sofridos',
    },
    {
      key: 'xgp',
      label: 'xGP (Expected Goals Prevented)',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['xGD']), pf(r['xGD']) + pf(r['Golos Sofridos']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 3,
      description: 'Proporção de xG defendidos sobre total (xGD + Golos Sofridos)',
    },
    {
      key: 'penaltis_enfrentados',
      label: 'Pênaltis Enfrentados',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Pen. Enfrentados'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pen_enf_90',
      label: 'Pen Enf/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Pen. Enfrentados']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'penaltis_defendidos',
      label: 'Pênaltis Defendidos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Pen. Defendidos'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pen_def_90',
      label: 'Pen Def/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Pen. Defendidos']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pct_penaltis_def',
      label: '% Pênaltis Def',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const enfrentados = pf(r['Pen. Enfrentados'])
        const defendidos = pf(r['Pen. Defendidos'])
        if (enfrentados === 0 && defendidos === 0) return -0.01
        return pct(defendidos, enfrentados)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Percentual de pênaltis defendidos (retorna valor negativo insignificante se 0/0)',
    },
    {
      key: 'golos_sofridos',
      label: 'Golos Sofridos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Golos Sofridos'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'sofridos_jogo',
      label: 'Sofridos/Jogo',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Golos Sofridos']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'tentativas_saida_gol',
      label: 'Tentativas Saída Gol',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Crt D']) + pf(r['T Desa']) + pf(r['Des C']) * 2.5
          + pf(r['Faltas Cometidas']) + pf(r['EPG'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'tentativas_saida_90',
      label: 'Tentativas Saída/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const tentativas = pf(r['Crt D']) + pf(r['T Desa']) + pf(r['Des C']) * 2.5
          + pf(r['Faltas Cometidas']) + pf(r['EPG'])
        return sDiv(tentativas, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'saidas_sucesso',
      label: 'Saídas Sucesso',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Des C']) + pf(r['Crt D'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
      description: 'Saídas do gol com sucesso (desarmes concluídos + cruzamentos interceptados)',
    },
    {
      key: 'saidas_sucesso_90',
      label: 'Saídas Sucesso/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Des C']) + pf(r['Crt D']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pct_saidas_sucesso',
      label: '% Saídas Sucesso',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const sucesso = pf(r['Des C']) + pf(r['Crt D'])
        const tentativas = pf(r['Crt D']) + pf(r['T Desa']) + pf(r['Des C']) * 2.5
          + pf(r['Faltas Cometidas']) + pf(r['EPG'])
        return pct(sucesso, tentativas)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'desarmes_tentados',
      label: 'Desarmes Tentados',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['T Desa'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'desarmes_concluidos',
      label: 'Desarmes Concluídos',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Des C'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pct_desarmes',
      label: '% Desarmes',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Des C']), pf(r['T Desa']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'cruzamentos_interceptados',
      label: 'Cruzamentos Interceptados',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Crt D'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'cruzamentos_int_90',
      label: 'Cruzamentos Int/90',
      category: 'goalkeeping',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Crt D']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── Pressing ───────────────────────────────────────────────
    {
      key: 'posse_ganha_total',
      label: 'Posse Ganha Total',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf, rnd } = ctx
        return rnd(pf(r['Poss Con/90']) * ctx.j90, 0)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'posse_ganha_90',
      label: 'Posse Ganha/90',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Poss Con/90'])
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pressoes_tentadas',
      label: 'Pressões Tentadas',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Press. tent.'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pressoes_concluidas',
      label: 'Pressões Concluídas',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Press. conc.'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pct_pressoes',
      label: '% Pressões',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Press. conc.']), pf(r['Press. tent.']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'pressoes_90',
      label: 'Pressões/90',
      category: 'pressing',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['Press. tent.']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── Discipline ─────────────────────────────────────────────
    {
      key: 'falhas',
      label: 'Falhas',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['EPG'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
      description: 'Erros que geraram gol',
    },
    {
      key: 'falhas_90',
      label: 'Falhas/90',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['EPG']), ctx.j90)
      },
      displayInTable: true,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
      description: 'Erros que geraram gol por 90 minutos',
    },
    {
      key: 'cartoes_amarelos',
      label: 'Cartões Amarelos',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Amr'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'cartoes_vermelhos',
      label: 'Cartões Vermelhos',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Cartões vermelhos'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'total_cartoes',
      label: 'Total Cartões',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Amr']) + pf(r['Cartões vermelhos'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'faltas_sofridas',
      label: 'Faltas Sofridas',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Faltas Contra'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'faltas_cometidas',
      label: 'Faltas Cometidas',
      category: 'discipline',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Faltas Cometidas'])
      },
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },

    // ── General (summary) ──────────────────────────────────────
    {
      key: 'acoes_tentadas',
      label: 'Ações Tentadas',
      category: 'general',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Ds']) + pf(r['Golos Sofridos']) + pf(r['Dft']) + pf(r['Dfa'])
          + pf(r['Pen. Enfrentados']) + pf(r['Pas A']) + pf(r['T Desa'])
          + pf(r['Press. tent.']) + pf(r['Faltas Cometidas']) + pf(r['EPG'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
      description: 'Total de ações tentadas pelo goleiro',
    },
    {
      key: 'acoes_com_sucesso',
      label: 'Ações com Sucesso',
      category: 'general',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Pen. Defendidos'])
          + pf(r['Ps C']) + pf(r['Des C']) + pf(r['Crt D']) + pf(r['Press. conc.'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
      description: 'Total de ações concluídas com sucesso',
    },
    {
      key: 'pct_acerto_goleiro',
      label: '% Acerto Goleiro',
      category: 'general',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const tentadas = pf(r['Ds']) + pf(r['Golos Sofridos']) + pf(r['Dft']) + pf(r['Dfa'])
          + pf(r['Pen. Enfrentados']) + pf(r['Pas A']) + pf(r['T Desa'])
          + pf(r['Press. tent.']) + pf(r['Faltas Cometidas']) + pf(r['EPG'])
        const sucesso = pf(r['Ds']) + pf(r['Dft']) + pf(r['Dfa']) + pf(r['Pen. Defendidos'])
          + pf(r['Ps C']) + pf(r['Des C']) + pf(r['Crt D']) + pf(r['Press. conc.'])
        return pct(sucesso, tentadas)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Percentual geral de acerto do goleiro (ações com sucesso / ações tentadas)',
    },
    {
      key: 'nota_media',
      label: 'Nota Média',
      category: 'general',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Classificação'])
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Nota média do FM26 (Classificação)',
    },
    // ── Moneyball Score (planilha original) ────────────────────
    {
      key: '_moneyball',
      label: 'Moneyball Score',
      category: 'general',
      formula: (r, ctx) => {
        const { pf, pct, sDiv, clamp, rnd } = ctx
        const j90 = ctx.j90
        const gs = pf(r['Golos Sofridos'])
        const ds = pf(r['Ds']), dft = pf(r['Dft']), dfa = pf(r['Dfa'])
        const cs = pf(r['Sem golos sofridos'])
        const xgd = pf(r['xGD'])
        const epg = pf(r['EPG'])
        const pasA = pf(r['Pas A']), pasC = pf(r['Ps C'])
        const defTotal = ds + dft + dfa
        const bolasEnf = dft + dfa + ds + gs

        const fm = clamp((pf(r['Classificação']) - 5) / 3 * 100, 0, 100)
        const defS = clamp(pct(defTotal, bolasEnf) / 75 * 100, 0, 100)
        const xgpS = clamp(pct(xgd, xgd + gs) / 50 * 100, 0, 100)
        const csS = clamp(pct(cs, j90) / 40 * 100, 0, 100)
        const pssS = clamp((pct(pasC, pasA) - 60) / 30 * 100, 0, 100)
        const errS = clamp(100 - sDiv(epg, j90) * 40, 0, 100)
        const m = defS * 0.30 + xgpS * 0.25 + csS * 0.20 + pssS * 0.15 + errS * 0.10
        return clamp(rnd(fm * 0.35 + m * 0.65), 0, 100)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Score Moneyball da planilha original (FM 35% + Métricas 65%)',
    },
  ],
}
