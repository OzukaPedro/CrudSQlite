const express = require('express')
const dataBase = require('./src/config/database')
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/userRoutes');
const { Database } = require('sqlite3');

const app = express();
const port = 3000;

dataBase.sync();

app.use(express.json());
app.use('/usuario', userRoutes);
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Sistema de gerencia de Usuarios');
  });
  
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})