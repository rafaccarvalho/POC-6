
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
        backgroundColor: temas[temaAtual].botaoCompra,
        color: temas[temaAtual].botaoCompraTexto,
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
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