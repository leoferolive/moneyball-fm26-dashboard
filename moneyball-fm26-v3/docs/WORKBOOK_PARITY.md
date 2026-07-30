# Paridade com `Moneyball FM26.xlsm`

Fonte auditada: `Moneyball FM26.xlsm`, SHA-256
`31bccf459c20950b2e49b82ae2b9d5023bdb0f6e0753be8f23c83f125e4238f9`.

O arquivo original não é salvo nem alterado pelo dashboard. Cada importação
calcula as métricas no navegador e grava somente os jogadores derivados no
IndexedDB local.

## Cobertura por aba

| Aba | Colunas brutas | Métricas por linha | Métricas de coleção | Equivalente VBA |
|---|---:|---:|---:|---|
| 🧤 Goleiros | 37 | 85 | 3 | `Goleiros`, `Ajuste_Linhas` |
| 🧱 Zagueiros | 48 | 128 | 1 | `Zagueiros`, `Ajuste_Linhas` |
| 🛡️ Laterais | 51 | 101 | 1 | `Laterais`, `Ajuste_Linhas` |
| 🛡️ Volantes | 47 | 92 | 3 | `Volantes`, `Ajuste_Linhas` |
| ⚙️ Box-To-Box | 52 | 98 | 1 | `BoxBox`, `Ajuste_Linhas` |
| ⚙️ Armadores | 42 | 99 | 1 | `Armador`, `Ajuste_Linhas` |
| 🎯 Avançados | 50 | 130 | 1 | `Avançados`, `Ajuste_Linhas` |
| 📊 Time Estatísticas | 38 | 60 | 0 | `Ajustes_TEstatisticas`, `Limpa_TEstatisticas` |
| 💪 Placar de Esforço | 21 | 17 | 1 | `AjustarLinhas25`, `Ajuste_Linhas` |
| 🌎 Overall Análise | 57 | 156 | 1 | `Overall`, `Ajuste_Linhas` |

Em Overall, as primeiras 126 métricas correspondem às colunas calculadas da
planilha; as 30 restantes são análises adicionais do dashboard e não
substituem nenhuma regra do arquivo.

Os testes de cada posição fixam a ordem dos cabeçalhos, títulos das métricas,
fórmulas materiais, arredondamentos e fallbacks peculiares do Excel. Métricas
baseadas na coleção inteira (`AVERAGE`, `SUM` e participações) são executadas
depois que todas as linhas foram derivadas.

## Macros

Foram encontrados 12 procedimentos VBA não vazios. Não existem macros de
abertura, rede, shell ou eventos automáticos com comportamento funcional.

- `Goleiros`, `Zagueiros`, `Laterais`, `Volantes`, `BoxBox`, `Armador`,
  `Avançados`, `Ajustes_TEstatisticas` e `Overall` trocam ponto por vírgula em
  intervalos específicos de dados. O site replica isso antes das fórmulas por
  meio de `normalizeWorkbookRow`.
- `Limpa_TEstatisticas` apaga os dados brutos importados da aba de time. O
  dashboard expõe `Limpar dados da aba`, confirma o alvo e remove somente a
  posição ativa do IndexedDB.
- `Ajuste_Linhas` e `AjustarLinhas25`, além dos trechos restantes das macros,
  alteram altura, alinhamento, scroll e zoom. A tabela responsiva, com células
  numéricas alinhadas e rolagem horizontal, é o equivalente nativo da web.
- `Avançados` também grava `xG` no cabeçalho FD. A configuração da aba exige o
  cabeçalho `xG` diretamente, portanto o ajuste já está incorporado ao esquema
  de importação.

O mapeamento executável e seus testes ficam em
`src/engine/workbookCompatibility.ts` e
`src/engine/__tests__/workbookCompatibility.test.ts`.
