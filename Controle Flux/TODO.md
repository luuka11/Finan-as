# TODO - Melhorias Controle Flux

## Fase 1: Correções de Bugs (Prioridade Alta)
- [ ] Implementar `calcularTotal()` que soma todos gastos atual.
- [ ] No add: push gasto, calcularTotal(), update lista, grafico, total display.
- [ ] No remove: subtrair valor do total, splice array, re-render lista? No, remove DOM + array, recalcular tudo.
- [ ] Fix `atualizarGrafico()` com reduce para somas corretas por categoria.
- [ ] Melhor validação: descricao trim, valor >0.
- [ ] Teste: Add 2 gastos, remove 1 → total/gráfico corretos.

## Fase 2: Features Core
- [ ] localStorage save/load on init/add/remove.
- [ ] Botão editar por gasto.
- [ ] Filtro por categoria.
- [ ] Responsive CSS.

## Fase 3: Avançado
- [ ] Export CSV.
- [ ] Cores no gráfico por categoria fixa.
- [ ] Limpar dados button.

**Próximo passo: Implementar Fase 1 em app.js**
