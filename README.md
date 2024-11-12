# POC-6

A seguir, apresentamos o passo a passo de como foi elaborada a Prova de Conceito 5 do nosso grupo.

1-) Criação do projeto

use o seguinte comando no terminal para criar um novo projeto Next.js:
npx create-next-app@latest nome-do-projeto
Após a criação do projeto, você pode entrar no diretório e iniciar o servidor de desenvolvimento:
cd nome-do-projeto
npm run dev
2-) Criação de componentes

No Next.js 14, todos os componentes são definidos como funções usando JavaScript ou TypeScript. Esses componentes são a base da interface de usuário no React, permitindo que você divida sua aplicação em partes menores e reutilizáveis.

Crie a pasta src/components e, dentro dela, crie os seguintes arquivos:

Cards.js
Cards.module.css
Header.js
Header.module.css.
3-) Javascript

Dentro do arquivo src/page.js, acrescente o seguinte código:
import Cards from "./components/Cards";

export default function Home() {
  return (
    <Cards/>
  );
}
Neste código é importado um componente chamado Cards de um arquivo local.

Dentro do arquivo src/components/Cards.js, acrescente o seguinte código:
import style from "./Cards.module.css"
import comida1 from "../image/brigadeiro-.jpg"
import comida2 from "../image/pudim.jpg"
import Image from "next/image"


export default function Cards(){
    return(
        <div className={style.cards}>
            <div className={style.cardB}>
                <Image src= {comida1}/>
                <div className={style.textos} >
                <h1 className={style.titulo}>Brigadeiro</h1>
                <p>Ninguém resiste a essa receita de brigadeiro: ele é o rei das festas de aniversário e é impossível comer um só. Seja pra comemorar ou afogar as, mágoas no com uma panela de brigadeiro assistindo um filme triste, essa receita faz parte do dia a dia do brasileiro há décadas. Muito tradicional em nosso país, o brigadeiro é muito fácil de preparar: leva apenas leite condensado, margarina, achocolatado em pó e chocolate granulado. Além de comer as bolinhas nas festas de aniversário, ele é um doce versátil que você pode consumir de diversas maneiras: como cobertura de bolo, recheio, com colher, em copinhos ou até mesmo misturando com biscoitos e fazendo palhas italianas. Veja agora mesmo como fazer brigadeiro de forma simples e prática! Você quer outras receitas de doces para festa de aniversário? 
                    Saiba como fazer beijinho, cajuzinho, olho-de-sogra, casadinho e muito mais aqui no TudoGostoso! Confira! </p>
                </div>
            </div>
            <div className={style.cardP}>
            <Image src= {comida2}/>
            <div className={style.textos}>
            <h1 className={style.tituloP}>Pudim</h1>
            <p>Veja como fazer essa receita de pudim de leite condensado lisinho e com uma calda perfeita de caramelo. Ele é delicioso, barato e bem rápido de preparar! Com sua textura macia e sabor inconfundível, esse doce é uma verdadeira tentação para os amantes de sobremesas tradicionais. Fácil de preparar e com ingredientes simples, o pudim é uma opção perfeita para adoçar qualquer ocasião especial. Com um modo de preparo bem simples, envolvendo poucos ingredientes como leite condensado, leite, ovos e açúcar para a calda, você irá criar uma sobremesa que certamente vai encantar a todos os paladares. Surpreenda sua família e amigos com esse clássico da culinária, que além de delicioso, possui uma apresentação encantadora. 
                Siga o passo a passo desta receita e mergulhe nessa experiência de sabores que certamente vai conquistar a todos.</p>
            </div>
            </div>
        </div>
    )
}
Neste código ele importa estilos de um arquivo CSS e imagens dos doces. Dentro do componente, há duas seções, cada uma contendo uma imagem, um título e uma descrição do doce correspondente.

Dentro do arquivo src/components/Header.js, acrescente o seguinte código:
import style from "./Header.module.css"

export default function Header(){
    return(
        <header className={style.cabecalho}>
            <h1 className={style.receita}>Receitas de minuto</h1>
            <div className={style.titulos}>
            <h2 className={style.titulo}>Brigadeiro</h2>
            <h2 className={style.titulo}>Pudim</h2>
            </div>
        </header>
    )
}
Neste código ele acrescenta um cabeçalho com um título e dois subtítulos na header da página.

4-) CSS

Os estilos globais são ótimos para criar regras que valem para toda a aplicação, garantindo que todas as páginas tenham uma aparência uniforme.

Dentro do arquivo src/app/global.css acrescente o seguinte código:

html,body{
  background-color:#e4ede9;
  padding: 0;
  margin: 0;
  color:#2b2b2a;
}
Neste código as mudanças no CSS vão alterar a cor do fundo, tirar as margens ou espaços extras ao redor do conteúdo, e alterar a cor do texto. Essas mudanças serão aplicadas em toda a aparência do projeto.

Os módulos de CSS ajudam a isolar estilos, garantindo que os componentes sejam estilizados de forma independente.

Dentro do arquivo src/components/Cards.module.css acrescente o seguinte código:

.cards{
    text-align: justify;
}

.cards :hover{
    background-color: #dbaf4f;
}

.cardB{
    display: flex;
    margin: 40px;
    width: 60%;
    background-color: #ebcc8a;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    padding: 10px;
}

.cardP{
    display: flex;
    margin: 40px;
    width: 60%;
    background-color: #ebcc8a;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    padding: 10px;    
}

.cardP > Image{
    display: flex;
}

.textos{
    margin-left: 10px;
    display:flex;
    flex-direction: column;
}
Neste código as classes .cards, .cardB e .cardP controlam a aparência e o layout. O efeito de hover muda a cor de fundo dos cartões e a classe .textos organiza o conteúdo textual em uma coluna. Essas mudanças serão aplicadas apenas na aparência dos cards da página.

Dentro do arquivo src/components/Header.module.css acrescente o seguinte código:
.titulos{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    background-color: #f5f39f;
    font-size: 15pt;
}

.titulo{
    padding: 10px;
}

.receita{
    text-align: center;
    font-size: 30pt;
}
Neste código a classe .titulos usa flexbox para organizar seus elementos em uma linha, a classe .titulo adiciona um espaçamento ao redor dos elementos e a classe .receita centraliza o texto e aumenta o tamanho da fonte. Essas mudanças serão aplicadas apenas na aparência da header da página.

5-) Execução

Para executar a aplicação digite os seguintes comandos no terminal:
npm run build
npm start
6-) Conclusão

Em resumo, a Prova de Conceito 5 nos permitiu aplicar o que aprendemos sobre React em aula ao longo desse projeto.
