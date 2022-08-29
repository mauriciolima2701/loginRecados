
 if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]))
}


//----------------Envento de click no botao Login----------------------

const btnLogin = document.getElementById('botaoLogin')

btnLogin.addEventListener('click', () =>{

    if (validarCamposLogin()) {
        login()
    }
})

//-------------------- Validação dos campos de Login --------------------

function validarCamposLogin() {
    
    return document.getElementById('formLogin').reportValidity();
}



// ------------------ LOGIN -------------------------

function login() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
   
    let email = document.getElementById('email')
    let senha = document.getElementById('password')

    const verificaUsuarioExistente = usuarios.findIndex(
        (user) => user.email === email.value && user.senha === senha.value )
    
    if (verificaUsuarioExistente === -1){
        
        Swal.fire({
            position: 'top',
            title: 'Ops!...',
            text: 'Favor, verifique e-mail e senha! Ou então CADASTRE-SE!',
            confirmButtonColor: '#0780bc',
            width: '320px'
          })
        limpaCamposLogin()
        return;
    }

    const usuarioLogado = {
        email: usuarios[verificaUsuarioExistente].email,
        senha: usuarios[verificaUsuarioExistente].senha,
        mensagem: usuarios[verificaUsuarioExistente].mensagem,
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    
    limpaCamposLogin()
    window.location.href = './recado.html'
}

function limpaCamposLogin() {
   document.getElementById('email').value = ''
   document.getElementById('password').value = ''
}

