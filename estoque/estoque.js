const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 8001;

app.use(bodyParser.json());

const produtosData = fs.readFileSync('produtos.json');
const estoque = JSON.parse(produtosData);

app.get('/produtos', (req, res) => {
  res.json(estoque.produtos);
});

app.post('/atualizar-estoque', (req, res) => {
  const { id, quantidade } = req.body;
  const produto = estoque.produtos.find((product) => product.id === id);

  if (produto && produto.quantidade >= quantidade) {
    produto.quantidade -= quantidade;

    // Atualiza o arquivo JSON
    fs.writeFileSync('produtos.json', JSON.stringify(estoque));

    res.json({ mensagem: 'Estoque atualizado com sucesso!' });
  } else {
    res.status(400).json({ erro: 'Estoque insuficiente' });
  }
});

app.listen(port, () => {
  console.log(`Microserviço de Controle de Estoque está rodando na porta ${port}`);
});
