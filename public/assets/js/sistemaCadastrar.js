
//Botao CANCELAR - Pagina Cadastro

const btnCancelarCAD = document.getElementById('botaoCancelar')
btnCancelarCAD.addEventListener('click', voltarIndex)

function voltarIndex() {
    window.location.href = './index.html'
}

//Botao CADASTRAR - Pagina de Cadastro

const btnCadastrarCAD = document.getElementById('botaoCadastrar')
btnCadastrarCAD.addEventListener('click',()=>{
    if(validaCamposUser()){

        cadastrarUsuario();
    }
} )




//Veirifica se tem algo no localStorage criado, caso não tenha cria um array vazio 
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]))
}


let emailHTML = document.getElementById('emailCad')
let senhaHTML = document.getElementById('passwordCad')
let confirmaSenhaHTML = document.getElementById('passwordConfirm')



//----------------------VALIDANDO CAMPOS DE CADASTRO DO USUÁRIO -------------------

const alertaCAD = document.querySelector('.inputError')
const alertaSEN = document.querySelector('.senhaError')

const validaCamposUser = () =>{
    
    if (emailHTML.value.length < 6  ) {
        let infoEmailError = document.createElement('span')
        infoEmailError.setAttribute('style', 'color: red; font-size: 0.8rem')
        infoEmailError.innerHTML = `E-mail inválido! Repita a operação!`
        alertaCAD.appendChild(infoEmailError)
        resetaAlertaCAD()
        
        limparCampos();
        return;
    }

    if(senhaHTML.value !== confirmaSenhaHTML.value){
        // alert('As senhas não conferem! Repita a operação!')
        let infoSenhaError = document.createElement('span')
        infoSenhaError.setAttribute('style', 'color: red; font-size: 0.8rem')
        infoSenhaError.innerHTML = `As senhas não conferem! Repita a operação!`
        alertaSEN.appendChild(infoSenhaError)
        resetaAlertaCAD()

        limparCampos();
        return;
    }

    //Validando os campos através do Required(no HTML) 
    //utilizando a função reportValidity() com o id do form
    return document.getElementById('formCadastrar').reportValidity();
} 


function resetaAlertaCAD() {
    setTimeout(() => {
        alertaCAD.innerHTML = ''
        alertaSEN.innerHTML = ''
    }, 1500);
}


function limparCampos() {
    emailHTML.value = '';
    senhaHTML.value = '';
    confirmaSenhaHTML.value = '';    
}



//--------------- CADASTRANDO O USUÁRIO -------------------

function cadastrarUsuario() {
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
    const verificaUsuarioExistente = usuarios.some((user) => user.email === emailHTML.value)
 
    if (verificaUsuarioExistente) {
        alert('Usuário/e-mail já cadastrado!')
        limparCampos()
        return;
    }

    const criarUsuario = {
        email: emailHTML.value,
        senha: senhaHTML.value,
        mensagem: [],
    };

    
    usuarios.push(criarUsuario);
    

    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    limparCampos()
    
    ativarMSG(msg)
    
    setTimeout(() => {
        window.location.href = './index.html';
      }, 4000);
    
}

