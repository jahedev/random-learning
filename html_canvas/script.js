const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;
const particlesArray = [];
var lastCalledTime;
var fps;
var averageFPS = 0;
var counter = 0;
var fpsArray = [];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('click', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 30; i++) particlesArray.push(new Particle());
});

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 1; i++) particlesArray.push(new Particle());
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 12 + 5; // 1 to 6
    this.speedX = Math.random() * 3 - 1.5; // -1.5 to 1.5
    this.speedY = Math.random() * 3 - 1.5; // -1.5 to 1.5
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.12;
  }

  draw() {
    ctx.fillStyle = this.color;
    // ctx.strokeStyle = `hsl(hue + ${(Math.random() * 360) / 2}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
  }
}

function init() {
  // for (let i = 0; i < 100; i++) {
  //   particlesArray.push(new Particle());
  // }
}
init();

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // for (let j = i; j < particlesArray.length; j++) {
    //   const dx = particlesArray[i].x - particlesArray[j].x;
    //   const dy = particlesArray[i].y - particlesArray[j].y;
    //   const distance = Math.sqrt(dx * dx + dy * dy);

    //   if (distance < 100) {
    //     ctx.beginPath();
    //     ctx.strokeStyle = particlesArray[i].color;
    //     ctx.lineWidth = particlesArray[i].size;
    //     ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
    //     ctx.moveTo(particlesArray[j].x, particlesArray[j].y);
    //     ctx.stroke();
    //   }
    // }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i -= 1;
    }
  }
}

function showFPS() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Courier';
  ctx.fillText(averageFPS + ' FPS', 10, 30);
}

function calcFPS() {
  if (!lastCalledTime) {
    lastCalledTime = Date.now();
    fps = 0;
  }
  delta = (Date.now() - lastCalledTime) / 1000;
  lastCalledTime = Date.now();
  fps = Math.ceil(1 / delta);

  if (counter >= 60) {
    var sum = fpsArray.reduce(function (a, b) {
      return a + b;
    });
    averageFPS = Math.ceil(sum / fpsArray.length);
    counter = 0;
  } else {
    if (fps !== Infinity) {
      fpsArray.push(fps);
    }

    counter++;
  }
}

function clearScreen() {
  // ctx.fillStyle = 'rgba(0,0,0,0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  clearScreen();
  handleParticles();
  showFPS();

  hue += 0.5;

  window.requestAnimationFrame(() => {
    calcFPS();
    animate();
  });
}

animate();
