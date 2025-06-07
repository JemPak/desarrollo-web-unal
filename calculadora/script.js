const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

//Tú código va acá
//hint: Busca sobre la función eval
let operacionActual = "";
let reiniciarPantalla = false;

// listener del botón
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;
        
        if (reiniciarPantalla && !esOperador(valor) && valor !== "C") {
            limpiarPantalla();
            reiniciarPantalla = false;
        }
        
        switch(valor) { // ver el botón
            case 'C':
                limpiarPantalla();
                break;
            case '←':
                borrarUltimo();
                break;
            case '=':
                calcular();
                break;
            default:
                agregarAPantalla(valor);
        }
    });
});

function agregarAPantalla(valor) {
    const pantallaTexto = pantalla.textContent;
    
    // Lanzar el error al usuario
    if (pantallaTexto === "0" || pantallaTexto === "Error") {
        pantalla.textContent = valor;
    } else {
        // En caso de punto decimal
        if (valor === ".") {
            const ultimoOperador = Math.max(
                pantallaTexto.lastIndexOf('+'),
                pantallaTexto.lastIndexOf('-'),
                pantallaTexto.lastIndexOf('*'),
                pantallaTexto.lastIndexOf('/')
            );
            
            const numeroActual = pantallaTexto.substring(ultimoOperador + 1);
            
            if (numeroActual.includes(".")) {
                return;
            }
        }
        pantalla.textContent += valor;
    }
    
    operacionActual = pantalla.textContent;
}

function limpiarPantalla() {
    pantalla.textContent = "0";
    operacionActual = "";
    reiniciarPantalla = false;
}

function borrarUltimo() {
    let textoActual = pantalla.textContent;
    
    if (textoActual.length > 1) {
        pantalla.textContent = textoActual.slice(0, -1);
        operacionActual = pantalla.textContent;
    } else {
        pantalla.textContent = "0";
        operacionActual = "";
    }
}

function calcular() {
    try {
        const expresion = pantalla.textContent;
        
        if (!expresion || expresion === "0") {
            return;
        }
        
        // Validar que la expresión este completa
        if (esOperador(expresion.slice(-1))) {
            pantalla.textContent = "Error";
            return;
        }
        
        // Usar eval para caracteres especiales
        const expresionLimpia = expresion.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Evaluar la expresión
        let resultado = eval(expresionLimpia);
        
        // para devision por 0
        if (!isFinite(resultado)) {
            pantalla.textContent = "Error";
            return;
        }
        
        // Redondeo en caso de ser necesario
        resultado = Math.round(resultado * 100000000) / 100000000;
        
        pantalla.textContent = resultado.toString();
        operacionActual = resultado.toString();
        reiniciarPantalla = true;
        
    } catch (error) {
        pantalla.textContent = "Error";
        reiniciarPantalla = true;
    }
}

function esOperador(valor) {
    return ['+', '-', '*', '/', '×', '÷'].includes(valor);
}

// Función adicional para mejorar la experiencia del usuario
function validarExpresion(expresion) {
    // Evitar operadores consecutivos
    const operadores = /[\+\-\*\/]{2,}/;
    return !operadores.test(expresion);
}