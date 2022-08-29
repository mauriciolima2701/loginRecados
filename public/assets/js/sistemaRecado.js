//################### Informando o user logado e confirmando se ele está logado ###############

let usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

if (!usuario) {
    logout();
}

let emailUsuarioLogado = document.getElementById('mostrarNomeUser')
emailUsuarioLogado.innerHTML = usuario.email;



//-------------- CRUD NO LOCALSTORAGE ------------



//Aqui está pegando os dados do LocalStorage (através da chave "usuarioLogado") pelo getItem e 
//utilizando o método JSON.parse para transformar ele em Object novamente
const pegarDadosBanco = () => JSON.parse(localStorage.getItem('usuarioLogado'))  // ?? [] = Verifica se tem algo no localStorage, se não tiver cria um array[] vazio;

//Aqui pelo 'setItem' está criando a KEY usuarioLogado e adicionando os itens do array no localStorage
//e pelo método JSON.stringify transformo tudo em string para poder salvar no localStorage
const setarDadosBanco = (dbRecado) => localStorage.setItem('usuarioLogado', JSON.stringify(dbRecado))



const deletarDadosBanco = (index) => {
    const dbRecado = lerDadosBanco()
    dbRecado.mensagem.splice(index, 1)
    setarDadosBanco(dbRecado)
}



const atualizarDadosBanco = (index, recado) => {
    const dbRecado = lerDadosBanco()
    dbRecado.mensagem[index] = recado
    setarDadosBanco(dbRecado)
}



const lerDadosBanco = () => pegarDadosBanco();



const criarRecado = (recado) => {
    const dbRecado = pegarDadosBanco()
    //Aqui estou add um novo recado no array
    dbRecado.mensagem.push(recado)
    setarDadosBanco(dbRecado)
}

//--------------------- CRIANDO AS FUNÇÕES DE VALIDAÇÕES E MANIPULAÇÃO DOS RECADOS -----------------------


//Variaveis Globais
let inputDescricao = document.getElementById('descricao')
let inputDetalhes = document.getElementById('detalhamento')
const alerta = document.getElementById('infoValidacao')

//Validação dos input DESCRIÇÃO e DETALHAMENTO
const camposValidos = () =>{
    if (inputDescricao.value.trim().length > 0 && inputDetalhes.value.trim().length > 0){
        let info = document.createElement('p')
        info.setAttribute('style', 'color: green; width: 250px; font-size: 0.8rem; border-bottom: 2px solid green')
        info.innerHTML = 'RECADO CADASTRADO COM SUCESSO!!'
        alerta.appendChild(info)
        reset(alerta)
        return true;
        
    }else{
        
        let info = document.createElement('p')
        info.setAttribute('style', 'color: red; width: 250px; font-size: 0.8rem; border-bottom: 2px solid red')
        info.innerHTML = 'FAVOR PREENCHER OS DOIS CAMPOS!!'
        alerta.appendChild(info)
        reset(alerta)
        return false;
    }

}

function reset(alerta) {
    setTimeout(() => {
        alerta.innerHTML = '';
    }, 1200);
  }


const limparCampos = () =>{
    inputDescricao.value = ''
    inputDetalhes.value = ''
}  


const adicionarRecado = () => {
    const id = Math.floor(Math.random() * (1000 - 10) + 10);
    if (camposValidos()){
       
       const recado = {
        id,
        descricao: inputDescricao.value,
        detalhes: inputDetalhes.value,
       }
       criarRecado(recado)
       atualizaBancoUsuarios()
       atualizarTabelaRecado()
       limparCampos()
    }  
}



let tabelaRecado = document.querySelector('#tableRecado > tbody')

