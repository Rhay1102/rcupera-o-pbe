const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuração da conexão com o banco de dados
const con = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'stockcar'
});

con.connect((err) =>{
  if(err) {
      console.error('Erro ao conectar ao banco de dados', err);
      return;
  }
  console.log('Conectado ao banco de dados.');
});

// CRUD para Clientes

const teste = (req, res) => {
  res.send("Back-end respondendo");
}

// Create Cliente
const createCliente = (req, res) => {
  const { nome, cpf, email, endereco, data_nascimento, data_cadastro } =req.body;

  const query = 'INSERT INTO Clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)'
  con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) =>  {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.status(201).json({message: 'Cliente Cadastrado com sucesso', result});
      }
      
  });
}

// Read Clientes
const readCliente = (req, res) => {
  con.query("SELECT * FROM Clientes", (err,result) => {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json(result);
      }
  });
}

// Update Cliente
const updateCliente = (req, res) => {
  const {nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

  const query = 'UPDATE Cliente SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento WHERE data_cadastro = ?'
  con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro],(err, result)=>{
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json({message:'Cliente atualizado com sucesso', result});
      }
  });
}

// Delete Cliente
const deleteCliente = (req, res) => {
  const {cliente_id} = req.params;

  const query= 'DELETE FROM Clientes WHERE cliente_id = ?';
  con.query(query, [Cliente], (err,result)=> {
      if(err) {
          res.status(500).json({error:err.message});
      } else {
          res.json({message: 'Cliente removido com sucesso', result});
      }
  });
}

// CRUD para Telefones

// Create Telefone
const createTelefone = (req, res) => {
  const { cliente_id, numero, tipo } =req.body;

  const query = 'INSERT INTO Cliente (cliente_id, numero, tipo) VALUES(?, ?, ?)'
  con.query(query, [cliente_id, numero, tipo], (err, result) =>  {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.status(201).json({message: 'Telefone Cadastrado com sucesso', result});
      }
      
  });
}

// Read Telefones
const readTelefone = (req, res) => {
  con.query("SELECT * FROM Telefone", (err,result) => {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json(result);
      }
  });
}

// Update Telefone

const updateTelefone = (req, res) => {
  const {cliente_id, numero, tipo} = req.body;

  const query = 'UPDATE Telefone SET cliente_id = ?, numero = ?, WHERE tipo = ?'
  con.query(query, [cliente_id, numero, tipo],(err, result)=>{
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json({message:'Telefone atualizado com sucesso', result});
      }
  });
}

// Delete Telefone
const deleteTelefone = (req, res) => {
  const {numero} = req.params;

  const query= 'DELETE FROM Telefone WHERE cliente_id = ?';
  con.query(query, [Cliente], (err,result)=> {
      if(err) {
          res.status(500).json({error:err.message});
      } else {
          res.json({message: 'Telefone removido com sucesso', result});
      }
  });
}
// CRUD para Carros

// Create Carro
const createCarro = (req, res) => {
  const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id } =req.body;

  const query = 'INSERT INTO Carro (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id) VALUES(?, ?, ?, ?, ?)'
  con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id], (err, result) =>  {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.status(201).json({message: 'Carro Cadastrado com sucesso', result});
      }
      
  });
}

// Read Carros
const readCarro = (req, res) => {
  con.query("SELECT * FROM Carro", (err,result) => {
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json(result);
      }
  });
}

// Update Carro
const updateCarro = (req, res) => {
  const {marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id} = req.body;

  const query = 'UPDATE Carro SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ?, WHERE id_cliente = ?'
  con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id],(err, result)=>{
      if(err) {
          res.status(500).json({error: err.message});
      } else {
          res.json({message:'Carro atualizado com sucesso', result});
      }
  });
}

// Delete Carro
const deleteCarro = (req, res) => {
  const {cliente_id} = req.params;

  const query= 'DELETE FROM Carro WHERE cliente_id = ?';
  con.query(query, [Carro], (err,result)=> {
      if(err) {
          res.status(500).json({error:err.message});
      } else {
          res.json({message: 'Carro removido com sucesso', result});
      }
  });
}

// Iniciar o servidor
const app = express();
app.use(express.json());
app.use(cors());

// Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/clientes", createCliente); 
app.get("/clientes", readCliente);
app.put("/clientes", updateCliente);
app.delete("/clientes", deleteCliente);

app.post("/clientes", createTelefone); 
app.get("/clientes", readTelefone);
app.put("/clientes", updateTelefone);
app.delete("/clientes", deleteTelefone);

app.post("/clientes", createCarro); 
app.get("/clientes", readCarro);
app.put("/clientes", updateCarro);
app.delete("/clientes", deleteCarro);

// Teste e porta no console
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});