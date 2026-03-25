import type { PositionConfig } from './types.ts'

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
    { key: 'jogosCompletos', label: 'Jogos Completos', category: 'general', format: 'number', decimals: 1, displayInTable: true, lowerIsBetter: false,
      formula: (_r, ctx) => ctx.j90 },
    { key: 'jogosTotais', label: 'Jogos Totais', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Presenças']) },
    { key: 'minPartida', label: 'Min/Partida', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Presenças'])) },
    { key: 'hdj', label: 'Man of the Match', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['HdJ']) },
    { key: 'pctHdj', label: '% HdJ', category: 'general', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90) },

    // ── PENALTIES ──
    { key: 'pensBatidos', label: 'Pênaltis Batidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens']) },
    { key: 'pensMarcados', label: 'Pênaltis Marcados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'pensPerdidos', label: 'Pênaltis Perdidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']) },
    { key: 'pctPen', label: '% Conv. Pênalti', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Pens'])) },

    // ── ATTACKING ──
    { key: 'gols', label: 'Gols', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) },
    { key: 'assist', label: 'Assistências', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Assist.']) },
    { key: 'golsAst', label: 'Gols + Ast', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) },
    { key: 'bolasRecuperadas', label: 'Bolas Recuperadas', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C']) },
    { key: 'bolasRec90', label: 'Bolas Rec/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']) + ctx.pf(r['Crt D']) + ctx.pf(r['Des C']), ctx.j90) },

    // ── SHOOTING ──
    { key: 'finalizacoes', label: 'Finalizações', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) - ctx.pf(r['Pens']) },
    { key: 'fin90', label: 'Fin/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) - ctx.pf(r['Pens']), ctx.j90) },
    { key: 'finNoGol', label: 'Fin no Gol', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']) },
    { key: 'finNoGol90', label: 'Fin no Gol/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'pctFinCertas', label: '% Fin Certas', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Rem %']), ctx.pf(r['Remates'])) },
    { key: 'txConversao', label: 'Taxa Conversão', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Golos']), ctx.pf(r['Remates'])) },

    // ── xG / xA ──
    { key: 'xG', label: 'xG', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) },
    { key: 'xG90', label: 'xG/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.j90) },
    { key: 'npxG', label: 'npxG', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'npxG90', label: 'npxG/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xA', label: 'xA', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) },
    { key: 'xA90', label: 'xA/90', category: 'creation', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90) },
    { key: 'xAxGSemPen', label: 'xA + xG (sem Pen)', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'xAxG90', label: '(xA+npxG)/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },

    // ── HdJ ──
    { key: 'minHdj', label: 'Min/HdJ', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['HdJ'])) },

    // ── DEFENDING ──
    { key: 'interceptacoes', label: 'Interceptações', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt D']) },
    { key: 'int90', label: 'Int/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt D']), ctx.j90) },
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
    { key: 'pctDes', label: '% Des Ganhos', category: 'defending', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Des C']), ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])) },
    { key: 'faltasComet', label: 'Faltas Cometidas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) },
    { key: 'faltas90', label: 'Faltas/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'desDec', label: 'Des Decisivos', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab Dec/90']) * ctx.j90 },
    { key: 'desDec90', label: 'Des Decisivos/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab Dec/90']) },

    // ── PRESSING ──
    { key: 'pressaoT', label: 'Pressão Tentada', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. tent.']) },
    { key: 'pressaoT90', label: 'Pressão T/90', category: 'pressing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90) },
    { key: 'pressaoG', label: 'Pressão Ganha', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) },
    { key: 'pressaoG90', label: 'Pressão G/90', category: 'pressing', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90) },
    { key: 'pctPressao', label: '% Pressão', category: 'pressing', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])) },

    // ── DISCIPLINE ──
    { key: 'amarelos', label: 'Amarelos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) },
    { key: 'vermelhos', label: 'Vermelhos', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cartões vermelhos']) },
    { key: 'totalCartoes', label: 'Total Cartões', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']) },
    { key: 'faltasSemCartao', label: 'Faltas sem Cartão', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Faltas Cometidas']) - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']) },
    { key: 'pctFaltasLimpas', label: '% Faltas Limpas', category: 'discipline', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => { const fc = ctx.pf(r['Faltas Cometidas']); return fc === 0 ? 0 : ctx.pct(fc - ctx.pf(r['Amr']) - ctx.pf(r['Cartões vermelhos']), fc) } },

    // ── CROSSING ──
    { key: 'cruzT', label: 'Cruzamentos Tentados', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr T']) },
    { key: 'cruzC', label: 'Cruzamentos Certos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr C']) },
    { key: 'pctCruz', label: '% Cruzamentos', category: 'creation', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cr C']), ctx.pf(r['Cr T'])) },

    // ── PASSING ──
    { key: 'passesT', label: 'Passes Tentados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pas A']) },
    { key: 'passesC', label: 'Passes Certos', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Ps C']) },
    { key: 'pctPassesCertos', label: '% Passes Certos', category: 'passing', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])) },
    { key: 'passesErr', label: 'Passes Errados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']) },
    { key: 'passesErr90', label: 'Passes Err/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'passesCurtosErr', label: 'Passes Curtos Err/Jogo', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.pf(r['Presenças'])) },

    // ── AERIAL ──
    { key: 'cabsDisp', label: 'Cabs Disputados', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cabs']) },
    { key: 'cabsDisp90', label: 'Cabs Disp/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90) },
    { key: 'cabsG', label: 'Cabs Ganhos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab A']) },
    { key: 'cabsPerd', label: 'Cabs Perdidos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cabs']) - ctx.pf(r['Cab A']) },
    { key: 'pctCabs', label: '% Cabs Ganhos', category: 'aerial', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cab A']), ctx.pf(r['Cabs'])) },

    // ── CREATION ──
    { key: 'passD', label: 'Passes Decisivos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) },
    { key: 'passD90', label: 'Pass D/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'passDecParaAst', label: 'Pass D / Assist', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.pf(r['Assist.'])) },
    { key: 'xAPerPassD', label: 'xA / Pass Decisivo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },

    // ── INTERCEPTIONS & RECOVERIES ──
    { key: 'bolasInt', label: 'Bolas Interceptadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt D']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Blq']) + ctx.pf(r['Alívios']) },
    { key: 'bolasInt90', label: 'Bolas Int/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt D']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Blq']) + ctx.pf(r['Alívios']), ctx.j90) },
    { key: 'bolasRoubadas', label: 'Bolas Roubadas', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Des C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5 },
    { key: 'bRob90', label: 'Bolas Rob/90', category: 'defending', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5, ctx.j90) },

    // ── OFFENSIVE ──
    { key: 'participacao90', label: 'Participação/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr C']), ctx.j90) },
    { key: 'lancesT', label: 'Lances Tentados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['T Desa']) + ctx.pf(r['Cabs']) },
    { key: 'lancesT90', label: 'Lances T/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['T Desa']) + ctx.pf(r['Cabs']), ctx.j90) },
    { key: 'lancesC', label: 'Lances Conseguidos', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) * 3 + ctx.pf(r['Assist.']) * 2 + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Cab A']) },
    { key: 'lancesC90', label: 'Lances C/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) * 3 + ctx.pf(r['Assist.']) * 2 + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Cab A']), ctx.j90) },
    { key: 'pctAcerto', label: '% Acerto', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['T Desa']) + ctx.pf(r['Cabs'])
        const c = ctx.pf(r['Golos']) * 3 + ctx.pf(r['Assist.']) * 2 + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Cab A'])
        return t === 0 ? 0 : ctx.pct(c, t)
      } },

    // ── CHANCES ──
    { key: 'chancesCriadas', label: 'Chances Criadas', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) + ctx.pf(r['Faltas Contra']) + ctx.pf(r['xA']) + ctx.pf(r['Cr C']) },
    { key: 'chances90', label: 'Chances/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']) + ctx.pf(r['Faltas Contra']) + ctx.pf(r['xA']) + ctx.pf(r['Cr C']), ctx.j90) },

    // ── ÚLTIMO TERÇO ──
    { key: 'acoesUltimoTerco', label: 'Ações Último Terço', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Des C']) + ctx.pf(r['Cr C']) },
    { key: 'ultimoTerco90', label: 'Último Terço/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Des C']) + ctx.pf(r['Cr C']), ctx.j90) },

    // ── PHYSICAL ──
    { key: 'distancia', label: 'Distância', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Distância']) },
    { key: 'dist90', label: 'Dist/90', category: 'physical', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90) },
    { key: 'possDesp', label: 'Posse Desperdiçada', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cabs']) - ctx.pf(r['Cab A'])) },
    { key: 'possDesp90', label: 'Posse Desp/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cabs']) - ctx.pf(r['Cab A'])), ctx.j90) },
    { key: 'possPerd90', label: 'Posse Perdida/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Poss Perd/90']) },

    // ── NOTA ──
    { key: 'notaMedia', label: 'Nota Média', category: 'general', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Classificação']) },

    // ── Métricas adicionais da planilha ────────────────────────
    {
      key: 'fintas90',
      label: 'Fintas/90',
      category: 'physical',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctPressao',
      label: '% Pressão',
      category: 'pressing',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'xGxA90',
      label: 'xG+xA/90',
      category: 'attacking',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['xG']) - pf(r['Pens']) * 0.79 + pf(r['xA']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    // ── Moneyball Score (planilha original) ────────────────────
    {
      key: '_moneyball',
      label: 'Moneyball Score',
      category: 'general',
      formula: (r, ctx) => {
        const { pf, pct, sDiv, clamp, rnd } = ctx
        const j90 = ctx.j90
        const xg = pf(r['xG']), xa = pf(r['xA']), pens = pf(r['Pens'])
        const desC = pf(r['Des C'])
        const presT = pf(r['Press. tent.']), presC = pf(r['Press. conc.'])
        const pasA = pf(r['Pas A']), pasC = pf(r['Ps C'])
        const passD = pf(r['Passes Ch'])
        const fnt = pf(r['Fnt'])
        const xgSP = xg - pens * 0.79

        const fm = clamp((pf(r['Classificação']) - 5) / 3 * 100, 0, 100)
        const ngS = clamp(sDiv(xgSP, j90) / 0.3 * 100, 0, 100)
        const xaS = clamp(sDiv(xa, j90) / 0.2 * 100, 0, 100)
        const gxS = clamp(sDiv(xgSP + xa, j90) / 0.5 * 100, 0, 100)
        const defS = clamp(sDiv(desC, j90) / 2.5 * 100, 0, 100)
        const pcS = clamp(sDiv(presC, j90) / 3 * 100, 0, 100)
        const pssS = clamp((pct(pasC, pasA) - 70) / 25 * 100, 0, 100)
        const pdS = clamp(sDiv(passD, j90) / 2 * 100, 0, 100)
        const fnS = clamp(sDiv(fnt, j90) / 2 * 100, 0, 100)
        const ppS = clamp(pct(presC, presT) / 30 * 100, 0, 100)
        const m = ngS * 0.20 + xaS * 0.15 + gxS * 0.10 + defS * 0.15 + pcS * 0.10 + pssS * 0.10 + pdS * 0.10 + fnS * 0.05 + ppS * 0.05
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
