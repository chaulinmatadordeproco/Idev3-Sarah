const User = require("./user");
const path = require('path'); //modulo para maniplular caminhos
const fs = require('fs'); //módulo para manipular arquivos fille sytem 


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

    addUser(nome, email, senha, endereco, telefone, cpf) {
        try {
            const fulano = new User(this.nextID++, nome, email, senha, endereco, telefone, cpf);
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
}

module.exports = new userService;