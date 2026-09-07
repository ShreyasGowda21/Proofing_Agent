# Visual Agent Pipeline Builder

A dynamic, node-based visual pipeline workspace built with React and **React Flow (`@xyflow/react`)**. This project demonstrates how to create complex, multi-stage agent workflows, document connectors, and grouped pipeline containers with custom handle alignments and custom node layouts.

![React Flow Visualizer](https://img.shields.io/badge/React_Flow-v12-5B4FE5?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

---

## ✨ Features

* **Parent-Child Group Containers:** Encapsulate internal sub-flows (e.g., sequentially chained agents) inside a single container (`PipelineGroupNode`) featuring unified entry and exit connection ports.
* **Dynamic Handle Orientation:** Custom nodes automatically adapt their handle positioning (Top/Bottom vs. Left/Right) based on whether they operate within a vertical sub-pipeline or standard canvas flow.
* **Custom Node Architecture:** Rich custom cards displaying dynamic badges, icons, internal statistics, metadata, and contextual quick-action buttons (e.g., delete).
* **Interactive Canvas Controls:** Native support for zooming, panning, node dragging, minimap overview, custom canvas backgrounds, and edge path selection.
* **Flexible Edge Styling:** Configurable edge styling, colors, animated connections, and smooth Bezier / step routing.

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Diagramming Engine:** `@xyflow/react` (React Flow v12)
* **Iconography:** `lucide-react`
* **Build Tool:** Vite / Create React App

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── CustomNode.jsx            # Main node UI with dynamic handle positions
│   ├── PipelineGroupNode.jsx     # Parent group container component
│   └── Icons.jsx                 # Dynamic Lucide icon mapping
├── data/
│   └── canvasData.js             # Initial node topology and edge configurations
├── constants/
│   └── theme.js                  # Color palettes, dimensions, and card themes
├── Canvas.jsx                    # ReactFlow canvas component and handler setup
└── App.jsx                       # Entry application layout
