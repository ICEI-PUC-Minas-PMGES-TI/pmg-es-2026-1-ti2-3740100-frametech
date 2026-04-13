###  Processo 4 - Solicitação de serviços

O processo de solicitação de serviços tem como objetivo permitir que o cliente solicite, receba propostas, aprove e finalize a contratação de um serviço de forma organizada.

<img width="1984" height="1063" alt="PROCESSO 4 - Solicitação de serviços Diagrama (3)" src="https://github.com/user-attachments/assets/f6aae1dd-11cc-4d2c-b8e3-d24e24075e95" />


**Atividade: Fazer login / cadastro**

| Campo    | Tipo           | Restrições               | Valor default |
| -------- | -------------- | ------------------------ | ------------- |
| email    | Caixa de texto | formato de e-mail        | ---           |
| senha    | Caixa de texto | mínimo 6 caracteres      | ---           |

| Comando   | Destino                      | Tipo    |
| --------- | ---------------------------- | ------- |
| Entrar    | Atividade: Solicitar Serviço | default |
| Cadastrar | Fluxo de cadastro            | default |

------------------------------------------------------------------------------------

**Atividade: Solicitar Serviço**

| Campo         | Tipo           | Restrições  | Valor default |
| ------------- | -------------- | ----------- | ------------- |
| tipo_servico  | Seleção única  | obrigatório | ---           |
| data_evento   | Data           | obrigatório | ---           |
| local         | Caixa de texto | obrigatório | ---           |
| descricao     | Área de texto  | opcional    | ---           |

| Comando | Destino                                             | Tipo    |
| ------- | --------------------------------------------------- | ------- |
| Avançar | Atividade: Preencher dados e enviar solicitação     | default |
| Cancelar| Fim do Processo                                     | cancel  |

------------------------------------------------------------------------------------

**Atividade: Preencher dados e enviar solicitação**

| Campo            | Tipo          | Restrições | Valor default |
| ---------------- | ------------- | ---------- | ------------- |
| detalhes_servico | Área de texto | obrigatório| ---           |
| anexos           | Upload        | opcional   | ---           |

| Comando | Destino                        | Tipo    |
| ------- | ------------------------------ | ------- |
| Enviar  | Atividade: Receber solicitação | default |
| Voltar  | Atividade: Solicitar Serviço   | cancel  |

------------------------------------------------------------------------------------

**Atividade: Receber solicitação**

| Campo             | Tipo    | Restrições | Valor default |
| ----------------- | ------- | ---------- | ------------- |
| dados_solicitacao | Interno | automático | ---           |

| Comando  | Destino                                              | Tipo    |
| -------- | ---------------------------------------------------- | ------- |
| Processar| Atividade: Notificar prestador                       | default |

------------------------------------------------------------------------------------

**Atividade: Notificar prestador**

| Campo      | Tipo    | Restrições | Valor default |
| ---------- | ------- | ---------- | ------------- |
| prestador  | Interno | automático | ---           |

| Comando | Destino                           | Tipo    |
| ------- | --------------------------------- | ------- |
| Enviar  | Atividade: Analisar solicitação   | default |

------------------------------------------------------------------------------------

**Atividade: Analisar solicitação**

| Campo         | Tipo          | Restrições | Valor default |
| ------------- | ------------- | ---------- | ------------- |
| dados_servico | Área de texto | leitura    | ---           |

| Comando | Destino                                | Tipo    |
| ------- | -------------------------------------- | ------- |
| Aceitar | Atividade: Enviar orçamento ao cliente | default |
| Recusar | Procurar outro prestador               | cancel  |

------------------------------------------------------------------------------------

**Atividade: Enviar orçamento ao cliente**

| Campo     | Tipo          | Restrições  | Valor default |
| --------- | ------------- | ----------- | ------------- |
| valor     | Número        | obrigatório | ---           |
| descricao | Área de texto | opcional    | ---           |

| Comando | Destino                      | Tipo    |
| ------- | ---------------------------- | ------- |
| Enviar  | Atividade: Analisar proposta | default |

------------------------------------------------------------------------------------

**Atividade: Analisar proposta**

| Campo    | Tipo          | Restrições | Valor default |
| -------- | ------------- | ---------- | ------------- |
| proposta | Área de texto | leitura    | ---           |

| Comando | Destino                        | Tipo    |
| ------- | ------------------------------ | ------- |
| Aceitar | Atividade: Realizar pagamento  | default |
| Recusar | Atividade: Reenviar proposta   | cancel  |

------------------------------------------------------------------------------------

**Atividade: Reenviar proposta**

| Campo      | Tipo          | Restrições | Valor default |
| ---------- | ------------- | ---------- | ------------- |
| observacao | Área de texto | opcional   | ---           |

| Comando | Destino                         | Tipo    |
| ------- | ------------------------------- | ------- |
| Enviar  | Atividade: Analisar solicitação | default |

------------------------------------------------------------------------------------

**Atividade: Realizar pagamento**

| Campo            | Tipo           | Restrições  | Valor default |
| ---------------- | -------------- | ----------- | ------------- |
| metodo_pagamento | Seleção única  | obrigatório | ---           |
| valor            | Número         | automático  | ---           |

| Comando | Destino         | Tipo    |
| ------- | --------------- | ------- |
| Pagar   | Fim do Processo | default |
| Cancelar| Fim do Processo | cancel  |
