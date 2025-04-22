const express = require('express')
const userService = require("./userService");

const app = express(); // nome qualquer para express
app.use(express.json()); //habilita json no express

//rota para criar usuario 

app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, cpf } = req.body;
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);
        res.status(200).json({ mensagem: "Usuario Cadastrado com Sucesso!" });
    }catch(erro){
        res.status(401).json({error: erro.message});
    }
})

//rota para mostrar usuario

app.get("/users", (req, res) => {
    res.json(userService.getUser())
})

//rota para excluir id
app.delete("/users/:id", async(req, res) => {
    const id = parseInt(req.params.id); //converte o id para número 
    try {
        const resultado = await  userService.deleteUser(id); //tenta excluir o usuário

        if (!resultado) {
            return res.status(406).json({ "Mensagem": "Usuário não existe" }); //se não encontrar o id retorna erro
        }
        return res.status(200).json(resultado); //retorna a mensagem de sucesso 
    } catch (erro) {
        return res.status(404).json({ error: erro.message }) //retorna a mensagem de erro
    }
})

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, endereco, telefone, cpf } = req.body;
    try {
        const resultado = userService.updateUser(id, nome, email, senha, endereco, telefone, cpf);
        if (!resultado) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(200).json(resultado);
    } catch (erro) {
        console.log("Erro ao atualizar o usuário", erro);
        res.status(500).json({ error: erro.message });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})