const symbolOperador=document.getElementById("id_symbol")
const resultado=document.getElementById("id_symbol-iqual")
const nomeOperador=document.getElementById("id_name-symbol")
const input1=document.querySelector("#id_aritimetica1")
const input2=document.querySelector("#id_aritimetica2")
const backSpace=document.querySelector("#id_back-Space")
const ac=document.querySelector("#id_tecla-AC")
const operador=document.querySelectorAll(".sinal")
const inputs=document.querySelectorAll(".valor")

//variável que recebe o valor que é jogado para o índice da função anônima "operacao", a qual é um array com todos os tipos de calculos possíveis 
let ind=null

let focoInput=input1
//define que o cursor começará no primeiro campo(input)
focoInput.focus()

//função que define em qual campo(input) o cursor está - o input que está com o foco no momento em que estamos inserindo dados
for(const input of inputs){
    input.addEventListener("focus",(evt)=>{
       focoInput=evt.target  
    })
}

//método que evita o campo capturar mais de um vírgula pelo teclado físico
const contVirgula=()=>{
     
     focoInput.addEventListener('input', function () {
        let number = this.value
        let m = number.match(/,/g)
        if(m && m.length>=1){
        this.value = number.substring(0, number.indexOf(",")+1)
        + number.substring(number.indexOf(",")).replace(/,/g, '')
        }
    }) 
}

/*function pegaTecla(click){
    console.log(click.keyCode)
}*/

//funcao para definir a quantidade de caracteres que os campos(inputs) irão receber. No caso, são 10 caracteres
function fieldManipule(event) {
    contVirgula()
//pegaTecla(event)//Chamada da função "pegaTecla" apenas com o intuito de capturar os code de tecla do teclado físico
    if(focoInput.value.length >=10){
        return false
    }else{
        return (event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 44)
    }  
}

//variável para retornar o resultado da função anônima "operacao"
let calculo=0
//Função que define qual o cálculo será realizado
const operacao=[
    //Função de adição
    ()=>{//index 0
            for(const input of inputs){                
                //Apenas para didática de aprendizado tratei a conversão de Strings para number com um cast usando NUMBER
                if(input.id==="id_aritimetica1"){
                    calculo=Number(convertionPont(input.value))
                }else{
                    calculo+=Number(convertionPont(input.value))

                }
            } 
            return roundNumber(calculo)
        },
    //Função de subtração
    ()=>{//indixe 1
            for(const input of inputs){
                if(input.id==="id_aritimetica1"){
                    calculo=Number(convertionPont(input.value))
                }else if(input.id!=="id_aritimetica1"){
                    calculo-=Number(convertionPont(input.value))
                }
            }
            return  roundNumber(calculo)
        },
      
    //Função de divisão
    ()=>{//index 2
            for(const input of inputs){
                if(input.id==="id_aritimetica1"){
                    //Já aqui, para didatica de aprendizado, também tratei a conversão de Strings para número com um cast, porém com o parseFloat em caso ocorre um resultados decimais após a vírgula
                    calculo=(parseFloat(convertionPont(input.value)))
                }else if(input.id!=="id_aritimetica1"){
                    calculo/=(parseFloat(convertionPont(input.value)))
                }
            }
            return  roundNumber(calculo) 
        },

    //Função de multiplicação
    ()=>{//index 3
            for(const input of inputs){
                if(input.id==="id_aritimetica1"){
                    calculo=(parseFloat(convertionPont(input.value)))
                }else if(input.id!=="id_aritimetica1"){
                    calculo*=(parseFloat(convertionPont(input.value)))
                }
            } 
            return  roundNumber(calculo)
        }, 
    //Função de percentual    
    ()=>{//index 4
            for(const input of inputs){
                if(input.id==="id_aritimetica1"){
                    calculo=(parseFloat(convertionPont(input.value)))/100
                }else if(input.id!=="id_aritimetica1"){
                    calculo*=(parseFloat(convertionPont(input.value)))
                }
            }
            return  roundNumber(calculo) 
        }
]

//Função para trartar a conversão da "," para "." - pois o ponto é o separador de decimais que o computador entende
const convertionPont=(valor)=>{
    return changer=valor.replace(/,/g,".")
    }

//Função/método para arredondar e imprimi, o resultado com no máximo até 3 casas decimais após a vírgula e caso for zero, ignorá-los 
function roundNumber(number){
    let opcoes = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
        useGrouping: true //faz com que seja usado o separador de milhares. Por default o valor é 'true', mas coloquei para explícito
    };
    return number.toLocaleString('pt-BR',opcoes);//método "toLocaleString" converte/formata o resultado para o padrão brasileiro. Sendo assim, ao invés de o resultado sair 14.294(com ponto ao invés de vírgula - padrão americano e também do "mundo' da programação), no caso sai 14,294 (padrão brasileiro de separação de desenas)
}

//evento que pecorrer todos os números do teclado e que, através do evento click, recebe o valor referente à tecla clicada
for(const numbers of document.querySelectorAll(".number")){
    numbers.addEventListener('click',(evt)=>{
        
        if(focoInput.value.length >=10){
            return false
        }else{
        focoInput.value+=evt.target.value
        }
        
        //método que evita o campo capturar mais de um vírgula pelo teclado virtual
        let number = focoInput.value
        let m = number.match(/,/g)
        if(m && m.length >=1){
        console.log("Aqui " + number.indexOf(","))
        focoInput.value = number.substring(0, number.indexOf(",")+1)
        + number.substring(number.indexOf(",")).replace(/,/g, '')
        }
    })

}

//evento que reseta todos os campos
ac.addEventListener("click", ()=>{
    for(const input of inputs){ 
        input.value=""
    }
    document.getElementById("id_symbol").innerHTML=""  
    nomeOperador.innerHTML="Operação"
    document.querySelector("#id_resultado").innerHTML="Resultado:"
    input1.focus()
})

//evento que captura qual a função aritimética será realizada
for(const opera of operador){
    opera.addEventListener("click", (evt)=>{  
        symbolOperador.innerHTML=evt.target.value
        if(evt.target.value=== "%"){
            nomeOperador.innerHTML="Porcentagem"
            ind=4
        }else if(evt.target.value === "/"){
            nomeOperador.innerHTML="Divisão"
            ind=2
        }else if(evt.target.value=== "x"){
            nomeOperador.innerHTML="Multiplicação" 
            ind=3 
        }else if(evt.target.value === "+"){
            nomeOperador.innerHTML="Soma"  
            ind=0
        }else if(evt.target.value === "-"){
            nomeOperador.innerHTML="Subtração" 
            ind=1  
        }
    })
}

//evento para apagar caractereres um a um, ao invés de o campo todo(input)
backSpace.addEventListener("click",()=>{
    focoInput.value=focoInput.value.substr(0,focoInput.value.length-1)
    focoInput.focus()
})

//variável que dará condição para realizar a operação ou não
resultado.addEventListener("click",()=>{
    let condicao=0
    //evento que pecorrer todos os inputs verificando se algum está vazio. Se caso estiver, nenhum evento ocorre, caso não: o preceso(calculo) ocorre normalmente
    for (const input of inputs){
        if(input.value=="" || input.value==","){
            condicao++
        }
    }
    //caso nenhum campo(input estiver vazio, a variável "condicao" vai estar com o valor 0)
    if(condicao==0){
        document.querySelector("#id_resultado").innerHTML= `Resultado: ${(operacao[ind]())}`

    }
})
