let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero
let grafico = null

if (localStorage.getItem("gastos")) {
       gastos = JSON.parse(localStorage.getItem("gastos"));
   }

//cria uma funcao de adicionarGasto no site
function adicionarGastoNaLista(categoria, descricao, valor, data, indice){
    //cria um item da lista
    const itemGasto = document.createElement("li") 
    
    //escreve o texto nele
    itemGasto.textContent = `${descricao} - ${categoria} - ${data} = ${valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

    //cria uma varivel para guardar o botao
    const botaoRemover = document.createElement("button")
        botaoRemover.textContent = "X"
        botaoRemover.classList.add("botaoRemover")
    const botaoEditar = document.createElement("button")
        botaoEditar.textContent = "Editar"
        botaoEditar.classList.add("botaoEditar")
        botaoEditar.addEventListener("click", function() {
        abrirModal(indice)
})
itemGasto.appendChild(botaoEditar)

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
    const dataInput = document.getElementById('data',).value
    const partes = dataInput.split("-")
    const data = `${partes[2]}/${partes[1]}/${partes[0]}`
    const categoria = document.getElementById('categoria').value
    
    //array onde tudo do gasto sera o que foi adicinado do valor e descricao
    gastos.push({valor, descricao, categoria, data})

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
        if(filtro === "Todas" || gastos[i].categoria === filtro){
        adicionarGastoNaLista(gastos[i].categoria, gastos[i].descricao, gastos[i].valor, gastos[i].data, i)
        }
    }

    renderizarGrafico()
} 

let indiceEditando = null

function abrirModal(indice) {
    const gasto = gastos[indice]
    indiceEditando = indice

    // preenche os campos do modal com os dados atuais
    const partesData = gasto.data.split("/")
    document.getElementById("editData").value = `${partesData[2]}-${partesData[1]}-${partesData[0]}`
    document.getElementById("editDescricao").value = gasto.descricao
    document.getElementById("editValor").value = gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    document.getElementById("editCategoria").value = gasto.categoria

    document.getElementById("modalEditar").style.display = "block"
}

document.getElementById("confirmar").addEventListener("click", function() {
    let valorEditado = document.getElementById("editValor").value

    if (valorEditado.includes(",")) {
        valorEditado = parseFloat(valorEditado.replaceAll(".", "").replace(",", "."))
    } else {
        valorEditado = parseFloat(valorEditado)
    }

    if (isNaN(valorEditado)) {
        alert("Valor inválido!")
        return
    }

    const dataInput = document.getElementById("editData").value
    const partes = dataInput.split("-")
    const data = `${partes[2]}/${partes[1]}/${partes[0]}`

    gastos[indiceEditando] = {
        descricao: document.getElementById("editDescricao").value,
        valor: valorEditado,
        categoria: document.getElementById("editCategoria").value,
        data: data
    }

    localStorage.setItem("gastos", JSON.stringify(gastos))
    document.getElementById("modalEditar").style.display = "none"
    indiceEditando = null
    renderizarTudo()
})

document.getElementById("cancelar").addEventListener("click", function() {
    document.getElementById("modalEditar").style.display = "none"
    indiceEditando = null
})
renderizarTudo() //chamada Inicial
