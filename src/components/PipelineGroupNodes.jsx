import React from "react";
import { Handle, Position } from "@xyflow/react";

function PipelineGroupNodes({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(91,79,229,0.035)",
        border: "1px dashed rgba(91,79,229,0.25)",
        borderRadius: 16,
        padding: 12,
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 10,
          background: " #2fa8d7 ",
          border: "2px solid #fff",
          left: -5,
          top: "50%",
        }}
      />
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#8A80EE",
          letterSpacing: "0.5px",
        }}
      >
        {data.label || "AGENT PIPELINE"}
      </div>

      {/* Container Output Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          background: " #2fa8d7 ",
          border: "2px solid #fff",
          right: -5,
          top: "50%",
        }}
      />
    </div>
  );
}
export default PipelineGroupNodes