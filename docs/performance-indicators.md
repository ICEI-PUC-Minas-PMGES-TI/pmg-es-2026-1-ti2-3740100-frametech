## 5. Indicadores de desempenho


| **Indicador**                      | **Objetivos**                                                           | **Descrição**                                                             | **Fonte de dados**        | **Fórmula de cálculo**                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| Taxa de solicitações atendidas     | Medir a eficiência no atendimento e conversão das demandas dos clientes | Mede o percentual de solicitações que foram concluídas com sucesso        | Tabela Solicitações       | (número de solicitações com STATUS = 'Atendida' / número total de solicitações) * 100 |
| Taxa de eventos concluídos         | Monitorar a eficiência na finalização dos eventos e projetos            | Mede o percentual de eventos finalizados dentro do período planejado      | Tabela Evento             | (número de eventos com STATUS = 'Concluído' / número total de eventos) * 100          |
| Percentual de pagamentos aprovados | Controlar a eficiência dos pagamentos realizados pelos clientes         | Mede a porcentagem de pagamentos aprovados em relação ao total registrado | Tabela Pagamentos         | (número de pagamentos com STATUS = 'Aprovado' / número total de pagamentos) * 100     |
| Índice de alocação de equipamentos | Avaliar a quantidade média de recursos físicos utilizados por evento    | Mede a média de equipamentos alocados para entender a demanda logística   | Tabela Evento_Equipamento | soma da quantidade de equipamentos / número total de eventos distintos                |


