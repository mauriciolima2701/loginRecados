
//################## MODAL ##################

const openModal = document.querySelector('#editarRecadoModal');
const fecharModal = document.querySelector('#fecharModal');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const verificarModal = ()=>{
    modal.classList.toggle('esconder');
    fade.classList.toggle('esconder');
}

fecharModal.addEventListener('click', ()=>{
    modal.classList.add('esconder');
    fade.classList.add('esconder')
})

fade.addEventListener('click', ()=>{
    modal.classList.add('esconder')
    fade.classList.add('esconder')
})

