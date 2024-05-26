const form = document.getElementById('form-lista');
const tabela = document.querySelector('#tabela-contatos');
const nomes = [];
const numeros = [];
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionarLinha();
    atualizaTabela();

});

function adicionarLinha () {
    const nomeContato = document.getElementById('nome-contato');
    const numeroContato = document.getElementById('numero-contato');

    if (numeros.includes(numeroContato.value)) {
        alert(`o Número ${numeroContato.value} já foi adicionado`)
    } else {
        nomes.push(nomeContato.value);
        numeros.push(numeroContato.value);

    let linha = '<tr data-numero="' + numeroContato.value + '">';
    linha += `<td>${nomeContato.value}</td>`;
    linha += `<td>${numeroContato.value}</td>`;
    linha += `<td class="conteudo-acoes"><img src="./image/telefone.png" onclick="fazerChamada('${numeroContato.value}')"></img><span class="btn-excluir">X</span></td>`;
    linha += '</tr>'
    
    linhas += linha;

    nomeContato.value = '';
    numeroContato.value = '';
    }

}

function atualizaTabela(){
    const contatos = document.querySelector('tbody');
    contatos.innerHTML = linhas;
}

tabela.addEventListener('click', function(event) {
    let elementoClicado = event.target;
    if (elementoClicado.classList.contains("btn-excluir")) {
        let celula = elementoClicado.parentNode;
        let conteudoLinha = celula.parentNode;
        let numeroContato = conteudoLinha.getAttribute('data-numero')

        if (confirm("Este contato será removido da sua lista de contatos.")){
            let index = numeros.indexOf(numeroContato);
            if (index > -1) {
                numeros.splice(index, 1);
                nomes.splice(index, 1);
            }

            linhas = '';
            for (let i = 0; i< numeros.length; i++) {
                let linha = '<tr data-numero="' + numeros[i] + '">';
                linha += `<td>${nomes[i]}</td>`;
                linha += `<td>${numeros[i]}</td>`;
                linha += `<td class="conteudo-acoes"><img src="./image/telefone.png" onclick="fazerChamada('${numeros[i]}')"></img><span class="btn-excluir">X</span></td>`;
                linha += '</tr>';
                linhas += linha;
            }

        atualizaTabela ();
        }
    }

});

function fazerChamada(numero) {
    window.location.href = `tel:${numero}`
}