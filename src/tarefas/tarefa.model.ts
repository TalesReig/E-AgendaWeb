import { EntidadeBase } from "../shared/entidade.model.js";
import { Prioridade } from "./prioridade.enum.js";

export class Tarefa extends EntidadeBase{
  public descricao: string;
  public dataCriacao: Date;
  public dataConclusao: Date | "Em Aberto";
  public prioridade: Prioridade;

  constructor(descricao: string, prioridade: Prioridade) {
    super();
    this.descricao = descricao;
    this.dataCriacao = new Date(Date.now());
    this.dataConclusao = "Em Aberto";
    this.prioridade = prioridade;
  }
}