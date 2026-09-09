import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
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
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        flexShrink: 0,
        borderRight: "1px solid #EFEFF3",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
        zIndex: 10,
        height: "100%",
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          padding: "14px 16px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: "#181820" }}>
          Add Nodes
        </Typography>
        <IconButton
          onClick={() => setSidebarOpen(false)}
          sx={{
            width: 26,
            height: 26,
            borderRadius: "7px",
            color: "#8B8B96",
            "&:hover": { bgcolor: "#FAFAFC" },
          }}
        >
          <ChevronLeft size={16} />
        </IconButton>
      </Box>

      
      <Box sx={{ padding: "0 16px 10px" }}>
        <TextField
          fullWidth
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search agents..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <Search size={13} color="#B0B0BA" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 12.5,
              bgcolor: "#FAFAFC",
              borderRadius: "8px",
              paddingLeft: "10px",
              "& fieldset": {
                borderColor: "#EAEAF0",
              },
              "&:hover fieldset": {
                borderColor: "#D0D0DA",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5B4FE5",
                borderWidth: "1px",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "7px 10px 7px 0px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 0.25,
          padding: "0 12px 10px",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t) => (
          <Button
            key={t}
            onClick={() => setActiveTab(t)}
            disableRipple
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: "7px",
              minWidth: "auto",
              textTransform: "none",
              lineHeight: 1,
              color: activeTab === t ? "#5B4FE5" : "#8B8B96",
              bgcolor: activeTab === t ? "#EEECFE" : "transparent",
              "&:hover": {
                bgcolor: activeTab === t ? "#EEECFE" : "#FAFAFC",
              },
            }}
          >
            {t}
          </Button>
        ))}
      </Box>

     
      <Box
        sx={{
          margin: "0 16px 10px",
          fontSize: 11,
          color: "#B0B0BA",
          bgcolor: "#FAFAFC",
          border: "1px dashed #E4E4EC",
          borderRadius: "8px",
          padding: "7px 9px",
        }}
      >
        Drag items onto the canvas to add them
      </Box>

      <Box sx={{ overflowY: "auto", flex: 1, padding: "0 12px 16px" }}>
        {filteredCatalogue.map((sec) => (
          <Box key={sec.section} sx={{ marginBottom: "14px" }}>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: "#B0B0BA",
                letterSpacing: 0.4,
                padding: "4px 4px 6px",
              }}
            >
              {sec.section}
            </Typography>

            {sec.items.map((it) => {
              const c = COLORS[it.color] || COLORS.sky;
              const Icon = ICONS[it.icon] || Bot;
              return (
                <Box
                  key={it.title}
                  draggable
                  onDragStart={(e) => onDragStart(e, it)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.125,
                    padding: "8px 8px",
                    borderRadius: "9px",
                    cursor: "grab",
                    marginBottom: "2px",
                    transition: "background-color 120ms ease",
                    "&:hover": {
                      bgcolor: "#FAFAFC",
                    },
                    "&:active": {
                      cursor: "grabbing",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "8px",
                      bgcolor: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} color={c.ic} />
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#22222B",
                        lineHeight: 1.2,
                      }}
                    >
                      {it.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10.5,
                        color: "#B0B0BA",
                        lineHeight: 1.2,
                        mt: 0.25,
                      }}
                    >
                      {it.subtitle}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}

        {filteredCatalogue.length === 0 && (
          <Typography sx={{ fontSize: 12, color: "#C3C3CC", padding: "10px 4px" }}>
            No matches
          </Typography>
        )}
      </Box>
    </Box>
  );
}