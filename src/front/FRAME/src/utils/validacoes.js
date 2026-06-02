export function validarTelefone(valor) {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
        return "Telefone deve conter entre 10 e 11 dígitos.";
    }
    return null;
}

export function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 10) {
        return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

export function validarSenha(senha) {
    if (!senha || senha.length < 8) {
        return "A senha deve ter no mínimo 8 caracteres.";
    }
    return null;
}

export function validarDataFutura(data) {
    if (!data) {
        return "A data do evento é obrigatória.";
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataEvento = new Date(data + "T00:00:00");
    if (dataEvento <= hoje) {
        return "A data do evento deve ser uma data futura.";
    }
    return null;
}

export function validarNumeroEndereco(valor) {
    if (!valor || valor.trim() === "") {
        return null;
    }
    if (!/^\d+$/.test(valor)) {
        return "O número deve conter apenas dígitos.";
    }
    return null;
}

export function filtrarApenasNumeros(valor) {
    return valor.replace(/\D/g, "");
}

export function dataMinima() {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    return amanha.toISOString().split("T")[0];
}
