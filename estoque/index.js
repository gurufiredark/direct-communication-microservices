const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8001;

app.use(bodyParser.json());

const estoque = require('./estoque.json');

app.post('/adicionar-estoque', (req, res) => {
  const { produto, quantidade } = req.body;

  if (!estoque[produto]) {
    estoque[produto] = quantidade;
  } else {
    estoque[produto] += quantidade;
  }

  const pedidoId = proximoIdPedido++;
  res.json({ id: pedidoId });

});

app.listen(port, () => {
  console.log(`Microsserviço de Estoque rodando em http://localhost:${port}`);
});
