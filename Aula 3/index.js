const express = require('express')
const userService = require("./userService");

const app = express(); // nome qualquer para express
app.use(express.json()); //habilita json no express

//rota para criar usuario 

app.post("/users", (req, res) => {
    const {nome, email, senha, endereco, telefone, cpf} = req.body;
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json({error: "Todos os campos são obrigatórios"});
    }

    const user = userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
})

//rota para mostrar usuario

app.get("/users", (req, res) =>{
    res.json(userService.getUser())
})

//rota para excluir id
app.delete("/users/:id", (req,res) =>{
    const id = parseInt(req.params.id); //converte o id para número 
    try{
        const resultado = userService.deleteUser(id); //tenta excluir o usuário
        res.status(200).json(resultado); //retorna a mensagem de sucesso 
    } catch (erro){
        res.status(404).json({error:erro.menssage}) //retorna a mensagem de erro
    }
})


const port = 3000;
app.listen(port,() =>{
    console.log("Servidor rodando na porta",port)
})