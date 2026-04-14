let gastos = []; //chaves sem nada porque o usuario ainda ira adicionar
let total = 0; //comeca em zero
let graficoInstancia = null

//ocorrer evento onde o botao funcionara quando for clicado
const btn = document.getElementById("adicionarGasto")
btn.addEventListener("click", function() {
    if ((document.getElementById('descricao').value.trim() === "") ||(document.getElementById('valor').value.trim() === "")) {
        window.alert("O campo esta vazio!")
        return 0;
    }
    //variaveis em descricao, valor e categoria usando id, e limpando cada formulario depois de apertar o botao
    const descricao = document.getElementById("descricao").value 
    document.getElementById('descricao').value =''
    
    const valor = parseFloat(document.getElementById("valor").value)
    document.getElementById('valor').value = ''
    
    total = valor + total

    document.getElementById('categoria').selectedIndex = 0

    const categoria = document.getElementById('categoria').value

    //array onde tudo do gasto sera o que foi adicinado do valor e descricao
    gastos.push({valor, descricao, categoria})

    const indice = gastos.length - 1

    //esta adicionando o total no valorTotal
    document.getElementById("valorTotal").textContent = total.toFixed(2)

    //adicionando a lista de total no site
    const listaGastosTotal = document.createElement("li") 
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "X"

    //pegando a variavel e juntando as variaveis do html na variavel do js
    listaGastosTotal.innerHTML = `${categoria} - ${descricao} = R$ ${valor.toFixed(2)}`

    listaGastosTotal.appendChild(btnRemover)
    
    btnRemover.addEventListener("click", function(){
        listaGastosTotal.remove()
        gastos.splice(indice, 1)
        
        atualizarGrafico()
    })
    
    

    //juntando o pai e o filho na lista de gasto 
    document.getElementById("listaGastos").appendChild(listaGastosTotal)

    atualizarGrafico()
    
})
function atualizarGrafico() {
    const labels = []
    const valores = []

    for (const gasto of gastos) {
        const posicao = labels.indexOf(gasto.categoria)

        if (posicao === -1) {
            labels.push(gasto.categoria)
            valores.push(gasto.valor)
        } else {
            valores[posicao] = valores[posicao] + gasto.valor
        }
    }

    const graficoReal = document.getElementById('grafico')

    if (graficoInstancia) {
        graficoInstancia.destroy()
    }

    graficoInstancia = new Chart(graficoReal, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: valores
            }]
        }
    })
}

