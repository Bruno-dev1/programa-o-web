const form = document.querySelector("form")
const a = document.querySelector("a")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const senha = form.inSenha.value
    if(senha == "123456789"){
        alert("acertou")
    }else{
        alert("erro")
    }
    form.inSenha.value = ""
    a.hidden = false
})