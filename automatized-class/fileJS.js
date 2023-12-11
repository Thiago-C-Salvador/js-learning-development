const qntBolas=document.getElementById("id_numeros-bolas")
const insertBolas=document.getElementById("id_inputNovaBolas")
const btnAdd=document.getElementById("id_btn-add")
const btnRemover=document.getElementById("id_btn-remover")
const areaAnimacao=document.querySelector(".area-animacao")

let widthArea=areaAnimacao.offsetWidth//propriedade que calcula a área currenty do elemento
let heightArea=areaAnimacao.offsetHeight
let bolas=[]//irá receber o array de bolinahs e o respectivo índice da bolinha
let qntBola=0//irá exibir a aquantidade de bolinahs a serem adicinadas e o controle de quantas bolinhas estarão em execução

class Bola{
    
    //dentro do constructor ficam as propriedades da class
    constructor(arrayBolas, areaAnimacao){
        this.arrayBolas=arrayBolas//cada novo objeto instanciado(bola)
        this.areaAnimacao=areaAnimacao //parte (elemento) do DOM que irá ser apresentado o novo bojeto

        //tamanhos da bolinha
        this.size=Math.floor(Math.random()*10)+10;//soma-se +10 para caso a bolinha vir a ter o tamanho de um milímetro (ou seja, muito pequena) ou for 0, já que o floor arrendonda para o inteiro do valor. Exemplo: 1,455 arredonda para 1 - 0,999, arredonda para 0
        
        //definir cores das bolinhas
        this.r=Math.floor(Math.random()*255)+30//expressão somada mais 30 no final para evitar de sair bolinhas na cor preta, pois o background-color é black
        this.g=Math.floor(Math.random()*255)+30
        this.b=Math.floor(Math.random()*255)+30
        
        //posições aleaórias das novas bolinahs ao adiciná-las
        this.posX=Math.floor(Math.random()*(widthArea-this.size))//vai de zero até a largura máxima que estiver a janela, e menos o tamanho da bolinha para que a mesma não transborde parte para fora dos perímetros da área (elemento)
        this.posY=Math.floor(Math.random()*(heightArea-this.size))

        //velocidade das bolinhas
        this.sppedX=(Math.random()*2)+0.5//velocidade mínima será 0,5
        this.speedY=(Math.random()*2)+0.5

        //direções das bolinhas
        this.dirX=(Math.random()*10) > 4 ? 1 : -1//Verdadeiro direção para direita, falso; direção para a esquerda
        this.dirY=(Math.random()*10) > 4 ? 1 : -1
        this.id=Date.now()+"_"+(Math.floor(Math.random()*1000000000))//para gerar o id dso elementos gerados(bolinas).
        this.desenhoBall()//chamar a função que dará forma a bolinha antes de começar o deslocamento delas
        this.controle=setInterval(this.control,10)//atulizar a posição da bolinha, o deslocamento
        this.meInDOM=document.getElementById(this.id)//variável refeência para se ter acesso Às propriedades de cada novo elemento(bolinhas)
        qntBola++
        qntBolas.innerHTML=qntBola
    }
    //functions/métodos da classe
    positionBall=()=>{
       return this.arrayBolas.indexOf(this)
    }

    removeBall=()=>{
        //preciso 1º remover o evento de movimento de tais bolinhas, as que serão excluídas
        clearInterval(this.controle) // remover o evento "setInterval"

        //2º preciso correr todos os elementos do array, passar id por id das bolinhas para poder excluir as bolinhas
        bolas=bolas.filter((ball)=>{
            if(ball.id!=this.id){
                return ball
            }

        //3º preciso excluir tais bolinhas do DOM também
        })
        this.meInDOM.remove()
        qntBola--
        qntBolas.innerHTML=qntBola
        
    }

    //criação e geração das propriedades de cada elemento(bolinhas)
    desenhoBall=function(){
        const bolinha=document.createElement("div")
        bolinha.setAttribute("id",this.id)
        bolinha.setAttribute("class","bolinha")
        bolinha.setAttribute("style",`left:${this.posX}px;top:${this.posY}px;width:${this.size}px;height:${this.size}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        this.areaAnimacao.appendChild(bolinha)
    }

    //Tratamento para limitar a área que as bolinhas irão se deslocar
    colisao_borda=()=>{ 
       if(this.posX+this.size >= widthArea){
            this.dirX=-1
       }else if(this.posX < 0){
            this.dirX=1
       }

       if(this.posY < 0){
            this.dirY=1
        }else if(this.posY+this.size > heightArea){
            this.dirY=-1
        }
    }

    //Atualizar os deslocamentos das bolinahs no espaç-tempo
    control=()=>{
        this.colisao_borda()
        this.posX+=this.dirX*this.sppedX
        this.posY+=this.dirY*this.speedY
        this.meInDOM.setAttribute("style",`left:${this.posX}px;top:${this.posY}px;width:${this.size}px;height:${this.size}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        
        //caso alterar o tamanho da área que as bolinhas estão se deslocando e alguma delas ficarem de fora da nova área reinderizada(estrapolarem as extremidades), então elas serão exclíudas
        if(this.posX > widthArea || this.posY > heightArea){
            this.removeBall()
        }
    }
}

//recalcula a area do elemento, a reinderização em caso de manipulação de seu tamanho
window.addEventListener("resize",(evt)=>{
    widthArea=areaAnimacao.offsetWidth
    heightArea=areaAnimacao.offsetHeight
})

btnAdd.addEventListener("click",()=>{
    const qntBalls=insertBolas.value
   for(let i=0; i<qntBalls; i++){
        bolas.push(new Bola(bolas, areaAnimacao))
   }
})

btnRemover.addEventListener("click",()=>{
    bolas.forEach((ball) => {
        ball.removeBall()
    });
})
