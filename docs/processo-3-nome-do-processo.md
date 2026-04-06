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



