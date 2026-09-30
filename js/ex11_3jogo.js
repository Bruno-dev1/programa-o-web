const frm = document.querySelector("form");
const respPalavra = document.querySelector("#outPalavra");
const respDica = document.querySelector("#outDica");
const respErros = document.querySelector("#outErros");
const respChances = document.querySelector("#outChances");
const respMensagemFinal = document.querySelector("#outMensagemFinal");

const imgStatus = document.querySelector("img");

let palavraSorteada;
let dicaSorteada;


const verificarFim = () => {

    const chances = Number(respChances.innerText);


    if (chances == 0) {
        respMensagemFinal.className = "display-3 text-danger";
        respMensagemFinal.innerText =
            "Fim de jogo! A palavra é " + palavraSorteada;
        concluirJogo();
    } else if (respPalavra.innerText == palavraSorteada) {

        respMensagemFinal.className = "display-3 text-success";

        respMensagemFinal.innerText =
            "Parabéns, você acertou a palavra!";
        trocaStatus(4);
        concluirJogo();
    }
};
const concluirJogo = () => {

    respDica.innerText =
        "* Clique no botão para jogar novamente";

    frm.inLetra.disabled = true;
    frm.btJogar.disabled = true;
    frm.btVerDica.disabled = true;
};
const trocaStatus = (num) => {

    if (num >= 0) {
        imgStatus.src = `../../img/status${num}.jpg`;
    }
}

frm.addEventListener("submit", (e) => {

    e.preventDefault();

    const letra = frm.inLetra.value.toUpperCase();

    let erros = respErros.innerText;
    let palavra = respPalavra.innerText;
    if (erros.includes(letra) || palavra.includes(letra)) {

        alert("Letra já utilizada!");
        frm.inLetra.value = "";
        frm.inLetra.focus();
        return;
    }


    // Verifica se a letra existe na palavra
    if (palavraSorteada.includes(letra)) {

        let novaPalavra = "";

        for (let i = 0; i < palavraSorteada.length; i++) {

           
            if (palavraSorteada.charAt(i) == letra) {

                novaPalavra += letra;

            } else {

                // Mantém o que já estava revelado
                novaPalavra += palavra.charAt(i);
            }
        }


        respPalavra.innerText = novaPalavra;

    } else {

        // Letra errada
        respErros.innerText += letra;

        const chances =
            Number(respChances.innerText) - 1;

        respChances.innerText = chances;

        trocaStatus(chances);
    }


    verificarFim();
    frm.inLetra.value = "";
    frm.inLetra.focus();
});


// Inicialização do jogo
window.addEventListener("load", () => {
    if (!localStorage.getItem("jogoPalavra")) {

        alert("Nenhuma palavra cadastrada!");
        frm.inLetra.disabled = true;
        frm.btJogar.disabled = true;
        frm.btVerDica.disabled = true;
        return;
    }
    const palavras =
        localStorage.getItem("jogoPalavra").split(";");
    const dicas =
        localStorage.getItem("jogoDica").split(";");
    const tam = palavras.length;
    const numAleatorio =
        Math.floor(Math.random() * tam);
    palavraSorteada = palavras[numAleatorio].toUpperCase();
    dicaSorteada = dicas[numAleatorio];
    let novaPalavra = "";

    for (const letra of palavraSorteada) {

        novaPalavra += "*";
    }

    respPalavra.innerText = novaPalavra;
    respDica.innerText = "* Custo: 1 chance";
    respErros.innerText = "";
    respChances.innerText = 4;
    respMensagemFinal.innerText = "";
    imgStatus.src = "../../img/status4.jpg";
});


// Botão de dica
frm.querySelector("#btVerDica").addEventListener("click", () => {

    // Verifica se a dica já foi utilizada
    if (respErros.innerText.includes("*")) {
        alert("Você já solicitou a dica!");
        return;
    }

    respDica.innerText = dicaSorteada;
    respErros.innerText += "*";
    const chances =
        Number(respChances.innerText) - 1;
    respChances.innerText = chances;
    trocaStatus(chances);
    
    verificarFim();

    frm.inLetra.focus();
});
