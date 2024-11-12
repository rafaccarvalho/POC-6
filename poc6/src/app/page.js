"use client";

import { useState, useEffect } from "react";
import DetalhesFilme from "./components/DetalhesFilme";
import GradeAssentos from "./components/GradeAssentos";
import BotaoCompra from "./components/BotaoCompra";
import { temas } from "/styles/temas";

export default function Home() {
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [temaAtual, setTemaAtual] = useState("light");

  // Verifica a preferência de tema do sistema (light ou dark)
  useEffect(() => {
    const temaPreferido = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTemaAtual(temaPreferido);
  }, []);

  const selecionarAssento = (numero) => {
    if (assentosSelecionados.includes(numero)) {
      setAssentosSelecionados(
        assentosSelecionados.filter((assento) => assento !== numero)
      );
    } else {
      setAssentosSelecionados([...assentosSelecionados, numero]);
    }
  };

  const precoPorAssento = 25;
  const valorTotal = assentosSelecionados.length * precoPorAssento;

  return (
    <div
      style={{
        backgroundColor: temas[temaAtual].background,
        color: temas[temaAtual].color,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "50px"
      }}
    >
      <div>
        <h1>A Forja</h1>
        <p className="horario">16:40</p>
        <BotaoCompra valorTotal={valorTotal} temaAtual={temaAtual} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "50px",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "30px"
        }}
      >
        <div style={{ flex: 1 }} className="center-seats">
          <GradeAssentos
            assentosSelecionados={assentosSelecionados}
            selecionarAssento={selecionarAssento}
            corSelecionado={temas[temaAtual].seatSelected}
            temaAtual={temaAtual} // Passando o tema atual para o GradeAssentos
          />
        </div>

        <div
          className="hide-on-mobile"
          style={{ marginLeft: "40px", marginRight: "300px" }}
        >
          <DetalhesFilme />
        </div>
      </div>
    </div>
  );
}
