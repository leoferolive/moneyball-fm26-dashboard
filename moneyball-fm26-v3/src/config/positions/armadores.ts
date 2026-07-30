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
  'xA90',
  'npxG90',
  'gols90',
  'ast90',
  'passD90',
  'fintas90',
  'pctPassesCertos',
  'chancesPerigo90',
  'pctFinNoGol',
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

function setPieceAttempts(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Cr T') - n(raw, ctx, 'CT-JA')
}

function setPieceChances(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Cr C') - n(raw, ctx, 'CC-JA')
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

function shotGeneratingActions(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Rem %')
    + n(raw, ctx, 'xA')
    + (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens'))
    + n(raw, ctx, 'Passes Ch')
    + n(raw, ctx, 'Golos marcados de fora da área')
    + n(raw, ctx, 'CC-JA')
    + (n(raw, ctx, 'Golos') * 0.5)
    + (n(raw, ctx, 'Assist.') * 0.5)
}

function dangerChances(raw: RawPlayer, ctx: FormulaContext): number {
  return n(raw, ctx, 'Passes Ch')
    + (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens'))
    + n(raw, ctx, 'xA')
    + (n(raw, ctx, 'Golos') * 0.75)
    + (n(raw, ctx, 'Assist.') * 0.75)
    + n(raw, ctx, 'Rem %')
    + n(raw, ctx, 'CC-JA')
}

function possessionWasted(raw: RawPlayer, ctx: FormulaContext): number {
  return (n(raw, ctx, 'Remates') - n(raw, ctx, 'Rem %'))
    + (n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'))
    + (n(raw, ctx, 'CT-JA') - n(raw, ctx, 'CC-JA'))
}

export const armadoresConfig: PositionConfig = {
  key: 'armadores',
  emoji: '⚙️',
  name: 'Armadores',

  // Cabeçalhos brutos DF:EU, na ordem exata em que o FM26 os exporta.
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
    Jogador: 'Jogador',
    Nação: 'Nação',
    Clube: 'Clube',
    Idade: 'Idade',
    Salário: 'Salário',
    Valor: 'Valor Estimado',
  },

  defaultTableColumns: DEFAULT_TABLE_COLUMNS,

  // Ordem das colunas numéricas F e L:DE. "Média de jogos" é uma
  // agregação da coluna inteira e, por isso, não é uma métrica por jogador.
  metrics: [
    metric('altura', 'Altura', 'general', (raw, ctx) => n(raw, ctx, 'Altura') / 100),
    metric('jogosCompletos', 'Jogos completos', 'general', (_raw, ctx) => ctx.j90, 'integer'),
    metric(
      'jogosTotais',
      'Jogos Totais',
      'general',
      (raw, ctx) => appearances(raw['Presenças'], ctx).total,
      'integer',
    ),
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
    metric('gols', 'Gols', 'attacking', (raw, ctx) => n(raw, ctx, 'Golos'), 'integer'),
    metric('assist', 'Assist', 'creation', (raw, ctx) => n(raw, ctx, 'Assist.'), 'integer'),
    metric(
      'golsAst',
      'Gols + Ass',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'),
      'integer',
    ),
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
    metric('tentsBP', 'Tentativas de  Criar  uma chance em Bola Parada', 'setpiece', setPieceAttempts, 'integer'),
    metric('tentsBP90', 'Tentativas/90', 'setpiece', (raw, ctx) => safeDivide(setPieceAttempts(raw, ctx), ctx.j90)),
    metric('chancesBP', 'Chances Criadas em  Bolas Paradas', 'setpiece', setPieceChances, 'integer'),
    metric('chancesBP90', 'Chances C /90', 'setpiece', (raw, ctx) => safeDivide(setPieceChances(raw, ctx), ctx.j90)),
    metric(
      'pctBP',
      '% Aproveitamento das Tentativas de Criar chance em  BP',
      'setpiece',
      (raw, ctx) => percentage(setPieceChances(raw, ctx), setPieceAttempts(raw, ctx)),
      'percentage',
    ),
    metric('cobrancasFalta', 'Cobranças de falta (Diretas)', 'setpiece', (raw, ctx) => n(raw, ctx, 'Remates em livres'), 'integer'),
    metric('pensBatidos', 'Pênaltis batidos', 'attacking', (raw, ctx) => n(raw, ctx, 'Pens'), 'integer'),
    metric('pensMarcados', 'Pênaltis marcados', 'attacking', (raw, ctx) => n(raw, ctx, 'Pens M'), 'integer'),
    metric(
      'pensPerdidos',
      'Pênaltis perdidos',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Pens') - n(raw, ctx, 'Pens M'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'pctPen',
      '% Conversão de pênalti',
      'attacking',
      (raw, ctx) => percentage(n(raw, ctx, 'Pens M'), n(raw, ctx, 'Pens'), 0.00001),
      'percentage',
    ),
    metric('golsAtaque', 'Gols', 'attacking', (raw, ctx) => n(raw, ctx, 'Golos'), 'integer'),
    metric('assistAtaque', 'Assistências', 'creation', (raw, ctx) => n(raw, ctx, 'Assist.'), 'integer'),
    metric(
      'golsAstAtaque',
      'Gols + Ass',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'),
      'integer',
    ),
    metric(
      'golsSemPen',
      'Gols sem pênalti',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'Pens M'),
      'integer',
    ),
    metric('golsForaArea', 'Gols de fora da área', 'shooting', (raw, ctx) => n(raw, ctx, 'Golos marcados de fora da área'), 'integer'),
    metric('gols90', 'Gols/90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90)),
    metric('ast90', 'Ast/90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'Assist.'), ctx.j90)),
    metric(
      'golsAst90',
      'Gols+ Assist / 90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'), ctx.j90),
    ),
    metric('fintas', 'Fintas', 'attacking', (raw, ctx) => n(raw, ctx, 'Fnt'), 'integer'),
    metric('fintas90', 'Fintas /90', 'attacking', (raw, ctx) => safeDivide(n(raw, ctx, 'Fnt'), ctx.j90)),
    metric('xG', 'xG', 'attacking', (raw, ctx) => n(raw, ctx, 'xG')),
    metric(
      'npxG',
      'xG sem pênaltis',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79),
    ),
    metric(
      'npxG90',
      'non Pen xG /90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79), ctx.j90),
    ),
    metric('xA', 'Assistências Esperadas xA', 'creation', (raw, ctx) => n(raw, ctx, 'xA')),
    metric('xA90', 'xA /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'xA'), ctx.j90)),
    metric(
      'xAxG',
      'xG + xA',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79) + n(raw, ctx, 'xA'),
    ),
    metric(
      'xAxG90',
      'xG + xA /90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79) + n(raw, ctx, 'xA'),
        ctx.j90,
      ),
    ),
    metric(
      'xAConclusion',
      'xA Conclusion',
      'creation',
      (raw, ctx) => percentage(n(raw, ctx, 'xA'), n(raw, ctx, 'xA') + n(raw, ctx, 'Assist.')),
      'percentage',
    ),
    metric(
      'xGConclusion',
      'xG Conclusion',
      'shooting',
      (raw, ctx) => percentage(n(raw, ctx, 'Golos'), n(raw, ctx, 'Golos') + n(raw, ctx, 'xG')),
      'percentage',
    ),
    metric('cruzT', 'Cruzamentos Tentados', 'creation', (raw, ctx) => n(raw, ctx, 'CT-JA'), 'integer'),
    metric('cruzC', 'Cruzamentos com sucesso', 'creation', (raw, ctx) => n(raw, ctx, 'CC-JA'), 'integer'),
    metric(
      'pctCruz',
      '% Cruzamentos certos',
      'creation',
      (raw, ctx) => percentage(n(raw, ctx, 'CC-JA'), n(raw, ctx, 'CT-JA')),
      'percentage',
    ),
    metric('passesT', 'Passes tentados', 'passing', (raw, ctx) => n(raw, ctx, 'Pas A'), 'integer'),
    metric('passesC', 'Passes completados', 'passing', (raw, ctx) => n(raw, ctx, 'Ps C'), 'integer'),
    metric('passesT90', 'Passes Tentados / 90', 'passing', (raw, ctx) => safeDivide(n(raw, ctx, 'Pas A'), ctx.j90), 'number', 1),
    metric('passesC90', 'Passes Completados / 90', 'passing', (raw, ctx) => safeDivide(n(raw, ctx, 'Ps C'), ctx.j90), 'number', 1),
    metric(
      'passesErr90',
      'Média de passes errados / 90',
      'passing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'), ctx.j90),
      'number',
      1,
      true,
    ),
    metric(
      'pctPassesCertos',
      '% passes certos',
      'passing',
      (raw, ctx) => percentage(n(raw, ctx, 'Ps C'), n(raw, ctx, 'Pas A')),
      'percentage',
      1,
    ),
    metric(
      'passesErr',
      'Passes errados',
      'passing',
      (raw, ctx) => n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'pctPassesErr',
      '%Passes errados',
      'passing',
      (raw, ctx) => 100 - percentage(n(raw, ctx, 'Ps C'), n(raw, ctx, 'Pas A')),
      'percentage',
      2,
      true,
    ),
    metric('passD', 'Passes Decisivos (Total)', 'creation', (raw, ctx) => n(raw, ctx, 'Passes Ch'), 'integer'),
    metric('passD90', 'Passes Decisivos /90', 'creation', (raw, ctx) => safeDivide(n(raw, ctx, 'Passes Ch'), ctx.j90)),
    metric(
      'passDecParaAst',
      'Passes Decisivos pra uma assistência',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Passes Ch'), n(raw, ctx, 'Assist.'), 25),
      'number',
      2,
      true,
    ),
    metric(
      'pctPassDecAst',
      'Pass Decisivos que se converteram em assistências',
      'creation',
      (raw, ctx) => percentage(n(raw, ctx, 'Assist.'), n(raw, ctx, 'Passes Ch')),
      'percentage',
    ),
    metric(
      'astDespEquipe',
      'Assistências Claras que a Equipe desperdiçou',
      'creation',
      (raw, ctx) => n(raw, ctx, 'xA') - n(raw, ctx, 'Assist.'),
    ),
    metric(
      'xAPerPassD',
      'xA / Passe Decisivo',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'xA'), n(raw, ctx, 'Passes Ch')),
    ),
    metric(
      'minParaPassD',
      'Minutos pra fazer um Passe Decisivo',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'Passes Ch')),
      'number',
      1,
      true,
    ),
    metric(
      'minParaChancePerigo',
      'Minutos pra criar uma chance perigosa',
      'creation',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Minutos'),
        (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens')) + n(raw, ctx, 'Rem %') + n(raw, ctx, 'Passes Ch'),
      ),
      'number',
      2,
      true,
    ),
    metric(
      'golsNaoEsperados',
      'Gols não esperados',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'xG'),
    ),
    metric(
      'npxGClean',
      'nPen xG (xG=0,79)',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens M') * 0.79),
    ),
    metric(
      'finalizacoes',
      'Finalizações',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      'integer',
    ),
    metric(
      'fin90',
      'Finalizações /90',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'), ctx.j90),
    ),
    metric(
      'finNoGol90',
      'Finalizações no gol/90',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens M'), ctx.j90),
    ),
    metric(
      'pctFinNoGol',
      '% Finalizações que foram no gol',
      'shooting',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens M'),
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      ),
      'percentage',
    ),
    metric(
      'finParaGol',
      'Finalizações pra um gol',
      'shooting',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
        n(raw, ctx, 'Golos') - n(raw, ctx, 'Pens M'),
        50,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'finCertasParaGol',
      'Finalizações certas pra um gol',
      'shooting',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Rem %'), n(raw, ctx, 'Golos'), 50),
      'number',
      2,
      true,
    ),
    metric(
      'pctConversao',
      'Finalizações que se converteram em gols',
      'shooting',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Golos') - n(raw, ctx, 'Pens M'),
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      ),
      'percentage',
    ),
    metric(
      'golsDentroArea',
      'Gols dentro da área',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'Golos marcados de fora da área') - n(raw, ctx, 'Pens'),
      'integer',
    ),
    metric('golsForaAreaAtaque', 'Gols de fora da área', 'shooting', (raw, ctx) => n(raw, ctx, 'Golos marcados de fora da área'), 'integer'),
    metric('golsPen', 'Gols de pênalti', 'shooting', (raw, ctx) => n(raw, ctx, 'Pens'), 'integer'),
    metric(
      'conversaoForaArea',
      'Conversão dos chutes de fora da  área',
      'shooting',
      (raw, ctx) => safeDivide(
        safeDivide(n(raw, ctx, 'Golos marcados de fora da área'), ctx.j90),
        n(raw, ctx, 'Remates de fora da área em cada 90 minutes'),
      ) * 100,
      'percentage',
    ),
    metric('faltasSofridas', 'Faltas sofridas', 'attacking', (raw, ctx) => n(raw, ctx, 'Poss Perd/90'), 'integer'),
    metric(
      'faltasSof90',
      'Faltas Sof / jogo',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Poss Perd/90'), ctx.j90),
    ),
    metric('acoesBolaTent', 'Ações com Bola Tentadas', 'attacking', ballActionsAttempted, 'integer'),
    metric('acoesBolaTent90', 'Ações com Bola T/90', 'attacking', (raw, ctx) => safeDivide(ballActionsAttempted(raw, ctx), ctx.j90)),
    metric('acoesBolaSucess', 'Ações com Bola (Completadas)', 'attacking', ballActionsCompleted, 'integer'),
    metric('acoesBolaSucess90', 'Ações com Bola Comp /90', 'attacking', (raw, ctx) => safeDivide(ballActionsCompleted(raw, ctx), ctx.j90)),
    metric(
      'pctSucessoAcoes',
      '% Sucesso de ações com bola',
      'attacking',
      (raw, ctx) => percentage(ballActionsCompleted(raw, ctx), ballActionsAttempted(raw, ctx)),
      'percentage',
    ),
    metric('acoesFinalizacao', 'Ações que geraram finalizações ao gol', 'creation', shotGeneratingActions, 'integer'),
    metric(
      'acoesFinalizacao90',
      'Ações que geraram finalizações ao gol /90',
      'creation',
      (raw, ctx) => safeDivide(shotGeneratingActions(raw, ctx), ctx.j90),
    ),
    metric('chancesPerigo', 'Chances de perigo criadas', 'creation', dangerChances, 'integer'),
    metric('chancesPerigo90', 'Chances de perigo criadas /90', 'creation', (raw, ctx) => safeDivide(dangerChances(raw, ctx), ctx.j90)),
    metric(
      'participacao90',
      'Participação do jogador a cada 90 minutos (fnt, cabs, pass, finalizaçõs)',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Pas A')
          + n(raw, ctx, 'Fnt')
          + n(raw, ctx, 'CC-JA')
          + n(raw, ctx, 'Cr C')
          + n(raw, ctx, 'Remates em livres')
          + n(raw, ctx, 'Pens M')
          + n(raw, ctx, 'Press. conc.')
          + n(raw, ctx, 'Remates')
          + n(raw, ctx, 'OCG')
          + n(raw, ctx, 'Passes Ch')
          + n(raw, ctx, 'PeP'),
        ctx.j90,
      ),
    ),
    metric(
      'participacaoPasses90',
      'Participação em passes / 90',
      'passing',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Ps C') + n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'OCG') + n(raw, ctx, 'PeP'),
        ctx.j90,
      ),
    ),
    metric(
      'passesJogadaOf',
      'Passes em construção de jogada ofensiva',
      'creation',
      (raw, ctx) => n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'PeP'),
      'integer',
    ),
    metric(
      'passesJogadaOf90',
      'Passes em construção de jog OF /90',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'PeP'), ctx.j90),
    ),
    metric(
      'acoesUltimoTerco',
      'Ações no último terço (Fintas, chances criadas, remates)',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Fnt')
        + n(raw, ctx, 'Remates')
        + n(raw, ctx, 'Passes Ch')
        + (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens'))
        + n(raw, ctx, 'PeP')
        + n(raw, ctx, 'CT-JA'),
      'integer',
    ),
    metric(
      'ultimoTerco90',
      'Ações no último terço / 90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Fnt')
          + n(raw, ctx, 'Remates')
          + n(raw, ctx, 'Passes Ch')
          + (n(raw, ctx, 'OCG') - n(raw, ctx, 'Pens'))
          + n(raw, ctx, 'PeP')
          + n(raw, ctx, 'CT-JA'),
        ctx.j90,
      ),
    ),
    metric(
      'tentativasGol',
      'Tentativas de marcar um gol',
      'shooting',
      (raw, ctx) => n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'OCG') + n(raw, ctx, 'Remates'),
      'integer',
    ),
    metric(
      'tentativasGol90',
      'Tentativas de marcar um gol / 90',
      'shooting',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'OCG') + n(raw, ctx, 'Remates'),
        ctx.j90,
      ),
    ),
    metric('possDesp', 'Posse Desperdiçada', 'passing', possessionWasted, 'integer', undefined, true),
    metric(
      'possDesp90',
      'Posse Desperdiçada /90',
      'passing',
      (raw, ctx) => safeDivide(possessionWasted(raw, ctx), ctx.j90),
      'number',
      2,
      true,
    ),
    metric('possPerd90', 'Posse perdida /90', 'passing', (raw, ctx) => n(raw, ctx, 'Poss Perd/90'), 'number', 2, true),
    metric('distancia', 'Distância percorrida (Total)', 'physical', (raw, ctx) => n(raw, ctx, 'Distância')),
    metric('dist90', 'Dist / 90', 'physical', (raw, ctx) => safeDivide(n(raw, ctx, 'Distância'), ctx.j90)),
    metric(
      'sprintsAltaIntensidade',
      'Sprints de alta intensidade',
      'physical',
      (raw, ctx) => n(raw, ctx, 'Sprints/90') * ctx.j90,
      'integer',
    ),
    metric('sprints90', 'Sprints/90', 'physical', (raw, ctx) => n(raw, ctx, 'Sprints/90')),
    metric('notaMedia', 'Nota média', 'general', (raw, ctx) => n(raw, ctx, 'Classificação')),
  ],
}
