const express = require('express')
const userService = require("./userService");

const app = express(); // nome qualquer para express
app.use(express.json()); //habilita json no express

//rota para criar usuario 

app.post("/users", (req, res) => {
    const {nome, email} = req.body;
    if(!nome || !email){
        return res.status(400).json({error: "Nome e email são obrigatórios"});
    }

    const user = userService.addUser(nome, email);
    res.status(200).json({user});
})

//rota para mostrar usuario

app.get("/users", (req, res) =>{
    res.json(userService.getUser())
})

const port = 3000;
app.listen(port,() =>{
    console.log("Servidor rodando na porta",port)
})