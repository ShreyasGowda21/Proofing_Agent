import { HideSource, HistoryEduTwoTone } from "@mui/icons-material";

export const initialNodes = [
  {
    id: "pipeline-group",
    type: "pipelineGroup",
    data: { label: "AGENT PIPELINE" },
    position: { x: 280, y: 20 },
    style: {
      width: 250,
      height: 440,
    },
  },
  {
    id: "doc1",
    type: "customNode",
    position: { x: 10, y: 40 },
    data: { title: "Product_Reference_Handbook.pdf", subtitle: "Product Reference · Knowledge Vault", badge: "DOCUMENT", color: "violet", icon: "BookOpen",hideTarget:true },
  },
  {
    id: "doc2",
    type: "customNode",
    position: { x: 10, y: 150 },
    data: { title: "Regional_Compliance_Standards.pdf", subtitle: "Compliance Standards · Cloud Storage", badge: "DOCUMENT", color: "amber", icon: "FileText", hideTarget:true },
  },
  {
    id: "doc3",
    type: "customNode",
    position: { x: 10, y: 260 },
    data: { title: "Review_Workflow_SOP.pdf", subtitle: "Workflow Procedures · Internal Library", badge: "DOCUMENT", color: "sky", icon: "FileText", hideTarget:true },
  },
  {
    id: "conn1",
    type: "customNode",
    position: { x: 10, y: 370 },
    data: { title: "Regulatory Hub", subtitle: "Connector", color: "blue", icon: "Plug", hideTarget:true },
  },

  // Pipeline Agents with vertical handle positioning
  {
    id: "crawler",
    type: "customNode",
    parentId: "pipeline-group",
    extent: "parent",
    position: { x: 20, y: 35 },
    data: { title: "Discovery Agent", subtitle: "Autonomous Agent", color: "indigo", icon: "Globe", isPipelineNode: true, hideTarget:true },
  },
  {
    id: "clause",
    type: "customNode",
    parentId: "pipeline-group",
    extent: "parent",
    position: { x: 20, y: 135 },
    data: { title: "Content Segmentation Agent", subtitle: "Autonomous Agent", color: "indigo", icon: "MessageSquare", isPipelineNode: true },
  },
  {
    id: "obligation",
    type: "customNode",
    parentId: "pipeline-group",
    extent: "parent",
    position: { x: 20, y: 235 },
    data: { title: "Requirement Analyzer", subtitle: "Autonomous Agent", color: "rose", icon: "AlertTriangle", isPipelineNode: true },
  },
  {
    id: "rule",
    type: "customNode",
    parentId: "pipeline-group",
    extent: "parent",
    position: { x: 20, y: 335 },
    data: { title: "Validation Agent", subtitle: "Autonomous Agent", color: "orange", icon: "FileCheck2", isPipelineNode: true, hideSource:true },
  },

  {
    id: "diff",
    type: "customNode",
    position: { x: 600, y: 200 },
    data: { title: "Document Comparator", subtitle: "Processor", color: "orange", icon: "Shuffle" },
  },
  {
    id: "knowledge",
    type: "customNode",
    position: { x: 860, y: 170 },
    data: {
      title: "Knowledge Repository",
      subtitle: "Store",
      color: "green",
      
      icon: "Database",
      stats: {
        "CHUNK SZ": "512",
        "CHUNKS": "28,640",
        "VECTORS": "26,914",
        "VECTOR SZ": "768",
        "New Vec":'800'
      },
      extra : 5
    },
  },
  {
    id: "proofx",
    type: "customNode",
    position: { x: 1240, y: 90 },
    data: { title: "Verification Agent", subtitle: "Rules", color: "purple", icon: "MessageSquareCode",  },
  },
  {
    id: "regulatory",
    type: "customNode",
    position: { x: 1240, y: 290 },
    data: { title: "Compliance Review Agent", subtitle: "Interactive", color: "blue", icon: "MessageCircle", hideSource:true},
  },
];

