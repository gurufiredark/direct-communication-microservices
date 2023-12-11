
const axios = require('axios');

const estoqueServiceUrl = 'http://localhost:8001';

async function realizarPedido(produto, quantidade) {
  try {
    const response = await axios.post(`${estoqueServiceUrl}/adicionar-estoque`, { produto, quantidade });
    console.log(`Pedido realizado com sucesso. ID do pedido: ${response.data.id}`);
  } catch (error) {
    console.error('Erro ao realizar o pedido:', error.message);
  }
}

realizarPedido('Smartphone', 2);
