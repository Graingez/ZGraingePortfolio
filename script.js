const menuButton = document.querySelector('.menuButton');
const popUpMenu = document.querySelector('.popUpMenu');
const skillItem = document.querySelectorAll('.skillItem');
const skillName = document.querySelectorAll('.skillName')
menuButton.addEventListener('click', () => {
    if (popUpMenu.style.display === 'block') {
        popUpMenu.style.display = 'none'
    } else {
        popUpMenu.style.display = 'block'
    }
});
// menuButton.addEventListener('click', function (e) {
//     console.log(e);
//     if (e.target.localName === 'i') {
//         e.target.classList.toggle('fa-bars')
//         e.target.classList.toggle('fa-xmark')
//     }
// })

popUpMenu.addEventListener('click', () => {
    if (popUpMenu.style.display === 'block') {
        popUpMenu.style.display = 'none';
    }
});
// HEADER BACKGROUND
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    makeDots();
});
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})

let mouse = {
    x: null,
    y: null,
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
class connectorDots {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX
        this.directionY = directionY
        this.size = size;
        this.color = color;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = '#FCFCFC';
        context.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}
function makeDots() {
    dotsArray = [];
    let numberOfDots = 8;
    for (let i = 0; i < numberOfDots; i++) {
        let size = 0;
        let x = (Math.random() * (innerWidth - size * 2));
        let y = (Math.random() * (innerHeight - size * 2));
        let directionX = (Math.random() * 2);
        let directionY = (Math.random() * 2);
        let color = '#FCFCFC'

        dotsArray.push(new connectorDots(x, y, directionX, directionY, size, color));
    }
}

function dotJoin() {
    let lineOpacity = 1;
    for (let a = 0; a < dotsArray.length; a++) {
        for (let b = a; b < dotsArray.length; b++) {
            let distance = ((dotsArray[a].x - dotsArray[b].x) * (dotsArray[a].x - dotsArray[b].x)) +
                ((dotsArray[a].y - dotsArray[b].y) * (dotsArray[a].y - dotsArray[b].y));
            if (distance < (canvas.width / 1) * (canvas.height / 1)) {
                lineOpacity = 1
                context.strokeStyle = 'rgba(2, 17, 27, 1)';
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(dotsArray[a].x, dotsArray[a].y);
                context.lineTo(dotsArray[b].x, dotsArray[b].y);
                context.stroke();
            }
        }
    }
}

function moveDots() {
    requestAnimationFrame(moveDots);
    context.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].update();
    }
    dotJoin();
}

makeDots();
moveDots();
// HEADER BACKGROUND END


// skills slide in


function scrollIn() {
    let skillScroll = document.querySelectorAll(".scrollIn");

    for (let i = 0; i < skillScroll.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = skillScroll[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            skillScroll[i].classList.add("active");
        } else {
            skillScroll[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", scrollIn);

function scrollInLeft() {
    let skillScroll = document.querySelectorAll(".scrollInLeft");

    for (let i = 0; i < skillScroll.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = skillScroll[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            skillScroll[i].classList.add("active");
        } else {
            skillScroll[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", scrollInLeft);

function scrollInRight() {
    let skillScroll = document.querySelectorAll(".scrollInRight");

    for (let i = 0; i < skillScroll.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = skillScroll[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            skillScroll[i].classList.add("active");
        } else {
            skillScroll[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", scrollInRight);

// contact SECTION