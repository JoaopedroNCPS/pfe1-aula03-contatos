alert('Esta página armazena dados sensíveis!');

const cadastro = document.querySelector('header form');
const tcorpo = document.querySelector('main tbody');
let listaArmazenada = JSON.parse(window.localStorage.getItem('contatos')) || [];
let indexEditando = null;


preencherTabela();

cadastro.addEventListener('submit', async e => {
    e.preventDefault();

    const novoRegistro = {
        nome: cadastro.nome.value.trim(),
        email: cadastro.email.value.trim(),
        telefone: cadastro.telefone.value.trim(),
        endereco: cadastro.endereco.value.trim(),
        cpf: cadastro.cpf.value.trim(),
        rg: cadastro.rg.value.trim()
    };

    if (!novoRegistro.nome || !novoRegistro.email || !novoRegistro.telefone || !novoRegistro.endereco || !novoRegistro.cpf || !novoRegistro.rg) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (indexEditando !== null) {
        
        listaArmazenada[indexEditando] = novoRegistro;
        indexEditando = null;
    } else {
        
        listaArmazenada.push(novoRegistro);
    }

    await preencherTabela();
    await salvar();
    limparFormulario();
});


async function preencherTabela() {
    tcorpo.innerHTML = '';
    listaArmazenada.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.telefone}</td>
            <td>${c.endereco}</td>
            <td>${c.cpf}</td>
            <td>${c.rg}</td>
            <td>
                <button class="btn btn-warning" onclick="editar(${i})">Editar</button>
                <button class="btn btn-danger" onclick="excluir(${i})">Excluir</button>
            </td>
        `;
        tcorpo.appendChild(tr);
    });
}


async function salvar() {
    window.localStorage.setItem('contatos', JSON.stringify(listaArmazenada));
}

// Função para excluir um registro
function excluir(index) {
    if (confirm('Tem certeza de que deseja excluir este registro?')) {
        listaArmazenada.splice(index, 1); 
        preencherTabela(); 
        salvar(); 
    }
}

// Função para editar um registro
function editar(index) {
    const contato = listaArmazenada[index];
    cadastro.nome.value = contato.nome;
    cadastro.email.value = contato.email;
    cadastro.telefone.value = contato.telefone;
    cadastro.endereco.value = contato.endereco;
    cadastro.cpf.value = contato.cpf;
    cadastro.rg.value = contato.rg;
    indexEditando = index; 
}

function limparFormulario() {
    cadastro.reset();
    indexEditando = null;
}