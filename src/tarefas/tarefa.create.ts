import { IpaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IpaginaFormulario {
  private txtDescricao: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private rdbPrioridade: HTMLInputElement;
  
  constructor (private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;
    this.btnSalvar.addEventListener("click", (_evt) => {this.gravarRegistro()});
  }

  gravarRegistro(): void {
    this.rdbPrioridade = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;

    const prioridade = this.rdbPrioridade.value as Prioridade;

    const novaTareda = new Tarefa(this.txtDescricao.value, prioridade)
  }
}

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage());