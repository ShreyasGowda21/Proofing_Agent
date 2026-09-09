import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Box, Paper, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { Trash2, Bot, Check } from "lucide-react";
import { COLORS, NODE_W } from "../constants/theme";
import { ICONS } from "./Icons";
import { keyframes } from "@mui/system";

//  Expanding Blue Pulse Keyframe Animation
const bluePulseAnimation = keyframes`
  0% {
    border-color: #2fa8d7;
    box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.85);
  }
  70% {
    border-color: #2fa8d7;
    /* Expands blue box-shadow 16px outward while fading opacity */
    box-shadow: 0 0 0 16px rgba(59, 130, 246, 0);
  }
  100% {
    border-color: #2fa8d7;
    box-shadow: 0 0 0 0px rgba(59, 130, 246, 0);
  }
`;

export function CustomNode({ id, data, selected }) {
  const { deleteElements } = useReactFlow();
  const c = COLORS[data.color] || COLORS.sky;
  const Icon = ICONS[data.icon] || Bot;

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  const isPipeline = data.isPipelineNode;
  const nodeWidth = data.extra ? 320 : data.stats ? 240 : NODE_W;

  return (
    <Box sx={{ width: nodeWidth, position: "relative" }}>
     
      {(data.isExecuting || data.isCompleted) && (
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: -6,
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: data.isExecuting ? "#2fa8d7" : "#22C55E",
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            transition: "background-color 0.3s ease",
          }}
        >
          {data.isCompleted && !data.isExecuting && (
            <Check size={10} color="#ffffff" strokeWidth={3.5} />
          )}
        </Box>
      )}

      
      {!data.hideTarget && (
        <Handle
          type="target"
          position={isPipeline ? Position.Top : Position.Left}
          style={{
            width: 9,
            height: 9,
            background: "#fff",
            border: data.isExecuting ? "2px solid #3B82F6" : "2px solid #2fa8d7",
            ...(isPipeline ? { top: -5 } : { left: -5 }),
          }}
        />
      )}

      
      <Paper
        elevation={0}
        sx={{
          background: "#ffffff",
          border: data.isExecuting
            ? "2px solid #2fa8d7"
            : data.isCompleted
            ? "2px solid #22C55E"
            : selected
            ? "1.5px solid #2fa8d7"
            : "1px solid #E7E7EC",
          borderRadius: "14px",
          padding: "12px 14px",
          position: "relative",
          userSelect: "none",
          animation: data.isExecuting
            ? `${bluePulseAnimation} 1.4s cubic-bezier(0.25, 0, 0.15, 1) infinite`
            : "none",
          boxShadow: data.isExecuting
            ? "none"
            : selected
            ? "0 4px 14px rgba(91,79,229,0.18)"
            : "0 1px 2px rgba(20,20,30,0.04), 0 4px 10px rgba(20,20,30,0.04)",
          transition: "border 0.2s ease, box-shadow 0.2s ease",
          "&:hover .node-del-btn": {
            opacity: 1,
          },
        }}
      >
        <Tooltip title="Delete node" arrow placement="top">
          <IconButton
            onClick={handleDelete}
            className="node-del-btn"
            sx={{
              position: "absolute",
              top: -13,
              right: 0,
              width: 26,
              height: 26,
              border: "1px solid #E7E7EC",
              bgcolor: "#FFFFFF",
              color: "#EF4444",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              zIndex: 10,
              opacity: 0,
              transition: "opacity 120ms ease, background-color 120ms ease",
              "&:hover": {
                bgcolor: "#FEE2E2",
                color: "#DC2626",
              },
            }}
          >
            <Trash2 size={13} />
          </IconButton>
        </Tooltip>

        {/* Header Content */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              minWidth: 30,
              borderRadius: "9px",
              bgcolor: c.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={15} color={c.ic} strokeWidth={2.2} />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="subtitle2"
              title={data.title}
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#22222B",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
              }}
            >
              {data.title}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontSize: 11.5,
                color: "#9C9CA8",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                mt: 0.2,
              }}
            >
              {data.subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Badge Component */}
        {data.badge && (
          <Chip
            label={data.badge}
            size="small"
            sx={{
              mt: 1,
              height: "auto",
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: "0.4px",
              color: c.chip,
              bgcolor: c.bg,
              borderRadius: "5px",
              "& .MuiChip-label": {
                px: "6px",
                py: "2px",
              },
            }}
          />
        )}

        {/* Stats Grid */}
        {data.stats && (
          <Box
            sx={{
              mt: 1.25,
              pt: 1.25,
              borderTop: "1px solid #F0F0F4",
              display: "grid",
              gridTemplateColumns: data.extra
                ? `repeat(${data.extra}, 1fr)`
                : "repeat(3, 1fr)",
              rowGap: 1,
              columnGap: 1,
            }}
          >
            {Object.entries(data.stats).map(([k, v]) => (
              <Box key={k}>
                <Typography
                  sx={{
                    fontSize: 8.5,
                    color: "#B0B0BA",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                  }}
                >
                  {k}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#22222B",
                  }}
                >
                  {v}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Source Handle */}
      {!data.hideSource && (
        <Handle
          type="source"
          position={isPipeline ? Position.Bottom : Position.Right}
          style={{
            width: 9,
            height: 9,
            background: data.isExecuting ? "#22C55E" : "#2fa8d7",
            border: "2px solid #fff",
            ...(isPipeline ? { bottom: -5 } : { right: -5 }),
          }}
        />
      )}
    </Box>
  );
}

