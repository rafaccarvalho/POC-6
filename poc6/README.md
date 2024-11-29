# POC-6

A seguir, apresentamos o passo a passo de como foi elaborada a Prova de Conceito 6 do nosso grupo.

## 1-) Criação do projeto

- use o seguinte comando no terminal para criar um novo projeto Next.js:
```
npx create-next-app@latest nome-do-projeto
```

- Após a criação do projeto, você pode entrar no diretório e iniciar o servidor de desenvolvimento:
```
cd nome-do-projeto
npm run dev
```

## 2-) Criação de componentes

- No Next.js 14, todos os componentes são definidos como funções usando JavaScript ou TypeScript. Esses componentes são a base da interface de usuário no React, permitindo que você divida sua aplicação em partes menores e reutilizáveis.

- Crie a pasta src/components e, dentro dela, crie os seguintes arquivos:
```
src/
└── components/
    ├── 📂BotaoCompra.js
    ├── 📂DetalhesFilme.js
    ├── 📂GradeAssentos.js
    └── 📂TrocaTema.js
```

## 3-) Componentes

- Cada componente pode ser responsável por exibir uma parte específica da interface, e pode gerenciar seu próprio estado e lógica.

- Dentro do arquivo src/page.js, acrescente o seguinte código:
```javascript
"use client";

import { useState, useEffect } from "react";
import DetalhesFilme from "./components/DetalhesFilme";
import GradeAssentos from "./components/GradeAssentos";
import BotaoCompra from "./components/BotaoCompra";
import { temas } from "/styles/temas";

export default function Home() {
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [temaAtual, setTemaAtual] = useState("light");

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
            temaAtual={temaAtual}
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
```
Neste código é feito a página principal de um sistema de reserva de assentos de cinema. Ele adapta o tema claro ou escuro conforme a preferência do usuário e permite que ele selecione ou desmarque assentos. O valor total é calculado com base nos assentos escolhidos, e a página exibe os detalhes do filme, junto com um botão para finalizar a compra.

- Dentro do arquivo src/components/BotaoCompra.js, acrescente o seguinte código:
```javascript
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
```
Neste código é definido o componente BotaoCompra, que exibe um botão fixo na parte inferior da tela para finalizar a compra de assentos. Ao clicar no botão, é exibido um alerta confirmando a realização da compra.

- Dentro do arquivo src/components/DetalhesFilme.js, acrescente o seguinte código:
```javascript
"use client";

export default function DetalhesFilme() {
  return (
    <div className="fonte">
      <strong>Sinopse do filme</strong>
      <p>
        Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem
        planos para o futuro e é desafiado por sua mãe solo e um empresário de
        sucesso a começar a traçar um rumo melhor para sua vida. Ele passa a ser
        discipulado pelo seu novo mentor, conta com orações de sua mãe e de uma
        guerreira de orações, Dona Clara, e começa a descobrir o propósito de
        Deus para sua vida.
      </p>
      <br></br>
      <strong>Data de lançamento</strong>
      <p>
        26 de setembro de 2024 (Brasil)
      </p>
      <br></br>
      <strong>Direção</strong>
      <p>
        Alex Kendrick
      </p>
    </div>
  );
}
```
Neste código é definido o componente DetalhesFilme, que exibe informações sobre o filme, incluindo uma breve sinopse, a data de lançamento no Brasil e o nome do diretor.

- Dentro do arquivo src/components/GradeAssentos.js, acrescente o seguinte código:
```javascript
"use client";

import { useState, useEffect } from "react";
import { temas } from "/styles/temas"; 

/*Grade de assentos*/
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
              disabled={assento.inexistente || !assento.indisponivel}
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
                cursor: assento.inexistente ? "default" : assento.indisponivel ? "pointer" : "default",
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

      {/*Disponibilidade dos Assentos*/}
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
```
Neste código é definido o componente GradeAssentos, que exibe a disposição dos assentos de uma sala de cinema, permitindo ao usuário selecionar ou desmarcar assentos disponíveis. O componente gera uma matriz de assentos, com alguns marcados como indisponíveis ou inexistentes, e distribui os assentos em linhas e colunas. Abaixo dos assentos, há uma "Tela" para indicar a frente da sala e uma legenda para explicar o significado de cada cor (livre, selecionado, indisponível), também estilizada conforme o tema.

