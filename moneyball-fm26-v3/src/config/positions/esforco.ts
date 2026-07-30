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
      decimals: 0,
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
      decimals: 0,
    },
    {
      key: 'dist90',
      label: 'Dist / 90',
      category: 'physical',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Distância']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'velocidadeMedia',
      label: 'Velocidade Média (em km/h)',
      category: 'physical',
      formula: (r, ctx) => {
        const distKm = ctx.pf(r['Distância'])
        const minutos = ctx.pf(r['Minutos'])
        if (minutos === 0) return 0
        return ctx.rnd((((distKm * 1000) / (minutos * 60)) * 3600) / 1000, 4)
      },
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 4,
      description: 'Velocidade média em km/h calculada a partir de distância total e minutos jogados',
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
      label: 'Pressões T /90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. tent.']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pressoesConcluidas',
      label: 'Pressões concluídas',
      category: 'pressing',
      formula: (r, ctx) => ctx.pf(r['Press. conc.']),
      displayInTable: false,
      lowerIsBetter: false,
      format: 'integer',
    },
    {
      key: 'pressoesC90',
      label: 'Pressões C /90',
      category: 'pressing',
      formula: (r, ctx) => ctx.sDiv(ctx.pf(r['Press. conc.']), ctx.j90),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    {
      key: 'pctDesPressoes',
      label: '% Des + Pressões concluídas',
      category: 'pressing',
      formula: (r, ctx) => ctx.pct(ctx.pf(r['Press. conc.']), ctx.pf(r['Press. tent.'])),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'percentage',
      decimals: 2,
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
      decimals: 1,
      description: 'Valor já por 90 min (coluna raw "Des Dec/90")',
    },
    {
      key: 'sprints90',
      label: 'Sprints /90',
      category: 'physical',
      formula: (r, ctx) => ctx.pf(r['Sprints/90']),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
    },
    // ── discipline ───────────────────────────────────────────
    {
      key: 'errosGeraramGol',
      label: 'Erros que geraram gol adversário',
      category: 'discipline',
      formula: (r, ctx) => ctx.pf(r['EPG']),
      displayInTable: false,
      lowerIsBetter: true,
      format: 'integer',
    },
    {
      key: 'erros90',
      label: 'Erros que originaram gols /90',
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
        const dist90 = ctx.j90 === 0 ? 0 : dist / ctx.j90
        const presT = ctx.pf(r['Press. tent.'])
        const presC = ctx.pf(r['Press. conc.'])
        const desC90 = ctx.j90 === 0 ? 0 : ctx.pf(r['Des C']) / ctx.j90
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
      label: 'Nota média',
      category: 'general',
      formula: (r, ctx) => ctx.pf(r['Classificação']),
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
      decimals: 2,
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
