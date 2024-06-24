//sinalCorrente VAI GERAR UM BUG NO ()


//Define o visor
const visor = document.getElementById('visor')

//Define uma variável para armanezar o Número Corrente
let numeroCorrente = "";

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

const Igual = ()=>{

    //Verifica se não tem um Número perdido
    if (numeroCorrente) {

        //Adiciona ele no Array
        contaArray.push(parseFloat(numeroCorrente));
        
        //reseta o numeroCorrente
        numeroCorrente = '';
    }

    //Verifica se não tem um Sinal perdido
    if(sinalCorrente){

        //Adiciona ele no Array
        contaArray.push(sinalCorrente);
        
        //reseta o sinalCorrente
        sinalCorrente = "";
    }

    const Resposta = Calculo();

}

//Faz o calculo
const Calculo = ()=>{
    contaArray.map(
        
    )

}


//Função que verifica os parênteses 
const Ordem2 = (arrayMap) => {

    //Roda o arrayMap buscando por parênteses (pela ultima abertura)
    for (let index = arrayMap.length + 1; index >= 0; index--) {

        //se achar
        if (arrayMap[index] == '(') {
            let aIndex = index;

            //busca pelo primeiro fechamento
            for (let index = aIndex; index < arrayMap.length; index++) {

                //se achar o fechamento
                if (arrayMap[index] == ')') {

                    //corta o arrayMap gerando um novo arraySlice que é o recorte interno do conteudo do parênteses
                    let arraySlice = arrayMap.slice(aIndex + 1, index);

                    //calcula o valor do arraySlice
                    const Res = Calcular(arraySlice);
                    //ranca a parte do parênteses que foi calculado 
                    arrayMap.splice(aIndex, index - aIndex + 1);
                    //adiciona o valor Resultado
                    arrayMap.splice(aIndex, 0, Res[0]);
                } else {
                    console.log('Erro: fechamento de parênteses');
                }
            }
        }
    }

    // depois que todos os parenteses são calculado então envia o array principal para ser calculado
    const Resultado = Calcular(arrayMap);
    //pega a resposta retorna ela
    return (Resultado[0]);
    //atuliza o valor de cal para o resposta
    cal = array[0]
}





//Var global
let currentNumber = '';
let arrayCount = [];
let historic = [];
const htmlHitorico = document.getElementById("history");
let sinalPress = "";
const PresButton = (presButton) => {



    //se for numero
    if (num.includes(presButton)) {

        // junto a string deles
        currentNumber = currentNumber + presButton;
        //exibe o calculo na tela
        document.getElementById('res').innerHTML = arrayCount.join(' ') + ' ' + sinalPress + ' ' + currentNumber;
        if (sinalPress) {
            arrayCount.push(sinalPress);
            sinalPress = ""
        }

        //se for sinal
    } else if (sinal.includes(presButton)) {



        //acrecenta ao array o número  se ele existir
        if (currentNumber) {
            arrayCount.push(parseFloat(currentNumber));
        }

        sinalPress = presButton

        //verifico sinais  que não da para pasar valor direto        
        switch (presButton) {
            case 'm':
                presButton = '(';
                break;
            case 'n':
                presButton = ')';
                break;
            // Apaga a memória resetando o arrayCount e o currentNumber
            case 'f':
                arrayCount = [];
                currentNumber = '';
                sinalPress = "";
                break;
            default:
                break;

        }

        //adiciona o sinal 
        //arrayCount.push(presButton);

        //reseta o currentNumber
        currentNumber = '';

        //exibe o calculo na tela
        document.getElementById('res').innerHTML = arrayCount.join(' ') + " " + sinalPress;

        //se for o sinal de =
    } else if (presButton === "=") {

        //verifica se não tem um numero perdido
        if (currentNumber) {
            arrayCount.push(parseFloat(currentNumber));

            //reseta o currentNumber
            currentNumber = '';
        }
        //chama a função de calculo e passa como parametro arrayCount
        const Res = Ordem([...arrayCount]);


        if (typeof Res === 'number') {
            //mostra a resposta
            document.getElementById('res').innerHTML = Res;
            //historico 
            historic.push({
                "ope": arrayCount,
                "res": Res
            });

            //reseta o valor do arrayCount e atribui o valor da resposta a ele
            arrayCount = [];
            currentNumber = Res;

            //historico
            historicoView();

        } else {
            document.getElementById('res').innerHTML = "Error";
        }



        //Erro
    } else {
        console.log('Erro:Entrada não tratada');
    }
}

//Função que verifica os parênteses 
const Ordem = (arrayMap) => {

    //Roda o arrayMap buscando por parênteses (pela ultima abertura)
    for (let index = arrayMap.length + 1; index >= 0; index--) {

        //se achar
        if (arrayMap[index] == '(') {
            let aIndex = index;

            //busca pelo primeiro fechamento
            for (let index = aIndex; index < arrayMap.length; index++) {

                //se achar o fechamento
                if (arrayMap[index] == ')') {

                    //corta o arrayMap gerando um novo arraySlice que é o recorte interno do conteudo do parênteses
                    let arraySlice = arrayMap.slice(aIndex + 1, index);

                    //calcula o valor do arraySlice
                    const Res = Calcular(arraySlice);
                    //ranca a parte do parênteses que foi calculado 
                    arrayMap.splice(aIndex, index - aIndex + 1);
                    //adiciona o valor Resultado
                    arrayMap.splice(aIndex, 0, Res[0]);
                } else {
                    console.log('Erro: fechamento de parênteses');
                }
            }
        }
    }

    // depois que todos os parenteses são calculado então envia o array principal para ser calculado
    const Resultado = Calcular(arrayMap);
    //pega a resposta retorna ela
    return (Resultado[0]);
    //atuliza o valor de cal para o resposta
    cal = array[0]
}

//Função que realmente calcula
function Calcular(e) {
    //verifica se não tem %
    for (let i = 0; i < e.length; i++) {
        if (e[i] == "%") {
            e[i - 1] = e[i - 1] / 100;
            e.splice(i, 1);
        }
    }
    //primerio corre o array procurando por / * para fazelas
    for (let i = 0; i < e.length; i++) {
        //se achar sinal de divisao faz a conta e envia pro posCalculo limpar o array e adicionar a resposta no array
        if (e[i] == "/") {
            let res = e[i - 1] / e[i + 1];
            posCalculo(i, res, e);
            i--;
        }
        //o mesmo para multiplicação
        if (e[i] == "*") {
            let res = e[i - 1] * e[i + 1];
            posCalculo(i, res, e);
            i--;
        }
    }
    //acabando a multiplicação e divisão começa a soma e subtração 
    for (let i = 0; i < e.length; i++) {
        // faz a subtração
        if (e[i] == "-") {
            let res = e[i - 1] - e[i + 1];
            posCalculo(i, res, e);
            i--
        }
        //faz a soma
        if (e[i] == "+") {
            let res = e[i - 1] + e[i + 1];
            posCalculo(i, res, e);
            i--;
        }
    }
    //retorna o valor
    return (e);
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
    historic.map((objetoArray, indexArray, fullArray) => {
        var htmlString = `
            <div class = "hist">
                <div class = "textRes"> ${objetoArray.ope.join("")} = ${objetoArray.res}</div>
            </div>
        `;
        htmlHitorico.insertAdjacentHTML('beforeend', htmlString);
    })
}