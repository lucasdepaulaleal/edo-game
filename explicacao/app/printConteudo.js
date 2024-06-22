let dados = []; // Array para armazenar os dados do JSON
let currentIndex = 0; // Índice para controlar o conteúdo atual

// Função para carregar os dados do JSON
function carregarDados() {
    fetch('conteudo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            dados = data;
            mostrarConteudo(); // Mostra o conteúdo inicial após carregar os dados
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
}

// Função para mostrar o conteúdo com base no índice atual
function mostrarConteudo() {
    if (dados.length > 0) {
        document.getElementById('titulo').textContent = dados[currentIndex].titulo;
        document.getElementById('texto').textContent = dados[currentIndex].texto;
    } else {
        console.error('Não há dados no JSON.');
    }
}

// Avançar para o próximo conteúdo
function avancarConteudo() {
    currentIndex = (currentIndex + 1) % dados.length; // Avança para o próximo item, voltando ao início se chegar ao fim
    mostrarConteudo();
}

// Retroceder para o conteúdo anterior
function voltarConteudo() {
    currentIndex = (currentIndex - 1 + dados.length) % dados.length; // Retrocede para o item anterior, voltando ao final se chegar ao início
    mostrarConteudo();
}

// Carregar os dados ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDados);

// Adicionar eventos de clique aos botões
document.getElementById('nextButton').addEventListener('click', avancarConteudo);
document.getElementById('backButton').addEventListener('click', voltarConteudo);
