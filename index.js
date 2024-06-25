//sinalCorrente VAI GERAR UM BUG NO ()


//Define o visor
const visor = document.getElementById('visor');

//Define o historico
const htmlHitorico = document.getElementById("historico");

//Define uma variável para armanezar o Número Corrente
let numeroCorrente = "";

//Cria um Array para amazenar o historico
var historico = [];

//Cria um Array para gardar os Números e Sinais da Conta já separados
let contaArray = [];

//Cria uma variável para gardar o Sinal Corrente permitindo a troca de Sinais
let sinalCorrente = "";

//Defino os Números e Sinais de operações
const nummero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const sinal = ["-", "+", "*", "/", "^", "$", "m", "n", "f", "%"];

const BotaoPrecionado = (botao) => {

    //Se for um Número
    if (nummero.includes(botao)) {

        //Executa 
        Numero(botao);

        //Se for um Sinal
    } else if (sinal.includes(botao)) {

        //Executa
        Sinal(botao);

        //Se for =
    } else if (botao === "=") {

        Igual();
        //Entrada não tratada
    } else {
        console.log('Erro');
        console.log('Entrada não tratada');
    }

}

//Se for um Número
const Numero = (botao) => {
    //Adiciona o Número prescionado ao Número Corrente
    numeroCorrente = numeroCorrente + botao;

    //Exibe o calculo na tela
    visor.innerHTML = contaArray.join(' ') + ' ' + sinalCorrente + ' ' + numeroCorrente;

    //Se tiver um sinal gardado Adiciona ele no Array da conta e zera a variável do sinal
    if (sinalCorrente) {
        contaArray.push(sinalCorrente);
        sinalCorrente = ""
    }
}

//Se for um Sinal
const Sinal = (botao) => {

    //Acrecenta ao array o Número  se ele existir e zera a variável do Número
    if (numeroCorrente) {
        contaArray.push(parseFloat(numeroCorrente));
        numeroCorrente = '';
    }

    //Sinal Corrente resebe o Botão pressionado
    sinalCorrente = botao;

    //verifico sinais  que não da para pasar valor direto        
    switch (botao) {

        //Troca M por ( 
        case 'm':
            botao = '(';
            break;

        //Troca N por ) 
        case 'n':
            botao = ')';
            break;

        // Apaga a memória resetando o contaArray, sinalCorrente e o numeroCorrente
        case 'f':
            contaArray = [];
            numeroCorrente = '';
            sinalCorrente = "";
            break;

        //Sai do Switch
        default:
            break;
    }

    //Exibe o Array mais o Sinal pressionado
    visor.innerHTML = contaArray.join(' ') + " " + sinalCorrente;
}

const Igual = () => {

    //Verifica se não tem um Número perdido
    if (numeroCorrente) {

        //Adiciona ele no Array
        contaArray.push(parseFloat(numeroCorrente));

        //reseta o numeroCorrente
        numeroCorrente = '';
    }

    //Verifica se não tem um Sinal perdido
    if (sinalCorrente) {

        //Adiciona ele no Array
        contaArray.push(sinalCorrente);

        //Reseta o sinalCorrente
        sinalCorrente = "";
    }

    //Chama a função de calculo entre parenteses que retorna a resposta
    const Resposta = Parenteses();

    //Verifica se a resposta é um Número
    if (typeof Resposta === 'number') {
        
        //Gera o Array do Histórico 
        historico.push({
            "ope": contaArray,
            "res": Resposta
        });

        //Reseta o valor do contaArray
        contaArray = [];

        //Garda a resposta no Número Corrente
        numeroCorrente = Resposta;

        //Mostra a resposta
        document.getElementById('visor').innerHTML = numeroCorrente;

        //historico
        historicoView();

    } else {
        document.getElementById('visor').innerHTML = "Error";
    }

}

