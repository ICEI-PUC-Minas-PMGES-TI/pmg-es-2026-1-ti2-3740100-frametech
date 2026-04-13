### 3.3.1 Processo 1 –  Gestao do cliente

O processo de gestao do cliente, tem como objetivo organizar o fluxo de atendimento do, desde o acesso ao sistema até a contratação e acompanhamento do serviço.

<img width="2722" height="841" alt="Gestao--Cliente Diagrama" src="https://github.com/user-attachments/assets/8ad94df9-0823-4146-8692-639d9906676d" />



**Login**

| **Campo** | **Tipo**       | **Restrições**         | **Valor default** |
| --------- | -------------- | ---------------------- | ----------------- |
| email     | Caixa de texto | formato de e-mail      | -                 |
| senha     | Caixa de texto | mínimo de 8 caracteres | -                 |

| **Comandos** | **Destino**       | **Tipo** |
| ------------ | ----------------- | -------- |
| entrar       | Solicitar Serviço | default  |
| cadastrar    | Cadastro          | default  |

------------------------------------------------------------------------------------
**Cadastro**
| **Campo** | **Tipo**       | **Restrições**         | **Valor default** |
| --------- | -------------- | ---------------------- | ----------------- |
| nome      | Caixa de texto | obrigatório            | -                 |
| email     | Caixa de texto | formato de e-mail      | -                 |
| senha     | Caixa de texto | mínimo de 8 caracteres | -                 |
| telefone  | Caixa de texto | formato válido         | -                 |

| **Comandos** | **Destino** | **Tipo** |
| ------------ | ----------- | -------- |
| cadastrar    | Login       | default  |
| cancelar     | Login       | cancel   |

------------------------------------------------------------------------------------

**Solicitaçao de serviços**
| **Campo**       | **Tipo**       | **Restrições**  | **Valor default** |
| --------------- | -------------- | --------------- | ----------------- |
| tipo de serviço | Seleção única  | obrigatório     | -                 |
| descrição       | Área de texto  | obrigatório     | -                 |
| data desejada   | Data           | deve ser futura | -                 |
| local           | Caixa de texto | obrigatório     | -                 |

| **Comandos**       | **Destino**                    | **Tipo** |
| ------------------ | ------------------------------ | -------- |
| enviar solicitação | Informar requisitos do projeto | default  |
| cancelar           | Fim do processo                | cancel   |



------------------------------------------------------------------------------------
**Requisitos do Projeto**
| **Campo**           | **Tipo**      | **Restrições** | **Valor default** |
| ------------------- | ------------- | -------------- | ----------------- |
| detalhes adicionais | Área de texto | opcional       | -                 |
| orçamento estimado  | Número        | ≥ 0            | -                 |
| prazo desejado      | Data          | futura         | -                 |


| **Comandos**      | **Destino**         | **Tipo** |
| ----------------- | ------------------- | -------- |
| enviar requisitos | Receber solicitação | default  |
| cancelar          | Fim do processo     | cancel   |

------------------------------------------------------------------------------------
**Proposta (Cliente)**
| **Campo**             | **Tipo**      | **Restrições** | **Valor default** |
| --------------------- | ------------- | -------------- | ----------------- |
| valor                 | Número        | > 0            | preenchido        |
| prazo de execução     | Data          | válido         | preenchido        |
| descrição da proposta | Área de texto | opcional       | preenchido        |


| **Comandos**     | **Destino**        | **Tipo** |
| ---------------- | ------------------ | -------- |
| aceitar proposta | Realizar pagamento | default  |
| recusar proposta | Fim do processo    | cancel   |


------------------------------------------------------------------------------------
**Pagamento**
| **Campo**           | **Tipo**       | **Restrições** | **Valor default** |
| ------------------- | -------------- | -------------- | ----------------- |
| método de pagamento | Seleção única  | obrigatório    | -                 |
| número do cartão    | Caixa de texto | formato válido | -                 |
| valor               | Número         | automático     | preenchido        |

| **Comandos** | **Destino**       | **Tipo** |
| ------------ | ----------------- | -------- |
| pagar        | Acompanhar pedido | default  |
| cancelar     | Fim do processo   | cancel   |

------------------------------------------------------------------------------------
**Acompanhamento Pedido**
| **Campo**          | **Tipo**       | **Restrições**  | **Valor default** |
| ------------------ | -------------- | --------------- | ----------------- |
| status do serviço  | Caixa de texto | somente leitura | Em andamento      |
| data do serviço    | Data           | somente leitura | preenchido        |
| equipe responsável | Caixa de texto | somente leitura | preenchido        |
| descrição          | Área de texto  | somente leitura | preenchido        |


| **Comandos** | **Destino**       | **Tipo** |
| ------------ | ----------------- | -------- |
| atualizar    | Acompanhar pedido | default  |
| finalizar    | Fim do processo   | default  |

------------------------------------------------------------------------------------
**Solicitação (Admin)**
| **Campo**            | **Tipo**      | **Restrições**  | **Valor default** |
| -------------------- | ------------- | --------------- | ----------------- |
| dados do cliente     | Área de texto | somente leitura | preenchido        |
| descrição do serviço | Área de texto | somente leitura | preenchido        |
| data solicitada      | Data          | somente leitura | preenchido        |

| **Comandos**   | **Destino**                | **Tipo** |
| -------------- | -------------------------- | -------- |
| gerar proposta | Enviar proposta ao cliente | default  |
| rejeitar       | Fim do processo            | cancel   |

------------------------------------------------------------------------------------
**Proposta (Admin)**
| **Campo** | **Tipo**      | **Restrições** | **Valor default** |
| --------- | ------------- | -------------- | ----------------- |
| valor     | Número        | obrigatório    | -                 |
| prazo     | Data          | obrigatório    | -                 |
| descrição | Área de texto | opcional       | -                 |


| **Comandos**    | **Destino**          | **Tipo** |
| --------------- | -------------------- | -------- |
| enviar proposta | Proposta recebida    | default  |
| cancelar        | Analisar solicitação | cancel   |


