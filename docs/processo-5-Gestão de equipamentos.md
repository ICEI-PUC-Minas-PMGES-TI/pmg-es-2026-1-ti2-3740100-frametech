
###  Processo 5 – Gestão de equipamentos

O processo de gerenciamento de cadastro de equipamentos tem como objetivo organizar o cadastro, atualização e controle dos equipamentos utilizados nos projetos audiovisuais, garantindo maior eficiência e disponibilidade dos recursos.

<img width="1024" height="442" alt="Gerenciamento-equipamentoNovo" src="https://github.com/user-attachments/assets/ba5da2b8-debb-4cd4-b30f-2944d0819a45" />



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
