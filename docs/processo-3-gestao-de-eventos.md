<img width="2685" height="1010" alt="Processo de gestão de profissionais - cópia de Diagrama (2)" src="https://github.com/user-attachments/assets/b986ac83-379a-4a0c-8cdc-0257502d6056" />


# **3.3.3 Processo 3 – Solicitação de Eventos**

O processo de solicitação de eventos tem como objetivo organizar o fluxo de criação, análise, aprovação e possível reprogramação de eventos dentro da plataforma, garantindo o controle da disponibilidade de recursos, profissionais e equipamentos necessários para a execução do serviço.

O processo inicia com o cliente acessando a plataforma e visualizando os eventos ativos. Caso deseje criar um novo evento, o cliente realiza a solicitação informando os dados necessários do evento. Após o envio, a solicitação é recebida pelo administrador, que verifica a disponibilidade de equipe e equipamentos.

Quando não há disponibilidade de recursos, o sistema permite sugerir automaticamente uma nova data ao cliente, reduzindo conflitos de agenda e facilitando o replanejamento do evento. O cliente pode então optar por reprogamar o evento e reenviar a solicitação atualizada.

Nos casos em que há disponibilidade, o administrador realiza a alocação dos profissionais e equipamentos necessários e confirma o evento. O processo contempla notificações automáticas ao cliente sempre que houver atualização ou necessidade de reenvio da solicitação, proporcionando maior controle e comunicação durante todo o fluxo.

---

<img width="2685" height="1010" alt="Processo de gestão de profissionais - cópia de Diagrama (2)" src="https://github.com/user-attachments/assets/b986ac83-379a-4a0c-8cdc-0257502d6056" />


# **Detalhamento das atividades**

## **Acessar Plataforma**

**Campos:**

* usuário (Caixa de texto, obrigatório)
* senha (Caixa de texto, obrigatório)

**Comandos:**

| Comando  | Destino                    | Tipo    |
| -------- | -------------------------- | ------- |
| entrar   | Visualizar projetos ativos | default |
| cancelar | Encerrar processo          | cancel  |

---

## **Visualizar Projetos Ativos**

**Campos:**

* lista_projetos (Tabela, automático)

**Comandos:**

| Comando    | Destino                  | Tipo    |
| ---------- | ------------------------ | ------- |
| selecionar | Deseja cadastrar evento? | default |

---

## **Deseja Cadastrar um Novo Evento?**

**Campos:**

* opcao_evento (Sim/Não, obrigatório)

**Comandos:**

| Comando | Destino                  | Tipo    |
| ------- | ------------------------ | ------- |
| sim     | Selecionar “Novo Evento” | default |
| não     | Encerrar processo        | cancel  |

---

## **Selecionar Novo Evento**

**Campos:**

* botao_novo_evento (Botão, automático)

**Comandos:**

| Comando | Destino                         | Tipo    |
| ------- | ------------------------------- | ------- |
| avançar | Preencher informações do evento | default |

---

## **Preencher Informações do Evento**

**Campos:**

* nome_evento (Caixa de texto, obrigatório)
* tipo_evento (Seleção única, obrigatório)
* data_evento (Data, obrigatório)
* horario_evento (Hora, obrigatório)
* local_evento (Caixa de texto, obrigatório)
* observacoes (Área de texto, opcional)

**Comandos:**

| Comando            | Destino             | Tipo    |
| ------------------ | ------------------- | ------- |
| enviar solicitação | Receber solicitação | default |
| cancelar           | Encerrar processo   | cancel  |

---

## **Receber Solicitação**

**Campos:**

* dados_cliente (Texto, automático)
* dados_evento (Texto, automático)

**Comandos:**

| Comando   | Destino                               | Tipo    |
| --------- | ------------------------------------- | ------- |
| continuar | Verificar disponibilidade de recursos | default |

---

## **Verificar Disponibilidade de Recursos e Equipe**

**Campos:**

* equipe_disponivel (Lista, automático)
* equipamentos_disponiveis (Lista, automático)
* disponibilidade_data (Texto, automático)

**Comandos:**

| Comando      | Destino                              | Tipo    |
| ------------ | ------------------------------------ | ------- |
| disponível   | Alocar profissionais e equipamentos  | default |
| indisponível | Verificar disponibilidade no sistema | default |

---

## **Verificar Disponibilidade no Sistema**

**Campos:**

* datas_disponiveis (Lista, automático)
* horarios_disponiveis (Lista, automático)

**Comandos:**

| Comando  | Destino                      | Tipo    |
| -------- | ---------------------------- | ------- |
| sugerir  | Sugerir nova data ao cliente | default |
| cancelar | Encerrar processo            | cancel  |

---

## **Sugerir Nova Data ao Cliente**

**Campos:**

* nova_data (Data, obrigatório)
* novo_horario (Hora, obrigatório)
* justificativa (Área de texto, opcional)

**Comandos:**

| Comando  | Destino                                  | Tipo    |
| -------- | ---------------------------------------- | ------- |
| enviar   | Notificar cliente sobre nova solicitação | default |
| cancelar | Encerrar processo                        | cancel  |

---

## **Receber Notificação de Nova Solicitação**

**Campos:**

* mensagem_notificacao (Texto, automático)

**Comandos:**

| Comando    | Destino                      | Tipo    |
| ---------- | ---------------------------- | ------- |
| visualizar | Deseja reprogramar o evento? | default |

---

## **Deseja Reprogramar o Evento?**

**Campos:**

* opcao_reprogramacao (Sim/Não, obrigatório)

**Comandos:**

| Comando | Destino                       | Tipo    |
| ------- | ----------------------------- | ------- |
| sim     | Alterar informações do evento | default |
| não     | Encerrar processo             | cancel  |

---

## **Alterar Informações do Evento**

**Campos:**

* data_evento (Data, obrigatório)
* horario_evento (Hora, obrigatório)
* observacoes (Área de texto, opcional)

**Comandos:**

| Comando  | Destino              | Tipo    |
| -------- | -------------------- | ------- |
| reenviar | Reenviar solicitação | default |
| cancelar | Encerrar processo    | cancel  |

---

## **Reenviar Solicitação**

**Campos:**

* dados_evento (Texto, automático)

**Comandos:**

| Comando | Destino             | Tipo    |
| ------- | ------------------- | ------- |
| enviar  | Receber solicitação | default |

---

## **Alocar Profissionais e Equipamentos**

**Campos:**

* profissionais_alocados (Lista, obrigatório)
* equipamentos_alocados (Lista, obrigatório)

**Comandos:**

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| confirmar | Confirmar evento? | default |

---

## **Confirmar Evento**

**Campos:**

* status_evento (Texto, automático)
* resumo_evento (Texto, automático)

**Comandos:**

| Comando | Destino                       | Tipo    |
| ------- | ----------------------------- | ------- |
| sim     | Selecionar “Confirmar Evento” | default |
| não     | Selecionar “Recusar Proposta” | cancel  |

---

## **Selecionar “Recusar Proposta”**

**Campos:**

* motivo_recusa (Área de texto, opcional)

**Comandos:**

| Comando | Destino                                  | Tipo    |
| ------- | ---------------------------------------- | ------- |
| enviar  | Notificar cliente sobre nova solicitação | default |

---

## **Selecionar “Confirmar Evento”**

**Campos:**

* status_confirmacao (Texto, automático – padrão: Confirmado)

**Comandos:**

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| finalizar | Encerrar processo | default |


