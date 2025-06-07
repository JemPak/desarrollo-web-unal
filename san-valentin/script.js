const message = document.querySelector('#message');
const buttons = document.querySelector('#buttons');
const noBtn = document.querySelector('.no');
const yesBtn = document.querySelector('.yes');

noBtn.addEventListener('click', () => {
    // Obtener dimensiones
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // dimensiones del botón
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    const maxLeft = windowWidth - btnWidth - 20; // 20px de margen
    const maxTop = windowHeight - btnHeight - 20; 
    
    // Generar posiciones aleatorias
    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;
    
    // Aplicar las nuevas posiciones
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
});

yesBtn.addEventListener('click', () => {
    message.innerHTML = 'TE AMO MIBIDA';
    buttons.style.display = 'none';
});