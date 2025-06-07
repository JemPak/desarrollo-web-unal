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
