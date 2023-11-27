
//Class(objeto) pai
class Belicos{
    constructor(pType,pModel,pFabricante,pColor,pBlindado,pPrice){
        this.type=pType
        this.model=pModel
        this.fabricante=pFabricante
        this.color=pColor
        this.blindado=pBlindado
        this.price=pPrice
    }
    getTipo=function(){
        return this.type
    }

    getModelo=function(){
        return this.model
    }

    getFabricante=function(){
        return this.fabricante
    }

    getCor=function(){
        return this.color
    }

    getBlindado=function(){
        return this.blindado
    }

    getPreco=function(){
        return this.price
    }

    getPassageiros=function(){
        if(this.passenger===undefined){
            return this.passenger   ="-----"
        }else{
        return this.passenger
        }
    }
    // getMotor=function(){
    //     if(this.motor===undefined){
    //         return this.motor="-----"
    //     }else
    //     return this.motor
    // }

    getPortas=function(){
        if(this.doors===undefined){
            return this.doors="-----"
        }else
        return this.doors
    }

    getMotor=function(){
        return this.motor
    }

    setMotor=function(pMotor){ //se acessar essa proprieda na instância/objeto então não precisa usar o método getMotor com tratamento condicional como está, até então, na linha 43
        this.motor=pMotor      //No caso acessei a propriedade no objeto "veículo": veiculo.setMotor("*******") no bloco da função/método mandatoryField 
   }

    // setPortas=function(pDoors){
    //     this.doors=pDoors
    // }
}

//Classe exetendida/filha
class Not_Belicos extends Belicos{
    constructor(pType,pModel,pFabricante,pColor,pBlindado,pPrice,pPassenger,pMotor,pDoors){
        super(pType,pModel,pFabricante,pColor,pBlindado,pPrice)

        this.passenger=pPassenger
        this.motor=pMotor
        this.doors=pDoors
    }

}

//variáveis de referência de objeto do DOM usando querySlectorAll
const selects=document.querySelectorAll("select")
const allPassenger=document.querySelectorAll(".option-passenger")
const inputsRadio=document.querySelectorAll("input[type='radio']")
const inputs=document.querySelectorAll("input[type='text']")
const radiosDoors=document.querySelectorAll("input[name='radio-doors']")

//variáveis de referência de objeto do DOM usando método getElementeBy
const radioType=document.getElementsByName("radio-type")
const radiosMotor=document.getElementsByName("radio-motor")
const btnClear=document.getElementById("id_button-clear")
const btnLancar=document.getElementById("id_button-launch")
const fieldPassenger=document.getElementById("id_selecion-passageiro")
const fieldBlindado=document.getElementById("id_selecion-blindagem")
const price=document.getElementById("id_input-price-car")

//variáveis de referência de objetos do DOM usando querrySelector
const registerCars=document.querySelector("#id_lancamentos")
const templateCar=document.querySelector("#id_input-template-car")
const fabricanteCar=document.querySelector("#id_input-fabricante-car")
const colorCar=document.querySelector("#id_input-cor-car")
const priceCar=document.querySelector("#id_input-price-car")
const removeAll=document.querySelector("#id_button_remove")

const datasVeiculo=[]

//tratamento do campo(input) Preço/valor
price.value="0.00"
price.addEventListener("focus",()=>{
    if(price.value=="0.00"){
        price.value=""
    }
})
price.addEventListener("blur",()=>{
    if(price.value < 0.01){
        Number(price.value="0.00")
    }else{
        price.value=Number(price.value).toFixed(2)   
    }
})
//fim tratamento do campo(input) Preço/valor

//função para retornar os elementos em estado de "desabilitado" para "habilitado"
const normalizedFields=()=>{
    document.getElementById("id_selecion-passageiro").removeAttribute("disabled")
    fieldBlindado.value=""
    fieldBlindado.removeAttribute("disabled")
    for(const radio of radiosMotor){
        radio.removeAttribute("disabled")
    }
    for(const radio of radiosDoors){
        radio.removeAttribute("disabled")
    }
    //evento para retornar o input Passageiros, type=selector, para o seu estado original, como todos os valores cadastrados
    for(const passenger of allPassenger){
        fieldPassenger.appendChild(passenger)
   }
}

