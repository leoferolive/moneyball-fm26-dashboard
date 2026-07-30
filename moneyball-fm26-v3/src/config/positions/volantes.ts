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
  const substituteAppearances = pf(appearances.slice(
    openingParenthesis + 1,
    closingParenthesis === -1 ? undefined : closingParenthesis,
  ))

  return { starts, total: starts + substituteAppearances }
}

export const volantesConfig: PositionConfig = {
  key: 'volantes',
  emoji: '🛡️',
  name: 'Volantes',
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos', 'OCG',
    'Poss Perd/90', 'xA', 'Faltas Cometidas', 'Cab A', 'Cabs', 'Cab Dec/90',
    'Pas A', 'Ps C', 'Passes Ch', 'PeP', 'Remates', 'Rem %',
    'Press. tent.', 'Press. conc.', 'T Desa', 'Des C', 'Crt D', 'Blq',
    'Crt', 'Rems Bloq', 'Alívios', 'Faltas Contra', 'Poss Con/90',
    'Remates em livres', 'Pens', 'Pens M', 'Distância', 'Classificação',
  ],
  identityColumns: {
    Jogador: 'Jogador', Nação: 'Nação', Clube: 'Clube', Idade: 'Idade',
    Salário: 'Salário', Valor: 'Valor Estimado',
  },
  defaultTableColumns: [
    'Jogos Completos', 'Pressão G/90', '% Pressão', 'Des G/90', '% Des Ganhos',
    '% Passes Certos', 'Pass D/90', 'xA/90', 'Int+Rec/90', 'Bolas Rob/90',
    'Eficácia Defensiva', 'Dist/90', 'Nota Média',
  ],
  metrics: [
    // ── GENERAL ──
    { key: 'jogosCompletos', label: 'Jogos Completos', category: 'general', format: 'integer', displayInTable: true, lowerIsBetter: false,
      formula: (_r, ctx) => ctx.j90 },
    { key: 'jogosTotais', label: 'Jogos Totais', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => parseAppearances(r['Presenças'], ctx.pf).total },
    { key: 'minPartida', label: 'Min/Partida', category: 'general', format: 'number', decimals: 0, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), parseAppearances(r['Presenças'], ctx.pf).total) },
    { key: 'pctJogosTitular', label: 'Jogos como Titular', category: 'general', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const { starts, total } = parseAppearances(r['Presenças'], ctx.pf)
        return total === 0 ? 0 : ctx.rnd(ctx.pct(starts, total), 0)
      } },
    { key: 'hdj', label: 'Man of the Match', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['HdJ']) },
    { key: 'pctHdj', label: '% HdJ', category: 'general', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90) },

    // ── ATTACKING ──
    { key: 'gols', label: 'Gols', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) },
    { key: 'assist', label: 'Assistências', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Assist.']) },
    { key: 'golsAst', label: 'Gols + Ast', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) },

    // ── PENALTIES ──
    { key: 'pensBatidos', label: 'Pênaltis Batidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens']) },
    { key: 'pensMarcados', label: 'Pênaltis Marcados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'pensPerdidos', label: 'Pênaltis Perdidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']) },
    { key: 'pctPen', label: '% Conv. Pênalti', category: 'attacking', format: 'percentage', decimals: 1, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const attempted = ctx.pf(r['Pens'])
        return attempted === 0 ? 0.0000001 : ctx.pct(ctx.pf(r['Pens M']), attempted)
      } },

    // ── DISCIPLINE ──
    { key: 'amarelos', label: 'Amarelos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) },
    { key: 'vermelhos', label: 'Vermelhos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cartões vermelhos']) },
    { key: 'totalCartoes', label: 'Total Cartões', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']) },
    { key: 'faltasComet', label: 'Faltas Cometidas', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) },
    { key: 'faltas90', label: 'Faltas/90', category: 'discipline', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'faltasSemCartao', label: 'Faltas sem Cartão', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']) },
    { key: 'cartoesPorFalta', label: 'Cartões por Falta Cometida', category: 'discipline', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']), ctx.pf(r['Faltas Cometidas'])) },
    { key: 'pctFaltasSemCartao', label: '% Faltas Sem Cartão', category: 'discipline', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => { const fc = ctx.pf(r['Faltas Cometidas']); return fc === 0 ? 0 : ctx.pct(fc - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']), fc) } },
    { key: 'errosGol', label: 'Erros → Gol', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['EPG']) },
    { key: 'erros90', label: 'Erros/90', category: 'discipline', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['EPG']), ctx.j90) },

    // ── PRESSING ──
    { key: 'pressaoT', label: 'Pressão Tentada', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. tent.']) },
    { key: 'pressaoT90', label: 'Pressão T/90', category: 'pressing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90) },
    { key: 'pressaoG', label: 'Pressão Ganha', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) },
    { key: 'pressaoG90', label: 'Pressão G/90', category: 'pressing', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90) },
    { key: 'pctPressao', label: '% Pressão', category: 'pressing', format: 'percentage', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])) },

    // ── DEFENDING: DISPUTES ──
    { key: 'bolasDisputadas', label: 'Bolas Disputadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'bolasDisp90', label: 'Bolas Disp/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'bolasGanhas', label: 'Bolas Ganhas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']) },
    { key: 'bolasGanhas90', label: 'Bolas Ganhas/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']), ctx.j90) },
    { key: 'pctBolasGanhas', label: '% Bolas Ganhas', category: 'defending', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const disputed = ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])
        return ctx.pct(ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']), disputed)
      } },

    // ── DEFENDING: TACKLES ──
    { key: 'desT', label: 'Desarmes Tentados', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'desT90', label: 'Des T/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'desG', label: 'Desarmes Ganhos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) },
    { key: 'desG90', label: 'Des G/90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']), ctx.j90) },
    { key: 'driblesS', label: 'Dribles Sofridos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['T Desa']) - ctx.pf(r['Des C']) },
    { key: 'driblesS90', label: 'Dribles Sof/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) - ctx.pf(r['Des C']), ctx.j90) },
    { key: 'pctDes', label: '% Des Ganhos', category: 'defending', format: 'percentage', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Des C']), ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])) },
    { key: 'desDecisivos', label: 'Desarmes Decisivos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt D']) },
    { key: 'desDecisivos90', label: 'Desarmes Decisivos/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt D']), ctx.j90) },

    // ── AERIAL ──
    { key: 'cabsEvitaramJogada', label: 'Cabeceios que Evitaram Jogada Ofensiva', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab Dec/90']) * ctx.j90 },
    { key: 'cabsEvitaramJogada90', label: 'Cabs que Evitaram Jogada Ofensiva/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab Dec/90']) },

    { key: 'cabsDisp', label: 'Cabs Disputados', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab A']) },
    { key: 'cabsDisp90', label: 'Cabs Disp/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90) },
    { key: 'cabsG', label: 'Cabs Ganhos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cabs']) },
    { key: 'cabsG90', label: 'Cabs G/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90) },
    { key: 'pctCabs', label: '% Cabs Ganhos', category: 'aerial', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cabs']), ctx.pf(r['Cab A'])) },
    { key: 'cabsPerd', label: 'Cabs Perdidos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cab A']) - ctx.pf(r['Cabs']) },
    { key: 'cabsPerd90', label: 'Cabs Perd/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']) - ctx.pf(r['Cabs']), ctx.j90) },

    // ── PASSING ──
    { key: 'passesT', label: 'Passes Tentados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pas A']) },
    { key: 'passesC', label: 'Passes Certos', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Ps C']) },
    { key: 'passesC90', label: 'Passes C/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'pctPassesCertos', label: '% Passes Certos', category: 'passing', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])) },
    { key: 'passesErr', label: 'Passes Errados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']) },
    { key: 'passesErr90', label: 'Passes Err/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'saldoPasses90', label: 'Passes Certos - Errados/Jogo', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['Ps C']) * 2) - ctx.pf(r['Pas A']), ctx.j90) },
    { key: 'passesCurtos', label: 'Passes Curtos', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['PeP']) },
    { key: 'passesCurtos90', label: 'Passes Curtos Certos/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['PeP']), ctx.j90) },
    { key: 'passesProgr', label: 'Passes Progressão', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['PeP']) },
    { key: 'passesProgr90', label: 'Pass Prog/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['PeP']), ctx.j90) },
    { key: 'pctProgr', label: '% Pass Progressão', category: 'passing', format: 'percentage', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['PeP']), ctx.pf(r['Pas A']) - ctx.pf(r['PeP'])) },

    // ── CREATION ──
    { key: 'passesDecisivos', label: 'Passes Decisivos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) },
    { key: 'passD90', label: 'Pass D/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'xA', label: 'xA', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) },
    { key: 'xA90', label: 'xA/90', category: 'creation', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90) },
    { key: 'xAPerPassD', label: 'xA / Pass Decisivo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },
    { key: 'criacao', label: 'Criação (Jogadas Of.)', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) },
    { key: 'criacao90', label: 'Criação/90', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']), ctx.j90) },
    { key: 'criacaoComAssist90', label: 'Criação/90 (com Assistências)', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Assist.']), ctx.j90) },

    // ── INTERCEPTIONS & RECOVERIES ──
    { key: 'intRec', label: 'Intercep + Recuperação', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt D']) },
    { key: 'intRec90', label: 'Int+Rec/90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt D']), ctx.j90) },
    { key: 'bolasInt', label: 'Bolas Interceptadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) },
    { key: 'bolasInt90', label: 'Bolas Int/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']), ctx.j90) },
    { key: 'bolasRoubadas', label: 'Bolas Roubadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']) * 0.5 },
    { key: 'bRob90', label: 'Bolas Rob/90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']) * 0.5, ctx.j90) },
    { key: 'possGanha90', label: 'Posse Ganha/90', category: 'pressing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Poss Con/90']) },

    // ── DEFENSIVE EFFECTIVENESS ──
    { key: 'lancesDefT', label: 'Lances Def Tentados', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => (ctx.pf(r['EPG']) * 3) + (ctx.pf(r['Amr']) * 1.5) + (ctx.pf(r['Cartões vermelhos']) * 2) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'lancesDefT90', label: 'Lances Def T/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = (ctx.pf(r['EPG']) * 3) + (ctx.pf(r['Amr']) * 1.5) + (ctx.pf(r['Cartões vermelhos']) * 2) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas'])
        return ctx.sDiv(t, ctx.j90)
      } },
    { key: 'lancesDefC', label: 'Lances Def Conseguidos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D']) + ctx.pf(r['Blq']) + ctx.pf(r['Alívios']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5 },
    { key: 'lancesDefC90', label: 'Lances Def C/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const c = ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D']) + ctx.pf(r['Blq']) + ctx.pf(r['Alívios']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        return ctx.sDiv(c, ctx.j90)
      } },
    { key: 'errosDef', label: 'Erros Defensivos', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => (ctx.pf(r['EPG']) * 3) + (ctx.pf(r['Amr']) * 1.25) + (ctx.pf(r['Cartões vermelhos']) * 2) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'errosDef90', label: 'Erros Def/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['EPG']) * 3) + (ctx.pf(r['Amr']) * 1.25) + (ctx.pf(r['Cartões vermelhos']) * 2) + ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'eficaciaDef', label: 'Eficácia Defensiva', category: 'defending', format: 'percentage', decimals: 1, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = (ctx.pf(r['EPG']) * 3) + (ctx.pf(r['Amr']) * 1.5) + (ctx.pf(r['Cartões vermelhos']) * 2) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas'])
        const c = ctx.pf(r['Des C']) + ctx.pf(r['Crt']) + ctx.pf(r['Crt D']) + ctx.pf(r['Blq']) + ctx.pf(r['Alívios']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        return t === 0 ? 0 : ctx.pct(c, t)
      } },

    // ── PHYSICAL ──
    { key: 'distancia', label: 'Distância', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Distância']) },
    { key: 'dist90', label: 'Dist/90', category: 'physical', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90) },
    { key: 'velMedia', label: 'Velocidade Média (km/h)', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const distKm = ctx.pf(r['Distância'])
        const minutos = ctx.pf(r['Minutos'])
        return minutos === 0 ? 0 : ctx.rnd((distKm * 1000 / (minutos * 60)) * 3600 / 1000)
      } },
    { key: 'possDesp', label: 'Posse Desperdiçada', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])) + (ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])) },
    { key: 'possDesp90', label: 'Posse Desp/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])) + (ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])), ctx.j90) },
    { key: 'possPerd90', label: 'Posse Perdida/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Poss Perd/90']) },

    // ── NOTA ──
    { key: 'notaMedia', label: 'Nota Média', category: 'general', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Classificação']) },
  ],
}
