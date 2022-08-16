import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => { this.gravarRegistro(); });
    }
    gravarRegistro() {
        const tarefa = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtDescricao.value = tarefaSelecionada.descricao;
        switch (tarefaSelecionada.prioridade) {
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Média']");
                break;
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rdbPrioridade.checked = true;
    }
    obterDadosFormulario() {
        const descricao = this.txtDescricao.value;
        const prioridade = this.obterPrioridqadeSelecionada();
        let tarefa = null;
        if (!this.idSelecionado)
            tarefa = new Tarefa(descricao, prioridade);
        else
            tarefa = new Tarefa(descricao, prioridade, this.idSelecionado);
        return tarefa;
    }
    obterPrioridqadeSelecionada() {
        const rdbPrioridade = document.querySelector('input[type="radio"]:checked');
        return rdbPrioridade.value;
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);
