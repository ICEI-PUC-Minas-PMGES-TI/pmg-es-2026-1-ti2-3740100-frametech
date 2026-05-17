import { useState } from "react";
import styles from "./HomeProfissional.module.css";
import Header from "../../Components/Header/Header";

const Ico = ({ name, size = 18 }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: size }} aria-hidden="true" />
);

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const WEEK   = ["D","S","T","Q","Q","S","S"];

const INITIAL_REQS = [
  { id:"r1", name:"Ana Lima",      time:"há 10 min", svc:"Filmagem + Drone · 28 jun",      icon:"drone",  tag:"Novo",      day:28, mon:5, wd:"Sáb", title:"Formatura PUC Minas" },
  { id:"r2", name:"Rafael Costa",  time:"há 42 min", svc:"Fotografia corporativa · 5 jul", icon:"camera", tag:"Novo",      day:5,  mon:6, wd:"Sáb", title:"Evento UniMG" },
  { id:"r3", name:"Juliana Souza", time:"há 2h",     svc:"Filmagem de casamento · 12 jul", icon:"video",  tag:"Novo",      day:12, mon:6, wd:"Sex", title:"Casamento" },
  { id:"r4", name:"Pedro Martins", time:"ontem",     svc:"Formatura UFMG · 20 jun",        icon:"camera", tag:"Aguardando",day:null,mon:null,wd:null,title:null },
];

const INITIAL_SCALE = [
  { day:5,  mon:5, wd:"Sáb", title:"Formatura UFMG — Turma 2025", time:"19h–23h", local:"Mineirão, BH",  svc:"Filmagem · Foto · Drone" },
  { day:22, mon:5, wd:"Dom", title:"Festa de 15 anos — Carla F.", time:"15h–20h", local:"Contagem, MG",  svc:"Fotografia" },
  { day:5,  mon:6, wd:"Sáb", title:"Evento corporativo UniMG",    time:"14h–18h", local:"Savassi, BH",   svc:"Fotografia" },
];

function buildDays(year, month, scaleDays) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const prev  = new Date(year, month, 0).getDate();
  const out   = [];
  for (let i = 0; i < first; i++) out.push({ n: prev - first + 1 + i, other: true });
  for (let d = 1; d <= total; d++) {
    out.push({
      n: d,
      today: d === 14 && month === 5 && year === 2025,
      hasScale: scaleDays.includes(d),
    });
  }
  return out;
}

const FILTER_OPTS = [
  { key:"todos", label:"Todos" },
  { key:5,       label:"Jun" },
  { key:6,       label:"Jul" },
  { key:7,       label:"Ago" },
];

