import { Guid } from "../shared/guid.model.js";
export class TarefaRepositoryLocalStorage {
    //----------------------------------------------------------
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    //----------------------------------------------------------
    gravar() {
        const tarefasJsonString = JSON.stringify(this.tarefas);
        this.localStorage.setItem("tarefas", tarefasJsonString);
    }
    //----------------------------------------------------------
    inserir(registro) {
        registro.id = new Guid().gerarNovoId();
        this.tarefas.push(registro);
        this.gravar();
    }
    //----------------------------------------------------------
    editar(id, registroEditado) {
        const indexSelecionado = this.tarefas.findIndex(x => x.id === id);
        this.tarefas[indexSelecionado] = {
            id: id,
            descricao: registroEditado.descricao,
            dataCriacao: registroEditado.dataCriacao,
            dataConclusao: registroEditado.dataConclusao,
            prioridade: registroEditado.prioridade,
        };
        this.gravar();
    }
    //----------------------------------------------------------
    selecionarTodos() {
        const dados = this.localStorage.getItem("tarefas");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
    //----------------------------------------------------------
    selecionarPorId(id) {
        return this.tarefas.find(x => x.id === id);
    }
}
