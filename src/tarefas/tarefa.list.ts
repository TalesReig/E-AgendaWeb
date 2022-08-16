import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IPaginaListagem } from "../shared/pagina.list.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaListagem implements IPaginaHTML, IPaginaListagem{
  tabela: HTMLTableElement;
  
  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
    this.atualizarTabela();
  }
  
  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }

  atualizarTabela(): void {
    const tarefas = this.repositorioTarefas.selecionarTodos();

    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    tarefas.forEach(tarefa =>{
      const novaLinha = corpoTabela.insertRow();

      Object.values(tarefa).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor
      });

      const celulaBotoes = novaLinha.insertCell();

      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-warning";

      btnEditar.addEventListener("click", () =>{
        const idSelecionado = novaLinha.cells[0].innerText;

        window.location.href = `tarefa.create.html?id=${idSelecionado}`
      })

      celulaBotoes.appendChild(btnEditar);

    })
  }
}

new TarefaPaginaListagem(new TarefaRepositoryLocalStorage);