export default function HomeProfissional() {
  const [reqs, setReqs]       = useState(INITIAL_REQS);
  const [scale, setScale]     = useState(INITIAL_SCALE);
  const [leaving, setLeaving] = useState({});
  const [toast, setToast]     = useState(null);
  const [month, setMonth]     = useState(5);
  const [year, setYear]       = useState(2025);
  const [filter, setFilter]   = useState("todos");

  const newCount = reqs.filter(r => r.tag === "Novo").length;

  const scaleDays = scale.filter(s => s.mon === month).map(s => s.day);
  const days = buildDays(year, month, scaleDays);

  const visibleScale = filter === "todos" ? scale : scale.filter(s => s.mon === filter);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function removeReq(id, dir) {
    setLeaving(p => ({ ...p, [id]: dir }));
    setTimeout(() => {
      setReqs(p => p.filter(r => r.id !== id));
      setLeaving(p => { const n = { ...p }; delete n[id]; return n; });
    }, 270);
  }

  function accept(req) {
    if (req.day !== null) {
      const entry = { day: req.day, mon: req.mon, wd: req.wd, title: req.title + " — " + req.name, time: "A confirmar", local: "—", svc: "—" };
      setScale(p => [entry, ...p]);
    }
    removeReq(req.id, "goR");
    showToast("Pedido de " + req.name + " aceito!");
  }

  function decline(req) {
    removeReq(req.id, "goL");
    showToast("Pedido recusado.");
  }

  function chMonth(dir) {
    let m = month + dir, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setMonth(m); setYear(y);
  }

  function reqCls(r) {
    return [styles.req, leaving[r.id] === "goR" ? styles.goR : leaving[r.id] === "goL" ? styles.goL : ""].filter(Boolean).join(" ");
  }

  function dayCls(d) {
    return [
      styles.day,
      d.other      ? styles.dayOther : "",
      d.today      ? styles.dayToday : "",
      d.hasScale   ? styles.dayScale : "",
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
            <span className={styles.statLbl}>Próximo evento</span>
            <span className={styles.statVal}>15 jun</span>
          </div>
          <div className={`${styles.stat} ${styles.statYellow}`}>
            <span className={styles.statLbl}>Concluídos</span>
            <span className={styles.statVal}>12</span>
          </div>
        </div>

        <div className={styles.columns}>

          <div className={styles.colLeft}>
            <div className={styles.colHead}>
              Pedidos recebidos
              {newCount > 0 && <span className={styles.badge}>{newCount}</span>}
            </div>
            <div className={styles.scroll}>
              {reqs.length === 0
                ? <p className={styles.empty}>Nenhum pedido pendente</p>
                : reqs.map(r => (
                <div key={r.id} className={reqCls(r)}>
                  <div className={styles.reqTop}>
                    <span className={styles.reqName}>{r.name}</span>
                    <span className={styles.reqTime}>{r.time}</span>
                  </div>
                  <div className={styles.reqSvc}>
                    <Ico name={r.icon} size={13} />
                    {r.svc}
                  </div>
                  <div className={styles.reqFoot}>
                    <span className={`${styles.tag} ${r.tag === "Novo" ? styles.tagNew : styles.tagPend}`}>{r.tag}</span>
                    <div className={styles.acts}>
                      {r.tag === "Novo" ? (
                        <>
                          <button className={styles.btnA} onClick={() => accept(r)}>Aceitar</button>
                          <button className={styles.btnD} onClick={() => decline(r)}>Recusar</button>
                        </>
                      ) : (
                        <button className={styles.btnV}>Ver detalhes</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.colRight}>
            <div className={styles.colHead}>
              Minha escala
              <div className={styles.calNav}>
                <button className={styles.calNavBtn} onClick={() => chMonth(-1)}><Ico name="chevron-left" size={12} /></button>
                <span className={styles.calLbl}>{MONTHS[month]} {year}</span>
                <button className={styles.calNavBtn} onClick={() => chMonth(1)}><Ico name="chevron-right" size={12} /></button>
              </div>
            </div>

            <div className={styles.calWrap}>
              <div className={styles.daysH}>
                {WEEK.map((w, i) => <div key={i} className={styles.dh}>{w}</div>)}
              </div>
              <div className={styles.daysG}>
                {days.map((d, i) => (
                  <div key={i} className={dayCls(d)}>
                    {d.n}
                    {d.hasScale && !d.other && !d.today && <span className={styles.scaleDot} />}
                  </div>
                ))}
              </div>
              <div className={styles.calLegend}>
                <span className={styles.legendDot} />dia com escala
              </div>
            </div>

            <div className={styles.colHead} style={{ borderTop: "1px solid #E8E4DC" }}>
              Eventos confirmados
              <div className={styles.filterRow}>
                {FILTER_OPTS.map(f => (
                  <button
                    key={f.key}
                    className={`${styles.filterBtn} ${filter === f.key ? styles.filterOn : ""}`}
                    onClick={() => setFilter(f.key)}
                  >{f.label}</button>
                ))}
              </div>
            </div>

            <div className={styles.scroll}>
              {visibleScale.length === 0
                ? <p className={styles.empty}>Nenhum evento neste período</p>
                : visibleScale.map((s, i) => (
                <div key={i} className={styles.scItem}>
                  <div className={styles.scDate}>
                    <div className={styles.scNum}>{s.day}</div>
                    <div className={styles.scWd}>{s.wd}</div>
                  </div>
                  <div className={styles.scBody}>
                    <div className={styles.scTitle}>{s.title}</div>
                    <div className={styles.scSub}>
                      <Ico name="clock" size={11} />{s.time}
                      {s.local !== "—" && <><span>·</span><Ico name="map-pin" size={11} />{s.local}</>}
                    </div>
                    {s.svc !== "—" && (
                      <div className={styles.scSub}><Ico name="camera" size={11} />{s.svc}</div>
                    )}
                  </div>
                  <span className={`${styles.tag} ${styles.tagConf}`}>{MONTHS[s.mon]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {toast && (
        <div className={styles.toast}>
          <span className={styles.toastDot} />
          {toast}
        </div>
      )}
    </div>
  );
}