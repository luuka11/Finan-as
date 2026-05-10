let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero
if (localStorage.getItem("gastos")) {
       gastos = JSON.parse(localStorage.getItem("gastos"));
   }

function adicionarGastoNaLista(categoria, descricao, valor){
    const listaGastosTotal = document.createElement("li") 
    
    listaGastosTotal.textContent = `${categoria} - ${descricao} = R$ ${valor.toFixed(2)}`
    
    document.getElementById("listaGastos").appendChild(listaGastosTotal)
    
    total = valor + total
}

for (const gasto of gastos) {
    adicionarGastoNaLista(gasto.categoria, gasto.descricao, gasto.valor)
}
    //esta adicionando o total no valorTotal
    document.getElementById("valorTotal").textContent = total.toFixed(2)

//ocorrer evento onde o botao funcionara quando for clicado
const btn = document.getElementById("adicionarGasto")
btn.addEventListener("click", function() {
    if ((document.getElementById('descricao').value.trim() === "") ||(document.getElementById('valor').value.trim() === "")) {
        window.alert("O campo esta vazio!")
        return;
    }
    //variaveis em descricao, valor e categoria usando id
    const descricao = document.getElementById("descricao").value
    const valor = parseFloat(document.getElementById("valor").value.replaceAll(".","").replace(",",".") )
    
    const categoria = document.getElementById('categoria').value
    
    //array onde tudo do gasto sera o que foi adicinado do valor e descricao
    gastos.push({valor, descricao, categoria})

    //pega o array e salvando ele como string no localStorage
    localStorage.setItem("gastos", JSON.stringify(gastos))

    adicionarGastoNaLista(categoria, descricao, valor)

    document.getElementById("valorTotal").textContent = total.toFixed(2)
    
    
} )

