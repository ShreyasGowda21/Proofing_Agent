import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Trash2, Bot } from "lucide-react";
import { COLORS, NODE_W } from "../constants/theme";
import { ICONS } from "./Icons";

export function CustomNode({ id, data, selected }) {
  const { deleteElements } = useReactFlow();
  const c = COLORS[data.color] || COLORS.sky;
  const Icon = ICONS[data.icon] || Bot;

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  const isPipeline = data.isPipelineNode;

  return (
    <div style={{ width: NODE_W, position: "relative" }}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={isPipeline ? Position.Top : Position.Left}
        style={{
          width: 9,
          height: 9,
          background: "#fff",
          border: "2px solid  #2fa8d7 ",
          ...(isPipeline ? { top: -5 } : { left: -5 }),
        }}
      />

      <div
        style={{
          background: "#fff",
          border: selected ? "1.5px solid  #2fa8d7 " : "1px solid #E7E7EC",
          borderRadius: 14,
          boxShadow: selected
            ? "0 4px 14px rgba(91,79,229,0.18)"
            : "0 1px 2px rgba(20,20,30,0.04), 0 4px 10px rgba(20,20,30,0.04)",
          padding: "12px 14px",
          position: "relative",
          userSelect: "none",
        }}
        className="node-card"
      >
        <button
          onClick={handleDelete}
          title="Delete node"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            border: "none",
            background: "transparent",
            color: "#B5B5BF",
            cursor: "pointer",
            opacity: 0,
            transition: "opacity 120ms ease",
          }}
          className="node-del-btn"
        >
          <Trash2 size={13} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              minWidth: 30,
              borderRadius: 9,
              background: c.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={15} color={c.ic} strokeWidth={2.2} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#22222B",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={data.title}
            >
              {data.title}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: "#9C9CA8",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginTop: 1,
              }}
            >
              {data.subtitle}
            </div>
          </div>
        </div>

        {data.badge && (
          <div
            style={{
              marginTop: 8,
              display: "inline-block",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 0.4,
              color: c.chip,
              background: c.bg,
              borderRadius: 5,
              padding: "2px 6px",
            }}
          >
            {data.badge}
          </div>
        )}

        {data.stats && (
          <div
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid #F0F0F4",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: 8,
              columnGap: 8,
            }}
          >
            {Object.entries(data.stats).map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 8.5, color: "#B0B0BA", fontWeight: 700, letterSpacing: 0.3 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#22222B" }}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={isPipeline ? Position.Bottom : Position.Right}
        style={{
          width: 9,
          height: 9,
          background: " #2fa8d7 ",
          border: "2px solid #fff",
          ...(isPipeline ? { bottom: -5 } : { right: -5 }),
        }}
      />

      <style>{`
        .node-card:hover .node-del-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
}