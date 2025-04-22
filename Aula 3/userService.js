const User = require("./user");
const path = require('path'); //modulo para maniplular caminhos
const fs = require('fs'); //módulo para manipular arquivos fille sytem ,
const bcrypt = require('bcryptjs');
const { get } = require("http");
const mysql = require('./mysql'); //importando funções de conexão com o MySQL


// toda vez que a lista começar com o valor fixo, não precisa colocar aqui
//mas se quer comecar com um outro id, precida por aqui

class userService {
    async addUser(nome, email, senha, endereco, telefone, cpf) { // função assincrona ela espera algo acontecer dentro para funcionar. Precisa de um sincronismo
        try {

            const senhaCripto = await bcrypt.hash(senha, 10);            //o await vai esperar a função rodar 

            const resultados = await mysql.execute(
                `INSERT INTO usuarios (nome, email, senha, endereco, telefone, cpf)
		            VALUES ( ?, ?, ?, ?, ?, ?);`,
                [nome, email, senhaCripto, endereco, telefone, cpf]
            );
            return resultados;


        } catch (erro) {

            throw erro;
        }
    }

    async getUser(id) {
        try {
            const resultado = await mysql.execute(
                `SELECT idUsuario FROM usuarios WHERE idUsuario = ?`,
                [id]
            );
            console.log("resultado;", resultado);
            return resultado;
        } catch (erro) {
            console.log("Erro ao deletar arquivo", erro)
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.getUser(id);
            if (user.length == 0) {
                console.log("Usuário não existe");
                return;
            }
            const resultado = await mysql.execute(
                `DELETE FROM usuarios WHERE idUsuario = ?`,
                [id]
            );
            return resultado;
        }
        catch (erro){
            console.log("Erro ao carregar arquivo", erro)
        }
    }

    async updateUser(id, nome, email, senha, endereco, telefone, cpf) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10); //criptografa a senha
            // this.saveUsers();]
            const resultados = await mysql.execute(
                `UPDATE usuarios
                SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ?, cpf = ?
              WHERE idUsuario = ?`,
                [nome, email, senhaCripto, endereco, telefone, cpf, id]
            );
            return resultados;
        } catch (erro) {
            console.log("Erro ao atualizar o usuário", erro)
            throw erro;
        }
    }
}

module.exports = new userService;