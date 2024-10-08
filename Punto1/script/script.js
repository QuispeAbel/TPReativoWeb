let numrandom ;
var intento = 0;
var numeroingresado;

setRandom();
setEstadisticas();
//envia el numero ingresado
document.getElementById('miFormulario').addEventListener('submit', function(event) {
    
    event.preventDefault(); // Evita el envío tradicional del formulario
    numeroingresado = document.getElementById('ingresoNumero').value;
    aumentoIntentos();
    intentoAnterior();
    if(numeroingresado < numrandom){
        alert('Random: ' + numrandom + ' El numero ingresado es menor');
    }else if(numeroingresado > numrandom){
        alert('Random: ' + numrandom + ' El numero ingresado es mayor');
    }else{
        sumarPTerminada();
        guardarMejorPuntaje();
        promediar();
        alert("ganaste");
        location.reload();
    }
});

//reinicia los campos correspondientes
document.getElementById('miFormulario').addEventListener('reset', function(event) {
    
    event.preventDefault(); // Evita el envío tradicional del formulario
    resetIntentos();
    setRandom();
});

//setea el numero random
function setRandom(){
    numrandom = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
}

//aumenta en 1 cada que se intenta
function aumentoIntentos(){
    intento++;
    const elementoIntentos = document.getElementById("intentos");
    elementoIntentos.textContent = intento;
}

//deja los intentos en 0
function resetIntentos(){
    intento = 0;
    const elementoIntentos = document.getElementById("intentos");
    elementoIntentos.textContent = intento;
}

//setea el numero ingresado anteriormente
function intentoAnterior(){
    if(numeroingresado !== ""){
    const elementoIntAnterior = document.getElementById("anterior");
    elementoIntAnterior.textContent = numeroingresado;
    }
}

//setea 
function setEstadisticas(){

    //setea el mejor puntaje para que cuando cargue la pagina lo tome de localstroage
    if(!localStorage.getItem("mejorpuntaje")){
        localStorage.setItem("mejorpuntaje",99999);
    }
    const elementoMPuntaje = document.getElementById("mejorIntento");
    if(localStorage.getItem("mejorpuntaje") != 99999){
        elementoMPuntaje.textContent = localStorage.getItem("mejorpuntaje");
    }

    //setea partidas terminadas
    if(!localStorage.getItem("partidasTerminadas")){
        localStorage.setItem("partidasTerminadas",0);
    }
    const elementoPTerminadas = document.getElementById("partidas");
    elementoPTerminadas.textContent = localStorage.getItem("partidasTerminadas");

    //setea promedio
    if(!localStorage.getItem("promedio")){
        localStorage.setItem("promedio",0);
    }
    const elementoPromedios = document.getElementById("promedios");
    elementoPromedios.textContent = localStorage.getItem("promedio");
}

//suma por 1 a la cantidad de partidas del localstorage
function sumarPTerminada(){
    localStorage.setItem("partidasTerminadas", parseInt(localStorage.getItem("partidasTerminadas")) + 1);
}

function promediar(){
    if(parseInt(localStorage.getItem("promedio")) != 0){
        localStorage.setItem("promedio", (parseInt(localStorage.getItem("promedio")) + intento)/2);
    }else{
        localStorage.setItem("promedio",intento);
    }
}

//guarda el puntaje al ganar
function guardarMejorPuntaje(){
    if(intento < localStorage.getItem("mejorpuntaje")){
        localStorage.setItem("mejorpuntaje",intento);
    }
}