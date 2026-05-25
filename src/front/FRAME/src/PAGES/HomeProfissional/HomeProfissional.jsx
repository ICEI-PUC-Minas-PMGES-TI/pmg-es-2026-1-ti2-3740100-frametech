import { useEffect, useState } from "react";
import styles from "./HomeProfissional.module.css";
import Header from "../../Components/Header/Header";

const Ico = ({ name, size = 18 }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: size }} aria-hidden="true" />
);

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const WEEK = ["D","S","T","Q","Q","S","S"];

const FILTER_OPTS = [
  { key:"todos", label:"Todos" },
  { key:0, label:"Jan" },
  { key:1, label:"Fev" },
  { key:2, label:"Mar" },
  { key:3, label:"Abr" },
  { key:4, label:"Mai" },
  { key:5, label:"Jun" },
  { key:6, label:"Jul" },
  { key:7, label:"Ago" },
  { key:8, label:"Set" },
  { key:9, label:"Out" },
  { key:10, label:"Nov" },
  { key:11, label:"Dez" },
];

function buildDays(year, month, scaleDays) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const prev = new Date(year, month, 0).getDate();
  const out = [];

  for (let i = 0; i < first; i++) {
    out.push({ n: prev - first + 1 + i, other: true });
  }

  const hoje = new Date();

  for (let d = 1; d <= total; d++) {
    out.push({
      n: d,
      today:
        d === hoje.getDate() &&
        month === hoje.getMonth() &&
        year === hoje.getFullYear(),
      hasScale: scaleDays.includes(d),
    });
  }

  return out;
}

