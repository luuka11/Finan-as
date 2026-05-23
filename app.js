let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero

if (localStorage.getItem("gastos")) {
       gastos = JSON.parse(localStorage.getItem("gastos"));
   }

//cria uma funcao de adicionarGasto no site
function adicionarGastoNaLista(categoria, descricao, valor){
    //cria um item da lista
    const itemGasto = document.createElement("li") 
    
    //escreve o texto nele
    itemGasto.textContent = `${categoria} - ${descricao} = ${valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
    
    //junta o listaGastos com o filho itemGasto
    document.getElementById("listaGastos").appendChild(itemGasto)

    atualizarTotal(valor)
}

function atualizarTotal(valor){
    total = valor + total
    document.getElementById("valorTotal").textContent = total.toLocaleString('pt-BR', {style:'currency' , currency:'BRL'})
}

for (const gasto of gastos) {
    adicionarGastoNaLista(gasto.categoria, gasto.descricao, gasto.valor)
}

function calcularTotaisPorCategoria() {
    const totaisPorCategoria = {}

    for (const gasto of gastos){
        if (totaisPorCategoria[gasto.categoria]){
            totaisPorCategoria[gasto.categoria] += gasto.valor
        } else {
            totaisPorCategoria[gasto.categoria] = gasto.valor
        }
    }
    return totaisPorCategoria;
}

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

    if (isNaN(valor)){
    window.alert("O valor que você acaba de digitar não é um número")
    return;
}
    
    const categoria = document.getElementById('categoria').value
    
    //array onde tudo do gasto sera o que foi adicinado do valor e descricao
    gastos.push({valor, descricao, categoria})

    //pega o array e salvando ele como string no localStorage
    localStorage.setItem("gastos", JSON.stringify(gastos))

    //chamando a funcao
    adicionarGastoNaLista(categoria, descricao, valor)
})