//funão para manipular os elementos que deve ficar habilitados ou desabilitados em casdo do tipo do veículo ser BELICO
const belico=()=>{
    document.querySelector("#id_input-cor-car").value="Verde"
    fieldBlindado.value="Sim"
    fieldBlindado.setAttribute("disabled","disabled")
    //Pecorrer todos elements de type "select" para não ser necessário, em caso de ter no DOM vários elementos idênticos, ter de ficar tratando um por um
    for(const select of selects){
        if(select.id === "id_selecion-passageiro"){
            fieldPassenger.value=""
            fieldPassenger.setAttribute("disabled","disabled")
            //Peccorer todos o input type=radio para virificar se algum está habilitado. Caso tiver, então remove e checked e logo depois(passo 2) desabilita todos
            for(const radio of radiosMotor){
                if(radio.checked){
                    radio.checked=false
                }
                //Passo 2
                radio.setAttribute("disabled","disabled")
            }
            //Peccorer todos o input type=radio para virificar se algum está habilitado. Caso tiver, então remove e checked e logo depois(passo 2) desabilita todos
            for(const radio of radiosDoors){
                if(radio.checked){
                    radio.checked=false
                }
                //Passo 2
                radio.setAttribute("disabled","disabled")
            }
        }  
    } 
}

//funão para manipular os elementos que deve ficar habilitados ou desabilitados em casdo do tipo do veículo ser ESCOLAR
const scholls=function(){
    normalizedFields()
    allPassenger.forEach(el=>{
        if((el.value!=="8") && (el.value!=="15") && (el.value!=="")){
           el.remove()
        }
        })
        for(const radio of radiosDoors){
        if(radio.value!=="2" && radio.value!=="3"){
            radio.checked=false
            radio.setAttribute("disabled","disabled")
        }
    }
}

//funão para manipular os elementos que deve ficar habilitados ou desabilitados em casdo do tipo do veículo ser Ônibus
const bus=()=>{
    normalizedFields()
    fieldPassenger.value="60+"
    fieldPassenger.setAttribute("disabled","disabled")
    for(const radio of radiosDoors){
        if(radio.value!=="2" && radio.value!=="3"){
            radio.setAttribute("disabled","disabled")
        }
    }
}

//Metodo para manipular os elementos do DOM que ficaram ativos ou inativos a depender do veículo selecionado
function validaCampos(veiculo){
    if(veiculo==="Belico"){
        belico()
    //}else if(condicao==="Escolar"){
    }else if(veiculo==="Escolar"){
        scholls()
    }else if(veiculo==="Onibus"){
        bus()
    }else{
        //Filtra capos habilitados e desabilitados a depender do veículo
        normalizedFields()
    }
}

//Evento para captura o tipo do veículo
radioType.forEach(el=>{
    el.addEventListener("click",(evt)=>{
        validaCampos(evt.target.value)
    })
})

//função para capturar qual tipo de veículo
const capchureRadioType=((radio)=> {
    radioType.forEach((el) =>{
        if(el.checked) {
            radio = el.value
        }
    })
    return radio
})

//função para capturar a potência do motor
const capchureRadioMotor=((radio)=> {

    radiosMotor.forEach((el) =>{
        if(el.checked) {
            radio = el.value
        }
    })
    return radio
})

//função para capturar qual a quantidade de portas que o veículo tem
const capchureRadioDoors=((radio)=> {
    radiosDoors.forEach((el) =>{
        if(el.checked) {
            radio = el.value
        }
    })
    return radio
})

//evento para resetar o formlário
btnClear.addEventListener("click",()=>{
    inputsRadio.forEach(el => {
        el.checked=false
    })
    for(const radio of inputsRadio){
        radio.removeAttribute("disabled")
    }

    document.getElementById("id_selecion-passageiro").removeAttribute("disabled")

    inputs.forEach(el => {
        el.value=""
    })
    price.value="0.00"
    selects.forEach(el => {
        el.value=""
    })
})

//evento para gerar lançamentos dos veículos
btnLancar.addEventListener("click",(evt)=>{
    mandatoryFields()  
})

//evento para remover todos lançamentos em um clique
removeAll.addEventListener("click",()=>{
    let=0
    const elemento = document.querySelectorAll(".launchs")
        if(!(datasVeiculo.length-1>=0)){
            //alert("Não existe registros lançado")
        }else{
            //alert("Tem registro, meu chegado")
            while((datasVeiculo.length-1 > -1)){
                datasVeiculo.splice(0,1)
            }
            insertVeiculo()
        }
})

