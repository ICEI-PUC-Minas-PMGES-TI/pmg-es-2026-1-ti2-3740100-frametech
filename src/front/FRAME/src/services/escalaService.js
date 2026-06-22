const BASE_URL = "https://pmg-es-2026-1-ti2-3740100-frametech-4.onrender.com/api/escalas";

export async function buscarEscalasPorProfissional(profissionalId) {
  const res = await fetch(`${BASE_URL}/profissional/${profissionalId}`);
  if (!res.ok) throw new Error("Erro ao buscar escalas.");
  return res.json();
}

export async function buscarEscalasPorEvento(eventoId) {
  const res = await fetch(`${BASE_URL}/evento/${eventoId}`);
  if (!res.ok) throw new Error("Erro ao buscar escalas do evento.");
  return res.json();
}

export async function buscarDetalheEvento(eventoId) {
  const res = await fetch(`${BASE_URL}/evento/${eventoId}/detalhe`);
  if (!res.ok) throw new Error("Erro ao buscar detalhes do evento.");
  return res.json();
}

export async function criarEscala({ eventoId, profissionalId, admId, diaSemana }) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventoId, profissionalId, admId, diaSemana }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erro ao criar escala.");
  }
  return res.json();
}

export async function adicionarProfissionalAoEvento({ eventoId, profissionalId, admId, diaSemana }) {
  const res = await fetch(`${BASE_URL}/evento/${eventoId}/adicionar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profissionalId, admId, diaSemana: diaSemana || "" }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erro ao adicionar profissional.");
  }
  return res.json();
}

export async function removerEscala(escalaId) {
  const res = await fetch(`${BASE_URL}/${escalaId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover profissional da escala.");
}

export async function trocarProfissional(escalaId, { novoProfissionalId, admId }) {
  const res = await fetch(`${BASE_URL}/${escalaId}/trocar-profissional`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ novoProfissionalId, admId }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erro ao trocar profissional.");
  }
  return res.json();
}

export async function aceitarEscala(escalaId) {
  const res = await fetch(`${BASE_URL}/${escalaId}/aceitar`, { method: "PUT" });
  if (!res.ok) throw new Error("Erro ao aceitar escala.");
  return res.json();
}

export async function recusarEscala(escalaId) {
  const res = await fetch(`${BASE_URL}/${escalaId}/recusar`, { method: "PUT" });
  if (!res.ok) throw new Error("Erro ao recusar escala.");
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