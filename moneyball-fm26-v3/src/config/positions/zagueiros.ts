import type {
  FormulaContext,
  MetricCategory,
  MetricDefinition,
  PositionConfig,
} from './types.ts'
import type { RawPlayer } from '@/types/player.ts'

type MetricFormula = MetricDefinition['formula']
type MetricFormat = MetricDefinition['format']

const DEFAULT_TABLE_COLUMNS = [
  'jogosCompletos',
  'cabsG90',
  'pctCabsGanhos',
  'desG90',
  'pctDesGanhos',
  'interceptacoes90',
  'alivios90',
  'eficaciaDefensiva',
  'pctPassesCertos',
  'pressaoG90',
  'erros90',
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

function defensiveAttempts(raw: RawPlayer, ctx: FormulaContext): number {
  return (n(raw, ctx, 'EPG') * 3)
    + (n(raw, ctx, 'Amr') * 1.33)
    + (n(raw, ctx, 'Cartões vermelhos') * 2)
    + n(raw, ctx, 'Cab A')
    + n(raw, ctx, 'T Desa')
    + n(raw, ctx, 'Crt')
    + n(raw, ctx, 'Alívios')
    + n(raw, ctx, 'Blq')
    + n(raw, ctx, 'Rems Bloq')
    + n(raw, ctx, 'Faltas Cometidas')
}

function defensiveSuccesses(raw: RawPlayer, ctx: FormulaContext): number {
  const defensiveHeaders = n(raw, ctx, 'Cab Dec/90') * ctx.j90
  return n(raw, ctx, 'Cabs')
    + n(raw, ctx, 'Des C')
    + n(raw, ctx, 'Crt')
    + n(raw, ctx, 'Alívios')
    + n(raw, ctx, 'Blq')
    + n(raw, ctx, 'Rems Bloq')
    + (n(raw, ctx, 'Crt D') * 1.5)
    + (defensiveHeaders * 0.5)
}

function defensiveErrors(raw: RawPlayer, ctx: FormulaContext): number {
  const missedPasses = n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C')
  return (n(raw, ctx, 'EPG') * 3)
    + (n(raw, ctx, 'Amr') * 1.25)
    + (n(raw, ctx, 'Cartões vermelhos') * 2)
    + n(raw, ctx, 'Faltas Cometidas')
    + missedPasses
}

export const zagueirosConfig: PositionConfig = {
  key: 'zagueiros',
  emoji: '🧱',
  name: 'Zagueiros',

  // Cabeçalhos brutos EI:GD da aba, preservados exatamente como o FM26 exporta.
  rawColumns: [
    'Inf', 'Jogador', 'Altura', 'Idade', 'Valor Estimado', 'Salário',
    'Nação', 'Pé Preferido', 'Expira', 'Clube', 'Minutos', 'Presenças',
    'HdJ', 'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos',
    'Press. tent.', 'Press. conc.', 'Cabs', 'Cab A', 'Cab Dec/90',
    'T Desa', 'Des C', 'Blq', 'Rems Bloq', 'Poss Con/90', 'Crt D',
    'Crt', 'Faltas Cometidas', 'Alívios', 'Distância', 'Sprints/90',
    'Fnt', 'PeP', 'Pas A', 'Ps C', 'OCG', 'Remates', 'Rem %',
    'Pens', 'Pens M', 'xG', 'xA', 'Passes Ch', 'Remates em livres',
    'Classificação',
  ],

  identityColumns: {
    Jogador: 'Jogador',
    Nação: 'Nação',
    Clube: 'Clube',
    Idade: 'Idade',
    Salário: 'Salário',
    Valor: 'Valor Estimado',
  },

  // Ordem equivalente às colunas numéricas derivadas da planilha.
  // "Média de jogos" não entra aqui porque é uma agregação da coluna inteira,
  // enquanto MetricDefinition calcula uma linha por vez.
  metrics: [
    metric(
      'altura',
      'Altura',
      'general',
      (raw, ctx) => n(raw, ctx, 'Altura') / 100,
      'number',
      2,
    ),
    metric(
      'jogosCompletos',
      'Jogos completos',
      'general',
      (_raw, ctx) => ctx.j90,
      'integer',
    ),
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
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Minutos'),
        appearances(raw['Presenças'], ctx).total,
      ),
      'integer',
    ),
    metric(
      'jogosComoTitular',
      'Jogos como Titular',
      'general',
      (raw, ctx) => {
        const parsed = appearances(raw['Presenças'], ctx)
        // A fórmula usa TEXT(...,"0%") antes de converter de volta para número.
        return Math.round(percentage(parsed.starts, parsed.total))
      },
      'percentage',
      0,
    ),
    metric('gols', 'Gols', 'attacking', (raw, ctx) => n(raw, ctx, 'Golos'), 'integer'),
    metric('assist', 'Assist', 'creation', (raw, ctx) => n(raw, ctx, 'Assist.'), 'integer'),
    metric(
      'golsAst',
      'Gols+Ast',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'),
      'integer',
    ),
    metric(
      'gols90',
      'Gols / 90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Golos'), ctx.j90),
    ),
    metric(
      'ga90',
      'Gols + Ast/90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Golos') + n(raw, ctx, 'Assist.'),
        ctx.j90,
      ),
    ),
    metric('xG', 'Gols esperados (xG)', 'attacking', (raw, ctx) => n(raw, ctx, 'xG')),
    metric(
      'xG90',
      'xG /90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'xG'), ctx.j90),
    ),
    metric(
      'npxG',
      'xG (Sem pênaltis)',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79),
    ),
    metric(
      'npxG90',
      'xG (Sem pênaltis) /90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79),
        ctx.j90,
      ),
    ),
    metric('xA', 'Assistências Esperadas (xA)', 'creation', (raw, ctx) => n(raw, ctx, 'xA')),
    metric(
      'xA90',
      'xA /90',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'xA'), ctx.j90),
    ),
    metric(
      'xaNpxG',
      'xA + xG (sem pen)',
      'creation',
      (raw, ctx) => n(raw, ctx, 'xG') + n(raw, ctx, 'xA'),
    ),
    metric(
      'xaNpxG90',
      'xA + xG /90',
      'creation',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'xG') + n(raw, ctx, 'xA'),
        ctx.j90,
      ),
    ),
    metric('hdj', 'Man of the match', 'general', (raw, ctx) => n(raw, ctx, 'HdJ'), 'integer'),
    metric(
      'minPorHdJ',
      'Minutos pra ser o homem do jogo',
      'general',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Minutos'), n(raw, ctx, 'HdJ'), 5400),
      'number',
      2,
      true,
    ),
    metric(
      'pctHdJ',
      '% de vezes que foi eleito o Homem do Jogo',
      'general',
      (raw, ctx) => percentage(n(raw, ctx, 'HdJ'), ctx.j90),
      'percentage',
      2,
    ),
    metric(
      'pensBatidos',
      'Pênaltis batidos',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Pens'),
      'integer',
    ),
    metric(
      'pensMarcados',
      'Pênaltis marcados',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Pens M'),
      'integer',
    ),
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
      'pctConversaoPen',
      '% Conversão de pênalti',
      'attacking',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Pens M'),
        n(raw, ctx, 'Pens'),
        0.00001,
      ),
      'percentage',
      1,
    ),
    metric(
      'errosGol',
      'Erros que geraram gol adversário',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'EPG'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'erros90',
      'Erros que originaram gols /90',
      'discipline',
      (raw, ctx) => safeDivide(n(raw, ctx, 'EPG'), ctx.j90),
      'number',
      2,
      true,
    ),
    metric(
      'cabsTentados',
      'Cabeceios Tentados (Total)',
      'aerial',
      (raw, ctx) => n(raw, ctx, 'Cab A'),
      'integer',
    ),
    metric(
      'cabsT90',
      'Cabeceios Tentados /90',
      'aerial',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Cab A'), ctx.j90),
    ),
    metric(
      'cabsGanhos',
      'Cabeceios Ganhos (Total)',
      'aerial',
      (raw, ctx) => n(raw, ctx, 'Cabs'),
      'integer',
    ),
    metric(
      'cabsG90',
      'Cabeceios Ganhos /90',
      'aerial',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Cabs'), ctx.j90),
    ),
    metric(
      'pctCabsGanhos',
      '% Cabeceios Ganhos',
      'aerial',
      (raw, ctx) => percentage(n(raw, ctx, 'Cabs'), n(raw, ctx, 'Cab A')),
      'percentage',
      1,
    ),
    metric(
      'cabsPerdidos',
      'Cabeceios Perdidos',
      'aerial',
      (raw, ctx) => n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'cabsPerdidos90',
      'Cabeceios Perdidos /90',
      'aerial',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'pctCabsPerdidos',
      '% Cabeceios perdidos',
      'aerial',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'),
        n(raw, ctx, 'Cab A'),
      ),
      'percentage',
      1,
      true,
    ),
    metric(
      'cabsEvitaramJogada',
      'Cabeceios que evitaram jogada ofensiva',
      'aerial',
      (raw, ctx) => n(raw, ctx, 'Cab Dec/90') * ctx.j90,
      'integer',
    ),
    metric(
      'cabDec90',
      'Cabs que evitaram jogada ofensiva /90',
      'aerial',
      (raw, ctx) => n(raw, ctx, 'Cab Dec/90'),
    ),
    metric(
      'pctCabsOfensivos',
      '% dos cabeceios que são ofensivos',
      'aerial',
      (raw, ctx) => percentage(n(raw, ctx, 'Remates'), n(raw, ctx, 'Cab A')),
      'percentage',
      2,
    ),
    metric(
      'cabsOfensivosTentados',
      'Cabeceios Ofensivos (Tentados)',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      'integer',
    ),
    metric(
      'cabsOfensivosT90',
      'Cabeceios ofensivos T /90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
        ctx.j90,
      ),
    ),
    metric(
      'cabsOfensivosNoGol',
      'Cabeceios Ofensivos que foram no gol',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens'),
      'integer',
    ),
    metric(
      'cabsOfensivosNoGol90',
      'Cabs Of. que foram no gol /90',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens'),
        ctx.j90,
      ),
    ),
    metric(
      'pctCabsDirecaoGol',
      '% Cabeceios que foram em direção ao gol',
      'attacking',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Rem %') - n(raw, ctx, 'Pens'),
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      ),
      'percentage',
      2,
    ),
    metric(
      'xgPorRemateCab',
      'xG por Remate ou Cabeceio',
      'attacking',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79),
        n(raw, ctx, 'Remates') - n(raw, ctx, 'Pens'),
      ),
    ),
    metric(
      'xgSemPenaltiRecalculado',
      'xG Esperados SEM PÊNALTI',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 1.58),
    ),
    metric(
      'golsNaoEsperados',
      'Gols não esperados',
      'attacking',
      (raw, ctx) => n(raw, ctx, 'Golos') - n(raw, ctx, 'xG'),
    ),
    metric(
      'golsNaoEsperadosSemPenalti',
      'Gols não esperados SEM PÊNALTI',
      'attacking',
      (raw, ctx) => (
        n(raw, ctx, 'Golos')
        - n(raw, ctx, 'Pens M')
        - (n(raw, ctx, 'xG') - (n(raw, ctx, 'Pens') * 0.79))
      ),
    ),
    metric(
      'interceptacoes',
      'Interceptações feitas',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Crt')
        + n(raw, ctx, 'Blq')
        + n(raw, ctx, 'Rems Bloq')
      ),
      'integer',
    ),
    metric(
      'interceptacoes90',
      'Interceptações /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Crt') + n(raw, ctx, 'Blq') + n(raw, ctx, 'Rems Bloq'),
        ctx.j90,
      ),
    ),
    metric(
      'rematesBloqueados',
      'Remates bloqueados',
      'defending',
      (raw, ctx) => n(raw, ctx, 'Rems Bloq'),
      'integer',
    ),
    metric(
      'remBloq90',
      'Remates bloqueados /90',
      'defending',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Rems Bloq'), ctx.j90),
    ),
    metric(
      'interceptacoesBloqueios90',
      'Rem Bloqueados, Interceptações  e Bloqueios/90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Rems Bloq')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Crt')
          + n(raw, ctx, 'Crt D'),
        ctx.j90,
      ),
    ),
    metric('alivios', 'Alívios', 'defending', (raw, ctx) => n(raw, ctx, 'Alívios'), 'integer'),
    metric(
      'alivios90',
      'Alívios /90',
      'defending',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Alívios'), ctx.j90),
    ),
    metric(
      'desarmesTentados',
      'Desarmes Tentados',
      'defending',
      (raw, ctx) => n(raw, ctx, 'T Desa') + n(raw, ctx, 'Faltas Cometidas'),
      'integer',
    ),
    metric(
      'desT90',
      'Desarmes Tentados /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'T Desa') + n(raw, ctx, 'Faltas Cometidas'),
        ctx.j90,
      ),
    ),
    metric(
      'desarmesGanhos',
      'Desarmes Ganhos',
      'defending',
      (raw, ctx) => n(raw, ctx, 'Des C'),
      'integer',
    ),
    metric(
      'desG90',
      'Desarmes Ganhos/90',
      'defending',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Des C'), ctx.j90),
    ),
    metric(
      'driblesSofridos',
      'Dribles sofridos',
      'defending',
      (raw, ctx) => n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'driblesSof90',
      'Dribles sofridos /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'pctDesGanhos',
      '% Des',
      'defending',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Des C'),
        n(raw, ctx, 'T Desa') + n(raw, ctx, 'Faltas Cometidas'),
      ),
      'percentage',
      2,
    ),
    metric(
      'desarmesDecisivos',
      'Desarmes Decisivos',
      'defending',
      (raw, ctx) => n(raw, ctx, 'Crt D'),
      'integer',
    ),
    metric(
      'desarmesDecisivos90',
      'Desarmes Decisivos / 90',
      'defending',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Crt D'), ctx.j90),
    ),
    metric(
      'pressaoT',
      'Movimentos de pressão tentados',
      'pressing',
      (raw, ctx) => n(raw, ctx, 'Press. tent.'),
      'integer',
    ),
    metric(
      'pressaoT90',
      'Mov Press T/90',
      'pressing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Press. tent.'), ctx.j90),
    ),
    metric(
      'pressaoG',
      'Movimentos de pressão ganhos',
      'pressing',
      (raw, ctx) => n(raw, ctx, 'Press. conc.'),
      'integer',
    ),
    metric(
      'pressaoG90',
      'Mov Press Ganhos /90',
      'pressing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Press. conc.'), ctx.j90),
    ),
    metric(
      'pctPressao',
      '% Pressão ganha/90',
      'pressing',
      (raw, ctx) => percentage(
        safeDivide(n(raw, ctx, 'Press. conc.'), ctx.j90),
        safeDivide(n(raw, ctx, 'Press. tent.'), ctx.j90),
      ),
      'percentage',
      2,
    ),
    metric(
      'passesTentados',
      'Passes Tentados',
      'passing',
      (raw, ctx) => n(raw, ctx, 'Pas A'),
      'integer',
    ),
    metric(
      'passesT90',
      'Passes Tentados /90',
      'passing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Pas A'), ctx.j90),
    ),
    metric(
      'passesCertos',
      'Passes Certos',
      'passing',
      (raw, ctx) => n(raw, ctx, 'Ps C'),
      'integer',
    ),
    metric(
      'passesC90',
      'Passes Certos /90',
      'passing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Ps C'), ctx.j90),
    ),
    metric(
      'pctPassesCertos',
      '% Acerto dos passes',
      'passing',
      (raw, ctx) => percentage(n(raw, ctx, 'Ps C'), n(raw, ctx, 'Pas A')),
      'percentage',
      2,
    ),
    metric(
      'passesCurtos',
      'Passes que são curtos',
      'passing',
      (raw, ctx) => n(raw, ctx, 'Pas A') - n(raw, ctx, 'PeP'),
      'integer',
    ),
    metric(
      'passesCurtosCertos90',
      'Passes curtos certos /90',
      'passing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Ps C'), ctx.j90),
    ),
    metric(
      'passesProgressao',
      'Passe que são em progressão',
      'passing',
      (raw, ctx) => n(raw, ctx, 'PeP'),
      'integer',
    ),
    metric(
      'passProg90',
      'Passes em progressão/90',
      'passing',
      (raw, ctx) => safeDivide(n(raw, ctx, 'PeP'), ctx.j90),
    ),
    metric(
      'pctPassesProgressao',
      '% Passes em progressão em relação aos curtos',
      'passing',
      (raw, ctx) => percentage(
        n(raw, ctx, 'PeP'),
        n(raw, ctx, 'Pas A') - n(raw, ctx, 'PeP'),
      ),
      'percentage',
      2,
    ),
    metric(
      'passesErrados',
      'Passes Errados',
      'passing',
      (raw, ctx) => n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'passErr90',
      'Passes Errados /90',
      'passing',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'pctPassesErrados',
      '% Passes errados',
      'passing',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'),
        n(raw, ctx, 'Pas A'),
      ),
      'percentage',
      2,
      true,
    ),
    metric(
      'passesDecisivos',
      'Passes Decisivos',
      'creation',
      (raw, ctx) => n(raw, ctx, 'Passes Ch'),
      'integer',
    ),
    metric(
      'passD90',
      'Passes Decisivos /90',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Passes Ch'), ctx.j90),
    ),
    metric(
      'xaPorPasseDecisivo',
      'xA por Passes Decisivos',
      'creation',
      (raw, ctx) => safeDivide(n(raw, ctx, 'xA'), n(raw, ctx, 'Passes Ch')),
    ),
    metric(
      'tentativasCriacao',
      'Tentativa de criar um gol ou jogada ofensiva',
      'creation',
      (raw, ctx) => n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'OCG'),
      'integer',
    ),
    metric(
      'tentativasCriacao90',
      'Tentativa de criar um gol ou jogada ofensiva/ 90',
      'creation',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Passes Ch') + n(raw, ctx, 'OCG'),
        ctx.j90,
      ),
    ),
    metric(
      'tentativasCabsDesPressao',
      'Tentativas (Cabs, Desarmes, Pressão)',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Cab A')
        + n(raw, ctx, 'T Desa')
        + n(raw, ctx, 'Press. tent.')
      ),
      'integer',
    ),
    metric(
      'tentativasCabsDesPressao90',
      'Tentativas Cabs, Des, Pres /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'T Desa')
          + n(raw, ctx, 'Press. tent.'),
        ctx.j90,
      ),
    ),
    metric(
      'acertosCabsDesPressao',
      'Acertos (Cabs, Des, Pres)',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Cabs')
        + n(raw, ctx, 'Des C')
        + n(raw, ctx, 'Press. conc.')
      ),
      'integer',
    ),
    metric(
      'acertosCabsDesPressao90',
      'Acertos/90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Cabs')
          + n(raw, ctx, 'Des C')
          + n(raw, ctx, 'Press. conc.'),
        ctx.j90,
      ),
    ),
    metric(
      'errosCabsDesPressao',
      'Erros',
      'defending',
      (raw, ctx) => (
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
        + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
        + (n(raw, ctx, 'Press. tent.') - n(raw, ctx, 'Press. conc.'))
      ),
      'integer',
      undefined,
      true,
    ),
    metric(
      'taxaAcerto',
      'Taxa de acerto',
      'defending',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Cabs')
          + n(raw, ctx, 'Des C')
          + n(raw, ctx, 'Press. conc.'),
        n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'T Desa')
          + n(raw, ctx, 'Press. tent.'),
      ),
      'percentage',
      2,
    ),
    metric(
      'bolasInterceptadas',
      'Bolas interceptadas',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Blq')
        + n(raw, ctx, 'Rems Bloq')
        + n(raw, ctx, 'Crt')
        + n(raw, ctx, 'Alívios')
        + (n(raw, ctx, 'Crt D') * 0.5)
      ),
      'integer',
    ),
    metric(
      'bolasInt90',
      'Bolas interceptadas /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Rems Bloq')
          + n(raw, ctx, 'Crt')
          + n(raw, ctx, 'Alívios')
          + (n(raw, ctx, 'Crt D') * 0.5),
        ctx.j90,
      ),
    ),
    metric(
      'bolasRoubadas',
      'Bolas roubadas do adversário',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Press. conc.')
        + n(raw, ctx, 'Des C')
        + (n(raw, ctx, 'Crt D') * 0.5)
      ),
      'integer',
    ),
    metric(
      'bolasRob90',
      'Bolas roubadas /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Press. conc.')
          + n(raw, ctx, 'Des C')
          + (n(raw, ctx, 'Crt D') * 0.5),
        ctx.j90,
      ),
    ),
    metric(
      'bolasDisputadas',
      'Bolas disputadas com o adversário',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Cab A')
        + n(raw, ctx, 'T Desa')
        + n(raw, ctx, 'Blq')
        + n(raw, ctx, 'Faltas Cometidas')
      ),
      'integer',
    ),
    metric(
      'bolasDisputadas90',
      'Bolas disputadas /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'T Desa')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Faltas Cometidas'),
        ctx.j90,
      ),
    ),
    metric(
      'bolasDisputadasGanhas',
      'Bolas disputadas e ganhas do adversário',
      'defending',
      (raw, ctx) => (
        n(raw, ctx, 'Cabs')
        + n(raw, ctx, 'Des C')
        + n(raw, ctx, 'Blq')
        + n(raw, ctx, 'Crt D')
      ),
      'integer',
    ),
    metric(
      'bolasDisputadasGanhas90',
      'Bolas disputadas e ganhas /90',
      'defending',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Cabs')
          + n(raw, ctx, 'Des C')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Crt D'),
        ctx.j90,
      ),
    ),
    metric(
      'pctBolasDisputadasGanhas',
      '% Bolas disputadas e ganhas',
      'defending',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Cabs')
          + n(raw, ctx, 'Des C')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Crt D'),
        n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'T Desa')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Faltas Cometidas'),
      ),
      'percentage',
      2,
    ),
    metric(
      'bolasDisputadasPerdidas',
      'Bolas disputadas e perdidas com o adversário',
      'defending',
      (raw, ctx) => (
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
        + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
        + n(raw, ctx, 'Blq')
      ),
      'integer',
      undefined,
      true,
    ),
    metric(
      'bolasDisputadasPerdidas90',
      'Bolas disputadas e perdidas /90',
      'defending',
      (raw, ctx) => safeDivide(
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
          + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
          + n(raw, ctx, 'Blq'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'faltas',
      'Faltas cometidas',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Faltas Cometidas'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'faltas90',
      'Faltas cometidas/90',
      'discipline',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Faltas Cometidas'), ctx.j90),
      'number',
      2,
      true,
    ),
    metric(
      'pctDisputasPerdidas',
      '% de disputas perdidas',
      'defending',
      (raw, ctx) => percentage(
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
          + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
          + n(raw, ctx, 'Blq'),
        n(raw, ctx, 'Cab A')
          + n(raw, ctx, 'T Desa')
          + n(raw, ctx, 'Blq')
          + n(raw, ctx, 'Faltas Cometidas'),
      ),
      'percentage',
      2,
      true,
    ),
    metric(
      'cartoesAmarelos',
      'Cartões amarelos',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Amr'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'cartoesVermelhos',
      'Cartões vermelhos',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Cartões vermelhos'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'totalCartoes',
      'Cartões recebidos',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Amr') + n(raw, ctx, 'Cartões vermelhos'),
      'integer',
      undefined,
      true,
    ),
    metric(
      'cartoes90',
      'Cartões /90',
      'discipline',
      (raw, ctx) => safeDivide(
        n(raw, ctx, 'Amr') + n(raw, ctx, 'Cartões vermelhos'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'pctFaltasComCartao',
      '% Faltas que geraram um cartão',
      'discipline',
      (raw, ctx) => percentage(
        n(raw, ctx, 'Amr') + n(raw, ctx, 'Cartões vermelhos'),
        n(raw, ctx, 'Faltas Cometidas'),
      ),
      'percentage',
      2,
      true,
    ),
    metric(
      'lancesDefTentados',
      'Lances defensivos tentados',
      'defending',
      defensiveAttempts,
      'integer',
    ),
    metric(
      'lancesDefT90',
      'Lances DEF tentados / 90',
      'defending',
      (raw, ctx) => safeDivide(defensiveAttempts(raw, ctx), ctx.j90),
    ),
    metric(
      'lancesDefConseguidos',
      'Lances defensivos conseguidos',
      'defending',
      defensiveSuccesses,
      'integer',
    ),
    metric(
      'lancesDefC90',
      'Lances DEF conseguidos / 90',
      'defending',
      (raw, ctx) => safeDivide(defensiveSuccesses(raw, ctx), ctx.j90),
    ),
    metric(
      'errosDefensivos',
      'Erros Defensivos',
      'defending',
      defensiveErrors,
      'integer',
      undefined,
      true,
    ),
    metric(
      'errosDefensivos90',
      'Erros Defensivos /90',
      'defending',
      (raw, ctx) => safeDivide(defensiveErrors(raw, ctx), ctx.j90),
      'number',
      2,
      true,
    ),
    metric(
      'eficaciaDefensiva',
      'Eficácia defensiva',
      'defending',
      (raw, ctx) => percentage(
        defensiveSuccesses(raw, ctx),
        defensiveAttempts(raw, ctx),
      ),
      'percentage',
      2,
    ),
    metric(
      'distancia',
      'Distância',
      'physical',
      (raw, ctx) => n(raw, ctx, 'Distância'),
      'number',
      2,
    ),
    metric(
      'dist90',
      'Dist / 90',
      'physical',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Distância'), ctx.j90),
    ),
    metric(
      'sprints90',
      'Sprints /90',
      'physical',
      (raw, ctx) => n(raw, ctx, 'Sprints/90'),
    ),
    metric('fintas', 'Fintas', 'attacking', (raw, ctx) => n(raw, ctx, 'Fnt'), 'integer'),
    metric(
      'fintas90',
      'Fintas/90',
      'attacking',
      (raw, ctx) => safeDivide(n(raw, ctx, 'Fnt'), ctx.j90),
    ),
    metric(
      'posseDesperdicada',
      'Posse Desperdiçada',
      'discipline',
      (raw, ctx) => (
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
        + (n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'))
        + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
        + n(raw, ctx, 'Faltas Cometidas')
      ),
      'integer',
      undefined,
      true,
    ),
    metric(
      'posseDesperdicada90',
      'Posse Desperdiçada /90',
      'discipline',
      (raw, ctx) => safeDivide(
        (n(raw, ctx, 'Cab A') - n(raw, ctx, 'Cabs'))
          + (n(raw, ctx, 'Pas A') - n(raw, ctx, 'Ps C'))
          + (n(raw, ctx, 'T Desa') - n(raw, ctx, 'Des C'))
          + n(raw, ctx, 'Faltas Cometidas'),
        ctx.j90,
      ),
      'number',
      2,
      true,
    ),
    metric(
      'possePerdida',
      'Posse perdida',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Poss Con/90') * ctx.j90,
      'integer',
      undefined,
      true,
    ),
    metric(
      'possePerdida90',
      'Posse perdida /90',
      'discipline',
      (raw, ctx) => n(raw, ctx, 'Poss Con/90'),
      'number',
      2,
      true,
    ),
    metric(
      'notaMedia',
      'Nota média',
      'general',
      (raw, ctx) => n(raw, ctx, 'Classificação'),
      'number',
      2,
    ),
  ],

  defaultTableColumns: DEFAULT_TABLE_COLUMNS,
}
