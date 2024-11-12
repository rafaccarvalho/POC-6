"use client";

import { temas } from "/styles/temas";

export default function BotaoCompra({ valorTotal, temaAtual }) {
  const handleClick = () => {
    alert("Compra realizada com sucesso");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: temas[temaAtual].botaoCompra, // Cor do botão conforme o tema
        color: temas[temaAtual].botaoCompraTexto, // Cor do texto do botão conforme o tema
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)", // Centraliza horizontalmente
        padding: "10px 110px",
        fontSize: "15px",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        lineHeight: "1.4",
        marginBottom: "25px",
      }}
    >
      <span style={{ fontSize: "25px" }}>Comprar</span>
      <br></br>
      R$ {valorTotal},00
    </button>
  );
}