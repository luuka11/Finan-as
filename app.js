let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero

//ocorrer evento onde o botao funcionara quando for clicado
const btn = document.getElementById("adicionarGasto")
btn.addEventListener("click", function() {
    if ((document.getElementById('descricao').value.trim() === "") ||(document.getElementById('valor').value.trim() === "")) {
        window.alert("O campo esta vazio!")
        return 0;
    }
    const descricao = document.getElementById("descricao").value
    const valor = parseFloat(document.getElementById("valor").value)
    total = valor + total
    
    //array onde tudo do gasto sera o que foi adicinado do valor e descricao
    gastos.push({valor, descricao})

    //esta adicionando o total no valorTotal
    document.getElementById("valorTotal").textContent = total.toFixed(2)

    //adicionando a lista de total no site
    const listaGastosTotal = document.createElement("li") 
    
    //pegando a variavel e juntando as variaveis do html na variavel do js
    listaGastosTotal.textContent = `${descricao} ${categoria} + - R$ + ${valor.toFixed(2)}`

    //juntando o pai e o filho na lista de gasto 
    document.getElementById("listaGastos").appendChild(listaGastosTotal)

    const categria = document.getElementById('categoria').value
} )

