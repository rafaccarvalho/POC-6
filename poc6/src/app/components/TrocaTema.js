// src/components/TrocaTema.js
"use client";
import { useState, useEffect } from "react";
import { temas } from "/styles/temas";

export default function TrocaTema() {
  const [temaAtual, setTemaAtual] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    const tema = temas[temaAtual];
    root.style.setProperty("--background-color", tema.background);
    root.style.setProperty("--text-color", tema.color);
  }, [temaAtual]);

  const alternarTema = () => {
    setTemaAtual(temaAtual === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={alternarTema}
      style={{
        backgroundColor: temaAtual === "light" ? "#333" : "#f5f5f5",
        color: temaAtual === "light" ? "#f5f5f5" : "#333",
        padding: "10px 20px",
        marginBottom: "20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Alternar para {temaAtual === "light" ? "Tema Escuro" : "Tema Claro"}
    </button>
  );
}
