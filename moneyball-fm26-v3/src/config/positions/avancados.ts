import type { RawPlayer } from '@/types/player.ts'
import type {
  FormulaContext,
  MetricCategory,
  MetricDefinition,
  PositionConfig,
} from './types.ts'

type MetricFormula = MetricDefinition['formula']
type MetricFormat = MetricDefinition['format']

const DEFAULT_TABLE_COLUMNS = [
  'jogosCompletos',
  'gols90',
  'npxG90',
  'pctFinNoGol',
  'pctConversaoFin',
  'xA90',
  'overUnderXG',
  'passD90',
  'fintas90',
  'desPresC90',
  'dist90',
  'notaMedia',
]

const defaultTableColumnSet = new Set(DEFAULT_TABLE_COLUMNS)

function metric(
  key: string,
  label: string,
  category: MetricCategory,
  formula: MetricFormula,
  format: MetricFormat = 'number',
  decimals = format === 'integer' ? undefined : 2,
  lowerIsBetter = false,
): MetricDefinition {
  return {
    key,
    label,
    category,
    formula,
    displayInTable: defaultTableColumnSet.has(key),
    lowerIsBetter,
    format,
    ...(decimals === undefined ? {} : { decimals }),
  }
}

function n(raw: RawPlayer, ctx: FormulaContext, column: string): number {
  return ctx.pf(raw[column])
}

function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  return denominator === 0 ? fallback : numerator / denominator
}

function percentage(numerator: number, denominator: number, fallback = 0): number {
  return denominator === 0 ? fallback : (numerator / denominator) * 100
}

function appearances(rawValue: string | undefined, ctx: FormulaContext) {
  const value = rawValue?.trim() ?? ''
  const match = value.match(/^(.+?)\s*\(\s*([^)]+)\s*\)$/)

  if (!match) {
    const total = ctx.pf(value)
    return { starts: total, substituteAppearances: 0, total }
  }

  const starts = ctx.pf(match[1])
  const substituteAppearances = ctx.pf(match[2])
  return {
    starts,
    substituteAppearances,
    total: starts + substituteAppearances,
  }
}

function goalsInsideArea(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Golos')
    - n(raw, ctx, 'Pens')
    - n(raw, ctx, 'Golos marcados de fora da área')
}

function setPieceAttempts(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Cr T') - n(raw, ctx, 'CT-JA')
}

function setPieceChances(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Cr C') - n(raw, ctx, 'CC-JA')
}

function nonPenaltyGoals(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Golos') - n(raw, ctx, 'Pens M')
}

function nonPenaltyXg(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79)
}

function pressingAttempts(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Press. tent.')
    + n(raw, ctx, 'T Desa')
    + n(raw, ctx, 'Faltas Cometidas')
}

function pressingSuccesses(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Des C') + n(raw, ctx, 'Press. conc.')
}

function offensiveAttempts(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Cab A')
    + n(raw, ctx, 'Remates')
    + n(raw, ctx, 'Fj')
    + n(raw, ctx, 'Faltas Cometidas')
    + n(raw, ctx, 'Faltas Contra')
    + n(raw, ctx, 'Fnt')
    + n(raw, ctx, 'Passes Ch')
    + n(raw, ctx, 'Pens')
    + n(raw, ctx, 'xG')
}

function offensiveSuccesses(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Rem %')
    + n(raw, ctx, 'Faltas Contra')
    + n(raw, ctx, 'Fnt')
    + n(raw, ctx, 'Passes Ch')
    + n(raw, ctx, 'Pens M')
    + n(raw, ctx, 'Golos')
    + n(raw, ctx, 'Assist.')
}

function shotGeneratingActions(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Rem %')
    + n(raw, ctx, 'xA')
    + n(raw, ctx, 'OCG')
    + n(raw, ctx, 'Passes Ch')
    + n(raw, ctx, 'Golos marcados de fora da área')
    + n(raw, ctx, 'CC-JA')
    + (n(raw, ctx, 'Golos') * 0.5)
    + (n(raw, ctx, 'Assist.') * 0.5)
}

