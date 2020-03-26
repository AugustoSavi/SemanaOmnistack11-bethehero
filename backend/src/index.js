const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//vai ser configurado mais para frente
app.use(cors());


app.use(express.json());
app.use(routes);

app.listen(3333);


