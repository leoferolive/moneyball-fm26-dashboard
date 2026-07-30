import type {
  FormulaContext,
  MetricCategory,
  MetricDefinition,
  PositionConfig,
} from './types.ts'
import type { RawPlayer } from '@/types/player.ts'

const DEFAULT_TABLE_COLUMNS = [
  'jogosCompletos',
  'npxG90',
  'xA90',
  'desG90',
  'pctDesGanhos',
  'pctPassesCertos',
  'cruzC90',
  'pctCruzamentos',
  'chances90',
  'fintas90',
  'eficaciaDefensiva',
  'dist90',
  'notaMedia',
]

type MetricOptions = Partial<
  Pick<MetricDefinition, 'lowerIsBetter' | 'format' | 'decimals' | 'description'>
>

function metric(
  key: string,
  label: string,
  category: MetricCategory,
  formula: MetricDefinition['formula'],
  options: MetricOptions = {},
): MetricDefinition {
  return {
    key,
    label,
    category,
    formula,
    displayInTable: DEFAULT_TABLE_COLUMNS.includes(key),
    lowerIsBetter: options.lowerIsBetter ?? false,
    format: options.format ?? 'number',
    decimals: options.decimals,
    description: options.description,
  }
}

/**
 * FM26 exports appearances as "starts (substitute appearances)".
 * The spreadsheet treats a value without parentheses as starts only.
 */
function parseAppearances(raw: RawPlayer, ctx: FormulaContext) {
  const value = raw['Presenças'] ?? ''
  const match = value.match(
    /^\s*([+-]?\d+(?:[.,]\d+)?)\s*(?:\(\s*([+-]?\d+(?:[.,]\d+)?)\s*\))?/,
  )

  if (!match) {
    const total = ctx.pf(value)
    return { starts: total, total }
  }

  const starts = ctx.pf(match[1])
  const substituteAppearances = ctx.pf(match[2])
  return { starts, total: starts + substituteAppearances }
}

/**
 * Mirrors the worksheet's displayed midpoint for a value range.
 * It intentionally averages the two written magnitudes, as the workbook does.
 */
function estimatedValueMidpoint(raw: RawPlayer, ctx: FormulaContext): number {
  const value = raw['Valor Estimado'] ?? ''
  if (!value.includes('-')) return ctx.pf(value)

  const magnitudes = value.match(/\d[\d.,]*/g) ?? []
  if (magnitudes.length < 2) return ctx.pf(value)
  return (ctx.pf(magnitudes[0]) + ctx.pf(magnitudes[1])) / 2
}

const int = { format: 'integer' as const }
const pct0 = { format: 'percentage' as const, decimals: 0 }
const pct1 = { format: 'percentage' as const, decimals: 1 }
const pct2 = { format: 'percentage' as const, decimals: 2 }
const lower = { lowerIsBetter: true }
const lowerInt = { lowerIsBetter: true, format: 'integer' as const }

