// src/components/BotaoCompra.js
"use client";

export default function BotaoCompra({ valorTotal }) {
  const realizarCompra = () => {
    alert("Compra realizada com sucesso!");
  };

  return (
    <button
      onClick={realizarCompra}
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Comprar - R$ {valorTotal.toFixed(2)}
    </button>
  );
}
