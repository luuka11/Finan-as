let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero
let grafico = null

if (localStorage.getItem("gastos")) {
       gastos = JSON.parse(localStorage.getItem("gastos"));
   }

//cria uma funcao de adicionarGasto no site
function adicionarGastoNaLista(categoria, descricao, valor, indice){
    //cria um item da lista
    const itemGasto = document.createElement("li") 
    
    //escreve o texto nele
    itemGasto.textContent = `${categoria} - ${descricao} = ${valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

    //cria uma varivel para guardar o botao
    const botaoRemover = document.createElement("button")
        botaoRemover.textContent = "X"
        botaoRemover.classList.add("botaoRemover")

        botaoRemover.addEventListener("click", function() {
            gastos.splice(indice, 1)
            localStorage.setItem("gastos", JSON.stringify(gastos))
            renderizarTudo()
        })
        itemGasto.appendChild(botaoRemover)
    
    //junta o listaGastos com o filho itemGasto
    document.getElementById("listaGastos").appendChild(itemGasto)

    
    atualizarTotal(valor)
}

function atualizarTotal(valor){
    total = valor + total
    document.getElementById("valorTotal").textContent = total.toLocaleString('pt-BR', {style:'currency' , currency:'BRL'})
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
    
    let valor = document.getElementById("valor").value

    if (valor.includes(",")) {
    valor = parseFloat(valor.replaceAll(".","").replace(",","."))
} else {
    valor = parseFloat(valor)
}

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
    renderizarTudo()
})

function renderizarGrafico() {
    if (grafico) {
    grafico.destroy()
    }
    
    const totais = calcularTotaisPorCategoria()
    const labels = Object.keys(totais)
    const data = Object.values(totais)
    const canvas = document.getElementById('grafico')

    grafico = new Chart(canvas, {
    type: 'pie',       //tipo de gráfico
    data: {
        labels: labels,     //array de rótulos das fatias
        datasets: [{
            data: data    //array de valores das fatias
        }]
    }
    })
}
document.getElementById("filtroCategoria").addEventListener("change", function(){
    renderizarTudo()
})

function renderizarTudo() {
    document.getElementById("listaGastos").innerHTML = ""
    total = 0
    
    const filtro = document.getElementById("filtroCategoria").value
    
    for (let i = 0; i < gastos.length; i++){
        if(filtro === "todas" || gastos[i].categoria === filtro){
        adicionarGastoNaLista(gastos[i].categoria, gastos[i].descricao, gastos[i].valor, i)
        }
    }

    renderizarGrafico()
} 
renderizarTudo() //chamada Inicial