function ballActionsAttempted(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'CT-JA')
    + n(raw, ctx, 'Remates')
    + n(raw, ctx, 'Fnt')
    + n(raw, ctx, 'Passes Ch')
}

function ballActionsCompleted(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'CC-JA')
    + n(raw, ctx, 'Rem %')
    + n(raw, ctx, 'Fnt')
    + n(raw, ctx, 'Passes Ch')
}

function finalThirdActions(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Fnt')
    + n(raw, ctx, 'Remates')
    + (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens'))
    + n(raw, ctx, 'Passes Ch')
    + pressingAttempts(raw, ctx)
    + n(raw, ctx, 'CC-JA')
}

function possessionWasted(raw: RawPlayer, ctx: FormulaContext): number {
  return (n(raw, ctx, 'Remates') - n(raw, ctx, 'Rem %'))
    + (n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'))
}

export const avancadosConfig: PositionConfig = {
  key: 'avancados',
  emoji: '🎯',
  name: 'Avançados',

  // Cabeçalhos brutos EK:GH, na ordem exata em que o FM26 os exporta.
  rawColumns: [
    'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
    'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
    'Golos', 'Assist.', 'OCG', 'Golos DS', 'Jogos DS', 'Poss Perd/90',
    'xG', 'xA', 'Faltas Cometidas', 'Faltas Contra', 'Pas A', 'Ps C',
    'Passes Ch', 'PeP', 'Fnt', 'Remates', 'Rem %', 'Cab A', 'Cabs',
    'Press. tent.', 'Press. conc.', 'T Desa', 'Des C', 'Crt',
    'CT-JA', 'CC-JA', 'Cr T', 'Cr C',
    'Golos marcados de fora da área',
    'Remates de fora da área em cada 90 minutes', 'Remates em livres',
    'Fj', 'Pens', 'Pens M', 'Sprints/90', 'Distância', 'Classificação',
  ],

  identityColumns: {
    Jogador: 'Jogador',
    Nação: 'Nação',
    Clube: 'Clube',
    Idade: 'Idade',
    Salário: 'Salário',
    Valor: 'Valor Estimado',
  },

  defaultTableColumns: DEFAULT_TABLE_COLUMNS,

  // Ordem das colunas numéricas F e L:EJ. "Média de jogos" é uma
  // agregação da coluna inteira e não pode ser calculada por jogador.
  metrics: [
    metric('altura', 'Altura', 'general', (raw, ctx) => n(raw, ctx, 'Altura') / 100),
    metric('jogosCompletos', 'Jogos completos', 'general', (_raw, ctx) => ctx.j90, 'integer'),
    metric('jogosTotais', 'Jogos Totais', 'general', (raw, ctx) => appearances(raw['Presenças'], ctx).total, 'integer'),
    metric(
      'minPartida',
      'Minutos por partida',
      'general',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), appearances(raw['Presenças'], ctx).total),
      'integer',
    ),
    metric(
      'jogosComoTitular',
      'Jogos como Titular',
      'general',
      (raw, ctx) => {
        const parsed = appearances(raw['Presenças'], ctx)
        return Math.round(percentage(parsed.starts, parsed.total))
      },
      'percentage',
    ),
    metric('golsCarreira', 'Gols na carreira', 'general', (raw, ctx) => n(raw, ctx, 'Golos DS'), 'integer'),
    metric(
      'mediaGolsCarreira',
      'Média de gols em toda a Carreira',
      'general',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos DS'), n(raw, ctx, 'Jogos DS')),
    ),
    metric('mediaGolsPart', 'Média gols / partida', 'general', (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90)),
    metric(
      'mediaGolsAstPart',
      'Média gols + ass / partida',
      'general',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'), ctx.j90),
    ),
    metric('ast90', 'Ass / 90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'Assist.'), ctx.j90)),
    metric('hdj', 'Man of the match', 'general', (raw, ctx) => n(raw, ctx, 'HdJ'), 'integer'),
    metric(
      'minHdj',
      'Minutos pra ser o homem do jogo',
      'general',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'HdJ'), 5000),
      'number',
      1,
      true,
    ),
    metric(
      'pctHdj',
      '% de vezes que foi eleito o Homem do Jogo',
      'general',
      (raw, ctx) => percentage(n(raw, ctx, 'HdJ'), ctx.j90),
      'percentage',
    ),
    metric('gols', 'Gols', 'attacking', (raw, ctx) => n(raw, ctx, 'Golos'), 'integer'),
    metric('assist', 'Assist', 'creation', (raw, ctx) => n(raw, ctx, 'Assist.'), 'integer'),
    metric('golsAst', 'Gols + Ass', 'attacking', (raw, ctx) => n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'), 'integer'),
    metric('golsDentroArea', 'Gols de dentro da área', 'shooting', goalsInsideArea, 'integer'),
    metric('golsForaArea', 'Gols de fora da área', 'shooting', (raw, ctx) => n(raw, ctx, 'Golos marcados de fora da área'), 'integer'),
    metric('golsPen', 'Gols de Penaltis', 'shooting', (raw, ctx) => n(raw, ctx, 'Pens M'), 'integer'),
    metric('golsSemPen', 'Gols Sem Pênalti', 'shooting', nonPenaltyGoals, 'integer'),
    metric(
      'pctGolsSemPen',
      '% Gols (sem penalti)',
      'shooting',
      (raw, ctx) => percentage(nonPenaltyGoals(raw, ctx), n(raw, ctx, 'Golos')),
      'percentage',
      1,
    ),
    metric(
      'pctAst',
      '% Ass',
      'creation',
      (raw, ctx) => percentage(n(raw, ctx, 'Assist.'), n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.')),
      'percentage',
      1,
    ),
    metric(
      'pctPenGols',
      '% Pênaltis',
      'shooting',
      (raw, ctx) => percentage(n(raw, ctx, 'Pens M'), n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.')),
      'percentage',
      1,
    ),
    metric('gols90', 'Gols /90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90)),
    metric('assist90Ataque', 'Assist /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'Assist.'), ctx.j90)),
    metric(
      'golsAst90',
      'Gols + Assist /90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'), ctx.j90),
    ),
    metric('golsSemPen90', 'Gols Sem Pênalti /90', 'shooting', (raw, ctx) => safeDivide(nonPenaltyGoals(raw, ctx), ctx.j90)),
    metric('golsDentroAreaResumo', 'Gols de dentro da área', 'shooting', goalsInsideArea, 'integer'),
    metric('golsDentroArea90', 'Gols de dentro da área /90', 'shooting', (raw, ctx) => safeDivide(goalsInsideArea(raw, ctx), ctx.j90)),
    metric('golsForaAreaResumo', 'Gols de fora da área', 'shooting', (raw, ctx) => n(raw, ctx, 'Golos marcados de fora da área'), 'integer'),
    metric('golsForaArea90', 'Gols de fora da área /90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Golos marcados de fora da área'), ctx.j90)),
    metric('chutesForaArea90', 'Chutes de fora da área /90', 'shooting', (raw, ctx) => n(raw, ctx, 'Remates de fora da área em cada 90 minutes')),
    metric(
      'pctConclusaoForaArea',
      '% Conclusão dos chutes de fora da área',
      'shooting',
      (raw, ctx) => percentage(
        safeDivide(n(raw, ctx, 'Golos marcados de fora da área'), ctx.j90),
        n(raw, ctx, 'Remates de fora da área em cada 90 minutes'),
      ),
      'percentage',
    ),
    metric('tentsBP', 'Tentativas de  Criar  uma chance em Bola Parada', 'setpiece', setPieceAttempts, 'integer'),
    metric('tentsBP90', 'Tentativas/90', 'setpiece', (raw, ctx) => safeDivide(setPieceAttempts(raw, ctx), ctx.j90)),
    metric('chancesBP', 'Chances Criadas em  Bolas Paradas', 'setpiece', setPieceChances, 'integer'),
    metric('chancesBP90', 'Chances C /90', 'setpiece', (raw, ctx) => safeDivide(setPieceChances(raw, ctx), ctx.j90)),
    metric('pctBP', '% Aproveitamento das Tentativas de Criar chance em  BP', 'setpiece', (raw, ctx) => percentage(setPieceChances(raw, ctx), setPieceAttempts(raw, ctx)), 'percentage'),
    metric('cobrancasFalta', 'Cobranças de falta (Diretas)', 'setpiece', (raw, ctx) => n(raw, ctx, 'Remates em livres'), 'integer'),
    metric('pensBatidos', 'Pênaltis batidos', 'shooting', (raw, ctx) => n(raw, ctx, 'Pens'), 'integer'),
    metric('pensMarcados', 'Pênaltis marcados', 'shooting', (raw, ctx) => n(raw, ctx, 'Pens M'), 'integer'),
    metric('pensPerdidos', 'Pênaltis perdidos', 'shooting', (raw, ctx) => n(raw, ctx, 'Pens') - n(raw, ctx, 'Pens M'), 'integer', undefined, true),
    metric('golsPen90', 'Gols de pen/90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Pens M'), ctx.j90)),
    metric('pctPen', '% Conversão de pênalti', 'shooting', (raw, ctx) => percentage(n(raw, ctx, 'Pens M'), n(raw, ctx, 'Pens'), 0.001), 'percentage', 1),
    metric('cabsDisp', 'Cabeceios disputados', 'aerial', (raw, ctx) => n(raw, ctx, 'Cab A'), 'integer'),
    metric('cabsG', 'Ganhos', 'aerial', (raw, ctx) => n(raw, ctx, 'Cabs'), 'integer'),
    metric('cabsDisp90', 'Cabs Disputados /90', 'aerial', (raw, ctx) => safeDivide(n(raw, ctx, 'Cab A'), ctx.j90)),
    metric('cabsG90', 'Ganhos /90', 'aerial', (raw, ctx) => safeDivide(n(raw, ctx, 'Cabs'), ctx.j90)),
    metric('cabsPerd', 'Perdidos', 'aerial', (raw, ctx) => n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'), 'integer', undefined, true),
    metric('pctCabs', '% Cabs ganhos', 'aerial', (raw, ctx) => percentage(n(raw, ctx, 'Cabs'), n(raw, ctx, 'Cab A')), 'percentage'),
    metric('pctCabsPerd', '% Cabs perdidos', 'aerial', (raw, ctx) => 100 - percentage(n(raw, ctx, 'Cabs'), n(raw, ctx, 'Cab A')), 'percentage', 2, true),
    metric('impedimentos', 'Impedimentos', 'attacking', (raw, ctx) => n(raw, ctx, 'Fj'), 'integer', undefined, true),
    metric('impedimentos90', 'Impedimentos / 90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Fj'), ctx.j90), 'number', 2, true),
    metric('finalizacoes', 'Finalizações', 'shooting', (raw, ctx) => n(raw, ctx, 'Remates'), 'integer'),
    metric('fin90', 'Finalizações /90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Remates'), ctx.j90)),
    metric('finNoGol', 'Finalizações no Gol', 'shooting', (raw, ctx) => n(raw, ctx, 'Rem %'), 'integer'),
    metric('finNoGol90', 'Finalizações no gol/90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Rem %'), ctx.j90)),
    metric('pctFinNoGol', '% Finalizações que foram no gol', 'shooting', (raw, ctx) => percentage(n(raw, ctx, 'Rem %'), n(raw, ctx, 'Remates')), 'percentage'),
    metric(
      'finParaGol',
      'Finalizações pra um gol',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'), nonPenaltyGoals(raw, ctx)),
      'number',
      2,
      true,
    ),
    metric(
      'finCertasParaGol',
      'Finalizações certas pra um gol',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens'), nonPenaltyGoals(raw, ctx)),
      'number',
      2,
      true,
    ),
    metric(
      'finOuCabParaGol',
      'Finalização ou Cabeceio pra um gol',
      'shooting',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Remates') + n(raw, ctx, 'Cab A') - n(raw, ctx, 'Pens'),
        nonPenaltyGoals(raw, ctx),
      ),
      'number',
      2,
      true,
    ),
    metric(
      'pctConversaoFin',
      'Finalizações que se converteram em gols',
      'shooting',
      (raw, ctx) => percentage(nonPenaltyGoals(raw, ctx), n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens')),
      'percentage',
    ),
    metric(
      'gpi',
      'GPI (Goal Probability Index)',
      'shooting',
      (raw, ctx) => safeDivide(nonPenaltyGoals(raw, ctx), nonPenaltyXg(raw, ctx))
        * safeDivide(nonPenaltyGoals(raw, ctx), ctx.j90),
    ),
    metric('xGPerJogo', 'xG / Jogo', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'xG'), ctx.j90)),
    metric('golsConvertidos90', 'Gols convertidos /90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90)),
    metric(
      'overUnderXG',
      'Over xG / Under xG per 90',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90) - safeDivide(n(raw, ctx, 'xG'), ctx.j90),
      'number',
      3,
    ),
    metric(
      'xGPerChute',
      'xG / chute',
      'shooting',
      (raw, ctx) => safeDivide(nonPenaltyXg(raw, ctx), n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens')),
      'number',
      4,
    ),
    metric('minParaFinalizar', 'Minutos pra tentar uma finalização', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'Remates')), 'number', 2, true),
    metric('minParaAcertar', 'Minutos pra acertar uma finalização no gol', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'Rem %')), 'number', 2, true),
    metric('minParaMarcar', 'Minutos pra MARCAR um gol', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'Golos'), ctx.j90 * 90), 'number', 2, true),
    metric('minParaParticipar', 'Minutos pra PARTICIPAR de um gol', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'), 300), 'number', 2, true),
    metric('golsNaoEsperados', 'Gols não esperados', 'shooting', (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'xG')),
    metric('golsNaoEspSemPen', 'Gols não esperados SEM PÊNALTI', 'shooting', (raw, ctx) => nonPenaltyGoals(raw, ctx) - nonPenaltyXg(raw, ctx)),
    metric('xG', 'Gols esperados (xG)', 'shooting', (raw, ctx) => n(raw, ctx, 'xG')),
    metric('xG90', 'xG /90', 'shooting', (raw, ctx) => safeDivide(n(raw, ctx, 'xG'), ctx.j90)),
    metric('npxG', 'xG (Sem pênaltis)', 'shooting', nonPenaltyXg),
    metric('npxG90', 'xG (Sem pênaltis) /90', 'shooting', (raw, ctx) => safeDivide(nonPenaltyXg(raw, ctx), ctx.j90)),
    metric('xA', 'Assistências Esperadas (xA)', 'creation', (raw, ctx) => n(raw, ctx, 'xA')),
    metric('xA90', 'xA /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'xA'), ctx.j90)),
    metric('xAxGSemPen', 'xA + xG sem pen', 'creation', (raw, ctx) => n(raw, ctx, 'xA') + nonPenaltyXg(raw, ctx)),
    metric('xAxG90', 'xA + xG /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'xA') + nonPenaltyXg(raw, ctx), ctx.j90)),
    metric('xGConclusion', 'xG Conclusion', 'shooting', (raw, ctx) => percentage(n(raw, ctx, 'Golos'), n(raw, ctx, 'Golos') + n(raw, ctx, 'xG')), 'percentage'),
    metric('passD', 'Passes Decisivos', 'creation', (raw, ctx) => n(raw, ctx, 'Passes Ch'), 'integer'),
    metric('passD90', 'Pass D /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'Passes Ch'), ctx.j90)),
    metric('xAResult', 'xA (assistências esperadas)', 'creation', (raw, ctx) => n(raw, ctx, 'xA')),
    metric('chancesDespEquipe', 'Chances criadas e não aproveitadas pela equipe / 90', 'creation', (raw, ctx) => n(raw, ctx, 'xA') - n(raw, ctx, 'Assist.')),
    metric('cruzT', 'Cruzamentos Tentados', 'creation', (raw, ctx) => n(raw, ctx, 'CT-JA'), 'integer'),
    metric('cruzT90', 'Cruzamentos T /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'CT-JA'), ctx.j90)),
    metric('cruzC', 'Cruzamentos Conseguidos', 'creation', (raw, ctx) => n(raw, ctx, 'CC-JA'), 'integer'),
    metric('cruzC90', 'Cruzamentos C/90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'CC-JA'), ctx.j90)),
    metric('pctCruz', 'Cruzamentos', 'creation', (raw, ctx) => percentage(n(raw, ctx, 'CC-JA'), n(raw, ctx, 'CT-JA')), 'percentage'),
    metric('fintas', 'Fintas', 'attacking', (raw, ctx) => n(raw, ctx, 'Fnt'), 'integer'),
    metric('fintas90', 'Fintas/90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Fnt'), ctx.j90)),
    metric('velMedia', 'Velocidade Média (em km/h)', 'physical', (raw, ctx) => safeDivide(n(raw, ctx, 'Distância') * 60, n(raw, ctx, 'Minutos')), 'number', 4),
    metric('desPresT', 'Desarme + Pressões Tentadas', 'pressing', pressingAttempts, 'integer'),
    metric('desPresT90', 'Des + Pres T /90', 'pressing', (raw, ctx) => safeDivide(pressingAttempts(raw, ctx), ctx.j90)),
    metric('desPresC', 'Desarme + Pressões Concluídas', 'pressing', pressingSuccesses, 'integer'),
    metric('desPresC90', 'Des + Pres C /90', 'pressing', (raw, ctx) => safeDivide(pressingSuccesses(raw, ctx), ctx.j90)),
    metric('pctDesPresConcl', '% Des + Pressões concluídas', 'pressing', (raw, ctx) => percentage(pressingSuccesses(raw, ctx), pressingAttempts(raw, ctx)), 'percentage'),
    metric('interceptacoes', 'Interceptações', 'defending', (raw, ctx) => n(raw, ctx, 'Crt'), 'integer'),
    metric('int90', 'Int/90', 'defending', (raw, ctx) => safeDivide(n(raw, ctx, 'Crt'), ctx.j90)),
    metric('faltasSofridas', 'Faltas Sofridas', 'attacking', (raw, ctx) => n(raw, ctx, 'Faltas Contra'), 'integer'),
    metric('faltasSof90', 'Faltas Sof/90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Faltas Contra'), ctx.j90)),
    metric('distancia', 'Distância', 'physical', (raw, ctx) => n(raw, ctx, 'Distância')),
    metric('dist90', 'Dist / 90', 'physical', (raw, ctx) => safeDivide(n(raw, ctx, 'Distância'), ctx.j90)),
    metric('sprints', 'Sprints de alta intensidade', 'physical', (raw, ctx) => n(raw, ctx, 'Sprints/90') * ctx.j90, 'integer'),
    metric('sprints90', 'Sprints de alta intensidade/90', 'physical', (raw, ctx) => n(raw, ctx, 'Sprints/90'), 'number', 1),
    metric('lancesOfT', 'Lances ofensivos tentados', 'attacking', offensiveAttempts, 'integer'),
    metric('lancesOf90', 'Lances ofensivos / 90', 'attacking', (raw, ctx) => safeDivide(offensiveAttempts(raw, ctx), ctx.j90)),
    metric('lancesOfC', 'Lances ofensivos conseguidos', 'attacking', offensiveSuccesses, 'integer'),
    metric('lancesOfC90', 'Lances ofensivos conseguidos / 90', 'attacking', (raw, ctx) => safeDivide(offensiveSuccesses(raw, ctx), ctx.j90)),
    metric('possPerd', 'Posse Perdida', 'passing', (raw, ctx) => n(raw, ctx, 'Poss Perd/90') * ctx.j90, 'integer', undefined, true),
    metric('possPerd90', 'Posse Perdida /90', 'passing', (raw, ctx) => n(raw, ctx, 'Poss Perd/90'), 'number', 2, true),
    metric('eficaciaOf', 'Eficácia ofensiva', 'attacking', (raw, ctx) => percentage(offensiveSuccesses(raw, ctx), offensiveAttempts(raw, ctx)), 'percentage'),
    metric('acoesFinalizacao', 'Ações que geraram finalizações ao gol', 'creation', shotGeneratingActions, 'integer'),
    metric('acoesFinalizacao90', 'Ações que geraram finalizações ao gol /90', 'creation', (raw, ctx) => safeDivide(shotGeneratingActions(raw, ctx), ctx.j90)),
    metric(
      'participacao90',
      'Participação do jogador a cada 90 minutos',
      'general',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Pens')
          + n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'Remates')
          + n(raw, ctx, 'Fnt')
          + n(raw, ctx, 'Pas A')
          + n(raw, ctx, 'Des C'),
        ctx.j90,
      ),
    ),
    metric('acoesBolaTent', 'Ações com Bola Tentadas', 'attacking', ballActionsAttempted, 'integer'),
    metric('acoesBolaTent90', 'Ações com Bola T/90', 'attacking', (raw, ctx) => safeDivide(ballActionsAttempted(raw, ctx), ctx.j90)),
    metric('acoesBolaSucess', 'Ações com Bola (Completadas)', 'attacking', ballActionsCompleted, 'integer'),
    metric('acoesBolaSucess90', 'Ações com Bola Comp /90', 'attacking', (raw, ctx) => safeDivide(ballActionsCompleted(raw, ctx), ctx.j90)),
    metric('pctSucessoAcoes', '% Sucesso de ações com bola', 'attacking', (raw, ctx) => percentage(ballActionsCompleted(raw, ctx), ballActionsAttempted(raw, ctx)), 'percentage'),
    metric('acoesUltimoTerco', 'Ações no último terço ', 'attacking', finalThirdActions, 'integer'),
    metric('ultimoTerco90', 'Ações no último terço / 90', 'attacking', (raw, ctx) => safeDivide(finalThirdActions(raw, ctx), ctx.j90)),
    metric(
      'tentativasGol',
      'Tentativas de marcar um gol (finalização e oportunidades criadas)',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Remates') + n(raw, ctx, 'OCG') + n(raw, ctx, 'Passes Ch'),
      'integer',
    ),
    metric(
      'tentativasGol90',
      'Tentativas de marcar um gol  /90',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Remates') + n(raw, ctx, 'OCG') + n(raw, ctx, 'Passes Ch'), ctx.j90),
    ),
    metric('possDesp', 'Posse Desperdiçada', 'passing', possessionWasted, 'integer', undefined, true),
    metric('possDesp90', 'Posse Desperdiçada /90', 'passing', (raw, ctx) => safeDivide(possessionWasted(raw, ctx), ctx.j90), 'number', 2, true),
    metric('possPerd90Resumo', 'Posse perdida /90', 'passing', (raw, ctx) => n(raw, ctx, 'Poss Perd/90'), 'number', 2, true),
    metric('notaMedia', 'Nota média', 'general', (raw, ctx) => n(raw, ctx, 'Classificação')),
  ],
}
