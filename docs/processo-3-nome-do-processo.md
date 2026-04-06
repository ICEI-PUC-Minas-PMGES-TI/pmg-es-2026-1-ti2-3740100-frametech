### 3.3.3 Processo 3 – Gerenciamento de cadastro de equipamentos

O processo de gerenciamento de cadastro de equipamentos tem como objetivo organizar o cadastro, atualização e controle dos equipamentos utilizados nos projetos audiovisuais, garantindo maior eficiência e disponibilidade dos recursos.

![9f4500df-0a1f-4f77-bc21-92a7e054c579](https://github.com/user-attachments/assets/ff1908b6-37f0-476c-bbda-37000cbfb4f3)


**Cadastrar Equipamento**

| **Campo**        | **Tipo**       | **Restrições**                        | **Valor default** |
| ---------------- | -------------- | ------------------------------------- | ----------------- |
| nome_equipamento | Caixa de texto | obrigatório                           |                   |
| descricao        | Área de texto  | opcional                              |                   |
| categoria        | Seleção única  | obrigatório                           |                   |
| quantidade       | Número         | obrigatório (>=1)                     | 1                 |
| data_aquisicao   | Data           | opcional                              |                   |
| status           | Seleção única  | obrigatório (Disponível/Indisponível) | Disponível        |
| imagem           | Imagem         | opcional                              |                   |


| **Comandos** | **Destino**                   | **Tipo** |
| ------------ | ----------------------------- | -------- |
| salvar       | Consultar/Listar Equipamentos | default  |
| cancelar     | Consultar/Listar Equipamentos | cancel   |


**Consultar/Listar Equipamentos**

| **Campo**           | **Tipo**       | **Restrições**            | **Valor default** |
| ------------------- | -------------- | ------------------------- | ----------------- |
| filtro_nome         | Caixa de texto | opcional                  |                   |
| categoria           | Seleção única  | opcional                  |                   |
| status              | Seleção única  | opcional                  |                   |
| tabela_equipamentos | Tabela         | listagem dos equipamentos |                   |


| **Comandos** | **Destino**           | **Tipo** |
| ------------ | --------------------- | -------- |
| buscar       | Atualiza tabela       | default  |
| cadastrar    | Cadastrar Equipamento | default  |
| editar       | Editar Equipamento    | default  |

**Editar Equipamento**

| **Campo**        | **Tipo**       | **Restrições** | **Valor default** |
| ---------------- | -------------- | -------------- | ----------------- |
| nome_equipamento | Caixa de texto | obrigatório    | preenchido        |
| descricao        | Área de texto  | opcional       | preenchido        |
| categoria        | Seleção única  | obrigatório    | preenchido        |
| quantidade       | Número         | obrigatório    | preenchido        |
| status           | Seleção única  | obrigatório    | preenchido        |
| imagem           | Imagem         | opcional       | preenchido        |


| **Comandos** | **Destino**                   | **Tipo** |
| ------------ | ----------------------------- | -------- |
| salvar       | Consultar/Listar Equipamentos | default  |
| excluir      | Consultar/Listar Equipamentos | cancel   |
| cancelar     | Consultar/Listar Equipamentos | cancel   |


**Registrar Retirada de Equipamento**

| **Campo**               | **Tipo**       | **Restrições** | **Valor default** |
| ----------------------- | -------------- | -------------- | ----------------- |
| equipamento             | Seleção única  | obrigatório    |                   |
| quantidade              | Número         | obrigatório    |                   |
| responsavel             | Caixa de texto | obrigatório    |                   |
| data_retirada           | Data e Hora    | obrigatório    |                   |
| data_prevista_devolucao | Data           | obrigatório    |                   |


| **Comandos** | **Destino**                   | **Tipo** |
| ------------ | ----------------------------- | -------- |
| confirmar    | Consultar/Listar Equipamentos | default  |
| cancelar     | Consultar/Listar Equipamentos | cancel   |


---

 **3.3.3 Processo 3 – Gestão de Eventos**

O processo de gestão de eventos tem como objetivo organizar o agendamento dos serviços audiovisuais, garantindo o controle da disponibilidade de datas, equipe e equipamentos, além de assegurar a correta execução dos serviços contratados.

Como oportunidade de melhoria, propõe-se a automatização da verificação de disponibilidade dos recursos (data, equipe e equipamentos), bem como a sugestão de novas datas em casos de indisponibilidade, reduzindo conflitos de agenda e retrabalho.



---

**Detalhamento das atividades**

**Solicitar Serviço**

| Campo         | Tipo           | Restrições  | Valor default |
| ------------- | -------------- | ----------- | ------------- |
| cliente       | Caixa de texto | obrigatório |               |
| tipo_servico  | Seleção única  | obrigatório |               |
| data_desejada | Data           | obrigatório |               |
| horario       | Hora           | obrigatório |               |
| local         | Caixa de texto | obrigatório |               |
| observacoes   | Área de texto  | opcional    |               |

Comandos

| Comando  | Destino             | Tipo    |
| -------- | ------------------- | ------- |
| enviar   | Receber solicitação | default |
| cancelar | Encerrar processo   | cancel  |



**Receber Solicitação**

| Campo         | Tipo  | Restrições | Valor default |
| ------------- | ----- | ---------- | ------------- |
| dados_cliente | Texto | automático |               |
| dados_evento  | Texto | automático |               |

Comandos

| Comando   | Destino                           | Tipo    |
| --------- | --------------------------------- | ------- |
| continuar | Verificar disponibilidade de data | default |



**Verificar Disponibilidade de Data**

| Campo       | Tipo | Restrições  | Valor default |
| ----------- | ---- | ----------- | ------------- |
| data_evento | Data | obrigatório |               |
| horario     | Hora | obrigatório |               |

Comandos

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| verificar | Verificar equipe  | default |
| cancelar  | Encerrar processo | cancel  |



**Verificar Equipe Disponível**

| Campo             | Tipo  | Restrições | Valor default |
| ----------------- | ----- | ---------- | ------------- |
| equipe_disponivel | Lista | automático |               |

Comandos

| Comando   | Destino                | Tipo    |
| --------- | ---------------------- | ------- |
| verificar | Verificar equipamentos | default |
| cancelar  | Encerrar processo      | cancel  |



**Verificar Equipamentos Disponíveis**

| Campo        | Tipo  | Restrições | Valor default |
| ------------ | ----- | ---------- | ------------- |
| equipamentos | Lista | automático |               |

### Comandos

| Comando  | Destino             | Tipo    |
| -------- | ------------------- | ------- |
| validar  | Disponibilidade OK? | default |
| cancelar | Encerrar processo   | cancel  |



 **Sugerir Nova Data**

| Campo        | Tipo          | Restrições  | Valor default |
| ------------ | ------------- | ----------- | ------------- |
| nova_data    | Data          | obrigatório |               |
| novo_horario | Hora          | obrigatório |               |
| observacao   | Área de texto | opcional    |               |

Comandos

| Comando   | Destino                           | Tipo    |
| --------- | --------------------------------- | ------- |
| confirmar | Verificar disponibilidade de data | default |
| cancelar  | Encerrar processo                 | cancel  |



**Cadastrar Evento**

| Campo        | Tipo           | Restrições  | Valor default |
| ------------ | -------------- | ----------- | ------------- |
| cliente      | Seleção única  | obrigatório |               |
| tipo_servico | Seleção única  | obrigatório |               |
| data_evento  | Data           | obrigatório |               |
| horario      | Hora           | obrigatório |               |
| equipe       | Lista          | obrigatório |               |
| equipamentos | Lista          | obrigatório |               |
| local        | Caixa de texto | obrigatório |               |

Comandos

| Comando  | Destino           | Tipo    |
| -------- | ----------------- | ------- |
| salvar   | Registrar evento  | default |
| cancelar | Encerrar processo | cancel  |



**Registrar Evento no Sistema**

| Campo        | Tipo  | Restrições | Valor default |
| ------------ | ----- | ---------- | ------------- |
| dados_evento | Texto | automático |               |

Comandos

| Comando   | Destino            | Tipo    |
| --------- | ------------------ | ------- |
| confirmar | Enviar confirmação | default |



**Enviar Confirmação ao Cliente**

| Campo    | Tipo  | Restrições | Valor default |
| -------- | ----- | ---------- | ------------- |
| mensagem | Texto | automático |               |
| status   | Texto | automático | Confirmado    |

Comandos

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| finalizar | Encerrar processo | default |



