const visor = document.getElementById('visor');
const htmlHitorico = document.getElementById("historico");
let numeroCorrente = "";
var historico = [];
let contaArray = [];
let sinalCorrente = "";
const nummero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const sinal = ["-", "+", "*", "/", "^", "$", "m", "n", "f", "%"];
const BotaoPrecionado = (botao) => {
    if (nummero.includes(botao)) {
        Numero(botao);
    } else if (sinal.includes(botao)) {
        Sinal(botao);
    } else if (botao === "=") {
        Igual();
    } else {
        console.log('Erro');
        console.log('Entrada não tratada');
    }
}
const Numero = (botao) => {
    numeroCorrente = numeroCorrente + botao;
    visor.innerHTML = contaArray.join(' ') + ' ' + sinalCorrente + ' ' + numeroCorrente;
    if (sinalCorrente) {
        contaArray.push(sinalCorrente);
        sinalCorrente = ""
    }
}
const Sinal = (botao) => {
    if (numeroCorrente) {
        contaArray.push(parseFloat(numeroCorrente));
        numeroCorrente = '';
    }
    switch (botao) {
        case 'm':
            botao = '(';
            break;
        case 'n':
            botao = ')';
            break;
        case 'f':
            contaArray = [];
            numeroCorrente = '';
            sinalCorrente = "";
            botao = "";
            break;
        default:
            break;
    }
    if (sinalCorrente == ")" && sinal.includes(botao) || botao == "(" && sinal.includes(sinalCorrente) || sinalCorrente == "%") {
        contaArray.push(sinalCorrente);
        sinalCorrente = botao;
        visor.innerHTML = contaArray.join(' ') + " " + sinalCorrente;
    } else {
        sinalCorrente = botao;
        visor.innerHTML = contaArray.join(' ') + " " + sinalCorrente;
    }
}
const Igual = () => {
    if (numeroCorrente) {
        contaArray.push(parseFloat(numeroCorrente));
        numeroCorrente = '';
    }
    if (sinalCorrente) {
        contaArray.push(sinalCorrente);
        sinalCorrente = "";
    }
    const Resposta = Parenteses();
    if (typeof Resposta === 'number') {
        historico.push({
            "ope": contaArray,
            "res": Resposta
        });
        contaArray = [];
        numeroCorrente = Resposta;
        document.getElementById('visor').innerHTML = numeroCorrente;
        historicoView();
    } else {
        document.getElementById('visor').innerHTML = "Error";
    }

}
const Parenteses = () => {
    let semParenteses = [...contaArray];
    semParenteses.map(
        (item, indice, array) => {
            if (item == ")") {
                const fechamentoIndice = indice;
                let aberturaIndice;
                contaArray.map(
                    (item, indice) => {
                        if (item == "(") {
                            if (indice < fechamentoIndice) {
                                aberturaIndice = indice;
                            }
                        }
                    }
                )
                if ((aberturaIndice === 0 || aberturaIndice) && fechamentoIndice || (aberturaIndice === 0 || aberturaIndice) && fechamentoIndice) {
                    let parentesesArray = array.slice(aberturaIndice + 1, fechamentoIndice);
                    const resposta = Calcular(parentesesArray);
                    array.splice(aberturaIndice, fechamentoIndice - aberturaIndice + 1);
                    array.splice(aberturaIndice, 0, resposta[0]);
                } else {
                    console.log('Erro de parênteses');
                }
            }
        }
    )
    const Resultado = Calcular(semParenteses);
    return (Resultado[0]);
}
function Calcular(array) {
    for (let indice = 0; indice < array.length; indice++) {
        if (array[indice] == "%") {
            array[indice - 1] = array[indice - 1] / 100;
            array.splice(indice, 1);
        }
    }
    for (let indice = 0; indice < array.length; indice++) {
        if (array[indice] == "/") {
            let resposta = array[indice - 1] / array[indice + 1];
            posCalculo(indice, resposta, array);
            indice--;
        }
        if (array[indice] == "*") {
            let resposta = array[indice - 1] * array[indice + 1];
            posCalculo(indice, resposta, array);
            indice--;
        }
    }
    for (let indice = 0; indice < array.length; indice++) {
        if (array[indice] == "-") {
            let resposta = array[indice - 1] - array[indice + 1];
            posCalculo(indice, resposta, array);
            indice--
        }
        if (array[indice] == "+") {
            let resposta = array[indice - 1] + array[indice + 1];
            posCalculo(indice, resposta, array);
            indice--;
        }
    }
    return (array);
}
const posCalculo = (indice, resposta, array) => {
    array.splice(indice - 1, 3);
    array.splice(indice - 1, 0, resposta);
    return (array);
}
const historicoView = () => {
    htmlHitorico.innerHTML = '';
    historico.map((intem, indice, array) => {
        htmlHitorico.insertAdjacentHTML('beforeend', `
            <div class = "hist">
                <div class = "textRes"> ${intem.ope.join("")} = ${intem.res}</div>
            </div>`
        );
    })
}