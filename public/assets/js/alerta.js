
const alertaMSG = document.querySelector('.divMSG')

const msg = 'USUÁRIO CADASTRADO COM SUCESSO!'

const ativarMSG = (msg) => {
    const message = document.createElement('div')
    message.classList.add('alerta')
    message.innerText = msg
    alertaMSG.appendChild(message)

    setTimeout(() => {
       message.style.display = 'none' 
    }, 4000);
}