const VIACEP_URL = "https://viacep.com.br/ws";

export async function buscarEnderecoPorCep(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        throw new Error("CEP deve conter 8 dígitos.");
    }

    const response = await fetch(`${VIACEP_URL}/${cepLimpo}/json/`);

    if (!response.ok) {
        throw new Error("Erro ao consultar o CEP.");
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error("CEP não encontrado. Verifique o CEP informado.");
    }

    return data;
}
