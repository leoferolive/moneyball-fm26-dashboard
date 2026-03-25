import type { PositionConfig } from './types.ts'

export const avancadosConfig: PositionConfig = {
  key: 'avancados',
  emoji: '🎯',
  name: 'Avançados',
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'Golos', 'Assist.', 'OCG', 'Golos DS', 'Jogos DS', 'Poss Perd/90',
    'xG', 'xA', 'Faltas Cometidas', 'Faltas Contra', 'Pas A', 'Ps C',
    'Passes Ch', 'PeP', 'Fnt', 'Remates', 'Rem %', 'Cab A', 'Cabs',
    'Press. tent.', 'Press. conc.', 'T Desa', 'Des C', 'Crt',
    'CT-JA', 'CC-JA', 'Cr T', 'Cr C',
    'Golos marcados de fora da área', 'Remates de fora da área em cada 90 minutes',
    'Remates em livres', 'Fj', 'Pens', 'Pens M',
    'Sprints/90', 'Distância', 'Classificação',
  ],
  identityColumns: {
    Jogador: 'Jogador', Nação: 'Nação', Clube: 'Clube', Idade: 'Idade',
    Salário: 'Salário', Valor: 'Valor Estimado',
  },
  defaultTableColumns: [
    'jogosCompletos', 'gols90', 'npxG90', 'pctFinNoGol', 'pctConversaoFin',
    'xA90', 'overUnderXG', 'passD90', 'fintas90', 'desPresC90',
    'dist90', 'notaMedia',
  ],
  metrics: [
    // ── GENERAL ──
    { key: 'jogosCompletos', label: 'Jogos Completos', category: 'general', format: 'number', decimals: 1, displayInTable: true, lowerIsBetter: false,
      formula: (_r, ctx) => ctx.j90 },
    { key: 'jogosTotais', label: 'Jogos Totais', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Presenças']) },
    { key: 'minPartida', label: 'Min/Partida', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Presenças'])) },
    { key: 'mediaGolsCarreira', label: 'Média Gols Carreira', category: 'general', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos DS']), ctx.pf(r['Jogos DS'])) },
    { key: 'mediaGolsPart', label: 'Média Gols/Partida', category: 'general', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90) },
    { key: 'mediaGolsAstPart', label: 'Média G+A/Partida', category: 'general', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90) },

    // ── GOALS BREAKDOWN ──
    { key: 'gols', label: 'Gols', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) },
    { key: 'assist', label: 'Assistências', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Assist.']) },
    { key: 'golsAst', label: 'Gols + Ast', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) },
    { key: 'golsDentroArea', label: 'Gols Dentro da Área', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['Golos marcados de fora da área']) - ctx.pf(r['Pens M']) },
    { key: 'golsForaArea', label: 'Gols Fora da Área', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos marcados de fora da área']) },
    { key: 'golsPen', label: 'Gols de Pênalti', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'golsSemPen', label: 'Gols Sem Pênalti', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['Pens M']) },
    { key: 'pctGolsSemPen', label: '% Gols Sem Pênalti', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Golos']) - ctx.pf(r['Pens M']), ctx.pf(r['Golos'])) },
    { key: 'pctAst', label: '% Assistências', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Assist.']), ctx.pf(r['Golos']) + ctx.pf(r['Assist.'])) },
    { key: 'pctPenGols', label: '% Pênaltis nos Gols', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Golos'])) },

    // ── PER 90 ──
    { key: 'gols90', label: 'Gols/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90) },
    { key: 'ast90', label: 'Ast/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Assist.']), ctx.j90) },
    { key: 'golsAst90', label: 'G+A/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90) },
    { key: 'golsSemPen90', label: 'Gols SP/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) - ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'golsDentroArea90', label: 'Gols Dentro/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) - ctx.pf(r['Golos marcados de fora da área']) - ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'golsForaArea90', label: 'Gols Fora/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos marcados de fora da área']), ctx.j90) },

    // ── SET PIECES ──
    { key: 'tentsBP', label: 'Tentativas Bola Parada', category: 'setpiece', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['CT-JA']) - ctx.pf(r['Cr T']) },
    { key: 'tentsBP90', label: 'Tents BP/90', category: 'setpiece', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['CT-JA']) - ctx.pf(r['Cr T']), ctx.j90) },
    { key: 'chancesBP', label: 'Chances Bola Parada', category: 'setpiece', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['CC-JA']) - ctx.pf(r['Cr C']) },
    { key: 'chancesBP90', label: 'Chances BP/90', category: 'setpiece', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['CC-JA']) - ctx.pf(r['Cr C']), ctx.j90) },
    { key: 'pctBP', label: '% Bola Parada', category: 'setpiece', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['CC-JA']) - ctx.pf(r['Cr C']), ctx.pf(r['CT-JA']) - ctx.pf(r['Cr T'])) },
    { key: 'cobrancasFalta', label: 'Cobranças de Falta', category: 'setpiece', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates em livres']) },

    // ── PENALTIES ──
    { key: 'pensBatidos', label: 'Pênaltis Batidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens']) },
    { key: 'pensMarcados', label: 'Pênaltis Marcados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'pensPerdidos', label: 'Pênaltis Perdidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']) },
    { key: 'golsPen90', label: 'Gols Pên/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'pctPen', label: '% Conv. Pênalti', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Pens'])) },

    // ── AERIAL ──
    { key: 'cabsDisp', label: 'Cabs Disputados', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cabs']) },
    { key: 'cabsG', label: 'Cabs Ganhos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cab A']) },
    { key: 'cabsDisp90', label: 'Cabs Disp/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90) },
    { key: 'cabsG90', label: 'Cabs G/90', category: 'aerial', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90) },
    { key: 'cabsPerd', label: 'Cabs Perdidos', category: 'aerial', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Cabs']) - ctx.pf(r['Cab A']) },
    { key: 'pctCabs', label: '% Cabs Ganhos', category: 'aerial', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cab A']), ctx.pf(r['Cabs'])) },
    { key: 'pctCabsPerd', label: '% Cabs Perdidos', category: 'aerial', format: 'percentage', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cabs']) - ctx.pf(r['Cab A']), ctx.pf(r['Cabs'])) },

    // ── OFFSIDES ──
    { key: 'impedimentos', label: 'Impedimentos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Fj']) },
    { key: 'impedimentos90', label: 'Impedimentos/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fj']), ctx.j90) },

    // ── SHOOTING ──
    { key: 'finalizacoes', label: 'Finalizações', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) },
    { key: 'fin90', label: 'Fin/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']), ctx.j90) },
    { key: 'finNoGol', label: 'Fin No Gol', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Rem %']) },
    { key: 'finNoGol90', label: 'Fin No Gol/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']), ctx.j90) },
    { key: 'pctFinNoGol', label: '% Fin No Gol', category: 'shooting', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Rem %']), ctx.pf(r['Remates'])) },
    { key: 'finParaGol', label: 'Fin Para Cada Gol', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']), ctx.pf(r['Golos'])) },
    { key: 'finCertasParaGol', label: 'Fin Certas Para Gol', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']), ctx.pf(r['Golos'])) },
    { key: 'finOuCabParaGol', label: 'Fin ou Cab Para Gol', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Cabs']), ctx.pf(r['Golos'])) },
    { key: 'pctConversaoFin', label: '% Conversão Fin', category: 'shooting', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Golos']), ctx.pf(r['Remates'])) },

    // ── GPI ──
    { key: 'gpi', label: 'GPI (Goal Probability Index)', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const golsSP = ctx.pf(r['Golos']) - ctx.pf(r['Pens M'])
        const npxG = ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79
        const golsSP90 = ctx.sDiv(golsSP, ctx.j90)
        return ctx.sDiv(golsSP, npxG) * golsSP90
      } },

    // ── xG ──
    { key: 'xG', label: 'xG', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) },
    { key: 'xG90', label: 'xG/90', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.j90) },
    { key: 'xGPerJogo', label: 'xG/Jogo', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.pf(r['Presenças'])) },
    { key: 'golsConvertidos90', label: 'Gols Convertidos/90', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90) },
    { key: 'overUnderXG', label: 'Over/Under xG', category: 'shooting', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90) - ctx.sDiv(ctx.pf(r['xG']), ctx.j90) },

    // ── xG ADVANCED ──
    { key: 'npxG', label: 'npxG', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'npxG90', label: 'npxG/90', category: 'shooting', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xGPerChute', label: 'xG/Chute', category: 'shooting', format: 'number', decimals: 3, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.pf(r['Remates']) - ctx.pf(r['Pens'])) },

    // ── xA ──
    { key: 'xA', label: 'xA', category: 'creation', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) },
    { key: 'xA90', label: 'xA/90', category: 'creation', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90) },
    { key: 'xAxGSemPen', label: 'xA + npxG', category: 'creation', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'xAxG90', label: '(xA + npxG)/90', category: 'creation', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xGConclusion', label: 'xG Conclusão', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.pf(r['Golos']) + ctx.pf(r['xG'])) },

    // ── TIMING ──
    { key: 'minParaFinalizar', label: 'Min Para Finalizar', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Remates'])) },
    { key: 'minParaAcertar', label: 'Min Para Acertar', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Rem %'])) },
    { key: 'minParaMarcar', label: 'Min Para Marcar', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Golos'])) },
    { key: 'minParaParticipar', label: 'Min Para Participar', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Golos']) + ctx.pf(r['Assist.'])) },

    // ── NON-EXPECTED ──
    { key: 'golsNaoEsperados', label: 'Gols Não Esperados', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['xG']) },
    { key: 'golsNaoEspSemPen', label: 'Gols NE Sem Pên', category: 'shooting', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => (ctx.pf(r['Golos']) - ctx.pf(r['Pens M'])) - (ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79) },

    // ── CREATION ──
    { key: 'passD', label: 'Passes Decisivos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) },
    { key: 'passD90', label: 'Pass D/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'xAResult', label: 'xA Resultado', category: 'creation', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },
    { key: 'chancesDespEquipe', label: 'Chances Desp. Equipe', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['OCG']) },

    // ── CROSSING ──
    { key: 'cruzT', label: 'Cruzamentos Tentados', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr T']) },
    { key: 'cruzT90', label: 'Cruz T/90', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cr T']), ctx.j90) },
    { key: 'cruzC', label: 'Cruzamentos Certos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr C']) },
    { key: 'cruzC90', label: 'Cruz C/90', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cr C']), ctx.j90) },
    { key: 'pctCruz', label: '% Cruzamentos', category: 'creation', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cr C']), ctx.pf(r['Cr T'])) },

    // ── DRIBBLING ──
    { key: 'fintas', label: 'Fintas', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Fnt']) },
    { key: 'fintas90', label: 'Fintas/90', category: 'attacking', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90) },

    // ── PRESSING / DEFENDING ──
    { key: 'desPresT', label: 'Des+Press Tentados', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['Faltas Cometidas']) },
    { key: 'desPresT90', label: 'Des+Press T/90', category: 'pressing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['Faltas Cometidas']), ctx.j90) },
    { key: 'desPresC', label: 'Des+Press Conseguidos', category: 'pressing', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) },
    { key: 'desPresC90', label: 'Des+Press C/90', category: 'pressing', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']), ctx.j90) },
    { key: 'pctDesPresConcl', label: '% Des+Press', category: 'pressing', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = ctx.pf(r['T Desa']) + ctx.pf(r['Press. tent.']) + ctx.pf(r['Faltas Cometidas'])
        return t === 0 ? 0 : ctx.pct(ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']), t)
      } },
    { key: 'interceptacoes', label: 'Interceptações', category: 'defending', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Crt']) },
    { key: 'int90', label: 'Int/90', category: 'defending', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Crt']), ctx.j90) },

    // ── FOULS ──
    { key: 'faltasSofridas', label: 'Faltas Sofridas', category: 'discipline', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Faltas Contra']) },
    { key: 'faltasSof90', label: 'Faltas Sof/90', category: 'discipline', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Contra']), ctx.j90) },

    // ── PHYSICAL ──
    { key: 'distancia', label: 'Distância', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Distância']) },
    { key: 'dist90', label: 'Dist/90', category: 'physical', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90) },
    { key: 'sprints', label: 'Sprints', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Sprints/90']) * ctx.j90 },
    { key: 'sprints90', label: 'Sprints/90', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Sprints/90']) },
    { key: 'velMedia', label: 'Velocidade Média (km/h)', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const distKm = ctx.pf(r['Distância'])
        const minutos = ctx.pf(r['Minutos'])
        return minutos === 0 ? 0 : ctx.rnd((distKm * 1000 / (minutos * 60)) * 3600 / 1000)
      } },

    // ── OFFENSIVE PLAYS ──
    { key: 'lancesOfT', label: 'Lances Of. Tentados', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T']) },
    { key: 'lancesOf90', label: 'Lances Of/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T']), ctx.j90) },
    { key: 'lancesOfC', label: 'Lances Of. Conseguidos', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Rem %']) + ctx.pf(r['Assist.']) + ctx.pf(r['Cr C']) },
    { key: 'lancesOfC90', label: 'Lances Of C/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']) + ctx.pf(r['Assist.']) + ctx.pf(r['Cr C']), ctx.j90) },
    { key: 'eficaciaOf', label: 'Eficácia Ofensiva', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr T'])
        const c = ctx.pf(r['Rem %']) + ctx.pf(r['Assist.']) + ctx.pf(r['Cr C'])
        return t === 0 ? 0 : ctx.pct(c, t)
      } },

    // ── BALL ACTIONS ──
    { key: 'acoesBolaTent', label: 'Ações com Bola Tent.', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pas A']) + ctx.pf(r['Remates']) + ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cabs']) },
    { key: 'acoesBolaTent90', label: 'Ações Bola T/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) + ctx.pf(r['Remates']) + ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cabs']), ctx.j90) },
    { key: 'acoesBolaSucess', label: 'Ações com Bola Sucess.', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Ps C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Cab A']) },
    { key: 'acoesBolaSucess90', label: 'Ações Bola S/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Ps C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Cab A']), ctx.j90) },
    { key: 'pctSucessoAcoes', label: '% Sucesso Ações', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = ctx.pf(r['Pas A']) + ctx.pf(r['Remates']) + ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cabs'])
        const s = ctx.pf(r['Ps C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Cr C']) + ctx.pf(r['Cab A'])
        return t === 0 ? 0 : ctx.pct(s, t)
      } },

    // ── ÚLTIMO TERÇO ──
    { key: 'acoesUltimoTerco', label: 'Ações Último Terço', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cabs']) },
    { key: 'ultimoTerco90', label: 'Último Terço/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cabs']), ctx.j90) },

    // ── ATTEMPTS TO SCORE ──
    { key: 'tentativasGol', label: 'Tentativas de Gol', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Cabs']) },
    { key: 'tentativasGol90', label: 'Tentativas Gol/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Cabs']), ctx.j90) },

    // ── POSSESSION ──
    { key: 'possDesp', label: 'Posse Desperdiçada', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => (ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cabs']) - ctx.pf(r['Cab A'])) },
    { key: 'possDesp90', label: 'Posse Desp/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv((ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])) + (ctx.pf(r['Cabs']) - ctx.pf(r['Cab A'])), ctx.j90) },
    { key: 'possPerd90', label: 'Posse Perdida/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Poss Perd/90']) },

    // ── PARTICIPATION ──
    { key: 'participacao90', label: 'Participação/90', category: 'general', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) + ctx.pf(r['Passes Ch']), ctx.j90) },

    // ── NOTA ──
    { key: 'notaMedia', label: 'Nota Média', category: 'general', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Classificação']) },

    // ── Métricas adicionais da planilha ────────────────────────
    {
      key: 'remSemPen90',
      label: 'Rem sem Pen/90',
      category: 'shooting',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) - ctx.pf(r['Pens']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Remates (excluindo pênaltis) por 90 minutos',
    },
    {
      key: 'minPorGol',
      label: 'Min/Gol',
      category: 'attacking',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Golos'])),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 0,
      description: 'Minutos para marcar um gol (menor é melhor)',
    },
    {
      key: 'conversaoSemPen',
      label: 'Conversão sem Pen %',
      category: 'shooting',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        return pct(pf(r['Golos']) - pf(r['Pens M']), pf(r['Remates']) - pf(r['Pens']))
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
      description: 'Taxa de conversão excluindo pênaltis',
    },
    {
      key: 'overUnderXGAbs',
      label: 'Over/Under xG (abs)',
      category: 'attacking',
      formula: (r, ctx) => {
        const { pf, rnd } = ctx
        const golsSP = pf(r['Golos']) - pf(r['Pens M'])
        const xgSP = pf(r['xG']) - pf(r['Pens']) * 0.79
        return rnd(golsSP - xgSP)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Diferença absoluta gols sem pen vs npxG (fórmula planilha)',
    },
    {
      key: 'pressaoT90',
      label: 'Pressão T/90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90),
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
        const gols = pf(r['Golos']), xa = pf(r['xA'])
        const xg = pf(r['xG']), pens = pf(r['Pens']), pensM = pf(r['Pens M'])
        const rem = pf(r['Remates']), remC = pf(r['Rem %'])
        const presT = pf(r['Press. tent.'])
        const xgSP = xg - pens * 0.79
        const golsSP = gols - pensM

        const fm = clamp((pf(r['Classificação']) - 5) / 3 * 100, 0, 100)
        const g9S = clamp(sDiv(gols, j90) / 0.5 * 100, 0, 100)
        const ngS = clamp(sDiv(xgSP, j90) / 0.4 * 100, 0, 100)
        const cvS = clamp(pct(golsSP, rem - pens) / 15 * 100, 0, 100)
        const xaS = clamp(sDiv(xa, j90) / 0.15 * 100, 0, 100)
        const rgS = clamp(remC / 40 * 100, 0, 100)
        const ouS = clamp((golsSP - xgSP + 3) / 6 * 100, 0, 100)
        const prS = clamp(sDiv(presT, j90) / 5 * 100, 0, 100)
        const m = g9S * 0.25 + ngS * 0.20 + cvS * 0.15 + xaS * 0.10 + rgS * 0.10 + ouS * 0.10 + prS * 0.10
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
