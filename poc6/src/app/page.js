// src/app/page.js
"use client";

import { useState } from "react";
import DetalhesFilme from "./components/DetalhesFilme";
import GradeAssentos from "./components/GradeAssentos";
import BotaoCompra from "./components/BotaoCompra";


export default function Home() {
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);

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
    <div>
      <DetalhesFilme />
      <GradeAssentos
        assentosSelecionados={assentosSelecionados}
        selecionarAssento={selecionarAssento}
      />
      <BotaoCompra valorTotal={valorTotal} />
    </div>
  );
}
