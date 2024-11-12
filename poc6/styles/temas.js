// src/styles/temas.js
export const temas = {
  light: {
    background: "#F0F0F0",  // Cor de fundo clara
    color: "#1A1A24",           // Cor do texto escura
    seatSelected: "#DB3D2E",    // Cor do assento selecionado no modo claro
    seatAvailable: "#1A1A24",  // Cor do assento disponível no modo claro
    seatUnavailable: "#BABABA",
    seatInexistente: "#F0F0F0", // Cor para assentos inexistentes no modo light (azul)
    corTela: "#333",
    screenBackground: "#BABABA",
    ballFree: "#1A1A24", // Bola verde para "Livre" no tema light
    ballSelected: "#DB3D2E", // Bola rosa para "Selecionado" no tema light
    ballOccupied: "#1A1A24",
    botaoCompra: "#DB3D2E", // Cor verde para o botão de compra no tema light
    botaoCompraTexto: "#F0F0F0",
  },
  
  dark: {
    background: "#1A1A24",  // Cor de fundo escura
    color: "#F0F0F0",        // Cor do texto clara
    seatSelected: "#CD4A3E",    // Cor do assento selecionado no modo escuro
    seatAvailable: "#F0F0F0",  // Cor do assento disponível no modo escuro
    seatUnavailable: "#505050",
    seatInexistente: "#1A1A24", // Cor para assentos inexistentes no modo light (azul)
    corTela: "#F0F0F0",
    screenBackground: "#505050",
    ballFree: "#F0F0F0", // Bola amarela para "Livre" no tema dark
    ballSelected: "#CD4A3E", // Bola vermelha para "Selecionado" no tema dark
    ballOccupied: "#505050",
    botaoCompra: "#CD4A3E", // Cor roxa para o botão de compra no tema dark
    botaoCompraTexto: "#F0F0F0",
  },
};
