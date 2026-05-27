


# **3.3.3 Processo 3 – Solicitação de Eventos**

O processo de gestão de eventos tem como objetivo organizar o agendamento dos serviços audiovisuais, garantindo o controle da disponibilidade de datas, equipe e equipamentos, além de assegurar a correta execução dos serviços contratados.

Como oportunidade de melhoria, propõe-se a automatização da verificação de disponibilidade dos recursos (datas, equipe e equipamentos), bem como a sugestão de novas datas em casos de indisponibilidade, reduzindo conflitos de agenda e retrabalho. Além disso, o processo considera a autenticação do usuário, a seleção de eventos existentes ou criação de novos eventos, e decisões estruturadas para reprogramação, composição de equipe e confirmação final do serviço.

<img width="2685" height="1010" alt="Processo de gestão de profissionais - cópia de Diagrama (2)" src="https://github.com/user-attachments/assets/b986ac83-379a-4a0c-8cdc-0257502d6056" />

---

# **Detalhamento das atividades**

## **Acessar Sistema / Realizar Login**

**Campos:**

* usuário (Caixa de texto, obrigatório)
* senha (Caixa de texto, obrigatório)

**Comandos:**

| Comando  | Destino              | Tipo    |
| -------- | -------------------- | ------- |
| entrar   | Usuário autenticado? | default |
| cancelar | Encerrar processo    | cancel  |

---

## **Listar Eventos Disponíveis**

**Campos:**

* lista_eventos (Tabela, automático)

**Comandos:**

| Comando    | Destino        | Tipo    |
| ---------- | -------------- | ------- |
| selecionar | Evento é novo? | default |

---

## **Solicitar Serviço**

**Campos:**

* cliente (Caixa de texto, obrigatório)
* tipo_servico (Seleção única, obrigatório)
* data_desejada (Data, obrigatório)
* horario (Hora, obrigatório)
* local (Caixa de texto, obrigatório)
* observacoes (Área de texto, opcional)

**Comandos:**

| Comando  | Destino             | Tipo    |
| -------- | ------------------- | ------- |
| enviar   | Receber solicitação | default |
| cancelar | Encerrar processo   | cancel  |

---

## **Receber Solicitação**

**Campos:**

* dados_cliente (Texto, automático)
* dados_evento (Texto, automático)

**Comandos:**

| Comando   | Destino                           | Tipo    |
| --------- | --------------------------------- | ------- |
| continuar | Verificar disponibilidade de data | default |

---

## **Verificar Disponibilidade de Data**

**Campos:**

* data_evento (Data, obrigatório)
* horario (Hora, obrigatório)

**Comandos:**

| Comando   | Destino                             | Tipo    |
| --------- | ----------------------------------- | ------- |
| verificar | Verificar disponibilidade da equipe | default |
| cancelar  | Encerrar processo                   | cancel  |

---

## **Verificar Disponibilidade da Equipe**

**Campos:**

* equipe_disponivel (Lista, automático)

**Comandos:**

| Comando   | Destino                                   | Tipo    |
| --------- | ----------------------------------------- | ------- |
| verificar | Verificar disponibilidade de equipamentos | default |
| cancelar  | Encerrar processo                         | cancel  |

---

## **Verificar Disponibilidade de Equipamentos**

**Campos:**

* equipamentos (Lista, automático)

**Comandos:**

| Comando  | Destino                         | Tipo    |
| -------- | ------------------------------- | ------- |
| validar  | Disponibilidade de recursos OK? | default |
| cancelar | Encerrar processo               | cancel  |

---

## **Sugerir Nova Data**

**Campos:**

* nova_data (Data, obrigatório)
* novo_horario (Hora, obrigatório)
* observacao (Área de texto, opcional)

**Comandos:**

| Comando   | Destino                      | Tipo    |
| --------- | ---------------------------- | ------- |
| confirmar | Deseja reprogramar o evento? | default |
| cancelar  | Encerrar processo            | cancel  |

---

## **Atualizar Dados do Evento**

**Campos:**

* dados_evento (Texto, automático)

**Comandos:**

| Comando | Destino           | Tipo    |
| ------- | ----------------- | ------- |
| salvar  | Encerrar processo | default |

---

## **Cadastrar Novo Profissional**

**Campos:**

* nome_profissional (Caixa de texto, obrigatório)
* funcao (Seleção única, obrigatório)

**Comandos:**

| Comando | Destino           | Tipo    |
| ------- | ----------------- | ------- |
| salvar  | Encerrar processo | default |

---

## **Cadastrar Evento**

**Campos:**

* cliente (Seleção única, obrigatório)
* tipo_servico (Seleção única, obrigatório)
* data_evento (Data, obrigatório)
* horario (Hora, obrigatório)
* equipe (Lista, obrigatório)
* equipamentos (Lista, obrigatório)
* local (Caixa de texto, obrigatório)

**Comandos:**

| Comando  | Destino           | Tipo    |
| -------- | ----------------- | ------- |
| salvar   | Registrar evento  | default |
| cancelar | Encerrar processo | cancel  |

---

## **Registrar Evento**

**Campos:**

* dados_evento (Texto, automático)

**Comandos:**

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| confirmar | Confirmar evento? | default |

---

## **Enviar Confirmação ao Cliente**

**Campos:**

* mensagem (Texto, automático)
* status (Texto, automático – padrão: Confirmado)

**Comandos:**

| Comando   | Destino           | Tipo    |
| --------- | ----------------- | ------- |
| finalizar | Encerrar processo | default |

