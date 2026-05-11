import { useState } from "react";

const stats = [
  { value: "200+", label: "Projetos entregues", color: "#FF5722" },
  { value: "98%", label: "Satisfação dos clientes", color: "#FF5722" },
  { value: "70%", label: "Melhoria de comunicação", color: "#6B7AFF" },
  { value: "1", label: "Anos no setor audiovisual", color: "#6B7AFF" },
];

const features = [
  {
    tag: "Gestão de clientes",
    tagColor: "#FFD6CC",
    tagText: "#FF5722",
    desc: "Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.",
  },
  {
    tag: "Gestão de clientes",
    tagColor: "#CCF5E7",
    tagText: "#00875A",
    desc: "Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.",
  },
  {
    tag: "Gestão de clientes",
    tagColor: "#FFD6CC",
    tagText: "#FF5722",
    desc: "Reserva, devolução e rastreio de todo o inventário técnico em tempo real.",
  },
  {
    tag: "Escalas de equipe",
    tagColor: "#D6E4FF",
    tagText: "#2563EB",
    desc: "Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.",
  },
  {
    tag: "Financeiro",
    tagColor: "#FFF3CC",
    tagText: "#B45309",
    desc: "Orçamentos, pagamentos e receita por projeto com visão consolidada.",
  },
  {
    tag: "Gestão de clientes",
    tagColor: "#E0FFD6",
    tagText: "#16A34A",
    desc: "Dashboards em tempo real com status de cada etapa da produção.",
  },
];

const navIcons = [
  <svg key="calc" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="10" y2="16"/><line x1="14" y1="16" x2="16" y2="16"/></svg>,
  <svg key="cam" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  <svg key="team" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="2"/><path d="M21 21v-2a3 3 0 0 0-2-2.83"/></svg>,
  <svg key="out" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
];

export default function Home() {
  const [activeNav, setActiveNav] = useState(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Sora', 'Nunito', sans-serif", background: "#F9F9F9", color: "#1a1a1a" }}>
      {/* Sidebar */}
      <aside style={{
        width: 56,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 18,
        paddingBottom: 24,
        borderRight: "1px solid #F0F0F0",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #FF5722, #FF8A65)", borderRadius: 7 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 16 }}>
            {navIcons.map((icon, i) => (
              <button
                key={i}
                onClick={() => setActiveNav(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: activeNav === i ? "#FF5722" : "#BDBDBD",
                  padding: 6,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#BDBDBD" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </button>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 56, flex: 1, padding: "40px 48px 60px", maxWidth: 900 }}>
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 12 }}>
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: 1, color: "#222" }}>FRAME</span>
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: 1, color: "#FF5722" }}>TECH</span>
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.18, margin: 0, maxWidth: 340 }}>
              Gestão que acompanha<br />
              seu <span style={{ color: "#FF5722" }}>ritmo</span>
            </h1>
            <p style={{ color: "#6B7280", fontSize: 13.5, lineHeight: 1.65, marginTop: 16, maxWidth: 330 }}>
              Do primeiro contato com o cliente até a entrega final —<br />
              tudo em uma plataforma.<br />
              Agendamentos, equipes, equipamentos e financeiro integrados.
            </p>
            <div style={{ marginTop: 20, fontSize: 13 }}>
              <a href="#" style={{ color: "#FF5722", fontWeight: 600, textDecoration: "none" }}>Faça login</a>
              <span style={{ color: "#9CA3AF", margin: "0 6px" }}>ou</span>
              <a href="#" style={{ color: "#6B7280", fontWeight: 500, textDecoration: "none" }}>cadastre-se</a>
            </div>
          </div>

          {/* Dashboard card */}
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 22px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            minWidth: 220,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5722" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFC107" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4CAF50" }} />
              <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>FrameTech · Dashboard</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Projetos ativos", value: "24", bg: "#FFF0EB", val: "#FF5722" },
                { label: "Clientes", value: "148", bg: "#E8F5E9", val: "#2E7D32" },
                { label: "Receita mês", value: "87k", bg: "#E3F2FD", val: "#1565C0" },
                { label: "Entregas", value: "129", bg: "#FFF8E1", val: "#F57F17" },
              ].map((item) => (
                <div key={item.label} style={{ background: item.bg, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: item.val }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Stats row */}
        <section style={{ display: "flex", gap: 40, marginBottom: 52, borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", padding: "28px 0" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4, maxWidth: 100, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </section>

        {/* Features grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 14,
              padding: "18px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.15s, box-shadow 0.15s",
              cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; }}
            >
              <span style={{
                display: "inline-block",
                background: f.tagColor,
                color: f.tagText,
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 20,
                padding: "3px 10px",
                marginBottom: 10,
              }}>{f.tag}</span>
              <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}