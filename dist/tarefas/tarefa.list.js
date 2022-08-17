import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPaginaListagem {
    constructor(repositorioTarefas) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizarTabela() {
        const tarefas = this.repositorioTarefas.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach(tarefa => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(tarefa).forEach((valor) => {
                const novaCelula = novaLinha.insertCell();
                novaCelula.innerText = valor;
            });
            const celulaBotoes = novaLinha.insertCell();
            const btnEditar = document.createElement("a");
            btnEditar.innerText = "Editar";
            btnEditar.className = "btn btn-warning";
            btnEditar.addEventListener("click", () => {
                const idSelecionado = tarefa.id;
                window.location.href = `tarefa.create.html?id=${idSelecionado}`;
            });
            celulaBotoes.appendChild(btnEditar);
            const btnExcluir = document.createElement("a");
            btnExcluir.innerText = "Excluir";
            btnExcluir.className = "btn btn-warning ms-2";
            btnExcluir.addEventListener("click", () => {
                const idSelecionado = tarefa.id;
                this.repositorioTarefas.excluir(idSelecionado);
                window.location.reload();
            });
            celulaBotoes.appendChild(btnEditar);
            celulaBotoes.appendChild(btnExcluir);
        });
    }
}
new TarefaPaginaListagem(new TarefaRepositoryLocalStorage);
