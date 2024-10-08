function setRandom(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para agregar un número al JSON
function agregarNumero(json, nuevoNumero) {
    json.numeros.push({ "numero": nuevoNumero });
}

let numrandom;
let max;
let min;
let jsonData;

// Cargar el archivo JSON
$.ajax({
    type: "GET",
    url: "http://localhost/tpAjax/Punto2/backend/json.json",
    dataType: "json",
    success: function(data) {
        jsonData = data;
        console.log('JSON cargado:', jsonData);
    },
    error: function(xhr, status, error) {
        alert("Error al leer el archivo JSON: " + error);
    }
});

document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    max = parseInt(document.getElementById('maximo').value);
    min = parseInt(document.getElementById('minimo').value);
    
    const elementoResultado = document.getElementById('resultado');
    
    if (isNaN(max) || isNaN(min)) {
        elementoResultado.textContent = "Debe ingresar un número válido";
    } else if (max <= min) {
        elementoResultado.textContent = "El máximo debe ser mayor que el mínimo";
    } else if (jsonData.numeros.length === (max - min + 2)) {
        alert("Se han generado todos los números posibles");
    } else {
        // Desactivar los inputs
        document.getElementById("maximo").disabled = true;
        document.getElementById('minimo').disabled = true;

        let numeroGenerado = false;

        // Buscar un número único
        do {
            numrandom = setRandom(max, min);

            let existe = jsonData.numeros.some(element => element.numero === numrandom);
            if (!existe) {
                numeroGenerado = true;
            } else {
                // Si el número existe, intentamos generar el siguiente disponible
                while (existe && numrandom <= max) {
                    numrandom++; // Incrementamos al siguiente número
                    existe = jsonData.numeros.some(element => element.numero === numrandom);
                }

                // Si se llegó al máximo y sigue existiendo, reinicia desde el mínimo
                if (numrandom > max) {
                    numrandom = setRandom(max, min); // Intentar otro número
                }
            }

        } while (!numeroGenerado);

        // Agregar el número al JSON y mostrarlo en la página
        agregarNumero(jsonData, numrandom);
        elementoResultado.textContent = numrandom;
        console.log(jsonData);
    }
});

document.getElementById('miFormulario').addEventListener('reset', function(event){
    location.reload();
});
