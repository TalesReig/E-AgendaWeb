import { Guid } from "./guid.model.js";
export class EntidadeBase {
    constructor() {
        this.id = new Guid().gerarNovoId();
    }
}
