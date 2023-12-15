const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.post('/compra', async (req, res) => {
  try {
    const { id, quantidade, nome, preco } = req.body;

    // Chamada direta ao microserviço de estoque para verificar a disponibilidade
    const response = await axios.post('http://localhost:8001/atualizar-estoque', { id, quantidade, nome, preco });
    
    // Se o estoque estiver disponível, realiza a compra
    if (response.status === 200) {
      res.json({ mensagem: 'Compra realizada com sucesso!' });
    } else {
      res.status(400).json({ erro: 'Estoque insuficiente' });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao processar a compra' });
  }
});

app.listen(port, () => {
  console.log(`Microserviço de Compra está rodando na porta ${port}`);
});
