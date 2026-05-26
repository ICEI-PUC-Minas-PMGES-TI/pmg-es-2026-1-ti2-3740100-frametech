## 5. Indicadores de desempenho

_Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no modelo relacional. Defina no mínimo 3 indicadores de desempenho._

_Usar o seguinte modelo:_

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |

_Obs.: todas as informações para gerar os indicadores devem estar no modelo relacional._

| **Indicador**                      | **Objetivos**                                                           | **Descrição**                                                             | **Fonte de dados**        | **Fórmula de cálculo**                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| Taxa de solicitações atendidas     | Medir a eficiência no atendimento e conversão das demandas dos clientes | Mede o percentual de solicitações que foram concluídas com sucesso        | Tabela Solicitações       | (número de solicitações com STATUS = 'Atendida' / número total de solicitações) * 100 |
| Taxa de eventos concluídos         | Monitorar a eficiência na finalização dos eventos e projetos            | Mede o percentual de eventos finalizados dentro do período planejado      | Tabela Evento             | (número de eventos com STATUS = 'Concluído' / número total de eventos) * 100          |
| Percentual de pagamentos aprovados | Controlar a eficiência dos pagamentos realizados pelos clientes         | Mede a porcentagem de pagamentos aprovados em relação ao total registrado | Tabela Pagamentos         | (número de pagamentos com STATUS = 'Aprovado' / número total de pagamentos) * 100     |
| Índice de alocação de equipamentos | Avaliar a quantidade média de recursos físicos utilizados por evento    | Mede a média de equipamentos alocados para entender a demanda logística   | Tabela Evento_Equipamento | soma da quantidade de equipamentos / número total de eventos distintos                |


