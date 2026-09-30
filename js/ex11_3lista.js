const tbPalavra = document.querySelector("table");
const ckMostrar = document.querySelector("input[type=checkbox]");

const montsrTabela = ( )=>{
    if (localStorage.getItem("jogoPalavra")){

        const palavras = localStorage.getItem("jogoPalavra").split(";");
        const dicas = localStorage.getItem("jogoDica").split(";");

        for (let i = 0; i < palavras.length; i++){

            const linha = tbPalavra.insertRow(-1);

            const col1 = linha.insertCell(0);
            const col2 = linha.insertCell(1);
            const col3 = linha.insertCell(2);

            col1.innerText = palavras[i];
            col2.innerText = dicas[i];
            col3.innerHTML = '<i class ="exclui" title = "Excluir">&#10008;</i>';
        }
    }
};

ckMostrar.addEventListener("change", () => {
    ckMostrar.checked? montsrTabela() : window.location.reload();
});

tbPalavra.addEventListener("click", (e) => {
    if (e.target.className == "exclui"){
        const palavra = e.target.parentElement.parentElement.children[0].innerText;

        if( confirm("Deseja realmente excluir a palavra " + palavra + "?")){
            e.target.parentElement.parentElement.remove();

            localStorage.removeItem("jogoPalavra");
            localStorage.removeItem("jogoDica");

            const palavras = [];
            const dicas = [];

            for (let i = 1; i < tbPalavra.rows.length; i++){
                palavras.push(tbPalavra.rows[i].cells[0].innerText);
                dicas.push(tbPalavra.rows[i].cells[1].innerText);
            }

            localStorage.setItem("jogoPalavra", palavras.join(";"));
            localStorage.setItem("jogoDica", dicas.join(";"))
        }
            
    }});