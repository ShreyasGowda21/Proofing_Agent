import React, { useState, useCallback} from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { ChevronRight, Play, Save, ArrowLeft, RotateCcw } from "lucide-react";
import { initialNodes, initialEdges } from "./data/canvasData";
import { CustomNode } from "./components/CustomNode";
import PipelineGroupNodes from "./components/PipelineGroupNodes";
import { Sidebar } from "./components/Sidebar";

const nodeTypes = {
  customNode: CustomNode,
  pipelineGroup: PipelineGroupNodes,
};

const defaultEdgeOptions = {
  style: { stroke: "#E4E4EC", strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#2fa8d7",
    width: 15,
    height: 15,
  },
};

function CanvasFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTab, setActiveTab] = useState("Agents");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const { screenToFlowPosition } = useReactFlow();
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

const handleRun = async () => {
    if (isRunning || nodes.length === 0) return;
    setIsRunning(true);

    const completedNodeIds = new Set();
    const traversedEdgeIds = new Set();
    const pipelineChildIds = new Set(["crawler", "clause", "obligation", "rule"]);

    
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isExecuting: false,
          isCompleted: false,
        },
      }))
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => ({
        ...edge,
        animated: false,
        className: "",
        style: { ...edge.style, stroke: "#E4E4EC", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#2fa8d7",
          width: 15,
          height: 15,
        },
      }))
    );
  
    const initialNodes = nodes.filter(
      (n) => String(n.id) !== "pipeline-group" && !pipelineChildIds.has(String(n.id))
    );

    const batch1NodeIds = new Set(
      initialNodes.slice(0, 4).map((n) => String(n.id))
    );

    batch1NodeIds.forEach((id) => completedNodeIds.add(id));

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const isBatch1 = batch1NodeIds.has(String(node.id));
        return {
          ...node,
          data: {
            ...node.data,
            isExecuting: isBatch1,
            isCompleted: isBatch1,
          },
        };
      })
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const edgeSource = String(edge.source);

        // Check only edgeSource so outgoing edges from the 4 initial nodes turn green
        const isConnectedToBatch = batch1NodeIds.has(edgeSource);

        if (isConnectedToBatch) {
          traversedEdgeIds.add(String(edge.id));
        }

        const isTraversed = traversedEdgeIds.has(String(edge.id));

        return {
          ...edge,
          animated: isConnectedToBatch,
          className: isTraversed ? "executing-edge" : "",
          style: {
            ...edge.style,
            stroke: isTraversed ? "#22C55E" : "#E4E4EC",
            strokeWidth: isTraversed ? 3 : 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isTraversed ? "#22C55E" : "#2fa8d7",
            width: 16,
            height: 16,
          },
        };
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // PHASE 2: SEQUENTIAL LOOP FOR REMAINING NODES
   
    const remainingNodes = nodes.filter(
      (n) => !batch1NodeIds.has(String(n.id)) && String(n.id) !== "pipeline-group"
    );

    for (let i = 0; i < remainingNodes.length; i++) {
      const currentId = String(remainingNodes[i].id);
      completedNodeIds.add(currentId);

      const isExecutingInsidePipeline = pipelineChildIds.has(currentId);

      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const idStr = String(node.id);
          const isPipelineGroup = idStr === "pipeline-group";

          return {
            ...node,
            data: {
              ...node.data,
              isExecuting:
                idStr === currentId ||
                (isPipelineGroup && isExecutingInsidePipeline),
              isCompleted: completedNodeIds.has(idStr),
            },
          };
        })
      );

      setEdges((prevEdges) =>
        prevEdges.map((edge) => {
          const edgeSource = String(edge.source);

          const isCurrentlyActiveEdge =
            edgeSource === currentId ||
            (currentId === "rule" && edgeSource === "pipeline-group");

          if (isCurrentlyActiveEdge) {
            traversedEdgeIds.add(String(edge.id));
          }

          const isTraversed = traversedEdgeIds.has(String(edge.id));

          return {
            ...edge,
            animated: isCurrentlyActiveEdge,
            className: isTraversed ? "executing-edge" : "",
            style: {
              ...edge.style,
              stroke: isTraversed ? "#22C55E" : "#E4E4EC",
              strokeWidth: isTraversed ? 3 : 2,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isTraversed ? "#22C55E" : "#2fa8d7",
              width: 16,
              height: 16,
            },
          };
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isExecuting: false,
          isCompleted:
            String(node.id) === "pipeline-group"
              ? false
              : node.data.isCompleted,
        },
      }))
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const isTraversed = traversedEdgeIds.has(String(edge.id));

        return {
          ...edge,
          animated: false,
          className: isTraversed ? "executing-edge" : "",
          style: {
            ...edge.style,
            stroke: isTraversed ? "#22C55E" : "#E4E4EC",
            strokeWidth: isTraversed ? 3 : 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isTraversed ? "#22C55E" : "#2fa8d7",
            width: 16,
            height: 16,
          },
        };
      })
    );

    setHasRun(true);
    setIsRunning(false);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const rawData = event.dataTransfer.getData("application/reactflow");
      if (!rawData) return;

      const item = JSON.parse(rawData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type: "customNode",
        position,
        data: {
          title: item.title,
          subtitle: item.subtitle,
          color: item.color,
          icon: item.icon,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <Box
      sx={{
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <style>{`
        .react-flow__edge.executing-edge .react-flow__edge-path {
          stroke: #22C55E !important;
          stroke-width: 3px !important;
        }
      `}</style>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "22px",
          py: "14px",
          borderBottom: "1px solid #EFEFF3",
          flexShrink: 0,
          bgcolor: "#ffffff",
          zIndex: 20,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#181820",
              lineHeight: 1.2,
            }}
          >
            Life Science Proofing Agent
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: "#A2A2AE",
              mt: 0.25,
            }}
          >
            · {nodes.length} nodes · {edges.length} edges
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={14} />}
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              px: "13px",
              py: "7px",
              borderRadius: "8px",
              borderColor: "#E4E4EC",
              color: "#3A3A44",
              textTransform: "none",
              lineHeight: 1,
              "&:hover": {
                borderColor: "#D0D0DA",
                bgcolor: "#FAFAFC",
              },
            }}
          >
            Back
          </Button>

          <Button
            variant="outlined"
            startIcon={<Save size={14} />}
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              px: "13px",
              py: "7px",
              borderRadius: "8px",
              borderColor: "#E4E4EC",
              color: "#3A3A44",
              textTransform: "none",
              lineHeight: 1,
              "&:hover": {
                borderColor: "#D0D0DA",
                bgcolor: "#FAFAFC",
              },
            }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            disabled={isRunning}
            startIcon={
              hasRun && !isRunning ? (
                <RotateCcw size={14} />
              ) : (
                <Play size={14} fill={isRunning ? "#A0A0A0" : "#ffffff"} />
              )
            }
            onClick={handleRun}
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              px: "13px",
              py: "7px",
              borderRadius: "8px",
              bgcolor: isRunning ? "#D0D0DA" : "#5B4FE5",
              color: "#ffffff",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#4B3FD5",
              },
            }}
          >
            {isRunning ? "Executing..." : hasRun ? "Retry" : "Run"}
          </Button>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}
      >
        {sidebarOpen && (
          <Sidebar
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            query={query}
            setQuery={setQuery}
          />
        )}

        {!sidebarOpen && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              width: 26,
              height: 26,
              borderRadius: "7px",
              border: "1px solid #EAEAF0",
              bgcolor: "#ffffff",
              color: "#8B8B96",
              position: "absolute",
              left: 10,
              top: 12,
              zIndex: 10,
              "&:hover": {
                bgcolor: "#FAFAFC",
              },
            }}
          >
            <ChevronRight size={16} />
          </IconButton>
        )}

        <Box sx={{ flex: 1, height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Background variant="dots" gap={22} size={2.0} color="#e3e3f8" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasFlow />
    </ReactFlowProvider>
  );
}