function tratarData(dataEvento) {
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

function converterEscala(item) {
  const data = tratarData(item.dataEvento);

  return {
    id: item.id,
    status: item.status,
    day: data.day,
    mon: data.mon,
    year: data.year,
    wd: data.wd,
    title: item.nomeEvento || "Evento sem nome",
    cliente: item.nomeCliente || "Cliente",
    tipo: item.tipoEvento || "Serviço",
    porte: item.porteEvento || "",
    descricao: item.descricao || "",
    time: "Horário a confirmar",
    local: "Local a confirmar",
    svc: item.tipoEvento || "Serviço",
  };
}

export default function HomeProfissional() {
  const [reqs, setReqs] = useState([]);
  const [scale, setScale] = useState([]);
  const [leaving, setLeaving] = useState({});
  const [toast, setToast] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEscalas();
  }, []);

  function carregarEscalas() {
    const profissionalId = sessionStorage.getItem("usuarioId");

    if (!profissionalId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/escalas/profissional/${profissionalId}`)
      .then(res => res.json())
      .then(data => {
        const escalasConvertidas = data.map(converterEscala);

        setReqs(
          escalasConvertidas.filter(item => item.status === "PENDENTE")
        );

        setScale(
          escalasConvertidas.filter(item => item.status === "ACEITA")
        );
      })
      .catch(err => {
        console.log(err);
        showToast("Erro ao carregar escalas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const newCount = reqs.length;

  const scaleDays = scale
    .filter(s => s.mon === month && s.year === year)
    .map(s => s.day);

  const days = buildDays(year, month, scaleDays);

  const visibleScale =
    filter === "todos"
      ? scale
      : scale.filter(s => s.mon === filter);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function removeReq(id, dir) {
    setLeaving(p => ({ ...p, [id]: dir }));

    setTimeout(() => {
      setReqs(p => p.filter(r => r.id !== id));
      setLeaving(p => {
        const n = { ...p };
        delete n[id];
        return n;
      });
    }, 270);
  }

  function accept(req) {
    fetch(`http://localhost:8080/api/escalas/${req.id}/aceitar`, {
      method: "PUT",
    })
      .then(res => res.json())
      .then(data => {
        const escalaAceita = converterEscala(data);

        setScale(p => [escalaAceita, ...p]);
        removeReq(req.id, "goR");
        showToast("Pedido aceito!");
      })
      .catch(err => {
        console.log(err);
        showToast("Erro ao aceitar pedido.");
      });
  }

  function decline(req) {
    fetch(`http://localhost:8080/api/escalas/${req.id}/recusar`, {
      method: "PUT",
    })
      .then(() => {
        removeReq(req.id, "goL");
        showToast("Pedido recusado.");
      })
      .catch(err => {
        console.log(err);
        showToast("Erro ao recusar pedido.");
      });
  }

  function chMonth(dir) {
    let m = month + dir;
    let y = year;

    if (m > 11) {
      m = 0;
      y++;
    }

    if (m < 0) {
      m = 11;
      y--;
    }

    setMonth(m);
    setYear(y);
  }

  function reqCls(r) {
    return [
      styles.req,
      leaving[r.id] === "goR" ? styles.goR : "",
      leaving[r.id] === "goL" ? styles.goL : "",
    ].filter(Boolean).join(" ");
  }

  function dayCls(d) {
    return [
      styles.day,
      d.other ? styles.dayOther : "",
      d.today ? styles.dayToday : "",
      d.hasScale ? styles.dayScale : "",
    ].filter(Boolean).join(" ");
  }

  return (
    <div className={styles.root}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.statsRow}>
          <div className={`${styles.stat} ${styles.statPink}`}>
            <span className={styles.statLbl}>Novos pedidos</span>
            <span className={styles.statVal}>{newCount}</span>
          </div>

          <div className={`${styles.stat} ${styles.statGreen}`}>
            <span className={styles.statLbl}>Na escala</span>
            <span className={styles.statVal}>{scale.length}</span>
          </div>

          <div className={`${styles.stat} ${styles.statPurple}`}>
            <span className={styles.statLbl}>Mês atual</span>
            <span className={styles.statVal}>{MONTHS[month]}</span>
          </div>

          <div className={`${styles.stat} ${styles.statYellow}`}>
            <span className={styles.statLbl}>Pendentes</span>
            <span className={styles.statVal}>{reqs.length}</span>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <div className={styles.colHead}>
              Pedidos recebidos
              {newCount > 0 && <span className={styles.badge}>{newCount}</span>}
            </div>

            <div className={styles.scroll}>
              {loading ? (
                <p className={styles.empty}>Carregando pedidos...</p>
              ) : reqs.length === 0 ? (
                <p className={styles.empty}>Nenhum pedido pendente</p>
              ) : (
                reqs.map(r => (
                  <div key={r.id} className={reqCls(r)}>
                    <div className={styles.reqTop}>
                      <span className={styles.reqName}>{r.cliente}</span>
                      <span className={styles.reqTime}>Pendente</span>
                    </div>

                    <div className={styles.reqSvc}>
                      <Ico name="calendar-event" size={13} />
                      {r.title} · {r.day}/{r.mon + 1}/{r.year}
                    </div>

                    <div className={styles.reqSvc}>
                      <Ico name="camera" size={13} />
                      {r.tipo} {r.porte && `· ${r.porte}`}
                    </div>

                    <div className={styles.reqFoot}>
                      <span className={`${styles.tag} ${styles.tagNew}`}>
                        Novo
                      </span>

                      <div className={styles.acts}>
                        <button
                          className={styles.btnA}
                          onClick={() => accept(r)}
                        >
                          Aceitar
                        </button>

                        <button
                          className={styles.btnD}
                          onClick={() => decline(r)}
                        >
                          Recusar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.colRight}>
            <div className={styles.colHead}>
              Minha escala

              <div className={styles.calNav}>
                <button
                  className={styles.calNavBtn}
                  onClick={() => chMonth(-1)}
                >
                  <Ico name="chevron-left" size={12} />
                </button>

                <span className={styles.calLbl}>
                  {MONTHS[month]} {year}
                </span>

                <button
                  className={styles.calNavBtn}
                  onClick={() => chMonth(1)}
                >
                  <Ico name="chevron-right" size={12} />
                </button>
              </div>
            </div>

            <div className={styles.calWrap}>
              <div className={styles.daysH}>
                {WEEK.map((w, i) => (
                  <div key={i} className={styles.dh}>{w}</div>
                ))}
              </div>

              <div className={styles.daysG}>
                {days.map((d, i) => (
                  <div key={i} className={dayCls(d)}>
                    {d.n}
                    {d.hasScale && !d.other && !d.today && (
                      <span className={styles.scaleDot} />
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.calLegend}>
                <span className={styles.legendDot} />
                dia com escala
              </div>
            </div>

            <div
              className={styles.colHead}
              style={{ borderTop: "1px solid #E8E4DC" }}
            >
              Eventos confirmados

              <div className={styles.filterRow}>
                {FILTER_OPTS.map(f => (
                  <button
                    key={f.key}
                    className={`${styles.filterBtn} ${
                      filter === f.key ? styles.filterOn : ""
                    }`}
                    onClick={() => setFilter(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.scroll}>
              {loading ? (
                <p className={styles.empty}>Carregando escala...</p>
              ) : visibleScale.length === 0 ? (
                <p className={styles.empty}>Nenhum evento confirmado</p>
              ) : (
                visibleScale.map((s) => (
                  <div key={s.id} className={styles.scItem}>
                    <div className={styles.scDate}>
                      <div className={styles.scNum}>{s.day}</div>
                      <div className={styles.scWd}>{s.wd}</div>
                    </div>

                    <div className={styles.scBody}>
                      <div className={styles.scTitle}>{s.title}</div>

                      <div className={styles.scSub}>
                        <Ico name="clock" size={11} />
                        {s.time}
                      </div>

                      <div className={styles.scSub}>
                        <Ico name="camera" size={11} />
                        {s.svc}
                      </div>
                    </div>

                    <span className={`${styles.tag} ${styles.tagConf}`}>
                      {MONTHS[s.mon]}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
