// classe base Usuário 

class Usuario{
    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha //atributo privado
    }

    autenticar(senha){
        return senha === this._senha
    }

    alterarSenha(novaSenha){
        this._senha = novaSenha;
        console.log("Senha alterada com sucesso");
    }

}

//classe admin que herda de Usuario

class Admin extends Usuario{
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha); //chama o construtor da classe pai
        this.nivelAcesso = nivelAcesso 
    }

    banirUsuario(usuario){
        console.log(`${usuario.nome} foi banido pelo admin ${this.name}`);
    }


    //polimorfimo sobreescrevendo o método autenticar
    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === 'alto';
    }
}




//exemplo de uso

const usuario1 = new Usuario('Jamal','jamalballs@gmail.com','1234');
const usuario2 = new Admin('Jamelão','jamelaobolotas@gmail.com','5678','alto');
console.log(usuario1.autenticar('1234'));//senha certa
console.log(usuario2.autenticar('5678'));
usuario2.banirUsuario(usuario1);

