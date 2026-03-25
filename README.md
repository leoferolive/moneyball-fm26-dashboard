# Moneyball FM26 Dashboard

Dashboard analítico para Football Manager 2026 com scoring personalizado, gráficos interativos e comparação de jogadores.

Inspirado em plataformas como FBref, StatsBomb e Opta — foco em dados, limpeza visual e profundidade analítica.

## Features

- **10 posições** — Goleiros, Zagueiros, Laterais, Volantes, B2B, Armadores, Avançados, Esforço, Time e Overall
- **760+ métricas derivadas** — portadas fielmente da planilha Moneyball FM26.xlsm
- **Scoring personalizado** — escolha métricas, ajuste pesos com sliders, salve perfis
- **Importação flexível** — paste ou drag-and-drop de CSV/TSV com auto-detecção de formato e posição
- **Tabela interativa** — sorting, heatmap condicional, zebra striping, modal de detalhes
- **Gráficos** — Radar, Scatter Plot, Histograma de distribuição (Recharts)
- **Comparação** — selecione 2-4 jogadores para radar overlay e tabela lado a lado
- **Filtros avançados** — idade, minutos, nota FM, clube, nacionalidade, faixa de score
- **Persistência** — dados salvos no IndexedDB (sobrevive refresh)
- **Tema dark/light**

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Estilização | Tailwind CSS v4 |
| Gráficos | Recharts |
| Persistência | IndexedDB (Dexie.js) |
| Estado | Zustand |
| Virtual scroll | @tanstack/react-virtual |
| Testes | Vitest |

100% client-side — sem backend.

## Quick Start

```bash
cd moneyball-fm26-v3

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes
npm test

# Build para produção
npm run build
```

Acesse `http://localhost:5173` e cole dados exportados do FM26.

## Como Usar

1. No Football Manager 26, exporte a view de jogadores (Ctrl+A → Ctrl+C)
2. No dashboard, selecione a posição na aba correspondente
3. Cole os dados no campo de importação (Ctrl+V) ou arraste um arquivo .csv/.tsv
4. O sistema detecta automaticamente o separador (tab, ponto-e-vírgula, vírgula)
5. Explore a tabela, aplique filtros, crie scoring personalizado ou compare jogadores

## Estrutura do Repositório

```
.
├── README.md                        # Este arquivo
├── CLAUDE.md                        # Instruções para o Claude Code
├── Moneyball FM26.xlsm              # Planilha Excel (fonte das fórmulas)
├── moneyball_fm26_planilha.html     # Dashboard v1 (arquivo único, referência)
└── moneyball-fm26-v3/               # Dashboard v3 (React + Vite)
    ├── src/
    │   ├── engine/                  # Parser, derive, scorer, filters, statistics
    │   ├── config/positions/        # 10 configs com 760+ métricas derivadas
    │   ├── db/                      # IndexedDB via Dexie.js
    │   ├── hooks/                   # React hooks customizados
    │   ├── store/                   # Zustand (estado UI)
    │   ├── components/              # Componentes organizados por domínio
    │   ├── pages/                   # Dashboard, Gráficos, Comparação
    │   └── types/                   # TypeScript types
    ├── package.json
    └── vite.config.ts
```

## Fluxo de Dados

```
Paste/CSV → smartParse() → detectPosition() → derive() → IndexedDB → UI
                                                  ↓
                                          scorer() ← ScoringProfile (pesos do usuário)
```

## Scoring Personalizado

Diferente de um score fixo, o sistema permite que o usuário:
- Selecione quais métricas compõem o ranking
- Ajuste o peso de cada métrica via sliders (0-100)
- Salve perfis de scoring no IndexedDB para reutilização
- Compare diferentes perfis táticos (ex: "Zagueiro Aéreo" vs "Zagueiro Construtor")

## Licença

MIT
