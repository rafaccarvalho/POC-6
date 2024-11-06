// src/components/GradeAssentos.js
"use client";

export default function GradeAssentos({ assentosSelecionados, selecionarAssento }) {
  const assentos = Array.from({ length: 50 }, (_, index) => ({
    numero: index + 1,
    disponivel: true,
  }));

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {assentos.map((assento) => (
        <button
          key={assento.numero}
          onClick={() => selecionarAssento(assento.numero)}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: assentosSelecionados.includes(assento.numero)
              ? "red"
              : "black",
            color: "white",
          }}
        >
          {assento.numero}
        </button>
      ))}
    </div>
  );
}
