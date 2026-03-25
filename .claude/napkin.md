# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-03-24] Fórmulas vêm da planilha Excel, NÃO do HTML**
   Do instead: Sempre usar `Moneyball FM26.xlsm` como fonte de verdade para métricas derivadas. O HTML tem versões simplificadas/incompletas.

2. **[2026-03-24] pf() é crítico para parsing de números PT-BR**
   Do instead: Toda aritmética com dados FM26 deve passar por pf() antes. Formatos: "1.234,56" (PT-BR) e "1,234.56" (EN). Também remove sufixos (€, km, M €).

3. **[2026-03-24] Implementação em worktree separada**
   Do instead: CLAUDE.md global exige que planos sejam executados em git worktree, não no workspace principal.

## Domain Behavior Guardrails
1. **[2026-03-24] Nomes de colunas FM26 são case-sensitive e exatos**
   Do instead: rawColumns nos configs devem corresponder exatamente aos headers exportados pelo FM26. Qualquer mudança quebra parsing para todos os usuários.

2. **[2026-03-24] UI sempre em PT-BR**
   Do instead: Todo texto visível ao usuário deve ser em português brasileiro. Termos técnicos e nomes de código podem ficar em inglês.

3. **[2026-03-24] Score é 0-100 com badges S/A/B/C**
   Do instead: S ≥70, A ≥50, B ≥30, C <30. Manter essa escala no novo dashboard.

## User Directives
1. **[2026-03-24] Score personalizável com presets + customização**
   Do instead: Não hardcodar fórmula Moneyball. Usuário escolhe colunas e pesos. Oferecer presets por função tática.