export const initialEdges = [
  // Document edges merge into the pipeline group port
  { id: "e1", source: "doc1", target: "pipeline-group" },
  { id: "e2", source: "doc2", target: "pipeline-group" },
  { id: "e3", source: "doc3", target: "pipeline-group" },
  { id: "e4", source: "conn1", target: "pipeline-group" },

  // Internal vertical pipeline flow
  { id: "e5", source: "crawler", target: "clause" },
  { id: "e6", source: "clause", target: "obligation" },
  { id: "e7", source: "obligation", target: "rule" },

  // Output from pipeline group to next processor
  { id: "e8", source: "pipeline-group", target: "diff" },
  { id: "e9", source: "diff", target: "knowledge" },
  { id: "e10", source: "knowledge", target: "proofx" },
  { id: "e11", source: "proofx", target: "regulatory" },
];

export const TABS = ["Agents", "Tools", "LLM", "MCP", "Docs"];

export const CATALOGUE = {
  Agents: [
    {
      section: "RAG",
      items: [
        { title: "Knowledge Discovery Assistant", subtitle: "agt_discovery", color: "sky", icon: "Database" },
        { title: "Document Retrieval Agent", subtitle: "agt_retrieval", color: "sky", icon: "FileText" },
        { title: "Issue Investigation Agent", subtitle: "agt_investigator", color: "sky", icon: "SearchCheck" },
      ],
    },
    {
      section: "Compliance",
      items: [
        { title: "Source Discovery Agent", subtitle: "agt_source", color: "indigo", icon: "Globe" },
        { title: "Content Segment Agent", subtitle: "agt_segment", color: "indigo", icon: "MessageSquare" },
        { title: "Requirement Analysis Agent", subtitle: "agt_analysis", color: "rose", icon: "AlertTriangle" },
        { title: "Validation Agent", subtitle: "agt_validation", color: "orange", icon: "FileCheck2" },
        { title: "Verification Agent", subtitle: "agt_verify", color: "purple", icon: "MessageSquareCode" },
        { title: "Compliance Review Agent", subtitle: "agt_review", color: "blue", icon: "MessageCircle" },
      ],
    },
  ],
  Tools: [
    {
      section: "Processing",
      items: [
        { title: "Document Comparator", subtitle: "tool_compare", color: "orange", icon: "Shuffle" },
        { title: "Text Recognition Tool", subtitle: "tool_ocr", color: "amber", icon: "ScanText" },
        { title: "Source Finder", subtitle: "tool_search", color: "sky", icon: "Globe" },
      ],
    },
  ],
  LLM: [
    {
      section: "Models",
      items: [
        { title: "Reasoning Model", subtitle: "llm_reason", color: "violet", icon: "Sparkles" },
        { title: "Analysis Engine", subtitle: "llm_analysis", color: "green", icon: "Cpu" },
        { title: "Generation Model", subtitle: "llm_generation", color: "blue", icon: "Wand2" },
      ],
    },
  ],
  MCP: [
    {
      section: "Connectors",
      items: [
        { title: "Team Messaging Connector", subtitle: "mcp_messaging", color: "purple", icon: "Slack" },
        { title: "Cloud Records Connector", subtitle: "mcp_cloud", color: "sky", icon: "Cloud" },
        { title: "Regulatory Hub", subtitle: "mcp_regulatory", color: "blue", icon: "Plug" },
      ],
    },
  ],
  Docs: [
    {
      section: "Sources",
      items: [
        { title: "Import Reference File", subtitle: "doc_import", color: "violet", icon: "BookOpen" },
        { title: "Connect Cloud Storage", subtitle: "doc_cloud", color: "amber", icon: "Cloud" },
        { title: "Connect Internal Vault", subtitle: "doc_vault", color: "sky", icon: "FolderInput" },
      ],
    },
  ],
};