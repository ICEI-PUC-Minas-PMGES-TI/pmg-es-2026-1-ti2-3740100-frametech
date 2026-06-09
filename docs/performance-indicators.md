## 5. Indicadores de desempenho




| Indicador                                        | Objetivos                                                               | Descrição                                                                                               | Fonte de dados                                 | Fórmula de cálculo                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Taxa de solicitações atendidas                   | Medir a eficiência no atendimento e conversão das demandas dos clientes | Mede o percentual de solicitações que foram concluídas com sucesso                                      | Tabela Solicitação                             | (número de solicitações com STATUS = 'Atendida' / número total de solicitações) * 100            |
| Taxa de eventos concluídos pelos confirmados     | Monitorar a eficiência na execução dos eventos confirmados              | Mede o percentual de eventos concluídos em relação aos eventos confirmados                              | Tabela Evento                                  | (número de eventos com STATUS = 'Concluído' / número de eventos com STATUS = 'Confirmado') * 100 |
| Percentual de pagamentos aprovados               | Controlar a eficiência dos pagamentos realizados pelos clientes         | Mede a porcentagem de pagamentos aprovados em relação ao total registrado                               | Tabela Pagamento                               | (número de pagamentos com STATUS = 'Aprovado' / número total de pagamentos) * 100                |
| Índice de alocação de equipamentos por categoria | Avaliar a utilização dos equipamentos por categoria nos eventos         | Mede a proporção de equipamentos alocados em cada categoria em relação ao total disponível da categoria | Tabela Equipamento e Tabela Evento_Equipamento | (quantidade de equipamentos alocados da categoria / total de equipamentos da categoria) * 100    |


