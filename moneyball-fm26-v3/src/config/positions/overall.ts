import type { MetricDefinition, PositionConfig } from './types.ts'

type MetricOptions = Partial<
  Pick<MetricDefinition, 'decimals' | 'displayInTable' | 'lowerIsBetter'>
>

const metric = (
  key: string,
  label: string,
  category: MetricDefinition['category'],
  format: MetricDefinition['format'],
  formula: MetricDefinition['formula'],
  options: MetricOptions = {},
): MetricDefinition => ({
  key,
  label,
  category,
  format,
  formula,
  displayInTable: false,
  lowerIsBetter: false,
  ...options,
})

const appearances = (value: string | undefined): [number, number] => {
  const match = String(value ?? '').match(/^\s*(\d+)(?:\s*\((\d+)\))?/)
  return [Number(match?.[1] ?? 0), Number(match?.[2] ?? 0)]
}

const minutesFallback = (minutes: number, divisor: number, fallback: number): number => (
  divisor === 0 ? fallback : Math.round((minutes / divisor) * 100) / 100
)

const rating = (
  value: string | undefined,
  parse: (raw: string | undefined) => number,
): number => (
  /\d/.test(String(value ?? '')) ? parse(value) : 5
)

export const overallConfig: PositionConfig = {
  key: 'overall',
  emoji: '🌎',
  name: 'Overall Análise',
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'Golos', 'Assist.', 'Golos DS', 'OCG', 'Poss Con/90', 'Poss Perd/90',
    'xG', 'xA', 'Faltas Cometidas', 'Faltas Contra', 'Pas A', 'Ps C',
    'Passes Ch', 'PeP', 'Fnt', 'Remates', 'Rem %', 'Cab A', 'Cabs',
    'Press. tent.', 'Press. conc.', 'T Desa', 'Des C', 'Crt',
    'CT-JA', 'CC-JA', 'Cr T', 'Cr C',
    'Golos marcados de fora da área', 'Remates de fora da área em cada 90 minutes',
    'Remates em livres', 'Fj', 'Blq', 'Rems Bloq', 'Alívios', 'Crt D',
    'Amr', 'Cartões vermelhos', 'EPG', 'Sprints/90',
    'Pens', 'Pens M', 'Distância', 'Classificação',
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
    'jogosCompletos', 'gols90', 'ast90', 'npxG90', 'xA90',
    'pctFinNoGol', 'desG90', 'pctCabs', 'pctPassesCertos',
    'pressaoG90', 'dist90', 'notaMedia',
  ],
  metrics: [
    // H:EC — todas as colunas calculadas da aba, na mesma ordem.
    metric('jogosCompletos', 'Jogos completos', 'general', 'number',
      (_r, ctx) => ctx.j90, { decimals: 1, displayInTable: true }),
    metric('jogosTotais', 'Jogos Totais', 'general', 'integer',
      (r) => {
        const [starts, substitute] = appearances(r['Presenças'])
        return starts + substitute
      }),
    metric('minPartida', 'Minutos por partida', 'general', 'number',
      (r, ctx) => {
        const [starts, substitute] = appearances(r['Presenças'])
        return ctx.sDiv(ctx.pf(r['Minutos']), starts + substitute)
      }, { decimals: 2 }),
    metric('jogosComoTitular', 'Jogos como Titular', 'general', 'percentage',
      (r, ctx) => {
        const [starts, substitute] = appearances(r['Presenças'])
        const total = starts + substitute
        return total === 0 ? 0 : ctx.rnd((starts / total) * 100, 0)
      }, { decimals: 0 }),
    metric('hdj', 'Man of the match', 'general', 'integer',
      (r, ctx) => ctx.pf(r['HdJ'])),
    metric('minHdj', 'Minutos pra ser o homem do jogo', 'general', 'number',
      (r, ctx) => minutesFallback(ctx.pf(r['Minutos']), ctx.pf(r['HdJ']), 5400),
      { decimals: 2, lowerIsBetter: true }),
    metric('pctHdj', '% de vezes que foi eleito o Homem do Jogo', 'general', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90), { decimals: 2 }),

    metric('gols', 'Gols', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Golos'])),
    metric('assist', 'Assistências', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Assist.'])),
    metric('golsAst', 'Gols + Assist', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.'])),
    metric('gols90', 'Gols/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('ast90', 'Assistência /90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Assist.']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('golsAst90', 'Gols + A/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90),
      { decimals: 2 }),

    metric('xG', 'xG', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['xG']), { decimals: 2 }),
    metric('npxG', 'xG sem pênalti', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, { decimals: 2 }),
    metric('npxG90', 'non Pen xG/90', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('xA', 'Assistências Esperadas xA', 'creation', 'number',
      (r, ctx) => ctx.pf(r['xA']), { decimals: 2 }),
    metric('xA90', 'xA /90', 'creation', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('xGxA', 'xG + xA', 'shooting', 'number',
      (r, ctx) => (
        ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 + ctx.pf(r['xA'])
      ), { decimals: 2 }),
    metric('xGxA90', 'xG + xA /90', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79 + ctx.pf(r['xA']),
        ctx.j90,
      ), { decimals: 2 }),

    metric('finalizacoes', 'Finalizações (Total)', 'shooting', 'integer',
      (r, ctx) => ctx.pf(r['Remates'])),
    metric('fin90', 'Finalizações /90', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']), ctx.j90), { decimals: 2 }),
    metric('finNoGol', 'Finalizações no gol', 'shooting', 'integer',
      (r, ctx) => ctx.pf(r['Rem %'])),
    metric('finNoGol90', 'Finalizações no gol /90', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Rem %']), ctx.j90), { decimals: 2 }),
    metric('pctFinNoGol', '% Finalizações em direção ao gol', 'shooting', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Rem %']), ctx.pf(r['Remates'])),
      { decimals: 2, displayInTable: true }),
    metric('finPorGol', 'Finalizações pra marcar um gol', 'shooting', 'number',
      (r, ctx) => minutesFallback(
        ctx.pf(r['Remates']) - ctx.pf(r['Pens']),
        ctx.pf(r['Golos']) - ctx.pf(r['Pens M']),
        50,
      ), { decimals: 2, lowerIsBetter: true }),
    metric('finNoGolPorGol', 'Finalizações no gol pra marcar um gol', 'shooting', 'number',
      (r, ctx) => minutesFallback(
        ctx.pf(r['Rem %']) - ctx.pf(r['Pens']),
        ctx.pf(r['Golos']) - ctx.pf(r['Pens M']),
        50,
      ), { decimals: 2, lowerIsBetter: true }),
    metric('conversaoGols', '% Finalizações que converteram em gol', 'shooting', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Golos']) - ctx.pf(r['Pens M']),
        ctx.pf(r['Remates']) - ctx.pf(r['Pens']),
      ), { decimals: 2 }),
    metric('minPorFinalizacao', 'Minutos pra tentar uma finalização', 'shooting', 'number',
      (r, ctx) => minutesFallback(ctx.pf(r['Minutos']), ctx.pf(r['Remates']), 700),
      { decimals: 2, lowerIsBetter: true }),
    metric('minPorFinNoGol', 'Minutos pra acertar um remate no gol', 'shooting', 'number',
      (r, ctx) => minutesFallback(ctx.pf(r['Minutos']), ctx.pf(r['Rem %']), 700),
      { decimals: 2, lowerIsBetter: true }),
    metric('minPorGol', 'Minutos pra MARCAR um gol', 'shooting', 'number',
      (r, ctx) => {
        const minutes = ctx.pf(r['Minutos'])
        return minutesFallback(minutes, ctx.pf(r['Golos']), minutes)
      }, { decimals: 2, lowerIsBetter: true }),
    metric('minPorParticipacaoGol', 'Minutos pra PARTICIPAR de um gol', 'attacking', 'number',
      (r, ctx) => {
        const minutes = ctx.pf(r['Minutos'])
        return minutesFallback(
          minutes,
          ctx.pf(r['Golos']) + ctx.pf(r['Assist.']),
          minutes,
        )
      }, { decimals: 2, lowerIsBetter: true }),
    metric('golsNaoEsperados', 'Gols não esperados', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['Golos']) - ctx.pf(r['xG']), { decimals: 2 }),
    metric('golsNaoEspSemPen', 'Gols não esperados SEM PÊNALTI', 'shooting', 'number',
      (r, ctx) => (
        ctx.pf(r['Golos']) - ctx.pf(r['Pens M'])
        - (ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79)
      ), { decimals: 2 }),

    metric('foraJogo', 'Fora de jogo', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Fj']), { lowerIsBetter: true }),
    metric('foraJogo90', 'Fora de jogo/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Fj']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),

    metric('cabsDisp', 'Cabeceios Disputados', 'aerial', 'integer',
      (r, ctx) => ctx.pf(r['Cab A'])),
    metric('cabsG', 'Cabeceios Ganhos', 'aerial', 'integer',
      (r, ctx) => ctx.pf(r['Cabs'])),
    metric('cabsPerd', 'Cabeceios Perdidos', 'aerial', 'integer',
      (r, ctx) => ctx.pf(r['Cab A']) - ctx.pf(r['Cabs']), { lowerIsBetter: true }),
    metric('cabsG90', 'Cabeceios Ganhos/90', 'aerial', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90), { decimals: 2 }),
    metric('pctCabs', '% Cabs', 'aerial', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Cabs']), ctx.pf(r['Cab A'])),
      { decimals: 2, displayInTable: true }),

    metric('desT', 'Desarmes Tentados', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas'])),
    metric('desG', 'Desarmes Ganhos', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Des C'])),
    metric('driblesS', 'Dribles Sofridos', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['T Desa']) - ctx.pf(r['Des C']),
      { lowerIsBetter: true }),
    metric('desG90', 'Des Ganhos/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('driblesS90', 'Dribles Sofridos/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) - ctx.pf(r['Des C']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('pctDes', '%Des Ganhos', 'defending', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Des C']),
        ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']),
      ), { decimals: 2 }),

    metric('faltasComet', 'Faltas cometidas', 'discipline', 'integer',
      (r, ctx) => ctx.pf(r['Faltas Cometidas']), { lowerIsBetter: true }),
    metric('faltas90', 'Faltas/90', 'discipline', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('amarelos', 'Cartões Amarelos', 'discipline', 'integer',
      (r, ctx) => ctx.pf(r['Amr']), { lowerIsBetter: true }),
    metric('amarelos90', 'Cartão Amarelo/90', 'discipline', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Amr']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('vermelhos', 'Cartão Vermelho', 'discipline', 'integer',
      (r, ctx) => ctx.pf(r['Cartões vermelhos']), { lowerIsBetter: true }),
    metric('vermelhos90', 'Cartão Vermelho/90', 'discipline', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Cartões vermelhos']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('totalCartoes', 'Cartões Recebidos no Total', 'discipline', 'integer',
      (r, ctx) => ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']),
      { lowerIsBetter: true }),
    metric('cartoesPorFalta', '% Cartões por falta cometida', 'discipline', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']),
        ctx.pf(r['Faltas Cometidas']),
      ), { decimals: 2, lowerIsBetter: true }),

    metric('saldoPosse', 'Proporção de posse Ganha - Perdida', 'pressing', 'number',
      (r, ctx) => ctx.pf(r['Poss Con/90']) - ctx.pf(r['Poss Perd/90']),
      { decimals: 2 }),
    metric('pressaoT', 'Movimentos de pressão Tentados', 'pressing', 'integer',
      (r, ctx) => ctx.pf(r['Press. tent.'])),
    metric('pressaoG', 'Movimentos de pressão Concretizados', 'pressing', 'integer',
      (r, ctx) => ctx.pf(r['Press. conc.'])),
    metric('pctPressao', '% Pressão pra roubar a bola com sucesso', 'pressing', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])),
      { decimals: 2 }),

    metric('lancesDisputados', 'Lances disputados', 'defending', 'integer',
      (r, ctx) => (
        ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Press. tent.'])
      )),
    metric('lancesDisputados90', 'Lances disputados/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Press. tent.']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('lancesGanhos', 'Lances ganhos', 'defending', 'number',
      (r, ctx) => (
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Press. conc.'])
      )),
    metric('lancesGanhos90', 'Lances ganhos/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Press. conc.']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('pctLancesGanhos', '% Lances disputados e ganhos de forma limpa', 'defending', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Press. conc.']),
        ctx.pf(r['Cab A']) + ctx.pf(r['T Desa']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Faltas Cometidas']) + ctx.pf(r['Press. tent.']),
      ), { decimals: 2 }),

    metric('bolasInt', 'Bolas Interceptadas', 'defending', 'number',
      (r, ctx) => (
        ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Crt D']) + ctx.pf(r['Alívios'])
      )),
    metric('bolasInt90', 'Bolas Int / 90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Crt D']) + ctx.pf(r['Alívios']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('bolasRoubadas', 'Bolas roubadas', 'defending', 'number',
      (r, ctx) => (
        ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']) * 1.5
      )),
    metric('bolasRoubadas90', 'Bolas roubadas / 90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Press. conc.']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D']) * 1.5,
        ctx.j90,
      ), { decimals: 2 }),

    metric('tentsBP', 'Tentativas de  Criar  uma chance em Bola Parada', 'setpiece', 'integer',
      (r, ctx) => ctx.pf(r['Cr T']) - ctx.pf(r['CT-JA'])),
    metric('tentsBP90', 'Tentativas/90', 'setpiece', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Cr T']) - ctx.pf(r['CT-JA']), ctx.j90),
      { decimals: 2 }),
    metric('chancesBP', 'Chances Criadas em Bola Parada', 'setpiece', 'integer',
      (r, ctx) => ctx.pf(r['Cr C']) - ctx.pf(r['CC-JA'])),
    metric('chancesBP90', 'Chances C /90', 'setpiece', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Cr C']) - ctx.pf(r['CC-JA']), ctx.j90),
      { decimals: 2 }),
    metric('pctBP', '% Aproveitamento das Tentativas de Criar chance em  BP', 'setpiece', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Cr C']) - ctx.pf(r['CC-JA']),
        ctx.pf(r['Cr T']) - ctx.pf(r['CT-JA']),
      ), { decimals: 2 }),

    metric('pensBatidos', 'Pênaltis batidos', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Pens'])),
    metric('pensMarcados', 'Pênaltis marcados', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Pens M'])),
    metric('pensPerdidos', 'Pênaltis perdidos', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']),
      { lowerIsBetter: true }),
    metric('pctPen', '% Conversão de pênalti', 'attacking', 'percentage',
      (r, ctx) => (
        ctx.pf(r['Pens']) === 0
          ? 0.00000001
          : ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Pens']))
      ), { decimals: 8 }),

    metric('lancesOfT', 'Lances ofensivos Tentados', 'attacking', 'number',
      (r, ctx) => (
        ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
      )),
    metric('lancesOf90', 'Lances ofensivos tentados/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90,
        ctx.j90,
      ), { decimals: 2 }),
    metric('lancesOfC', 'Lances OF conseguidos', 'attacking', 'number',
      (r, ctx) => (
        ctx.pf(r['Cr C']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Rem %']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
      )),
    metric('lancesOfC90', 'Lances OF conseguidos/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr C']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Rem %']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('pctLancesOf', '% Lances ofensivos conseguidos', 'attacking', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Cr C']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Rem %']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch']),
        ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90,
      ), { decimals: 2 }),

    metric('lancesDefT', 'Lances defensivos Tentados', 'defending', 'number',
      (r, ctx) => (
        ctx.pf(r['EPG']) * 3 + ctx.pf(r['Cab A']) + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas'])
      )),
    metric('lancesDefT90', 'Lances defensivos tentados/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['EPG']) * 3 + ctx.pf(r['Cab A']) + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('lancesDefC', 'Lances DEF conseguidos', 'defending', 'number',
      (r, ctx) => (
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt D'])
      )),
    metric('lancesDefC90', 'Lances DEF conseguidos/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt D']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('pctLancesDef', '% Lances defensivos conseguidos', 'defending', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt D']),
        ctx.pf(r['EPG']) * 3 + ctx.pf(r['Cab A']) + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas']),
      ), { decimals: 2 }),

    metric('lancesTotais', 'Lances Tentados (Ataque e Defesa)', 'general', 'number',
      (r, ctx) => (
        ctx.pf(r['EPG']) * 3 + ctx.pf(r['Cab A']) + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas'])
        + ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
        + ctx.pf(r['Pas A'])
      )),
    metric('lancesConseguidosGlobal', 'Lances Conseguidos (ATA e DEF)', 'general', 'number',
      (r, ctx) => (
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt D']) + ctx.pf(r['Cr C']) + ctx.pf(r['Fnt'])
        + ctx.pf(r['Fj']) + ctx.pf(r['Rem %']) + ctx.pf(r['OCG'])
        + ctx.pf(r['Passes Ch']) + ctx.pf(r['Ps C'])
      )),
    metric('pctAcertoGlobal', '% Acertos Global', 'general', 'percentage',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Cabs']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt D']) + ctx.pf(r['Cr C']) + ctx.pf(r['Fnt'])
        + ctx.pf(r['Fj']) + ctx.pf(r['Rem %']) + ctx.pf(r['OCG'])
        + ctx.pf(r['Passes Ch']) + ctx.pf(r['Ps C']),
        ctx.pf(r['EPG']) * 3 + ctx.pf(r['Cab A']) + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Alívios']) + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq']) + ctx.pf(r['Faltas Cometidas'])
        + ctx.pf(r['Cr T']) + ctx.pf(r['Fnt']) + ctx.pf(r['Fj'])
        + ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
        + ctx.pf(r['Pas A']),
      ), { decimals: 2 }),

    metric('fintas', 'Fintas', 'attacking', 'integer',
      (r, ctx) => ctx.pf(r['Fnt'])),
    metric('fintas90', 'Fintas/90', 'attacking', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90), { decimals: 2 }),
    metric('jogadasCriacao', 'Jogadas de Criação', 'creation', 'number',
      (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Cr C'])),
    metric('jogadasCriacao90', 'Criação/90', 'creation', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']) + ctx.pf(r['Cr C']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('tentativasGol', 'Tentativas de marcar um gol', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])),
    metric('tentativasGol90', 'Tentativas de marcar um gol/90', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Remates']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('rematesForaTotal', 'Tentativas totais de remate de fora da área', 'shooting', 'number',
      (r, ctx) => (
        ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
      )),
    metric('rematesFora90', 'Tentativas de Remates de fora da área /90', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['Remates de fora da área em cada 90 minutes']),
      { decimals: 2 }),

    metric('participacoes', 'Participações do jogador', 'general', 'number',
      (r, ctx) => (
        ctx.pf(r['Cr T']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Cab A'])
        + ctx.pf(r['Fnt']) + ctx.pf(r['Remates']) + ctx.pf(r['Pens'])
        + ctx.pf(r['Remates em livres']) + ctx.pf(r['Pas A'])
      )),
    metric('participacoes90', 'Participações do jogador /90', 'general', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr T']) + ctx.pf(r['Des C']) + ctx.pf(r['Crt D'])
        + ctx.pf(r['Crt']) + ctx.pf(r['Press. conc.']) + ctx.pf(r['Cab A'])
        + ctx.pf(r['Fnt']) + ctx.pf(r['Remates']) + ctx.pf(r['Pens'])
        + ctx.pf(r['Remates em livres']) + ctx.pf(r['Pas A']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('acoesUltimoTerco', 'Ações no último terço', 'attacking', 'number',
      (r, ctx) => (
        ctx.pf(r['Golos']) * 1.5 + ctx.pf(r['Assist.']) * 1.5
        + ctx.pf(r['Fnt']) + ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Rem %'])
      )),
    metric('acoesGeraramFin', 'Ações que geraram finalizações ao gol', 'creation', 'number',
      (r, ctx) => (
        ctx.pf(r['Rem %']) + ctx.pf(r['xA']) + ctx.pf(r['OCG'])
        + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
        + ctx.pf(r['Golos']) * 0.5 + ctx.pf(r['Assist.']) * 0.5
      )),
    metric('acoesGeraramFin90', 'Ações que geraram finalizações ao gol /90', 'creation', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Rem %']) + ctx.pf(r['xA']) + ctx.pf(r['OCG'])
        + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['Remates de fora da área em cada 90 minutes']) * ctx.j90
        + ctx.pf(r['Golos']) * 0.5 + ctx.pf(r['Assist.']) * 0.5,
        ctx.j90,
      ), { decimals: 2 }),

    metric('passD', 'Passes Decisivos', 'creation', 'integer',
      (r, ctx) => ctx.pf(r['Passes Ch'])),
    metric('passD90', 'Pass D /90', 'creation', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90), { decimals: 2 }),
    metric('passDecParaAst', 'Passes Decisivos pra uma assistência', 'creation', 'number',
      (r, ctx) => minutesFallback(
        ctx.pf(r['Passes Ch']),
        ctx.pf(r['Assist.']),
        70,
      ), { decimals: 2, lowerIsBetter: true }),
    metric('passDecConvertidos', 'Pass Decisivos que se converteram em assistências', 'creation', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Assist.']), ctx.pf(r['Passes Ch'])),
      { decimals: 2 }),
    metric('chancesDespEquipe', 'Assistências Claras que a Equipe desperdiçou', 'creation', 'number',
      (r, ctx) => ctx.pf(r['xA']) - ctx.pf(r['Assist.']), { decimals: 2 }),
    metric('xAResult', 'xA / Passe Decisivo', 'creation', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.pf(r['Passes Ch'])),
      { decimals: 2 }),
    metric('acoesComBola', 'Ações com Bola', 'passing', 'number',
      (r, ctx) => (
        ctx.pf(r['Cr T']) + ctx.pf(r['Remates']) + ctx.pf(r['Fnt'])
        + ctx.pf(r['Passes Ch'])
      )),
    metric('acoesComBola90', 'Ações com Bola/90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr T']) + ctx.pf(r['Remates']) + ctx.pf(r['Fnt'])
        + ctx.pf(r['Passes Ch']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('minPorPassD', 'Minutos pra fazer um Passe Decisivo', 'creation', 'number',
      (r, ctx) => minutesFallback(ctx.pf(r['Minutos']), ctx.pf(r['Passes Ch']), 700),
      { decimals: 2, lowerIsBetter: true }),
    metric('minPorChancePerigosa', 'Minutos pra criar uma chance perigosa', 'creation', 'number',
      () => 700, { decimals: 2, lowerIsBetter: true }),

    metric('passesT90', 'Passes Tentados /90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']), ctx.j90), { decimals: 2 }),
    metric('passesC90', 'Passes Completados /90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Ps C']), ctx.j90), { decimals: 2 }),
    metric('pctPassesCertos', '% Passes', 'passing', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])),
      { decimals: 2, displayInTable: true }),

    metric('distancia', 'Distância percorrida', 'physical', 'number',
      (r, ctx) => ctx.pf(r['Distância']), { decimals: 2 }),
    metric('dist90', 'Distância percorrida/90', 'physical', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('velocidadeMedia', 'Velocidade Média (em km/h)', 'physical', 'number',
      (r, ctx) => (
        ctx.pf(r['Minutos']) === 0
          ? 0
          : ctx.pf(r['Distância']) * 60 / ctx.pf(r['Minutos'])
      ), { decimals: 3 }),
    metric('sprintsTotal', 'Sprints de alta intensidade', 'physical', 'number',
      (r, ctx) => ctx.pf(r['Sprints/90']) * ctx.j90, { decimals: 2 }),
    metric('sprints90', 'Sprints/90', 'physical', 'number',
      (r, ctx) => ctx.pf(r['Sprints/90']), { decimals: 2 }),

    metric('possDesp', 'Posse Desperdiçada', 'passing', 'number',
      (r, ctx) => (
        ctx.pf(r['Cr T']) - ctx.pf(r['Cr C'])
        + ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])
        + ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])
        + ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])
      ), { lowerIsBetter: true }),
    metric('possDesp90', 'Posse Desperdiçada /90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr T']) - ctx.pf(r['Cr C'])
        + ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])
        + ctx.pf(r['Remates']) - ctx.pf(r['Rem %'])
        + ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']),
        ctx.j90,
      ), { decimals: 2, lowerIsBetter: true }),
    metric('possPerd90', 'Posse Perdida/90', 'passing', 'number',
      (r, ctx) => ctx.pf(r['Poss Perd/90']),
      { decimals: 2, lowerIsBetter: true }),
    metric('pontuacaoRecebida', 'Pontuação recebida', 'general', 'number',
      (r, ctx) => rating(r['Classificação'], ctx.pf) * ctx.j90, { decimals: 2 }),
    metric('notaMedia', 'Nota média', 'general', 'number',
      (r, ctx) => rating(r['Classificação'], ctx.pf),
      { decimals: 2, displayInTable: true }),

    // Métricas canônicas já expostas pelo site e mantidas por compatibilidade.
    metric('cruzT', 'Cruzamentos Tentados (raw)', 'creation', 'integer',
      (r, ctx) => ctx.pf(r['Cr T'])),
    metric('cruzC', 'Cruzamentos Certos (raw)', 'creation', 'integer',
      (r, ctx) => ctx.pf(r['Cr C'])),
    metric('pctCruz', '% Cruzamentos (raw)', 'creation', 'percentage',
      (r, ctx) => ctx.pct(ctx.pf(r['Cr C']), ctx.pf(r['Cr T'])), { decimals: 2 }),
    metric('cabsDisp90', 'Cabeceios Disputados/90', 'aerial', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90), { decimals: 2 }),
    metric('interceptacoes', 'Interceptações (raw)', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Crt'])),
    metric('int90', 'Interceptações/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Crt']), ctx.j90), { decimals: 2 }),
    metric('bloqueios', 'Bloqueios (raw)', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Blq'])),
    metric('bloq90', 'Bloqueios/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Blq']), ctx.j90), { decimals: 2 }),
    metric('remsBloq', 'Remates Bloqueados (raw)', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Rems Bloq'])),
    metric('remsBloq90', 'Remates Bloqueados/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Rems Bloq']), ctx.j90), { decimals: 2 }),
    metric('alivios', 'Alívios (raw)', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Alívios'])),
    metric('alivios90', 'Alívios/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Alívios']), ctx.j90), { decimals: 2 }),
    metric('crtD', 'Cortes Decisivos (raw)', 'defending', 'integer',
      (r, ctx) => ctx.pf(r['Crt D'])),
    metric('crtD90', 'Cortes Decisivos/90', 'defending', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Crt D']), ctx.j90), { decimals: 2 }),
    metric('pressaoT90', 'Pressão Tentada/90', 'pressing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90), { decimals: 2 }),
    metric('pressaoG90', 'Pressão Concretizada/90', 'pressing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90),
      { decimals: 2, displayInTable: true }),
    metric('possGanha90', 'Posse Ganha/90 (raw)', 'pressing', 'number',
      (r, ctx) => ctx.pf(r['Poss Con/90']), { decimals: 2 }),
    metric('passesT', 'Passes Tentados (raw)', 'passing', 'integer',
      (r, ctx) => ctx.pf(r['Pas A'])),
    metric('passesC', 'Passes Completados (raw)', 'passing', 'integer',
      (r, ctx) => ctx.pf(r['Ps C'])),
    metric('passesErr', 'Passes Errados', 'passing', 'integer',
      (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), { lowerIsBetter: true }),
    metric('passesErr90', 'Passes Errados/90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('passesProgr', 'Passes Progressivos (raw)', 'passing', 'integer',
      (r, ctx) => ctx.pf(r['PeP'])),
    metric('passesProgr90', 'Passes Progressivos/90', 'passing', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['PeP']), ctx.j90), { decimals: 2 }),
    metric('errosGol', 'Erros que geraram gol', 'discipline', 'integer',
      (r, ctx) => ctx.pf(r['EPG']), { lowerIsBetter: true }),
    metric('erros90', 'Erros que geraram gol/90', 'discipline', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['EPG']), ctx.j90),
      { decimals: 2, lowerIsBetter: true }),
    metric('desT90', 'Desarmes Tentados/90 (canônico)', 'defending', 'number',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']),
        ctx.j90,
      ), { decimals: 2 }),
    metric('acoesFinalizacao', 'Ações de Finalização (canônico)', 'shooting', 'number',
      (r, ctx) => ctx.pf(r['Remates']) + ctx.pf(r['Cabs'])),
    metric('acoesFinalizacao90', 'Ações de Finalização/90 (canônico)', 'shooting', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Remates']) + ctx.pf(r['Cabs']), ctx.j90),
      { decimals: 2 }),
    metric('chancesCriadas', 'Chances Criadas (canônico)', 'creation', 'number',
      (r, ctx) => ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG'])),
    metric('chances90', 'Chances Criadas/90 (canônico)', 'creation', 'number',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']) + ctx.pf(r['OCG']), ctx.j90),
      { decimals: 2 }),
  ],
}
