"use client";

import { useState, useEffect } from "react";
import { temas } from "/styles/temas"; 

{/*Grade de assentos*/}
export default function GradeAssentos({ assentosSelecionados, selecionarAssento, corSelecionado, temaAtual }) {
  const assentos = Array.from({ length: 64 }, (_, index) => {
    const indisponiveis = [1, 2, 3, 4, 5, 8, 31, 32, 33, 44, 48, 50, 53];
    const inexistentes = [57, 58, 63, 64];
    
    return {
      numero: index + 1,
      indisponivel: !indisponiveis.includes(index + 1),
      inexistente: inexistentes.includes(index + 1),
    };
  });

  const renderizarAssentos = () => {
    const colunas = 8;
    const linhas = Math.ceil(assentos.length / colunas);
    let assentosPorLinha = [];
    for (let i = 0; i < linhas; i++) {
      assentosPorLinha.push(assentos.slice(i * colunas, (i + 1) * colunas));
    }
    return assentosPorLinha;
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  return (
    <div
      style={{
        marginLeft: isDesktop ? "300px" : "0", 
      }}
    >
      {renderizarAssentos().map((linha, index) => (
        <div key={index} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          {linha.map((assento) => (
            <button
              key={assento.numero}
              onClick={() => selecionarAssento(assento.numero)}
              disabled={!assento.indisponivel }
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: assentosSelecionados.includes(assento.numero)
                  ? corSelecionado
                  : assento.inexistente
                  ? temas[temaAtual].seatInexistente
                  : assento.indisponivel
                  ? temas[temaAtual].seatAvailable
                  : temas[temaAtual].seatUnavailable,
                color: "white",
                cursor: assento.indisponivel ? "pointer" : "default",
                border: "none",
              }}
            />
          ))}
        </div>
      ))}

      {/*Tela do cinema*/}
      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: temas[temaAtual].screenBackground,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-20px",
            fontSize: "16px",
            color: temas[temaAtual].corTela,
          }}
        >
          Tela
        </span>
      </div>

      {/*Ìcone indicando assentos livres*/}
      <div style={{ display: "flex", gap: "30px", marginTop: "20px",}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: temas[temaAtual].ballFree,
              marginRight: "8px",
            }}
          />
          <span style={{ fontSize: "14px", color: temaAtual === "dark" ? "#fff" : "#000" }}>
            livre
          </span>
        </div>

      {/*Ìcone indicando assentos selecionados*/}
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: temas[temaAtual].ballSelected,
              marginRight: "8px",
            }}
          />
          <span style={{ fontSize: "14px", color: temaAtual === "dark" ? "#fff" : "#000" }}>
            selecionado
          </span>
        </div>

      {/*Ìcone indicando assentos indisponiveis*/}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: temas[temaAtual].ballOccupied,
              marginRight: "8px",
            }}
          />
          <span style={{ fontSize: "14px", color: temaAtual === "dark" ? "#fff" : "#000" }}>
            indisponível
          </span>
        </div>
      </div>
    </div>
  );
}
