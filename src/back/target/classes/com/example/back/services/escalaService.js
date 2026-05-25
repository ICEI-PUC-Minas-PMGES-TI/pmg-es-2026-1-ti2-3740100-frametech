const BASE_URL = "http://localhost:8080/api/escalas";

/**
 * Busca todas as escalas do profissional logado.
 * @param {number} profissionalId
 * @returns {Promise<EscalaDTO[]>}
 */
export async function buscarEscalasPorProfissional(profissionalId) {
  const res = await fetch(`${BASE_URL}/profissional/${profissionalId}`);
  if (!res.ok) throw new Error("Erro ao buscar escalas.");
  return res.json();
}

/**
 * Busca escalas do profissional filtradas por mês.
 * @param {number} profissionalId
 * @param {string} anoMes  - formato "YYYY-MM", ex: "2025-06"
 * @returns {Promise<EscalaDTO[]>}
 */
export async function buscarEscalasPorMes(profissionalId, anoMes) {
  const res = await fetch(
    `${BASE_URL}/profissional/${profissionalId}/mes?anoMes=${anoMes}`
  );
  if (!res.ok) throw new Error("Erro ao buscar escalas por mês.");
  return res.json();
}

/**
 * Busca escalas do profissional em uma data específica.
 * @param {number} profissionalId
 * @param {string} data - formato "YYYY-MM-DD", ex: "2025-06-28"
 * @returns {Promise<EscalaDTO[]>}
 */
export async function buscarEscalasPorDia(profissionalId, data) {
  const res = await fetch(
    `${BASE_URL}/profissional/${profissionalId}/dia?data=${data}`
  );
  if (!res.ok) throw new Error("Erro ao buscar escalas por dia.");
  return res.json();
}

/**
 * Converte "YYYY-MM-DD" para um objeto { day, month (0-based), year, wd }
 * usado pelo calendário.
 */
export function parseDataEvento(dataEvento) {
  if (!dataEvento) return null;
  const [year, month, day] = dataEvento.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const WD = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return {
    day,
    month: month - 1, // 0-based para compatibilidade com JS Date
    year,
    wd: WD[dateObj.getDay()],
  };
}

/**
 * Formata "YYYY-MM" para exibição no filtro de mês.
 * Retorna ex: "Jun", "Jul"
 */
const MESES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
export function formatarMes(monthIndex) {
  return MESES[monthIndex] ?? "";
}

/**
 * Monta a string anoMes no formato "YYYY-MM" para a query.
 */
export function toAnoMes(year, monthIndex) {
  const m = String(monthIndex + 1).padStart(2, "0");
  return `${year}-${m}`;
}

/**
 * Monta a string de data completa "YYYY-MM-DD".
 */
export function toDataCompleta(year, monthIndex, day) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}
