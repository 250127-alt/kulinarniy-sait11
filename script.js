
// Кнопка прокрутки вверх
const topButton = document.createElement("button");

topButton.id = "scrollToTopButton";
topButton.textContent = "↑";
document.body.appendChild(topButton);

topButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

window.onscroll = function() {
    topButton.style.display =
        window.scrollY > 200 ? "block" : "none";
};

// Создаём Canvas
const canvas = document.createElement("canvas");
canvas.id = "snowfall";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// Снежинки
let snowflakes = [];

for (let i = 0; i < 150; i++) {
    snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 1
    });
}

// Капли дождя
let rain = [];

for (let i = 0; i < 100; i++) {
    rain.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 6 + 4,
        length: Math.random() * 15 + 10
    });
}

// Рисуем снег
function drawSnow() {
    ctx.fillStyle = "#dff6ff";

    snowflakes.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;

        if (s.y > height) {
            s.y = -10;
            s.x = Math.random() * width;
        }
    });
}

// Рисуем дождь
function drawRain() {
    ctx.strokeStyle = "rgba(30, 120, 255, 0.7)";
    ctx.lineWidth = 2;

    rain.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - 3, r.y + r.length);
        ctx.stroke();

        r.y += r.speed;

        if (r.y > height) {
            r.y = -20;
            r.x = Math.random() * width;
        }
    });
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, width, height);

    drawSnow();
    drawRain();

    requestAnimationFrame(animate);
}

animate();

// Изменение размера окна
window.addEventListener("resize", function() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
});

// Стиль кнопки
topButton.style.cssText = `
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background: #ff7043;
    color: white;
    font-size: 25px;
    cursor: pointer;
    z-index: 10001;
`;
