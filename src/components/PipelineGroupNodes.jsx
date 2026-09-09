import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Box, Typography } from "@mui/material";

function PipelineGroupNodes({ data }) {

  const isExecuting = data?.isExecuting;
  const isCompleted = data?.isCompleted;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "rgba(91,79,229,0.035)",
       
        borderRadius: "16px",
        padding: "12px",
        position: "relative",
        borderRadius: "16px",
        p: 2,
        bgcolor: "#FAF9FE",
        // 🟢 Active green border & glowing shadow while executing
        border: isExecuting
          ? "2px solid #22C55E"
          : isCompleted
          ? "2px solid #22C55E"
          : "1.5 solid #E4E4EC",
        boxShadow: isExecuting
          ? "0 0 20px rgba(34, 197, 94, 0.35)"
          : "none",
        transition: "all 0.3s ease-in-out",
        position: "relative",
      }}
    >
     {(isExecuting || isCompleted) && (
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: -6,
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: "#22C55E",
            border: "2px solid #ffffff",
            zIndex: 30,
            ...(isExecuting && {
              animation: "pulse 1.2s infinite ease-in-out",
            }),
          }}
        />
      )}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 10,
          background: "#2fa8d7",
          border: "2px solid #fff",
          left: -5,
          top: "50%",
        }}
      />

      {/* Group Title */}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          color: "#8A80EE",
          letterSpacing: "0.5px",
          lineHeight: 1,
        }}
      >
        {data.label || "AGENT PIPELINE"}
      </Typography>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          background: "#2fa8d7",
          border: "2px solid #fff",
          right: -5,
          top: "50%",
        }}
      />
    </Box>
  );
}

export default PipelineGroupNodes;