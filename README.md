# POC-6

A seguir, apresentamos o passo a passo de como foi elaborada a Prova de Conceito 6 do nosso grupo.

1-) Criação do projeto

- use o seguinte comando no terminal para criar um novo projeto Next.js:
```
npx create-next-app@latest nome-do-projeto
```

- Após a criação do projeto, você pode entrar no diretório e iniciar o servidor de desenvolvimento:
```
cd nome-do-projeto
npm run dev
```

2-) Criação de componentes

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

3-) Javascript

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

4-) CSS

- Crie a pasta src/components e, dentro dela, crie os seguintes arquivos:
```
src/
└── components/
    ├── 📂BotaoCompra.js
    ├── 📂DetalhesFilme.js
    ├── 📂GradeAssentos.js
    └── 📂TrocaTema.js
```

- Dentro do arquivo src/app/global.css acrescente o seguinte código:
```css

```
Neste código as mudanças no CSS vão alterar a cor do fundo, tirar as margens ou espaços extras ao redor do conteúdo, e alterar a cor do texto. Essas mudanças serão aplicadas em toda a aparência do projeto.

- Os módulos de CSS ajudam a isolar estilos, garantindo que os componentes sejam estilizados de forma independente.

- Dentro do arquivo src/components/Cards.module.css acrescente o seguinte código:
```css

```
Neste código as classes .cards, .cardB e .cardP controlam a aparência e o layout. O efeito de hover muda a cor de fundo dos cartões e a classe .textos organiza o conteúdo textual em uma coluna. Essas mudanças serão aplicadas apenas na aparência dos cards da página.

- Dentro do arquivo src/components/Header.module.css acrescente o seguinte código:
```css

```
Neste código a classe .titulos usa flexbox para organizar seus elementos em uma linha, a classe .titulo adiciona um espaçamento ao redor dos elementos e a classe .receita centraliza o texto e aumenta o tamanho da fonte. Essas mudanças serão aplicadas apenas na aparência da header da página.

5-) Execução

- Para executar a aplicação digite os seguintes comandos no terminal:
```
npm run build
npm start
```

6-) Conclusão

- Em resumo, a Prova de Conceito 5 nos permitiu aplicar o que aprendemos sobre React em aula ao longo desse projeto.
