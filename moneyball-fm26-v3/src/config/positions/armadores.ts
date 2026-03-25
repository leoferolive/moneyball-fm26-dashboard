import type { PositionConfig } from './types.ts'

export const armadoresConfig: PositionConfig = {
  key: 'armadores',
  emoji: '⚙️',
  name: 'Armadores',
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'Golos', 'Assist.', 'OCG', 'Poss Perd/90', 'xG', 'xA',
    'Faltas Cometidas', 'Faltas Contra', 'Pas A', 'Ps C', 'Passes Ch',
    'PeP', 'Fnt', 'Remates', 'Rem %', 'Press. tent.', 'Press. conc.',
    'CT-JA', 'CC-JA', 'Cr T', 'Cr C', 'Golos marcados de fora da área',
    'Remates de fora da área em cada 90 minutes', 'Remates em livres',
    'Pens', 'Pens M', 'Sprints/90', 'Distância', 'Classificação',
  ],
  identityColumns: {
    Jogador: 'Jogador', Nação: 'Nação', Clube: 'Clube', Idade: 'Idade',
    Salário: 'Salário', Valor: 'Valor Estimado',
  },
  defaultTableColumns: [
    'jogosCompletos', 'xA90', 'npxG90', 'gols90', 'ast90', 'passD90',
    'fintas90', 'pctPassesCertos', 'chancesPerigo90', 'pctFinNoGol',
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
    { key: 'hdj', label: 'Man of the Match', category: 'general', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['HdJ']) },
    { key: 'minHdj', label: 'Min/HdJ', category: 'general', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['HdJ'])) },
    { key: 'pctHdj', label: '% HdJ', category: 'general', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90) },

    // ── SET PIECES ──
    { key: 'tentsBP', label: 'Tentativas Bola Parada', category: 'setpiece', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['CT-JA']) - ctx.pf(r['Cr T']) },
    { key: 'tentsBP90', label: 'Tent BP/90', category: 'setpiece', format: 'number', displayInTable: false, lowerIsBetter: false,
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
    { key: 'pctPen', label: '% Conv. Pênalti', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Pens'])) },

    // ── GOALS ──
    { key: 'gols', label: 'Gols', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) },
    { key: 'golsSemPen', label: 'Gols sem Pênalti', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['Pens M']) },
    { key: 'golsForaArea', label: 'Gols de Fora da Área', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos marcados de fora da área']) },
    { key: 'gols90', label: 'Gols/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90) },
    { key: 'ast90', label: 'Assist/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Assist.']), ctx.j90) },
    { key: 'golsAst90', label: '(G+A)/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90) },

    // ── DRIBBLING ──
    { key: 'fintas', label: 'Fintas', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Fnt']) },
    { key: 'fintas90', label: 'Fintas/90', category: 'attacking', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90) },

    // ── xG / xA ──
    { key: 'xG', label: 'xG', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) },
    { key: 'npxG', label: 'npxG', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'npxG90', label: 'npxG/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xA', label: 'xA', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) },
    { key: 'xA90', label: 'xA/90', category: 'creation', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90) },
    { key: 'xAxG', label: 'xA + npxG', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 },
    { key: 'xAxG90', label: '(xA+npxG)/90', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90) },
    { key: 'xAConclusion', label: 'xA Conclusão', category: 'creation', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['xA']) + ctx.pf(r['Assist.'])) },
    { key: 'xGConclusion', label: 'xG Conclusão', category: 'attacking', format: 'number', decimals: 2, displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => { const npxg = ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79; return ctx.sDiv(ctx.pf(r['Golos']), ctx.pf(r['Golos']) + npxg) } },

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
    { key: 'passesT90', label: 'Passes T/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']), ctx.j90) },
    { key: 'passesC90', label: 'Passes C/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'passesErr90', label: 'Passes Err/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'pctPassesCertos', label: '% Passes Certos', category: 'passing', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])) },
    { key: 'passesErr', label: 'Passes Errados', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']) },
    { key: 'pctPassesErr', label: '% Passes Errados', category: 'passing', format: 'percentage', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])) },

    // ── CREATION ──
    { key: 'passD', label: 'Passes Decisivos', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) },
    { key: 'passD90', label: 'Pass D/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'passDecParaAst', label: 'Pass D / Assist', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.pf(r['Assist.'])) },
    { key: 'pctPassDecAst', label: '% Assist / Pass D', category: 'creation', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Assist.']), ctx.pf(r['Passes Ch'])) },
    { key: 'astDespEquipe', label: 'Ast Desp Equipe', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['xA']) - ctx.pf(r['Assist.']) },
    { key: 'xAPerPassD', label: 'xA / Pass Decisivo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])) },
    { key: 'minParaPassD', label: 'Min / Pass Decisivo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Passes Ch'])) },
    { key: 'minParaChancePerigo', label: 'Min / Chance de Perigo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG'])) },

    // ── SHOOTING ──
    { key: 'golsNaoEsperados', label: 'Gols Não Esperados', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['xG']) },
    { key: 'npxGClean', label: 'npxG Clean', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => (ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79) - ctx.pf(r['Pens M']) * 0.79 },
    { key: 'finalizacoes', label: 'Finalizações', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Remates']) - ctx.pf(r['Pens']) },
    { key: 'fin90', label: 'Fin/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) - ctx.pf(r['Pens']), ctx.j90) },
    { key: 'finNoGol90', label: 'Fin no Gol/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']) - ctx.pf(r['Pens M']), ctx.j90) },
    { key: 'pctFinNoGol', label: '% Fin no Gol', category: 'shooting', format: 'percentage', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Rem %']), ctx.pf(r['Remates'])) },
    { key: 'finParaGol', label: 'Fin / Gol', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']), ctx.pf(r['Golos'])) },
    { key: 'finCertasParaGol', label: 'Fin Certas / Gol', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']), ctx.pf(r['Golos'])) },
    { key: 'pctConversao', label: '% Conversão', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Golos']), ctx.pf(r['Remates'])) },
    { key: 'golsDentroArea', label: 'Gols Dentro da Área', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['Golos marcados de fora da área']) - ctx.pf(r['Pens M']) },
    { key: 'golsPen', label: 'Gols de Pênalti', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Pens M']) },
    { key: 'conversaoForaArea', label: '% Conversão Fora Área', category: 'shooting', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => { const remFora = ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90; return ctx.pct(ctx.pf(r['Golos marcados de fora da área']), remFora) } },

    // ── FOULS ──
    { key: 'faltasSofridas', label: 'Faltas Sofridas', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Faltas Contra']) },
    { key: 'faltasSof90', label: 'Faltas Sof/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Contra']), ctx.j90) },

    // ── BALL ACTIONS ──
    { key: 'acoesBolaTent', label: 'Ações com Bola Tent', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr T']) + ctx.pf(r['Remates']) + ctx.pf(r['Fnt']) + ctx.pf(r['Passes Ch']) },
    { key: 'acoesBolaTent90', label: 'Ações Bola T/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cr T']) + ctx.pf(r['Remates']) + ctx.pf(r['Fnt']) + ctx.pf(r['Passes Ch']), ctx.j90) },
    { key: 'acoesBolaSucess', label: 'Ações com Bola Sucess', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Fnt']) + ctx.pf(r['Assist.']) },
    { key: 'acoesBolaSucess90', label: 'Ações Bola S/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Fnt']) + ctx.pf(r['Assist.']), ctx.j90) },
    { key: 'pctSucessoAcoes', label: '% Sucesso Ações', category: 'attacking', format: 'percentage', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => {
        const t = ctx.pf(r['Cr T']) + ctx.pf(r['Remates']) + ctx.pf(r['Fnt']) + ctx.pf(r['Passes Ch'])
        const s = ctx.pf(r['Cr C']) + ctx.pf(r['Rem %']) + ctx.pf(r['Fnt']) + ctx.pf(r['Assist.'])
        return t === 0 ? 0 : ctx.pct(s, t)
      } },

    // ── CREATION ADVANCED ──
    { key: 'acoesFinalizacao', label: 'Ações de Finalização', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) * 1.5 + ctx.pf(r['OCG']) * 1.2 + ctx.pf(r['Cr C']) * 1.0 + ctx.pf(r['Fnt']) * 0.8 },
    { key: 'acoesFinalizacao90', label: 'Ações Fin/90', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) * 1.5 + ctx.pf(r['OCG']) * 1.2 + ctx.pf(r['Cr C']) * 1.0 + ctx.pf(r['Fnt']) * 0.8, ctx.j90) },
    { key: 'chancesPerigo', label: 'Chances de Perigo', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) * 1.5 + ctx.pf(r['OCG']) * 1.0 + ctx.pf(r['xA']) * 2.0 + ctx.pf(r['Cr C']) * 0.8 },
    { key: 'chancesPerigo90', label: 'Chances Perigo/90', category: 'creation', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) * 1.5 + ctx.pf(r['OCG']) * 1.0 + ctx.pf(r['xA']) * 2.0 + ctx.pf(r['Cr C']) * 0.8, ctx.j90) },

    // ── PARTICIPATION ──
    { key: 'participacao90', label: 'Participação/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Fnt']) + ctx.pf(r['Cr C']), ctx.j90) },
    { key: 'participacaoPasses90', label: 'Participação Passes/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['Assist.']) + ctx.pf(r['OCG']), ctx.j90) },

    // ── OFFENSIVE BUILD ──
    { key: 'passesJogadaOf', label: 'Passes Jogada Ofensiva', category: 'creation', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) },
    { key: 'passesJogadaOf90', label: 'Passes Jog Of/90', category: 'creation', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']), ctx.j90) },

    // ── ÚLTIMO TERÇO ──
    { key: 'acoesUltimoTerco', label: 'Ações Último Terço', category: 'attacking', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Fnt']) + ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Cr T']) },
    { key: 'ultimoTerco90', label: 'Último Terço/90', category: 'attacking', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']) + ctx.pf(r['Remates']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Cr T']), ctx.j90) },

    // ── SHOOTING GOALS ──
    { key: 'tentativasGol', label: 'Tentativas de Gol', category: 'shooting', format: 'integer', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Remates']) },
    { key: 'tentativasGol90', label: 'Tent Gol/90', category: 'shooting', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Remates']), ctx.j90) },

    // ── POSSESSION ──
    { key: 'possDesp', label: 'Posse Desperdiçada', category: 'passing', format: 'integer', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']) },
    { key: 'possDesp90', label: 'Posse Desp/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90) },
    { key: 'possPerd90', label: 'Posse Perdida/90', category: 'passing', format: 'number', displayInTable: false, lowerIsBetter: true,
      formula: (r, ctx) => ctx.pf(r['Poss Perd/90']) },

    // ── PHYSICAL ──
    { key: 'distancia', label: 'Distância', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Distância']) },
    { key: 'dist90', label: 'Dist/90', category: 'physical', format: 'number', displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90) },
    { key: 'sprints90', label: 'Sprints/90', category: 'physical', format: 'number', displayInTable: false, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Sprints/90']) },

    // ── NOTA ──
    { key: 'notaMedia', label: 'Nota Média', category: 'general', format: 'number', decimals: 2, displayInTable: true, lowerIsBetter: false,
      formula: (r, ctx) => ctx.pf(r['Classificação']) },
  ],
}
