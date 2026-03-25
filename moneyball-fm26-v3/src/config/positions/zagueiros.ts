import type { PositionConfig } from './types.ts'

export const zagueirosConfig: PositionConfig = {
  key: 'zagueiros',
  emoji: '🧱',
  name: 'Zagueiros',

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

  metrics: [
    // ── general ──────────────────────────────────────────────
    {
      key: 'jogosCompletos',
      label: 'Jogos completos',
      category: 'general',
      formula: (_r, ctx) => ctx.j90,
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'jogosTotais',
      label: 'Jogos Totais',
      category: 'general',
      formula: (r, ctx) => ctx.pf(r['Presenças']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'minPartida',
      label: 'Min/partida',
      category: 'general',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['Presenças'])),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },

    // ── attacking ───────────────────────────────────────────
    {
      key: 'gols',
      label: 'Gols',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Golos']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'golsAst',
      label: 'Gols+Ast',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Golos']) + ctx.pf(r['Assist.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'gols90',
      label: 'Gols/90',
      category: 'attacking',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'ga90',
      label: 'G+A/90',
      category: 'attacking',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Golos']) + ctx.pf(r['Assist.']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xG',
      label: 'xG',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['xG']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xG90',
      label: 'xG/90',
      category: 'attacking',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xG']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'npxG',
      label: 'npxG',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['xG']) - ctx.pf(r['Pens']) * 0.79,
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'npxG90',
      label: 'npxG/90',
      category: 'attacking',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const npxG = pf(r['xG']) - pf(r['Pens']) * 0.79
        return sDiv(npxG, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pensBatidos',
      label: 'Pênaltis batidos',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Pens']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pensMarcados',
      label: 'Pênaltis marcados',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Pens M']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pensPerdidos',
      label: 'Pênaltis perdidos',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Pens']) - ctx.pf(r['Pens M']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'pctConversaoPen',
      label: '% Conversão Pen',
      category: 'attacking',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Pens M']), ctx.pf(r['Pens'])),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'fintas',
      label: 'Fintas',
      category: 'attacking',
      formula: (r, ctx) => ctx.pf(r['Fnt']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'fintas90',
      label: 'Fintas/90',
      category: 'attacking',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Fnt']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── creation ────────────────────────────────────────────
    {
      key: 'assist',
      label: 'Assist',
      category: 'creation',
      formula: (r, ctx) => ctx.pf(r['Assist.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'xA',
      label: 'xA',
      category: 'creation',
      formula: (r, ctx) => ctx.pf(r['xA']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xA90',
      label: 'xA/90',
      category: 'creation',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['xA']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xaNpxG',
      label: 'xA + npxG',
      category: 'creation',
      formula: (r, ctx) => {
        const { pf } = ctx
        const npxG = pf(r['xG']) - pf(r['Pens']) * 0.79
        return pf(r['xA']) + npxG
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'xaNpxG90',
      label: 'xA+npxG/90',
      category: 'creation',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const npxG = pf(r['xG']) - pf(r['Pens']) * 0.79
        return sDiv(pf(r['xA']) + npxG, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'passesDecisivos',
      label: 'Passes Decisivos',
      category: 'creation',
      formula: (r, ctx) => ctx.pf(r['Passes Ch']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passD90',
      label: 'Pass D/90',
      category: 'creation',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Passes Ch']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── general (HdJ) ──────────────────────────────────────
    {
      key: 'hdj',
      label: 'HdJ',
      category: 'general',
      formula: (r, ctx) => ctx.pf(r['HdJ']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'minPorHdJ',
      label: 'Min p/ HdJ',
      category: 'general',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Minutos']), ctx.pf(r['HdJ'])),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'pctHdJ',
      label: '% HdJ',
      category: 'general',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['HdJ']), ctx.pf(r['Presenças'])),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },

    // ── discipline ──────────────────────────────────────────
    {
      key: 'errosGol',
      label: 'Erros gol',
      category: 'discipline',
      formula: (r, ctx) => ctx.pf(r['EPG']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'erros90',
      label: 'Erros/90',
      category: 'discipline',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['EPG']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'cartoesAmarelos',
      label: 'Cartões Amarelos',
      category: 'discipline',
      formula: (r, ctx) => ctx.pf(r['Amr']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'cartoesVermelhos',
      label: 'Cartões Vermelhos',
      category: 'discipline',
      formula: (r, ctx) => ctx.pf(r['Cartões vermelhos']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'totalCartoes',
      label: 'Total Cartões',
      category: 'discipline',
      formula: (r, ctx) => ctx.pf(r['Amr']) + ctx.pf(r['Cartões vermelhos']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'faltas90',
      label: 'Faltas/90',
      category: 'discipline',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Faltas Cometidas']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },

    // ── aerial ──────────────────────────────────────────────
    {
      key: 'cabsTentados',
      label: 'Cabeceios Tentados',
      category: 'aerial',
      formula: (r, ctx) => ctx.pf(r['Cabs']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'cabsT90',
      label: 'Cabs T/90',
      category: 'aerial',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'cabsGanhos',
      label: 'Cabeceios Ganhos',
      category: 'aerial',
      formula: (r, ctx) => ctx.pf(r['Cab A']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'cabsG90',
      label: 'Cabs G/90',
      category: 'aerial',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cab A']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctCabsGanhos',
      label: '% Cabs Ganhos',
      category: 'aerial',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Cab A']), ctx.pf(r['Cabs'])),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'cabsPerdidos',
      label: 'Cabs Perdidos',
      category: 'aerial',
      formula: (r, ctx) => ctx.pf(r['Cabs']) - ctx.pf(r['Cab A']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'cabsPerdidos90',
      label: 'Cabs Perdidos/90',
      category: 'aerial',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Cabs']) - ctx.pf(r['Cab A']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'cabDec90',
      label: 'Cab Dec/90',
      category: 'aerial',
      formula: (r, ctx) => ctx.pf(r['Cab Dec/90']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── defending ───────────────────────────────────────────
    {
      key: 'interceptacoes',
      label: 'Interceptações',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Crt D']) + ctx.pf(r['Blq']) + ctx.pf(r['Rems Bloq']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'interceptacoes90',
      label: 'Interceptações/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const total = pf(r['Crt D']) + pf(r['Blq']) + pf(r['Rems Bloq'])
        return sDiv(total, ctx.j90)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'rematesBloqueados',
      label: 'Remates Bloqueados',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Rems Bloq']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'remBloq90',
      label: 'Rem Bloq/90',
      category: 'defending',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Rems Bloq']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'alivios',
      label: 'Alívios',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Alívios']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'alivios90',
      label: 'Alívios/90',
      category: 'defending',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Alívios']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'desarmesTentados',
      label: 'Desarmes Tentados',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['T Desa']) + ctx.pf(r['Faltas Cometidas']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'desT90',
      label: 'Des T/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        return sDiv(pf(r['T Desa']) + pf(r['Faltas Cometidas']), ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'desarmesGanhos',
      label: 'Desarmes Ganhos',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Des C']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'desG90',
      label: 'Des G/90',
      category: 'defending',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'driblesSofridos',
      label: 'Dribles Sofridos',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['T Desa']) - ctx.pf(r['Des C']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'driblesSof90',
      label: 'Dribles Sof/90',
      category: 'defending',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['T Desa']) - ctx.pf(r['Des C']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctDesGanhos',
      label: '% Des Ganhos',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const desT = pf(r['T Desa']) + pf(r['Faltas Cometidas'])
        return pct(pf(r['Des C']), desT)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'bolasInterceptadas',
      label: 'Bolas Interceptadas',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Crt D']) + pf(r['Blq']) + pf(r['Rems Bloq'])
          + pf(r['Alívios']) + pf(r['Cab Dec/90']) * ctx.j90 * 0.5
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'bolasInt90',
      label: 'Bolas Int/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const total = pf(r['Crt D']) + pf(r['Blq']) + pf(r['Rems Bloq'])
          + pf(r['Alívios']) + pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        return sDiv(total, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'bolasRoubadas',
      label: 'Bolas Roubadas',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Press. conc.']) + pf(r['Des C']) + pf(r['Blq']) * 0.5
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'bolasRob90',
      label: 'Bolas Rob/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const total = pf(r['Press. conc.']) + pf(r['Des C']) + pf(r['Blq']) * 0.5
        return sDiv(total, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'lancesDefTentados',
      label: 'Lances Def Tentados',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf } = ctx
        return (pf(r['EPG']) * 3)
          + (pf(r['Amr']) * 1.33)
          + (pf(r['Cartões vermelhos']) * 2)
          + pf(r['Cabs'])
          + pf(r['T Desa'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Faltas Cometidas'])
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'lancesDefT90',
      label: 'Lances Def T/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const total = (pf(r['EPG']) * 3)
          + (pf(r['Amr']) * 1.33)
          + (pf(r['Cartões vermelhos']) * 2)
          + pf(r['Cabs'])
          + pf(r['T Desa'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Faltas Cometidas'])
        return sDiv(total, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'lancesDefConseguidos',
      label: 'Lances Def Conseguidos',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf } = ctx
        return pf(r['Cab A'])
          + pf(r['Des C'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Cab Dec/90']) * ctx.j90 * 0.5
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'lancesDefC90',
      label: 'Lances Def C/90',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, sDiv } = ctx
        const total = pf(r['Cab A'])
          + pf(r['Des C'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        return sDiv(total, ctx.j90)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'eficaciaDefensiva',
      label: 'Eficácia Defensiva',
      category: 'defending',
      formula: (r, ctx) => {
        const { pf, pct } = ctx
        const lancesT = (pf(r['EPG']) * 3)
          + (pf(r['Amr']) * 1.33)
          + (pf(r['Cartões vermelhos']) * 2)
          + pf(r['Cabs'])
          + pf(r['T Desa'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Faltas Cometidas'])
        const lancesC = pf(r['Cab A'])
          + pf(r['Des C'])
          + pf(r['Crt D'])
          + pf(r['Alívios'])
          + pf(r['Blq'])
          + pf(r['Rems Bloq'])
          + pf(r['Cab Dec/90']) * ctx.j90 * 0.5
        return pct(lancesC, lancesT)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },

    // ── pressing ────────────────────────────────────────────
    {
      key: 'pressaoT',
      label: 'Pressão T',
      category: 'pressing',
      formula: (r, ctx) => ctx.pf(r['Press. tent.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
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
    {
      key: 'pressaoG',
      label: 'Pressão G',
      category: 'pressing',
      formula: (r, ctx) => ctx.pf(r['Press. conc.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pressaoG90',
      label: 'Pressão G/90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90),
      displayInTable: true,
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

    // ── passing ─────────────────────────────────────────────
    {
      key: 'passesTentados',
      label: 'Passes Tentados',
      category: 'passing',
      formula: (r, ctx) => ctx.pf(r['Pas A']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passesT90',
      label: 'Passes T/90',
      category: 'passing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'passesCertos',
      label: 'Passes Certos',
      category: 'passing',
      formula: (r, ctx) => ctx.pf(r['Ps C']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passesC90',
      label: 'Passes C/90',
      category: 'passing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Ps C']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctPassesCertos',
      label: '% Passes Certos',
      category: 'passing',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Ps C']), ctx.pf(r['Pas A'])),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    {
      key: 'passesCurtos',
      label: 'Passes Curtos',
      category: 'passing',
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['PeP']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passesProgressao',
      label: 'Passes Progressão',
      category: 'passing',
      formula: (r, ctx) => ctx.pf(r['PeP']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'passProg90',
      label: 'Pass Prog/90',
      category: 'passing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['PeP']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'passesErrados',
      label: 'Passes Errados',
      category: 'passing',
      formula: (r, ctx) => ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'passErr90',
      label: 'Pass Err/90',
      category: 'passing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Pas A']) - ctx.pf(r['Ps C']), ctx.j90),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'number',
      decimals: 2,
    },

    // ── physical ────────────────────────────────────────────
    {
      key: 'distancia',
      label: 'Distância',
      category: 'physical',
      formula: (r, ctx) => ctx.pf(r['Distância']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 1,
    },
    {
      key: 'dist90',
      label: 'Dist/90',
      category: 'physical',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'sprints90',
      label: 'Sprints/90',
      category: 'physical',
      formula: (r, ctx) => ctx.pf(r['Sprints/90']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },

    // ── general (nota) ──────────────────────────────────────
    {
      key: 'notaMedia',
      label: 'Nota Média',
      category: 'general',
      formula: (r, ctx) => ctx.pf(r['Classificação']),
      displayInTable: true,
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
        const cabA = pf(r['Cab A']), cabs = pf(r['Cabs'])
        const desC = pf(r['Des C'])
        const intcp = pf(r['Crt']), blq = pf(r['Blq']), remBlq = pf(r['Rems Bloq'])
        const pasA = pf(r['Pas A']), pasC = pf(r['Ps C'])
        const epg = pf(r['EPG'])
        const presT = pf(r['Press. tent.']), presC = pf(r['Press. conc.'])

        const fm = clamp((pf(r['Classificação']) - 5) / 3 * 100, 0, 100)
        const aerS = clamp(sDiv(cabA, j90) / 5 * 100, 0, 100)
        const apS = clamp(pct(cabA, cabs) / 65 * 100, 0, 100)
        const defS = clamp(sDiv(desC, j90) / 4 * 100, 0, 100)
        const intS = clamp(sDiv(intcp + blq + remBlq, j90) / 10 * 100, 0, 100)
        const pssS = clamp((pct(pasC, pasA) - 70) / 25 * 100, 0, 100)
        const errS = clamp(100 - sDiv(epg, j90) * 50, 0, 100)
        const prS = clamp(pct(presC, presT) / 35 * 100, 0, 100)
        const m = aerS * 0.15 + apS * 0.10 + defS * 0.20 + intS * 0.20 + pssS * 0.15 + errS * 0.10 + prS * 0.10
        return clamp(rnd(fm * 0.35 + m * 0.65), 0, 100)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Score Moneyball da planilha original (FM 35% + Métricas 65%)',
    },
  ],

  defaultTableColumns: [
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
  ],
}
