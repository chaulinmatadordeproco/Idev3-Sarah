const User = require("./user");
const path = require('path'); //modulo para maniplular caminhos
const fs = require('fs'); //módulo para manipular arquivos fille sytem ,
const bcrypt = require('bcryptjs')
const { get } = require("http");


// toda vez que a lista começar com o valor fixo, não precisa colocar aqui
//mas se quer comecar com um outro id, precida por aqui

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');//caminho do arquivo 
        this.users = this.loadUser(); //array pra armazenar usuários 
        this.nextID = this.getNexID(); //contador e gerador de ID
    }

    loadUser() {
        try { //tenta executar o código
            if (fs.existsSync(this.filePath)) { //pergunta se dentro do arquivo existe algum dado 
                const data = fs.readFileSync(this.filePath);
                return JSON.parse(data); //transformou em array de objetos 

            }
        } catch (erro) { //se der erro, vai guardar e mostrar o erro aqui
            comsole.log("Erro ao carregar arquivo", erro)
        }
        return [];
    }

    getNexID() { //função para buscar o próximo ID
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1 //pega o número max do id e soma mais 1 
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro)
        }

    }

    saveUsers(){ //função para salvar os usuários 
        try{
        fs.writeFileSync(this.filePath, JSON.stringify(this.users)) 
    }catch(erro){
        console.log("Erro ao carregar arquivo", erro)
    }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf) { // função assincrona ela espera algo acontecer dentro para funcionar. Precisa de um sincronismo
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);            //o await vai esperar a função rodar 
            const fulano = new User(this.nextID++, nome, email, senhaCripto, endereco, telefone, cpf);
            this.users.push(fulano);
            this.saveUsers();
            return fulano;
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro)
        }
    }
    
    getUser() {
        try {
            return this.users
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro)
        }
    }
    
    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id); //cria um novo aray, não colocando o id selecionado 
            this.saveUsers();
        }
        catch{
            console.log("Erro ao carregar arquivo", erro)
        }
    }
    
    updateUser(id, nome, email, senha, endereco, telefone, cpf){
        try{
            const user = this.users.find(user => user.id === id);
            if(!user) return console.log("Usuário não existente/encontrado");
            user.nome = nome;
            user.email = email;
            user.senhaCripto = senha;
            user.endereco = endereco;
            user.telefone = telefone;
            user.cpf = cpf;
            this.saveUsers();
            return user;
        }catch(erro){
            console.log("Erro ao atualizar o usuário", erro)
        }
    }
}

module.exports = new userService;