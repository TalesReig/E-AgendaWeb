class Index {
    constructor() {
        this.configurarElementos();
    }
    configurarElementos() {
        this.btnCadastrar = document.getElementById("btnCadastrar");
        this.btnCadastrar.addEventListener("click", () => console.log("teste"));
    }
}
new Index();
export {};
