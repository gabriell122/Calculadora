        //Var global
        let currentNumber = '';
        let arrayCount = [];
        let historic = [];
        const htmlHitorico = document.querySelector(".historico");
        const PresButton = (presButton) => {

            //defino os numero e sinais de operações
            const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
            const sinal = ["-", "+", "*", "/", "^", "$", "m", "n", "f" , "%"];

            //se for numero
            if (num.includes(presButton)) {

                // junto a string deles
                currentNumber = currentNumber + presButton;
                //exibe o calculo na tela
                document.getElementById('deubom').value = arrayCount.join(' ') + ' ' + currentNumber;

                //se for sinal
            } else if (sinal.includes(presButton)) {

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
                        arrayCount = '';
                        currentNumber = '';
                        break;
                    default:
                        break;

                }

                //acrecenta ao array o número  se ele existir
                if (currentNumber) {
                    arrayCount.push(parseFloat(currentNumber));
                }

                //adiciona o sinal 
                arrayCount.push(presButton);

                //reseta o currentNumber
                currentNumber = '';

                //exibe o calculo na tela
                document.getElementById('deubom').value = arrayCount.join(' ');

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

                //mostra a resposta
                document.getElementById('deubom').value = Res;
                
                //historico 
                historic.push({
                    "ope": arrayCount,
                    "res": Res
                });

                //reseta o valor do arrayCount e atribui o valor da resposta a ele
                arrayCount = [];
                arrayCount.push(Res);

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
                    e[i-1] = e[i-1]/100;
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
         const history = () => {
            htmlHitorico.innerHTML = '';
            //objetoArray => historico[index] é o objeto do index
            //indexArray => historico[index] é o index do map que ta sendo feito
            // fullArray => historico é p arra completo
            historic.map((objetoArray, indexArray, fullArray) => {
                var htmlString = `
                    <div class = "hist">
                        <p class = "text"> Operação: ${objetoArray.ope}</p>
                        <p class = "text"> Resultado: ${objetoArray.res}</p>
                    </div>
                `;
                htmlHitorico.insertAdjacentHTML('beforeend', htmlString);
            })
        }
