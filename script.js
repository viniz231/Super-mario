const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const pointsElement = document.getElementById('points');
const message = document.getElementById('message');
const btnNao = document.getElementById('btnNao');

let count = 0;
let isGameOver = false;

const jump = () => {
    if (isGameOver) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    if (isGameOver) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const marioWidth = mario.offsetWidth;

    // Colisão ajustada para ser justa em qualquer tela
    if (pipePosition <= (marioWidth * 0.8) && pipePosition > 0 && marioPosition < 60) {
        count = 0; 
        pointsElement.innerHTML = count;
        
        // Reset visual do cano para dar feedback que "bateu"
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        setTimeout(() => {
            pipe.style.animation = 'pipe-animation 1.5s infinite linear';
            pipe.style.left = '';
        }, 100);
    } 
    else if (pipePosition < 0 && !pipe.dataset.counted) {
        count++;
        pointsElement.innerHTML = count;
        pipe.dataset.counted = "true";
        
        if (count >= 5) { victory(); }
    }

    if (pipePosition > 150) { pipe.dataset.counted = ""; }

}, 10);

function victory() {
    isGameOver = true;
    pipe.style.display = 'none';
    mario.style.display = 'none';
    message.classList.remove('hidden');
}

// Botão foge no PC (Mouse)
btnNao.addEventListener('mouseover', fugir);

// Botão foge no Telemóvel (Toque)
btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();
    fugir();
});

function fugir() {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    btnNao.style.position = 'fixed';
    btnNao.style.left = `${x}px`;
    btnNao.style.top = `${y}px`;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') jump();
});
document.addEventListener('touchstart', jump);