//função para deletar um registro lançado
const deleteCar=(car)=>{
    let i=0
    const elemento = document.querySelectorAll(".launchs")
    elemento.forEach(element => {
        if(element.id == car){
            datasVeiculo.splice(i, 1)
        }
        ++i
    })
}

//função inserir/lançar veículos
function insertVeiculo(){
    registerCars.innerHTML=""
    let i=0
    datasVeiculo.forEach((element) => {
        //criação das divs com os registros dos lançamentos e o respectivo botão "Descartar"
        const datas=document.createElement("div")
        datas.setAttribute("class","launchs") 
        datas.setAttribute("id","car" + (i++)) 
        const btnRemove=document.createElement("button")
        btnRemove.setAttribute("class","button-remove")
        btnRemove.innerHTML="Descartar"
        //fim crição dos objetos
        //evento do botão "Descartar"
        btnRemove.addEventListener("click",(event)=>{
            const elemento=event.target.parentNode.id 
            deleteCar(elemento)
            insertVeiculo()
        })
        //inserção dos dados
        datas.innerHTML=`Tipo: ${element.getTipo()}<br/>`
        datas.innerHTML+=`Modelo: ${element.getModelo()}<br/>`
        datas.innerHTML+=`Fabricante: ${element.getFabricante()}<br/>`
        datas.innerHTML+=`Nº Passageiros: ${element.getPassageiros()}<br/>`
        datas.innerHTML+=`Cor: ${element.getCor()}<br/>`
        datas.innerHTML+=`Motor: ${element.getMotor()}<br/>`
        datas.innerHTML+=`Portas: ${element.getPortas()}<br/>`
        datas.innerHTML+=`Blindado: ${element.getBlindado()}<br/>`
        datas.innerHTML+=`Valor: R$${element.getPreco()}`
        
        datas.appendChild(btnRemove)
        registerCars.appendChild(datas)
    });
}

//função que obriga preeencher campos impressindível
const mandatoryFields=()=>{
   
    //todosInputsText=[...document.querySelectorAll("input[type='text']")]
    let getResult=""
    /*se usar esse método (find) abaixo, então descomente a linha acima "todosInputsText=[...document.querySelectorAll("input[type='text']")]" e comente a linha "inputs.forEach((el)=>{".
    OBS: se usar o método FIND, é preciso fazer um spread "[..." no elmento DOM  a ser pecorrido como é possível notar [...document.querySelectorAll("input[type='text']")], pois o método fin necessita reciar um novo array para então analisar cada elemento que ele irá interar */

   //todosInputsText.find((el)=>{ 
    inputs.forEach((el)=>{
        if(el.value==""){
           getResult= true
        }
    })  

    if(capchureRadioType()===undefined){
        alert("Tipo de veículo não informado")
        insertVeiculo() 
    }else if(capchureRadioType()==="Belico"){
            if(getResult===true){
                alert("Há campos a serem preenchidos")
            }else{
                veiculo = new Belicos(capchureRadioType(),templateCar.value,fabricanteCar.value,colorCar.value,fieldBlindado.value, priceCar.value)
                veiculo.setMotor("*******")
                datasVeiculo.push(veiculo)  
                insertVeiculo() 
            }
    }else if(capchureRadioMotor()===undefined){
            alert("Potência do motor não informado")
    }else if (capchureRadioDoors()===undefined){
            alert("Informe quantas portas terá o veículo")
    }else if(getResult===true){
        alert("Há campos a serem preenchidos")
    }else if(fieldPassenger.value==""){
        alert("Informe um valor para o campo Passageiros ")
    }else if(fieldBlindado.value==""){
        alert("Informe um valor para o campo Blindado ")
    }else{
        if(capchureRadioType()!=="Belico"){
            const veiculo = new Not_Belicos(capchureRadioType(),templateCar.value,fabricanteCar.value,colorCar.value,fieldBlindado.value,
                                        priceCar.value,fieldPassenger.value,capchureRadioMotor(),capchureRadioDoors())
            datasVeiculo.push(veiculo) 
            insertVeiculo()  
        }
    }
         
}


