### 3.3.3 Processo 3 – Gerenciamento de cadastro de equipamentos

O processo de gerenciamento de cadastro de equipamentos tem como objetivo organizar o cadastro, atualização e controle dos equipamentos utilizados nos projetos audiovisuais, garantindo maior eficiência e disponibilidade dos recursos.

![Gerenciamento de cadastro de equipamentos02](https://github.com/user-attachments/assets/f361e8fa-82f3-43f0-b934-b3913ded5c61)



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

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| salvar       | Fim do processo | default  |
| cancelar     | Fim do processo | cancel   |


**Consultar/Listar Equipamentos**

| **Campo**           | **Tipo**       | **Restrições**            | **Valor default** |
| ------------------- | -------------- | ------------------------- | ----------------- |
| filtro_nome         | Caixa de texto | opcional                  |                   |
| categoria           | Seleção única  | opcional                  |                   |
| status              | Seleção única  | opcional                  |                   |
| tabela_equipamentos | Tabela         | listagem dos equipamentos |                   |


| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| buscar       | Atualiza tabela | default  |


**Editar Equipamento**

| **Campo**        | **Tipo**       | **Restrições** | **Valor default** |
| ---------------- | -------------- | -------------- | ----------------- |
| nome_equipamento | Caixa de texto | obrigatório    | preenchido        |
| descricao        | Área de texto  | opcional       | preenchido        |
| categoria        | Seleção única  | obrigatório    | preenchido        |
| quantidade       | Número         | obrigatório    | preenchido        |
| status           | Seleção única  | obrigatório    | preenchido        |
| imagem           | Imagem         | opcional       | preenchido        |


| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| salvar       | Fim do processo | default  |
| excluir      | Fim do processo | cancel   |
| cancelar     | Fim do processo | cancel   |


**Registrar Retirada de Equipamento**

| **Campo**               | **Tipo**       | **Restrições** | **Valor default** |
| ----------------------- | -------------- | -------------- | ----------------- |
| equipamento             | Seleção única  | obrigatório    |                   |
| quantidade              | Número         | obrigatório    |                   |
| responsavel             | Caixa de texto | obrigatório    |                   |
| data_retirada           | Data e Hora    | obrigatório    |                   |
| data_prevista_devolucao | Data           | obrigatório    |                   |


| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| confirmar    | Fim do processo | default  |
| cancelar     | Fim do processo | cancel   |


---
3.3.3 Processo 3 – Gestão de Eventos

O processo de gestão de eventos tem como objetivo organizar o agendamento dos serviços audiovisuais, garantindo o controle da disponibilidade de datas, equipe e equipamentos, além de assegurar a correta execução dos serviços contratados.

Como oportunidade de melhoria, propõe-se a automatização da verificação de disponibilidade dos recursos (data, equipe e equipamentos), bem como a sugestão de novas datas em casos de indisponibilidade, reduzindo conflitos de agenda e retrabalho. Além disso, o processo passa a considerar autenticação de usuário, seleção de eventos existentes ou criação de novos eventos, e decisões estruturadas para reprogramação, composição de equipe e confirmação final do serviço.

<img width="2270" height="1205" alt="Gestão de Eventos Diagrama" src="https://github.com/user-attachments/assets/82b99982-a1fa-4788-a929-4f139d0f505c" />


# **Detalhamento das atividades**

## **Acessar Sistema / Realizar Login**

| Campo   | Tipo           | Restrições  | Valor default |
| ------- | -------------- | ----------- | ------------- |
| usuario | Caixa de texto | obrigatório |               |
| senha   | Caixa de texto | obrigatório |               |

### Comandos

| Comando  | Destino              | Tipo    |
| -------- | -------------------- | ------- |
| entrar   | Usuário autenticado? | default |
| cancelar | Encerrar processo    | cancel  |

---

## **Listar Eventos Disponíveis**

| Campo         | Tipo   | Restrições | Valor default |
| ------------- | ------ | ---------- | ------------- |
| lista_eventos | Tabela | automático |               |

### Comandos

| Comando    | Destino        | Tipo    |
| ---------- | -------------- | ------- |
| selecionar | Evento é novo? | default |

---

## **Solicitar Serviço**

| Campo         | Tipo           | Restrições  | Valor default |
| ------------- | -------------- | ----------- | ------------- |
| cliente       | Caixa de texto | obrigatório |               |
| tipo_servico  | Seleção única  | obrigatório |               |
| data_desejada | Data           | obrigatório |               |
| horario       | Hora           | obrigatório |               |
| local         | Caixa de texto | obrigatório |               |
| observacoes   | Área de texto  | opcional    |               |

### Comandos

| Comando  | Destino             | Tipo    |
| -------- | ------------------- | ------- |
| enviar   | Receber solicitação | default |
| cancelar | Encerrar processo   | cancel  |

---

## **Receber Solicitação**

| Campo         | Tipo  | Restrições | Valor default |
| ------------- | ----- | ---------- | ------------- |
| dados_cliente | Texto | automático |               |
| dados_evento  | Texto | automático |               |

### Comandos

| Comando   | Destino                           | Tipo    |
| --------- | --------------------------------- | ------- |
| continuar | Verificar disponibilidade de data | default |

---

## **Verificar Disponibilidade de Data**

| Campo       | Tipo | Restrições  | Valor default |
| ----------- | ---- | ----------- | ------------- |
| data_evento | Data | obrigatório |               |
| horario     | Hora | obrigatório |               |

### Comandos

| Comando   | Destino                             | Tipo    |
| --------- | ----------------------------------- | ------- |
| verificar | Verificar disponibilidade da equipe | default |
| cancelar  | Encerrar processo                   | cancel  |

---

## **Verificar Disponibilidade da Equipe**

| Campo             | Tipo  | Restrições | Valor default |
| ----------------- | ----- | ---------- | ------------- |
| equipe_disponivel | Lista | automático |               |

### Comandos

| Comando   | Destino                                   | Tipo    |
| --------- | ----------------------------------------- | ------- |
| verificar | Verificar disponibilidade de equipamentos | default |
| cancelar  | Encerrar processo                         | cancel  |

---

## **Verificar Disponibilidade de Equipamentos**

| Campo        | Tipo  | Restrições | Valor default |
| ------------ | ----- | ---------- | ------------- |
| equipamentos | Lista | automático |               |

### Comandos

| Comando  | Destino                         | Tipo    |
| -------- | ------------------------------- | ------- |
| validar  | Disponibilidade de recursos OK? | default |
| cancelar | Encerrar processo               | cancel  |

---

## **Sugerir Nova Data**

| Campo        | Tipo          | Restrições  | Valor default |
| ------------ | ------------- | ----------- | ------------- |
| nova_data    | Data          | obrigatório |               |
| novo_horario | Hora          | obrigatório |               |
| observacao   | Área de texto | opcional    |               |

### Comandos

| Comando   | Destino                      | Tipo    |
| --------- | ---------------------------- | ------- |
| confirmar | Deseja reprogramar o evento? | default |
| cancelar  | Encerrar processo            | cancel  |

---

## **Atualizar Dados do Evento**

| Campo        | Tipo  | Restrições | Valor default |
| ------------ | ----- | ---------- | ------------- |
| dados_evento | Texto | automático |               |

### Comandos

| Comando | Destino           | Tipo    |
| ------- | ----------------- | ------- |
| salvar  | Encerrar processo | default |

---

## **Cadastrar Novo Profissional**

| Campo             | Tipo           | Restrições  | Valor default |
| ----------------- | -------------- | ----------- | ------------- |
| nome_profissional | Caixa de texto | obrigatório |               |
| funcao            | Seleção única  | obrigatório |               |

### Comandos

| Comando | Destino           | Tipo    |
| ------- | ----------------- | ------- |
| salvar  | Encerrar processo | default |

---

## **Cadastrar Evento**

| Campo        | Tipo           | Restrições  | Valor default |
| ------------ | -------------- | ----------- | ------------- |
| cliente      | Seleção única  | obrigatório |               |
| tipo_servico | Seleção única  | obrigatório |               |
| data_evento  | Data           | obrigatório |               |
| horario      | Hora           | obrigatório |               |
| equipe       | Lista          | obrigatório |               |
| equipamentos | Lista          | obrigatório |               |
| local        | Caixa de texto | obrigatório |               |

### Comandos

| Comando  | Destino           | Tipo    |
| -------- | ----------------- | ------- |
| salvar   | Registrar evento  | default |
| cancelar | Encerrar processo | cancel  |

---

## **Registrar Evento no Sistema**

| Campo        | Tipo  | Restrições | Valor default |
| ------------ | ----- | ---------- | ------------- |
| dados_evento | Texto | automático |               |

### Comandos

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| confirmar | Confirmar evento? | default |

---

## **Enviar Confirmação ao Cliente**

| Campo    | Tipo  | Restrições | Valor default |
| -------- | ----- | ---------- | ------------- |
| mensagem | Texto | automático |               |
| status   | Texto | automático | Confirmado    |

### Comandos

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| finalizar | Encerrar processo | default |

---
