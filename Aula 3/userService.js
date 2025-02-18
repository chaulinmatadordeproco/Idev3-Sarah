const User =  require("./user");


// toda vez que a lista começar com o valor fixo, não precisa colocar aqui
//mas se quer comecar com um outro id, precida por aqui

class userService{
    constructor(){
        this.users = []; //array pra armazenar usuários 
        this.nextID = 1; //contador e gerador de ID
    }

    addUser(nome, email){
        const fulano = new User(this.nextID++, nome, email);
        this.users.push(fulano);
        return userService;
    }

    getUser(){
        return this.users
    }
}

module.exports = new userService;