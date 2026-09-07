import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ChevronRight, Play, Save, ArrowLeft } from "lucide-react";
import { initialNodes, initialEdges } from "./data/canvasData";
import { CustomNode } from "./components/CustomNode";
import PipelineGroupNodes from "./components/PipelineGroupNodes";
import { Sidebar } from "./components/Sidebar";

const nodeTypes = {
  customNode: CustomNode,
  pipelineGroup: PipelineGroupNodes,
};

function CanvasFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTab, setActiveTab] = useState("Agents");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
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
    [screenToFlowPosition, setNodes]
  );

  return (
    <div
      style={{
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 22px",
          borderBottom: "1px solid #EFEFF3",
          flexShrink: 0,
          background: "#fff",
          zIndex: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#181820" }}>Life Science Proofing Agent</div>
          <div style={{ fontSize: 12, color: "#A2A2AE" }}>· {nodes.length} nodes   ·{edges.length}  edges</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={btnStyle()}><ArrowLeft size={14} /> Back</button>
          <button style={btnStyle()}><Save size={14} /> Save</button>
          <button style={btnStyle(true)}><Play size={14} fill="#fff" /> Run</button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
        {/* Sidebar Panel */}
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
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
              border: "1px solid #EAEAF0",
              background: "#fff",
              color: "#8B8B96",
              cursor: "pointer",
              position: "absolute",
              left: 10,
              top: 12,
              zIndex: 10,
            }}
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* React Flow Canvas */}
        <div style={{ flex: 1, height: "100%" }}>
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
          >
            <Background variant="dots" gap={22} size={1} color="#E6E6EC" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasFlow />
    </ReactFlowProvider>
  );
}

function btnStyle(primary) {
  return {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12.5,
    fontWeight: 600,
    padding: "7px 13px",
    borderRadius: 8,
    border: primary ? "none" : "1px solid #E4E4EC",
    background: primary ? "#5B4FE5" : "#fff",
    color: primary ? "#fff" : "#3A3A44",
    cursor: "pointer",
  };
}