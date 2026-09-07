import React from "react";
import { Search, ChevronLeft, Bot } from "lucide-react";
import { COLORS } from "../constants/theme";
import { CATALOGUE, TABS } from "../data/canvasData";
import { ICONS } from "./Icons";

export function Sidebar({ setSidebarOpen, activeTab, setActiveTab, query, setQuery }) {
  const filteredCatalogue = (CATALOGUE[activeTab] || [])
    .map((sec) => ({
      ...sec,
      items: sec.items.filter((it) => it.title.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((sec) => sec.items.length > 0);

  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        flexShrink: 0,
        borderRight: "1px solid #EFEFF3",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        zIndex: 10,
        height: "100%",
      }}
    >
      <div style={{ padding: "14px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: "#181820" }}>Add Nodes</span>
        <button onClick={() => setSidebarOpen(false)} style={iconBtnStyle()}>
          <ChevronLeft size={16} />
        </button>
      </div>

      <div style={{ padding: "0 16px 10px" }}>
        <div style={{ position: "relative" }}>
          <Search size={13} color="#B0B0BA" style={{ position: "absolute", left: 9, top: 9 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontSize: 12.5,
              padding: "7px 10px 7px 28px",
              borderRadius: 8,
              border: "1px solid #EAEAF0",
              outline: "none",
              background: "#FAFAFC",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, padding: "0 12px 10px", flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              color: activeTab === t ? "#5B4FE5" : "#8B8B96",
              background: activeTab === t ? "#EEECFE" : "transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        style={{
          margin: "0 16px 10px",
          fontSize: 11,
          color: "#B0B0BA",
          background: "#FAFAFC",
          border: "1px dashed #E4E4EC",
          borderRadius: 8,
          padding: "7px 9px",
        }}
      >
        Drag items onto the canvas to add them
      </div>

      <div style={{ overflowY: "auto", flex: 1, padding: "0 12px 16px" }}>
        {filteredCatalogue.map((sec) => (
          <div key={sec.section} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#B0B0BA", letterSpacing: 0.4, padding: "4px 4px 6px" }}>
              {sec.section}
            </div>
            {sec.items.map((it) => {
              const c = COLORS[it.color] || COLORS.sky;
              const Icon = ICONS[it.icon] || Bot;
              return (
                <div
                  key={it.title}
                  draggable
                  onDragStart={(e) => onDragStart(e, it)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "8px 8px",
                    borderRadius: 9,
                    cursor: "grab",
                    marginBottom: 2,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#FAFAFC")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={13} color={c.ic} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#22222B" }}>{it.title}</div>
                    <div style={{ fontSize: 10.5, color: "#B0B0BA" }}>{it.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        {filteredCatalogue.length === 0 && (
          <div style={{ fontSize: 12, color: "#C3C3CC", padding: "10px 4px" }}>No matches</div>
        )}
      </div>
    </div>
  );
}

function iconBtnStyle() {
  return {
    width: 26,
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    border: "none",
    background: "transparent",
    color: "#8B8B96",
    cursor: "pointer",
  };
}