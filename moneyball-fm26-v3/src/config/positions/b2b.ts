import type { PositionConfig } from './types.ts'

function parseAppearances(value: string | undefined, pf: (value: string | undefined) => number) {
  const appearances = value ?? ''
  const openingParenthesis = appearances.indexOf('(')

  if (openingParenthesis === -1) {
    const starts = pf(appearances)
    return { starts, total: starts }
  }

  const closingParenthesis = appearances.indexOf(')', openingParenthesis)
  const starts = pf(appearances.slice(0, openingParenthesis))
  const substitutes = pf(appearances.slice(
    openingParenthesis + 1,
    closingParenthesis === -1 ? undefined : closingParenthesis,
  ))

  return { starts, total: starts + substitutes }
}

export const b2bConfig: PositionConfig = {
  key: 'b2b',
  emoji: '⚙️',
  name: 'Box-To-Box',
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos', 'OCG',
    'Poss Perd/90', 'xG', 'xA', 'Faltas Cometidas', 'Faltas Contra',
    'Cab A', 'Cabs', 'Cab Dec/90', 'Pas A', 'Ps C', 'Passes Ch', 'PeP',
    'Fnt', 'Remates', 'Rem %', 'Press. tent.', 'Press. conc.', 'T Desa',
    'Des C', 'Crt D', 'Blq', 'Crt', 'Rems Bloq', 'Alívios', 'Poss Con/90',
    'Remates de fora da área em cada 90 minutes', 'Cr T', 'Cr C',
    'Remates em livres', 'Pens', 'Pens M', 'Distância', 'Classificação',
  ],
  identityColumns: {
    Jogador: 'Jogador', Nação: 'Nação', Clube: 'Clube', Idade: 'Idade',
    Salário: 'Salário', Valor: 'Valor Estimado',
  },
  defaultTableColumns: [
    'jogosCompletos', 'npxG90', 'xA90', 'desG90', 'pctDes', 'pressaoG90',
    'pctPassesCertos', 'passD90', 'bRob90', 'chances90', 'dist90', 'notaMedia',
  ],
  metrics: [
    // ── GENERAL ──
    { key: 'altura', label: 'Altura', category: 'physical', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Altura']) / 100 },
    { key: 'jogosCompletos', label: 'Jogos completos', category: 'general', format: 'number', decimals: 1, displayInTable: true, lowerIsBetter: false,
      formula: (_r, ctx) => ctx.j90 },
    { key: 'jogosTotais', label: 'Jogos Totais', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => parseAppearances(r['Presenças'], ctx.pf).total },
    { key: 'minPartida', label: 'Minutos por partida', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), parseAppearances(r['Presenças'], ctx.pf).total) },
    { key: 'jogosComoTitular', label: 'Jogos como Titular', category: 'general', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        // A aba referencia Expira (DM), não Presenças (DO). Sem "(", o Excel retorna 100%.
        const expiry = r['Expira'] ?? ''
        if (!expiry.includes('(')) return 100
        const { starts, total } = parseAppearances(expiry, ctx.pf)
        return total === 0 ? 0 : ctx.rnd(ctx.pct(starts, total), 0)
      } },
    { key: 'hdj', label: 'Man of the match', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['HdJ']) },
    { key: 'pctHdj', label: '% de vezes que foi eleito o Homem do Jogo', category: 'general', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90) },

    // ── PENALTIES ──
    { key: 'pensBatidos', label: 'Pênaltis batidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens']) },
    { key: 'pensMarcados', label: 'Pênaltis marcados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'pensPerdidos', label: 'Pênaltis perdidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']) },
    { key: 'pctPen', label: '% Conversão de pênalti', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const attempted = ctx.pf(r['Pens'])
        return attempted === 0 ? 0.0000001 : ctx.pct(ctx.pf(r['Pens M']), attempted)
      } },

    // ── ATTACKING ──
    { key: 'gols', label: 'Gols', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) },
    { key: 'assist', label: 'Assistências', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Assist.']) },
    { key: 'golsAst', label: 'Gols + Ass', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) },
    { key: 'bolasRecuperadas', label: 'Bolas recuperadas', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D']) },
    { key: 'bolasRec90', label: 'Bolas recuperadas / 90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D']), ctx.j90) },

    // ── SHOOTING ──
    { key: 'finalizacoes', label: 'Finalizações realizadas', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) - ctx.pf(r['Pens']) },
    { key: 'fin90', label: 'Finalizações /90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) - ctx.pf(r['Pens']), ctx.j90) },
    { key: 'finNoGol', label: 'Finalizações no Gol', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']) },
    { key: 'finNoGol90', label: 'Finalizações no Gol /90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'pctFinCertas', label: '% Finalizações Certas', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(
        ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']),
        ctx.pf(r['Remates']) - ctx.pf(r['Pens']),
      ) },
    { key: 'txConversao', label: 'Taxa de Conversão %', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Golos']), ctx.pf(r['Remates'])) },

    // ── xG / xA ──
    { key: 'xG', label: 'Gols esperados (xG)', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) },
    { key: 'xG90', label: 'xG /90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.j90) },
    { key: 'npxG', label: 'xG (Sem pênaltis)', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'npxG90', label: 'xG (Sem pênaltis) /90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xA', label: 'Assistências Esperadas (xA)', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) },
    { key: 'xA90', label: 'xA /90', category: 'creation', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90) },
    { key: 'xAxGSemPen', label: 'xA + xG sem pen', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'xAxG90', label: 'xA + xG /90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },

    // ── HdJ ──
    { key: 'minHdj', label: 'Minutos pra ser o homem do jogo', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => {
        const hdj = ctx.pf(r['HdJ'])
        return hdj === 0 ? 5000 : ctx.sDiv(ctx.pf(r['Minutos']), hdj)
      } },

    // ── DEFENDING ──
    { key: 'interceptacoes', label: 'Interceptações', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt']) },
    { key: 'int90', label: 'Int / 90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt']), ctx.j90) },
    { key: 'desT', label: 'Desarmes Tentados', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'desT90', label: 'Des disputados /90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'desG', label: 'Desarmes Ganhos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) },
    { key: 'desG90', label: 'Desarmes G/90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']), ctx.j90) },
    { key: 'driblesS', label: 'Dribles Sofridos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']) - ctx.pf(r['Des C']) },
    { key: 'driblesS90', label: 'Dribles Sofridos /90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']) - ctx.pf(r['Des C']), ctx.j90) },
    { key: 'pctDes', label: '% Des Ganhos', category: 'defending', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Des C']), ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])) },
    { key: 'faltasComet', label: 'Faltas cometidas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) },
    { key: 'faltas90', label: 'Faltas/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'desDec', label: 'Desarmes Decisivos', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt D']) },
    { key: 'desDec90', label: 'Desarmes Decisivos / 90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt D']), ctx.j90) },

    // ── PRESSING ──
    { key: 'pressaoT', label: 'Movimentos de pressão tentados', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. tent.']) },
    { key: 'pressaoT90', label: 'Mov Press T/90', category: 'pressing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90) },
    { key: 'pressaoG', label: 'Movimentos de pressão ganhos', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) },
    { key: 'pressaoG90', label: 'Mov Press Ganhos /90', category: 'pressing', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90) },
    { key: 'pctPressao', label: '% Pressão ganha/90', category: 'pressing', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])) },

    // ── DISCIPLINE ──
    { key: 'amarelos', label: 'Amarelos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) },
    { key: 'vermelhos', label: 'Vermelhos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cartões vermelhos']) },
    { key: 'totalCartoes', label: 'Total cartões', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']) },
    { key: 'faltasSemCartao', label: 'Faltas sem cartão', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']) },
    { key: 'cartoesPorFalta', label: 'Cartões por falta cometida', category: 'discipline', format: 'percentage', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']), ctx.pf(r['Faltas Cometidas'])) },
    { key: 'lancesDisputados', label: 'Lances disputados', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C']) },
    { key: 'lancesLimpos', label: 'Lances disputados e ganhos de forma limpa', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt D']) + ctx.pf(r['Des C']) },
    { key: 'pctLancesLimpos', label: '% Lances disputados e ganhos de forma limpa', category: 'defending', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(
        ctx.pf(r['Crt D']) + ctx.pf(r['Des C']),
        ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C']),
      ) },
    { key: 'pctFaltasLimpas', label: '%Faltas limpas (Sem cartão)', category: 'discipline', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => { const fc = ctx.pf(r['Faltas Cometidas']); return fc === 0 ? 0 : ctx.pct(fc - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']), fc) } },

    // ── CROSSING ──
    { key: 'cruzT', label: 'Cruzamentos Tentados', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr T']) },
    { key: 'cruzC', label: 'Cruzamentos com sucesso', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr C']) },
    { key: 'pctCruz', label: '% Cruzamentos certos', category: 'creation', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cr C']), ctx.pf(r['Cr T'])) },

    // ── PASSING ──
    { key: 'passesT', label: 'Passes tentados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pas A']) },
    { key: 'passesC', label: 'Passes certos', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Ps C']) },
    { key: 'pctPassesCertos', label: '% Passes certos', category: 'passing', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])) },
    { key: 'passesErr', label: 'Passes errados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']) },
    { key: 'passesErr90', label: 'Passes Err/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'passesCurtosErr', label: 'Passes certos  - errados / Jogo', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(
        ctx.pf(r['Ps C']) - (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])),
        ctx.j90,
      ) },

    // ── AERIAL ──
    { key: 'cabsDisp', label: 'Cabeceios Disputados', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab A']) },
    { key: 'cabsDisp90', label: 'Cabeceios Disputados /90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90) },
    { key: 'cabsG', label: 'Cabeceios Ganhos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cabs']) },
    { key: 'cabsPerd', label: 'Cabeceios Perdidos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cab A']) - ctx.pf(r['Cabs']) },
    { key: 'pctCabs', label: '% Cabs Ganhos', category: 'aerial', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cabs']), ctx.pf(r['Cab A'])) },

    // ── CREATION ──
    { key: 'passD', label: 'Passes Decisivos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) },
    { key: 'passD90', label: 'Pass D /90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'passDecParaAst', label: 'Passes Decisivos pra uma assistência', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => {
        const assists = ctx.pf(r['Assist.'])
        return assists === 0 ? 25 : ctx.sDiv(ctx.pf(r['Passes Ch']), assists)
      } },
    { key: 'passDecConvertidos', label: 'Pass Decisivos que se converteram em assistências', category: 'creation', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Assist.']), ctx.pf(r['Passes Ch'])) },
    { key: 'assistClarasDesperdicadas', label: 'Assistências Claras que a Equipe desperdiçou', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },
    { key: 'xAPerPassD', label: 'xA / Passe Decisivo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },

    // ── INTERCEPTIONS & RECOVERIES ──
    { key: 'bolasInt', label: 'Bolas Interceptadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Alívios']) + ctx.pf(r['Crt']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt D']) * 0.5 },
    { key: 'bolasInt90', label: 'Bolas Interceptadas /90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(
        ctx.pf(r['Alívios']) + ctx.pf(r['Crt']) + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt D']) * 0.5,
        ctx.j90,
      ) },
    { key: 'bolasRoubadas', label: 'Bolas roubadas', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Crt D']) * 0.5 },
    { key: 'bRob90', label: 'Bolas roubadas / 90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Crt D']) * 0.5, ctx.j90) },

    // ── OFFENSIVE ──
    { key: 'participacao90', label: 'Participação por jogo (passes, fnt, fin, criação, roubadas de bola, etc)', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(
        ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) + ctx.pf(r['Faltas Contra'])
          + ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D'])
          + ctx.pf(r['Cab A']) + ctx.pf(r['Fnt']) + ctx.pf(r['OCG'])
          + ctx.pf(r['Passes Ch']) + ctx.pf(r['Pas A']),
        ctx.j90,
      ) },
    { key: 'lancesT', label: 'Lances Tentados (Remate, Passe, Finta, etc)', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const desarmesTentados = ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])
        const lancesDisputados = ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        return ctx.pf(r['xA']) + desarmesTentados + lancesDisputados
          + ctx.pf(r['Pas A']) + ctx.pf(r['Cab A']) + ctx.pf(r['Remates'])
          + ctx.pf(r['Press. tent.']) + ctx.pf(r['Cr T'])
      } },
    { key: 'lancesT90', label: 'Lances Tentados /90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const desarmesTentados = ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])
        const lancesDisputados = ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        return ctx.sDiv(
          ctx.pf(r['xA']) + desarmesTentados + lancesDisputados
            + ctx.pf(r['Pas A']) + ctx.pf(r['Cab A']) + ctx.pf(r['Remates'])
            + ctx.pf(r['Press. tent.']) + ctx.pf(r['Cr T']),
          ctx.j90,
        )
      } },
    { key: 'lancesC', label: 'Lances Conseguidos', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const lancesLimpos = ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        return ctx.pf(r['Golos']) * 1.5 + ctx.pf(r['Des C']) + lancesLimpos
          + ctx.pf(r['Ps C']) + ctx.pf(r['Cabs']) + ctx.pf(r['Press. conc.'])
          + ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) * 0.75 + ctx.pf(r['Golos']) * 0.75
      } },
    { key: 'lancesC90', label: 'Lances Conseguidos /90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const lancesLimpos = ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        const lancesConseguidos = ctx.pf(r['Golos']) * 1.5 + ctx.pf(r['Des C']) + lancesLimpos
          + ctx.pf(r['Ps C']) + ctx.pf(r['Cabs']) + ctx.pf(r['Press. conc.'])
          + ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) * 0.75 + ctx.pf(r['Golos']) * 0.75
        return ctx.sDiv(lancesConseguidos, ctx.j90)
      } },
    { key: 'pctAcerto', label: '% Acerto', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const desarmesTentados = ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])
        const lancesDisputados = ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        const t = ctx.pf(r['xA']) + desarmesTentados + lancesDisputados
          + ctx.pf(r['Pas A']) + ctx.pf(r['Cab A']) + ctx.pf(r['Remates'])
          + ctx.pf(r['Press. tent.']) + ctx.pf(r['Cr T'])
        const lancesLimpos = ctx.pf(r['Crt D']) + ctx.pf(r['Des C'])
        const c = ctx.pf(r['Golos']) * 1.5 + ctx.pf(r['Des C']) + lancesLimpos
          + ctx.pf(r['Ps C']) + ctx.pf(r['Cabs']) + ctx.pf(r['Press. conc.'])
          + ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) * 0.75 + ctx.pf(r['Golos']) * 0.75
        return t === 0 ? 0 : ctx.pct(c, t)
      } },

    // ── CHANCES ──
    { key: 'chancesCriadas', label: 'Chances criadas', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['xA']) + ctx.pf(r['Cr C']) },
    { key: 'chances90', label: 'Chances criadas / 90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['xA']) + ctx.pf(r['Cr C']), ctx.j90) },

    // ── ÚLTIMO TERÇO ──
    { key: 'acoesUltimoTerco', label: 'Ações no último terço (Finta, Pass D, OGC, etc)', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr C']) },
    { key: 'ultimoTerco90', label: 'Último terço/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr C']), ctx.j90) },

    // ── PHYSICAL ──
    { key: 'distancia', label: 'Distância', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Distância']) },
    { key: 'dist90', label: 'Dist / 90', category: 'physical', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90) },
    { key: 'possDesp', label: 'Posse Desperdiçada', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => (ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])) + (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) },
    { key: 'possDesp90', label: 'Posse Desperdiçada /90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])) + (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])), ctx.j90) },
    { key: 'possPerd90', label: 'Posse perdida /90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Poss Perd/90']) },

    // ── NOTA ──
    { key: 'notaMedia', label: 'Nota média', category: 'general', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Classificação']) },
  ],
}