//Faz o calculo entre Parenteses
const Parenteses = () => {

    //Copia o Array em outro para modificar ele
    let semParenteses = [...contaArray];

    //Faz o map desse Array
    semParenteses.map(
        (item, indice, array) => {

            //Busca o primeiro fechamento de parenteses no Array
            if (item == ")") {

                //Guarda o indice dele 
                const fechamentoIndice = indice;

                //Define uma variável para guardar a abertura
                let aberturaIndice;

                //Busca o ultima abertura de parenteses antes do primeiro fechamento de parenteses do Array
                contaArray.map(
                    (item, indice) => {

                        //Acha as aberturas de paresteses
                        if (item == "(") {

                            //Verifica se ela esta antes do primeiro fechamento do parrenses
                            if (indice < fechamentoIndice) {

                                //Garda o indice dele
                                aberturaIndice = indice;
                            }
                        }
                    }
                )
                
                //Verifica se a quantidade de aberturas e fechamentos de parenteses batem
                if (aberturaIndice && fechamentoIndice || aberturaIndice && fechamentoIndice) {

                    //Garda os itens dentro dos parenteses em outro array
                    let parentesesArray = array.slice(aberturaIndice + 1, fechamentoIndice);

                    //Calcula o resultado dentro dos parenteses
                    const resposta = Calcular(parentesesArray);

                    //Ranca os parenteses e termos dentro dele
                    array.splice(aberturaIndice, fechamentoIndice - aberturaIndice + 1);

                    //Adiciona o resultado da conta no array principal
                    array.splice(aberturaIndice, 0, resposta[0]);

                    //Retorna mensagem de erro
                } else {
                    console.log('Erro de parênteses');
                }
            }
        }
    )

    //Depois que todos os parenteses são calculado então envia o array principal para ser calculado
    const Resultado = Calcular(semParenteses);

    //pega a resposta retorna ela
    return (Resultado[0]);
}

//Função que realmente calcula
function Calcular(array) {
    //verifica se não tem %
    for (let indice = 0; indice < array.length; indice++) {
        if (array[indice] == "%") {
            array[indice - 1] = array[indice - 1] / 100;
            array.splice(indice, 1);
        }
    }
    //primerio corre o array procurando por / * para fazelas
    for (let i = 0; i < array.length; i++) {
        //se achar sinal de divisao faz a conta e envia pro posCalculo limpar o array e adicionar a resposta no array
        if (array[i] == "/") {
            let res = array[i - 1] / array[i + 1];
            posCalculo(i, res, array);
            i--;
        }
        //o mesmo para multiplicação
        if (array[i] == "*") {
            let res = array[i - 1] * array[i + 1];
            posCalculo(i, res, array);
            i--;
        }
    }
    //acabando a multiplicação e divisão começa a soma e subtração 
    for (let i = 0; i < array.length; i++) {
        // faz a subtração
        if (array[i] == "-") {
            let res = array[i - 1] - array[i + 1];
            posCalculo(i, res, array);
            i--
        }
        //faz a soma
        if (array[i] == "+") {
            let res = array[i - 1] + array[i + 1];
            posCalculo(i, res, array);
            i--;
        }
    }

    //retorna o valor
    return (array);
    //obs: é possível adicionar mais operações como raiz quadrada , potencia , entre outros des de que siga a orderm de procedencia correta
}

const posCalculo = (index, res, e) => {
    e.splice(index - 1, 3);
    e.splice(index - 1, 0, res);
    return (e);
}

//historico 

//Historico
const historicoView = () => {
    htmlHitorico.innerHTML = '';
    //objetoArray => historico[index] é o objeto do index
    //indexArray => historico[index] é o index do map que ta sendo feito
    // fullArray => historico é p arra completo
    historico.map((objetoArray, indexArray, fullArray) => {
        var htmlString = `
            <div class = "hist">
                <div class = "textRes"> ${objetoArray.ope.join("")} = ${objetoArray.res}</div>
            </div>
        `;
        htmlHitorico.insertAdjacentHTML('beforeend', htmlString);
    })
}