export const lateraisConfig: PositionConfig = {
  key: 'laterais',
  emoji: '🛡️',
  name: 'Laterais',

  // Exact FM26 export headers in worksheet order (DF:FD).
  rawColumns: [
    'Inf', 'Jogador', 'Altura', 'Idade', 'Valor Estimado', 'Salário',
    'Nação', 'Pé Preferido', 'Expira', 'Clube', 'Minutos', 'Presenças',
    'HdJ', 'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos',
    'OCG', 'Poss Perd/90', 'Sprints/90', 'xA', 'xG', 'Cab A', 'Cabs',
    'Cab Dec/90', 'Pas A', 'Ps C', 'Passes Ch', 'PeP', 'Remates',
    'Rem %', 'Press. tent.', 'Press. conc.', 'Faltas Cometidas',
    'T Desa', 'Des C', 'Crt D', 'Blq', 'Crt', 'Rems Bloq', 'Alívios',
    'Cr T', 'Cr C', 'Fj', 'Remates em livres', 'Pens', 'Pens M',
    'Fnt', 'Distância', 'Classificação',
  ],

  identityColumns: {
    Jogador: 'Jogador',
    Nação: 'Nação',
    Clube: 'Clube',
    Idade: 'Idade',
    Salário: 'Salário',
    Valor: 'Valor Estimado',
  },

  metrics: [
    // Identity-derived numeric columns (F and I).
    metric('altura', 'Altura', 'general', (r, ctx) => ctx.sDiv(ctx.pf(r['Altura']), 100), {
      decimals: 2,
    }),
    metric('valorEstimadoMedio', 'Valor Estimado (médio)', 'general', estimatedValueMidpoint, {
      decimals: 2,
    }),

    // General and attacking (K:AF).
    metric('jogosCompletos', 'Jogos completos', 'general', (_r, ctx) => ctx.j90, int),
    metric('jogosTotais', 'Jogos Totais', 'general', (r, ctx) => parseAppearances(r, ctx).total, int),
    metric(
      'minPartida',
      'Minutos por partida',
      'general',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), parseAppearances(r, ctx).total),
      int,
    ),
    metric(
      'pctJogosTitular',
      'Jogos como Titular',
      'general',
      (r, ctx) => {
        const appearances = parseAppearances(r, ctx)
        return ctx.rnd(ctx.pct(appearances.starts, appearances.total), 0)
      },
      pct0,
    ),
    metric('gols', 'Gols', 'attacking', (r, ctx) => ctx.pf(r['Golos']), int),
    metric('assist', 'Assist', 'attacking', (r, ctx) => ctx.pf(r['Assist.']), int),
    metric(
      'golsAst',
      'Gols+Ass',
      'attacking',
      (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']),
      int,
    ),
    metric(
      'ga90',
      'Gols + A/90',
      'attacking',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90),
      { decimals: 2 },
    ),
    metric('hdj', 'Man of the match', 'general', (r, ctx) => ctx.pf(r['HdJ']), int),
    metric(
      'pctHdJ',
      '% de vezes que foi eleito o Homem do Jogo',
      'general',
      (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.j90),
      pct2,
    ),
    metric('xG', 'Gols esperados (xG)', 'attacking', (r, ctx) => ctx.pf(r['xG']), {
      decimals: 2,
    }),
    metric('xG90', 'xG /90', 'attacking', (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.j90), {
      decimals: 2,
    }),
    metric(
      'npxG',
      'xG (Sem pênaltis)',
      'attacking',
      (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79,
      { decimals: 2 },
    ),
    metric(
      'npxG90',
      'xG (Sem pênaltis) /90',
      'attacking',
      (r, ctx) => ctx.sDiv(ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79, ctx.j90),
      { decimals: 2 },
    ),
    metric('xA', 'Assistências Esperadas (xA)', 'creation', (r, ctx) => ctx.pf(r['xA']), {
      decimals: 2,
    }),
    metric('xA90', 'xA /90', 'creation', (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90), {
      decimals: 2,
    }),
    metric(
      'xaNpxG',
      'xA + xG (sem pen)',
      'creation',
      (r, ctx) => ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79,
      { decimals: 2 },
    ),
    metric(
      'xaNpxG90',
      'xA + xG /90',
      'creation',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['xA']) + ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79,
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric('pensBatidos', 'Pênaltis batidos', 'attacking', (r, ctx) => ctx.pf(r['Pens']), int),
    metric('pensMarcados', 'Pênaltis marcados', 'attacking', (r, ctx) => ctx.pf(r['Pens M']), int),
    metric(
      'pensPerdidos',
      'Pênaltis perdidos',
      'attacking',
      (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']),
      lowerInt,
    ),
    metric(
      'pctConversaoPen',
      '% Conversão de pênalti',
      'attacking',
      (r, ctx) => {
        const attempted = ctx.pf(r['Pens'])
        return attempted === 0 ? 0.00001 : ctx.pct(ctx.pf(r['Pens M']), attempted)
      },
      pct1,
    ),

    // Defensive duels and passing (AG:BG).
    metric(
      'desarmesTentados',
      'Desarmes Tentados',
      'defending',
      (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']),
      int,
    ),
    metric(
      'desT90',
      'Des Tentados / 90',
      'defending',
      (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']), ctx.j90),
      { decimals: 2 },
    ),
    metric('desarmesGanhos', 'Desarmes ganhos', 'defending', (r, ctx) => ctx.pf(r['Des C']), int),
    metric('desG90', 'Desarmes Conseguidos / 90', 'defending', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Des C']), ctx.j90)
    ), { decimals: 2 }),
    metric(
      'driblesSofridos',
      'Dribles Sofridos',
      'defending',
      (r, ctx) => ctx.pf(r['T Desa']) - ctx.pf(r['Des C']),
      lowerInt,
    ),
    metric(
      'driblesSof90',
      'Dribles Sofridos /90',
      'defending',
      (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) - ctx.pf(r['Des C']), ctx.j90),
      { ...lower, decimals: 2 },
    ),
    metric(
      'pctDesGanhos',
      '% Des Ganhos',
      'defending',
      (r, ctx) => ctx.pct(
        ctx.pf(r['Des C']),
        ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']),
      ),
      pct2,
    ),
    metric('faltasCometidas', 'Faltas cometidas', 'discipline', (r, ctx) => (
      ctx.pf(r['Faltas Cometidas'])
    ), lowerInt),
    metric('faltas90', 'Faltas cometidas /90', 'discipline', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90)
    ), { ...lower, decimals: 2 }),
    metric(
      'lancesDisputados',
      'Lances disputados',
      'defending',
      (r, ctx) => (
        ctx.pf(r['Faltas Cometidas'])
        + ctx.pf(r['Press. tent.'])
        + ctx.pf(r['T Desa'])
        + ctx.pf(r['Blq'])
      ),
      int,
    ),
    metric(
      'lancesDisputados90',
      'Lances disputados /90',
      'defending',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Faltas Cometidas'])
          + ctx.pf(r['Press. tent.'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Blq']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'lancesGanhosSemFalta',
      'Lances disputados e ganhos sem falta',
      'defending',
      (r, ctx) => (
        ctx.pf(r['Press. conc.'])
        + ctx.pf(r['Des C'])
        + ctx.pf(r['Crt D'])
        + ctx.pf(r['Blq'])
      ),
      int,
    ),
    metric(
      'lancesGanhosSemFalta90',
      'Lances disputados e ganhos sem falta /90',
      'defending',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Press. conc.'])
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Blq']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'pctLancesGanhos',
      '% Lances disputados e ganhos',
      'defending',
      (r, ctx) => {
        const disputed = (
          ctx.pf(r['Faltas Cometidas'])
          + ctx.pf(r['Press. tent.'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Blq'])
        )
        const won = (
          ctx.pf(r['Press. conc.'])
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Blq'])
        )
        return ctx.pct(won, disputed)
      },
      pct1,
    ),
    metric('passesTentados', 'Passes Tentados', 'passing', (r, ctx) => ctx.pf(r['Pas A']), int),
    metric('passesT90', 'Passe Tentados/ 90', 'passing', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Pas A']), ctx.j90)
    ), { decimals: 2 }),
    metric('passesCertos', 'Passes Completados', 'passing', (r, ctx) => ctx.pf(r['Ps C']), int),
    metric('passesC90', 'Passes completados /90', 'passing', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Ps C']), ctx.j90)
    ), { decimals: 2 }),
    metric('pctPassesCertos', '% Passes Certos', 'passing', (r, ctx) => (
      ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A']))
    ), pct2),
    metric(
      'passesErrados',
      'Passes errados',
      'passing',
      (r, ctx) => (
        ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])
        + ctx.pf(r['Cr T']) - ctx.pf(r['Cr C'])
      ),
      lowerInt,
    ),
    metric(
      'passErr90',
      'Passes errados / 90',
      'passing',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])
          + ctx.pf(r['Cr T']) - ctx.pf(r['Cr C']),
        ctx.j90,
      ),
      { ...lower, decimals: 2 },
    ),
    metric(
      'umPasseErradoCada',
      'Um passe errado a cada...',
      'passing',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Pas A']),
        ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']),
      ),
      { decimals: 2 },
    ),
    metric(
      'passesCurtos',
      'Passes que são curtos',
      'passing',
      (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['PeP']),
      int,
    ),
    metric(
      'passesCurtos90',
      'Passes curtos e certos /90',
      'passing',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['PeP']), ctx.j90),
      { decimals: 2 },
    ),
    metric('passesProgressao', 'Passe que são em progressão', 'passing', (r, ctx) => (
      ctx.pf(r['PeP'])
    ), int),
    metric('passProg90', 'Passes em progressão/90', 'passing', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['PeP']), ctx.j90)
    ), { decimals: 2 }),
    metric(
      'pctPassesProgressao',
      '% Passes em progressão em relação aos curtos',
      'passing',
      (r, ctx) => ctx.pct(ctx.pf(r['PeP']), ctx.pf(r['Pas A']) - ctx.pf(r['PeP'])),
      pct2,
    ),

    // Creation and individual actions (BH:BZ).
    metric('cruzTentados', 'Cruzamentos Tentados', 'creation', (r, ctx) => ctx.pf(r['Cr T']), int),
    metric('cruzT90', 'Cruzamentos T/90', 'creation', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Cr T']), ctx.j90)
    ), { decimals: 2 }),
    metric('cruzConseguidos', 'Cruzamentos Conseguidos', 'creation', (r, ctx) => (
      ctx.pf(r['Cr C'])
    ), int),
    metric('cruzC90', 'Cruzamentos C/90', 'creation', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Cr C']), ctx.j90)
    ), { decimals: 2 }),
    metric('pctCruzamentos', 'Cruzamentos', 'creation', (r, ctx) => (
      ctx.pct(ctx.pf(r['Cr C']), ctx.pf(r['Cr T']))
    ), pct1),
    metric('passesDecisivos', 'Passes Decisivos', 'creation', (r, ctx) => (
      ctx.pf(r['Passes Ch'])
    ), int),
    metric('passD90', 'Pass Decisivos / 90', 'creation', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90)
    ), { decimals: 2 }),
    metric(
      'minPorChancePerigo',
      'Minutos pra criar uma chance de perigo',
      'creation',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Minutos']),
        ctx.pf(r['OCG']) + ctx.pf(r['Passes Ch']) + ctx.pf(r['Rem %']),
      ),
      { ...lower, decimals: 2 },
    ),
    metric(
      'minPorPasseDecisivo',
      'Minutos pra fazer um Passe Decisivo',
      'creation',
      (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Passes Ch'])),
      { ...lower, decimals: 2 },
    ),
    metric('assistenciasEsperadas', 'Assistências Esperadas xA', 'creation', (r, ctx) => (
      ctx.pf(r['xA'])
    ), { decimals: 2 }),
    metric(
      'assistDesperdicadas',
      'Assistências Desperdiçadas pela Equipe',
      'creation',
      (r, ctx) => ctx.pf(r['xA']) - ctx.pf(r['Assist.']),
      { decimals: 2 },
    ),
    metric(
      'chancesCriadas',
      'Chances criadas',
      'creation',
      (r, ctx) => (
        ctx.pf(r['Cr C'])
        + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['xA'])
        + ctx.pf(r['OCG'])
      ),
      int,
    ),
    metric(
      'chances90',
      'Chances criadas /90',
      'creation',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr C'])
          + ctx.pf(r['Passes Ch'])
          + ctx.pf(r['xA'])
          + ctx.pf(r['OCG']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric('fintas', 'Fintas', 'physical', (r, ctx) => ctx.pf(r['Fnt']), int),
    metric('fintas90', 'Fintas / 90', 'physical', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90)
    ), { decimals: 2 }),
    metric('desarmesDecisivos', 'Desarmes Decisivos', 'defending', (r, ctx) => (
      ctx.pf(r['Crt D'])
    ), int),
    metric('desarmesDecisivos90', 'Desarmes Decisivos /90', 'defending', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Crt D']), ctx.j90)
    ), { decimals: 2 }),
    metric('errosGol', 'Erros que originaram gol', 'discipline', (r, ctx) => (
      ctx.pf(r['EPG'])
    ), lowerInt),
    metric('erros90', 'Erros que geraram gol/90', 'discipline', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['EPG']), ctx.j90)
    ), { ...lower, decimals: 2 }),

    // Participation, aerial, compound attack/defence and physical (CA:DE).
    metric(
      'participacoes',
      'Participações do jogador (Fintas, passes, etc)',
      'general',
      (r, ctx) => (
        ctx.pf(r['Pas A'])
        + ctx.pf(r['Fnt'])
        + ctx.pf(r['Remates'])
        + ctx.pf(r['OCG'])
        + ctx.pf(r['Fj'])
        + ctx.pf(r['Passes Ch'])
        + ctx.pf(r['T Desa'])
        + ctx.pf(r['Faltas Cometidas'])
        + ctx.pf(r['Crt D'])
        + ctx.pf(r['Crt'])
        + ctx.pf(r['Cr T'])
        + ctx.pf(r['Pens'])
        + ctx.pf(r['Remates em livres'])
        + ctx.pf(r['Cabs'])
      ),
      int,
    ),
    metric(
      'participacoes90',
      'Participação / 90',
      'general',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Pas A'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['Remates'])
          + ctx.pf(r['OCG'])
          + ctx.pf(r['Fj'])
          + ctx.pf(r['Passes Ch'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Faltas Cometidas'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Cr T'])
          + ctx.pf(r['Pens'])
          + ctx.pf(r['Remates em livres'])
          + ctx.pf(r['Cabs']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric('cabsTentados', 'Cabeceios Disputados', 'aerial', (r, ctx) => ctx.pf(r['Cab A']), int),
    metric('cabsT90', 'Cabeceios Disp /90', 'aerial', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90)
    ), { decimals: 2 }),
    metric('cabsGanhos', 'Cabeceios Ganhos', 'aerial', (r, ctx) => ctx.pf(r['Cabs']), int),
    metric('cabsG90', 'Cabeceios G/90', 'aerial', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90)
    ), { decimals: 2 }),
    metric('pctCabsGanhos', '% Cabeceios ganhos', 'aerial', (r, ctx) => (
      ctx.pct(ctx.pf(r['Cabs']), ctx.pf(r['Cab A']))
    ), pct2),
    metric(
      'cabsDecisivos',
      'Cabeceios que evitaram jogada ofensiva',
      'aerial',
      (r, ctx) => ctx.pf(r['Cab Dec/90']) * ctx.j90,
      int,
    ),
    metric('cabDec90', 'Cabs que evitaram jogada ofensiva /90', 'aerial', (r, ctx) => (
      ctx.pf(r['Cab Dec/90'])
    ), { decimals: 2 }),
    metric(
      'bolasRoubadas',
      'Bolas roubadas',
      'defending',
      (r, ctx) => (
        ctx.pf(r['Crt D']) * 0.5
        + ctx.pf(r['Des C'])
        + ctx.pf(r['Crt'])
        + ctx.pf(r['Cab Dec/90']) * ctx.j90
      ),
      int,
    ),
    metric(
      'bolasRob90',
      'Bolas roubadas / 90',
      'defending',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Crt D']) * 0.5
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Cab Dec/90']) * ctx.j90,
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'movOfTentados',
      'Movimentos ofensivos tentados',
      'attacking',
      (r, ctx) => (
        ctx.pf(r['Cr T'])
        + ctx.pf(r['Fnt'])
        + ctx.pf(r['Remates'])
        + ctx.pf(r['OCG'])
        + ctx.pf(r['Passes Ch'])
      ),
      int,
    ),
    metric(
      'movOfConseguidos',
      'Movimentos ofensivos conseguidos',
      'attacking',
      (r, ctx) => (
        ctx.pf(r['Cr C'])
        + ctx.pf(r['Passes Ch']) * 1.5
        + ctx.pf(r['Rem %'])
        + ctx.pf(r['Fnt'])
        + ctx.pf(r['OCG'])
      ),
      int,
    ),
    metric(
      'movOf90',
      'Mov Of / 90',
      'attacking',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cr C'])
          + ctx.pf(r['Passes Ch']) * 1.5
          + ctx.pf(r['Rem %'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['OCG']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'pctMovOfSucesso',
      'Movimentos ofensivos com sucesso',
      'attacking',
      (r, ctx) => {
        const attempted = (
          ctx.pf(r['Cr T'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['Remates'])
          + ctx.pf(r['OCG'])
          + ctx.pf(r['Passes Ch'])
        )
        const completed = (
          ctx.pf(r['Cr C'])
          + ctx.pf(r['Passes Ch']) * 1.5
          + ctx.pf(r['Rem %'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['OCG'])
        )
        return ctx.pct(completed, attempted)
      },
      pct2,
    ),
    metric(
      'lancesDefTentados',
      'Lances defensivos tentados',
      'defending',
      (r, ctx) => (
        ctx.pf(r['EPG']) * 3
        + ctx.pf(r['Amr']) * 1.33
        + ctx.pf(r['Cartões vermelhos']) * 2
        + ctx.pf(r['Cab A'])
        + ctx.pf(r['T Desa'])
        + ctx.pf(r['Crt'])
        + ctx.pf(r['Alívios'])
        + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Faltas Cometidas'])
      ),
      int,
    ),
    metric(
      'lancesDefT90',
      'Lances DEF tentados / 90',
      'defending',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['EPG']) * 3
          + ctx.pf(r['Amr']) * 1.33
          + ctx.pf(r['Cartões vermelhos']) * 2
          + ctx.pf(r['Cab A'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Faltas Cometidas']),
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'lancesDefConseguidos',
      'Lances defensivos conseguidos',
      'defending',
      (r, ctx) => (
        ctx.pf(r['Cabs'])
        + ctx.pf(r['Des C'])
        + ctx.pf(r['Crt D'])
        + ctx.pf(r['Alívios'])
        + ctx.pf(r['Blq'])
        + ctx.pf(r['Rems Bloq'])
        + ctx.pf(r['Crt'])
        + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5
      ),
      int,
    ),
    metric(
      'lancesDefC90',
      'Lances DEF conseguidos / 90',
      'defending',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cabs'])
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5,
        ctx.j90,
      ),
      { decimals: 2 },
    ),
    metric(
      'errosDefensivos',
      'Erros Defensivos',
      'discipline',
      (r, ctx) => (
        ctx.pf(r['EPG']) * 3
        + ctx.pf(r['Amr']) * 1.25
        + ctx.pf(r['Cartões vermelhos']) * 2
        + ctx.pf(r['Faltas Cometidas'])
      ),
      lowerInt,
    ),
    metric(
      'errosDefensivos90',
      'Erros Defensivos /90',
      'discipline',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['EPG']) * 3
          + ctx.pf(r['Amr']) * 1.25
          + ctx.pf(r['Cartões vermelhos']) * 2
          + ctx.pf(r['Faltas Cometidas']),
        ctx.j90,
      ),
      { ...lower, decimals: 2 },
    ),
    metric(
      'eficaciaDefensiva',
      'Eficácia defensiva',
      'defending',
      (r, ctx) => {
        const attempted = (
          ctx.pf(r['EPG']) * 3
          + ctx.pf(r['Amr']) * 1.33
          + ctx.pf(r['Cartões vermelhos']) * 2
          + ctx.pf(r['Cab A'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Faltas Cometidas'])
        )
        const completed = (
          ctx.pf(r['Cabs'])
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        )
        return ctx.pct(completed, attempted)
      },
      pct2,
    ),
    metric(
      'sucessoOverall',
      'Sucesso (Overall)',
      'general',
      (r, ctx) => {
        const attackingAttempted = (
          ctx.pf(r['Cr T'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['Remates'])
          + ctx.pf(r['OCG'])
          + ctx.pf(r['Passes Ch'])
        )
        const attackingCompleted = (
          ctx.pf(r['Cr C'])
          + ctx.pf(r['Passes Ch']) * 1.5
          + ctx.pf(r['Rem %'])
          + ctx.pf(r['Fnt'])
          + ctx.pf(r['OCG'])
        )
        const defensiveAttempted = (
          ctx.pf(r['EPG']) * 3
          + ctx.pf(r['Amr']) * 1.33
          + ctx.pf(r['Cartões vermelhos']) * 2
          + ctx.pf(r['Cab A'])
          + ctx.pf(r['T Desa'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Faltas Cometidas'])
        )
        const defensiveCompleted = (
          ctx.pf(r['Cabs'])
          + ctx.pf(r['Des C'])
          + ctx.pf(r['Crt D'])
          + ctx.pf(r['Alívios'])
          + ctx.pf(r['Blq'])
          + ctx.pf(r['Rems Bloq'])
          + ctx.pf(r['Crt'])
          + ctx.pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        )
        return ctx.pct(
          defensiveCompleted + attackingCompleted,
          attackingAttempted + defensiveAttempted,
        )
      },
      pct2,
    ),
    metric('distancia', 'Distância Percorrida', 'physical', (r, ctx) => (
      ctx.pf(r['Distância'])
    ), { decimals: 1 }),
    metric('dist90', 'Dist / 90', 'physical', (r, ctx) => (
      ctx.sDiv(ctx.pf(r['Distância']), ctx.j90)
    ), { decimals: 2 }),
    metric('sprintsTotal', 'Sprints (Total)', 'physical', (r, ctx) => (
      ctx.pf(r['Sprints/90']) * ctx.j90
    ), int),
    metric('sprints90', 'Sprints / 90', 'physical', (r, ctx) => (
      ctx.pf(r['Sprints/90'])
    ), { decimals: 2 }),
    metric(
      'posseDesperdicada',
      'Posse Desperdiçada',
      'passing',
      (r, ctx) => (
        ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])
        + ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])
        + ctx.pf(r['Cr T']) - ctx.pf(r['Cr C'])
      ),
      lowerInt,
    ),
    metric(
      'posseDesperdicada90',
      'Posse Desperdiçada /90',
      'passing',
      (r, ctx) => ctx.sDiv(
        ctx.pf(r['Cab A']) - ctx.pf(r['Cabs'])
          + ctx.pf(r['Pas A']) - ctx.pf(r['Ps C'])
          + ctx.pf(r['Cr T']) - ctx.pf(r['Cr C']),
        ctx.j90,
      ),
      { ...lower, decimals: 2 },
    ),
    metric('possPerd90', 'Posse perdida /90', 'passing', (r, ctx) => (
      ctx.pf(r['Poss Perd/90'])
    ), { ...lower, decimals: 2 }),
    metric('notaMedia', 'Nota média', 'general', (r, ctx) => (
      ctx.pf(r['Classificação'])
    ), { decimals: 2 }),
  ],

  defaultTableColumns: DEFAULT_TABLE_COLUMNS,
}
