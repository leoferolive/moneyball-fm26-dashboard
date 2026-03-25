import type { PositionConfig } from './types.ts'

export const esforcoConfig: PositionConfig = {
  key: 'esforco',
  emoji: '💪',
  name: 'Placar de Esforço',

  rawColumns: [
    'Inf', 'Nação', 'Clube', 'Jogador', 'Idade', 'Minutos',
    'Poss Con/90', 'Press. tent.', 'Press. conc.', 'Distância',
    'Dist/90', 'Des Dec/90', 'Des C', 'Fnt', 'Classificação',
    'EPG', 'Sprints/90', 'Valor Estimado', 'Salário',
    'Recomendação', 'Observação',
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
    // ── physical ─────────────────────────────────────────────
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
      key: 'velocidadeMedia',
      label: 'Velocidade Média',
      category: 'physical',
      formula: (r, ctx) => {
        const distKm = ctx.pf(r['Distância'])
        const minutos = ctx.pf(r['Minutos'])
        // (dist_m / time_s) → m/s → km/h
        return ctx.sDiv(ctx.sDiv(distKm * 1000, minutos * 60) * 3600, 1000)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Velocidade média em km/h calculada a partir de distância total e minutos jogados',
    },
    {
      key: 'sprints90',
      label: 'Sprints/90',
      category: 'physical',
      formula: (r, ctx) => ctx.pf(r['Sprints/90']),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    // ── pressing ─────────────────────────────────────────────
    {
      key: 'pressoesTentadas',
      label: 'Pressões Tentadas',
      category: 'pressing',
      formula: (r, ctx) => ctx.pf(r['Press. tent.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pressoesT90',
      label: 'Pressões T/90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pressoesConcluidas',
      label: 'Pressões Concluídas',
      category: 'pressing',
      formula: (r, ctx) => ctx.pf(r['Press. conc.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pressoesC90',
      label: 'Pressões C/90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctDesPressoes',
      label: '% Des + Pressões',
      category: 'pressing',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 1,
    },
    // ── defending ────────────────────────────────────────────
    {
      key: 'desarmesConseguidos',
      label: 'Desarmes Conseguidos',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Des C']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'desarmesC90',
      label: 'Desarmes C/90',
      category: 'defending',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Des C']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'desarmesDecisivos',
      label: 'Desarmes Decisivos',
      category: 'defending',
      formula: (r, ctx) => ctx.pf(r['Des Dec/90']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Valor já por 90 min (coluna raw "Des Dec/90")',
    },
    // ── discipline ───────────────────────────────────────────
    {
      key: 'errosGeraramGol',
      label: 'Erros que geraram gol',
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
    // ── score ────────────────────────────────────────────────
    {
      key: 'placarEsforco',
      label: 'Placar de Esforço',
      category: 'general',
      formula: (r, ctx) => {
        const dist = ctx.pf(r['Distância'])
        const dist90 = ctx.sDiv(dist, ctx.j90)
        const presT = ctx.pf(r['Press. tent.'])
        const presC = ctx.pf(r['Press. conc.'])
        const desC90 = ctx.sDiv(ctx.pf(r['Des C']), ctx.j90)
        const desDec90 = ctx.pf(r['Des Dec/90'])
        const epg = ctx.pf(r['EPG'])

        return ctx.rnd(
          (dist / 100) * 10
          + (dist90 / 12) * 10
          + (presT / 100) * 10
          + (presC / 50) * 10
          + desC90 * 10
          + (desDec90 / 0.1) * 10
          + epg * -10,
        )
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Placar composto de esforço físico, pressão, desarmes e disciplina',
    },
    // ── general (nota) ───────────────────────────────────────
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
        const { pf, sDiv, clamp, rnd } = ctx
        const j90 = ctx.j90
        const dist = pf(r['Distância'])
        const distP90 = sDiv(dist, j90)
        const presT = pf(r['Press. tent.'])
        const presC = pf(r['Press. conc.'])
        const desC = pf(r['Des C'])
        const desDecPer90 = pf(r['Des Dec/90'])
        const epg = pf(r['EPG'])

        const effortScore = rnd(
          (dist / 100) * 10 +
          (distP90 / 12) * 10 +
          (presT / 100) * 10 +
          (presC / 50) * 10 +
          (sDiv(desC, j90) * 10) +
          ((desDecPer90 / 0.1) * 10) +
          (epg * -10),
        )
        return clamp(rnd(effortScore / 2), 0, 100)
      },
      displayInTable: false,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
      description: 'Placar de esforço da planilha original (effortScore / 2)',
    },
  ],

  defaultTableColumns: [
    'jogosCompletos',
    'dist90',
    'velocidadeMedia',
    'pressoesT90',
    'pressoesC90',
    'pctDesPressoes',
    'desarmesC90',
    'sprints90',
    'erros90',
    'placarEsforco',
    'notaMedia',
  ],
}