- Dentro do arquivo src/components/TrocarTema.js, acrescente o seguinte código:
```javascript

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
```
Neste código é definido o componente TrocaTema, que permite ao usuário alternar entre os temas claro e escuro. Quando o tema é alterado, o useEffect aplica as cores de fundo e de texto ao documento usando variáveis CSS (--background-color e --text-color), definidas conforme o tema escolhido no arquivo temas.js.

## 4-) Estilo

- Os módulos de CSS ajudam a isolar estilos, garantindo que os componentes sejam estilizados de forma independente.

- Crie a pasta styles e dentro dela coloque o arquivo globals.css e crie um arquivo chamado temas.js:
```
styles/
    ├── 📂globals.css
    └── 📂temas.js
```

- Dentro do arquivo styles/globals.css acrescente o seguinte código:
```css

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: var(--foreground);
  background: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fonte {
  font-family: sans-serif;
  font-weight: 100;
  font-size: 18px;
  line-height: 1.6;
}

.horario{
  text-align: center;
  font-size: 28px;
}

div {
  min-height: 100%;
  box-sizing: border-box;
}

button {
  border-radius: 10px;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

@media (max-width: 1024px) {
  .hide-on-mobile {
    display: none;
  }

  .center-seats {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
}
```
Neste código é definido estilos globais para a página, incluindo fontes, cores e layouts responsivos. Ele ajusta a aparência do corpo, botões e textos, e utiliza uma media query para centralizar os assentos e ocultar elementos em dispositivos móveis.

- Dentro do arquivo styles/temas.js acrescente o seguinte código:
```css

export const temas = {
  /*Cores do tema claro*/
  light: {
    background: "#F0F0F0",
    color: "#1A1A24",       
    seatSelected: "#DB3D2E",  
    seatAvailable: "#1A1A24", 
    background: "#F0F0F0", 
    color: "#1A1A24",
    seatSelected: "#DB3D2E",  
    seatAvailable: "#1A1A24",  
    seatUnavailable: "#BABABA",
    seatInexistente: "#F0F0F0",
    seatInexistente: "#F0F0F0",
    corTela: "#333",
    screenBackground: "#BABABA",
    ballFree: "#1A1A24",
    ballSelected: "#DB3D2E",
    ballFree: "#1A1A24",
    ballSelected: "#DB3D2E", 
    ballOccupied: "#1A1A24",
    botaoCompra: "#DB3D2E",
    botaoCompra: "#DB3D2E", 
    botaoCompraTexto: "#F0F0F0",
  },

  /*Cores do tema escuro*/
  dark: {
    background: "#1A1A24",  
    color: "#F0F0F0",       
    seatSelected: "#CD4A3E",   
    seatAvailable: "#F0F0F0", 
    background: "#1A1A24",
    color: "#F0F0F0",
    seatSelected: "#CD4A3E",
    seatAvailable: "#F0F0F0",
    seatUnavailable: "#505050",
    seatInexistente: "#1A1A24", 
    seatInexistente: "#1A1A24",
    corTela: "#F0F0F0",
    screenBackground: "#505050",
    ballFree: "#F0F0F0",
    ballSelected: "#CD4A3E",
    ballFree: "#F0F0F0",
    ballSelected: "#CD4A3E",
    ballOccupied: "#505050",
    botaoCompra: "#CD4A3E", 
    botaoCompra: "#CD4A3E",
    botaoCompraTexto: "#F0F0F0",
  },
};
```
Neste código é definido dois temas de cores para a página: claro (light) e escuro (dark). Cada tema especifica cores para diferentes elementos da interface, como o fundo da página, texto, assentos e outros. 

## 5-) Execução

- Para executar a aplicação digite o seguinte comando no terminal:
```
npm run dev
```

- Por fim, acesse o link fornecido.

## 6-) Conclusão

- Em resumo, a Prova de Conceito 6 nos permitiu aplicar o que aprendemos sobre React em aula ao longo desse projeto.
