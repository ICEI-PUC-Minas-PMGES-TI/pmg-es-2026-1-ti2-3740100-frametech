const BASE_URL = "http://localhost:8080/api/escalas";

export async function buscarEscalasPorProfissional(profissionalId) {
  const res = await fetch(`${BASE_URL}/profissional/${profissionalId}`);
  
  if (!res.ok) {
    throw new Error("Erro ao buscar escalas.");
  }

  return res.json();
}

export async function aceitarEscala(escalaId) {
  const res = await fetch(`${BASE_URL}/${escalaId}/aceitar`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Erro ao aceitar escala.");
  }

  return res.json();
}

export async function recusarEscala(escalaId) {
  const res = await fetch(`${BASE_URL}/${escalaId}/recusar`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Erro ao recusar escala.");
  }

  return res.json();
}

export function parseDataEvento(dataEvento) {
  if (!dataEvento) {
    return {
      day: "-",
      mon: new Date().getMonth(),
      year: new Date().getFullYear(),
      wd: "-",
    };
  }

  const data = new Date(dataEvento + "T00:00:00");

  return {
    day: data.getDate(),
    mon: data.getMonth(),
    year: data.getFullYear(),
    wd: data.toLocaleDateString("pt-BR", { weekday: "short" }),
  };
}