const criarLinhasTabela = (recado, index) =>{
    const novaLinha = document.createElement('tr')
    novaLinha.setAttribute('id', index)
    novaLinha.classList.add('recado')

    const idLinha = document.createElement('td')
    idLinha.innerHTML = `${index + 1}`

    const recadoDescricao = document.createElement('td')
    recadoDescricao.innerHTML = `${recado.descricao}`

    const recadoDetalhes = document.createElement('td')
    recadoDetalhes.innerHTML = `${recado.detalhes}`

    const btnEditar = document.createElement('td')
    btnEditar.innerHTML = `<button type="button"> <i data-action="editar" id="editarRecadoModal-${index}" class="fa-solid fa-file-pen iconEdit"></i> </button>`

    const btnExcluir = document.createElement('td')
    btnExcluir.innerHTML = `<button  type="button"><i data-action="deletar" id="excluirRecado-${index}" class="fa-solid fa-trash-can iconRemove"></i> </button>`


    novaLinha.appendChild(idLinha)
    novaLinha.appendChild(recadoDescricao)
    novaLinha.appendChild(recadoDetalhes)
    novaLinha.appendChild(btnEditar)
    novaLinha.appendChild(btnExcluir)
    
    tabelaRecado.appendChild(novaLinha)
}


//Estou excluindo a tabela antes de atualizar, pois estava duplicando os dados;
//parentNode = tbody(pai) do tr(que é a variavel linha);
const limparTabela = () =>{
    
    const linhas = document.querySelectorAll('#tableRecado > tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}




const atualizarTabelaRecado = () =>{
    const dbRecado = lerDadosBanco()
    limparTabela()
    dbRecado.mensagem.forEach(criarLinhasTabela)
}

atualizarTabelaRecado()


//------------------EDITAR RECADO-------------------

const preencherModal = (recado) =>{
    
    document.getElementById('descricaoModal').value = recado.descricao
    document.getElementById('detalheModal').value = recado.detalhes
}


const editarRecado = (index) => {
    let recado = lerDadosBanco().mensagem[index]
    
    preencherModal(recado)
   
    verificarModal()
    
    
    //Botao (Dentro do Modal) Gravar mensagem editada
    document.getElementById('btnModalSalvar')
        .addEventListener('click', () => {
            
            recado.descricao = document.getElementById('descricaoModal').value
            recado.detalhes =  document.getElementById('detalheModal').value             

            atualizarDadosBanco(index, recado)
            atualizarTabelaRecado() 
            atualizaBancoUsuarios()

            modal.classList.add('esconder')
            fade.classList.add('esconder')
            window.location.reload();
            
        })
}


//----- Aqui capturo os botões de editar e excluir, quando o usuário clicou em um deles
const editarEdeletar = (eventoDoClick) => {
    
    if(eventoDoClick.target.dataset.action == 'editar'){ //Botao Editar
       
        //Desestruturação - Transformo em um array a acao e o index, mas uso somente o index
        //split está tirando o traço do "editarRecadoModal-${index}" e transformando em array
        const [acao, index] = eventoDoClick.target.id.split('-')
       
        editarRecado(index) 
        
    }
    //Botao Excluir
    if (eventoDoClick.target.dataset.action == 'deletar') { 
        
        const [acao, index] = eventoDoClick.target.id.split('-')
        
        Swal.fire({
            title: 'Tem certeza, quer excluir?',
            text: "Você não vai poder reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0780bc',
            cancelButtonColor: '#F09A32',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, deletar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletarDadosBanco(index)
                atualizarTabelaRecado()
                atualizaBancoUsuarios()  
                
                Swal.fire({
                    title: 'Deletado!',
                    text: 'Recado deletado com sucesso!!',
                    icon: 'success',
                    confirmButtonColor: '#0780bc',
                })
            }
          })
    }
}



// Transferir as mensagens do usuário logado para o BD dos usuários
const atualizaBancoUsuarios = () =>{
    const usuario = JSON.parse(localStorage.getItem('usuarios'))
    usuario.forEach((user)=>{
        if(user.email === pegarDadosBanco().email){
            user.mensagem = pegarDadosBanco().mensagem
        }
    })
    localStorage.setItem('usuarios', JSON.stringify(usuario))
}



//############# Eventos de CLICK ################

//Botao Adicionar recado

document.getElementById('btnSalvarRecado')
    .addEventListener('click', () =>{
        adicionarRecado()
        
    })

//Botao Editar e Excluir Recado

document.querySelector('#tableRecado > tbody')
    .addEventListener('click', editarEdeletar)


//Botao SAIR/LOGOUT da página de recados

const btnSair = document.getElementById('btnSairRecados')
btnSair.addEventListener('click', logout)

function logout() {
    localStorage.removeItem('usuarioLogado');
    return (window.location.href = './index.html');
}


