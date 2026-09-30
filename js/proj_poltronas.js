const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

const POLTRONA = 240;

const reservadas = [];
//eventos
window.addEventListener("load",() =>{
    const ocupadas = localStorage.getItem("teatroOcupadas")
        ?localStorage.getItem("teatroOcupadas").split(";")
        :[];
    
    for (let i = 1;i <=POLTRONA;i++ ){
        const figure = document.createElement("figure");
        const imgStatus = document.createElement("img");

        imgStatus.src = ocupadas.includes(i.toString())
        ?"img/ocupada.jpg"
        :"img/disponivel.jpg";
        imgStatus.className = "poltrona";
        const figureCap = document.createElement("figcaption");

        const zero = i < 10 ? "00" : i < 100 ? "0" : "";

        const num = document.createTextNode(zero + i);
        
        figureCap.appendChild(num);
        figure.appendChild(imgStatus);
        figure.appendChild(figureCap);
        
        if (i % 24 == 12){
            figure.style.marginRight = "60px";
        }
        dvPalco.appendChild(figure);
        (i % 24 == 0) && dvPalco.appendChild(document.createElement("br"));
    }
})

frm.addEventListener("submit", (e) =>{
e.preventDefault();
const poltrona = Number(frm.inPoltrona.value);

if (poltrona >POLTRONA){
    alert("Poltrona inválida");
    return;
}
const ocupadadas = localStorage.getItem("teatroOcupadas")
    ?localStorage.getItem("teatroOcupadas").split(";")
    :[];

if (ocupadadas.includes(poltrona.toString())){
    alert("Poltrona ocupada");
    frm.inPoltrona.focus();
    frm.inPoltrona.value = "";
    return;
}
const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona-1];

imgPoltrona.src = "img/reservada.jpg";
reservadas.push(poltrona);
frm.inPoltrona.focus();
frm.inPoltrona.value=""

})

frm.btConfirmar.addEventListener("click", () => {
    if (reservadas.length == 0){
        alert("Nenhuma poltrona reservada");
        frm.inPoltrona.focus();
        return;
    }
    const ocupadas = localStorage.getItem("teatroOcupadas")
    ?localStorage.getItem("teatroOcupadas").split(";")
    :[];
    
    for (let i = reservadas.length - 1; i >= 0; i--){
        ocupadas.push(reservadas[i]);
    const imgPoltrona = dvPalco.querySelectorAll("img")[reservadas[i]-1];
        imgPoltrona.src = "img/ocupada.jpg";
        reservadas.pop()
    }
    localStorage.setItem("teatroOcupadas", ocupadas.join(";"));
});