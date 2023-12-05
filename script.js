const menuButton = document.querySelector('.menuButton');
const listMenu = document.querySelector('.listMenu')
const skillItem = document.querySelectorAll('.skillItem');
const skillName = document.querySelectorAll('.skillName')

menuButton.addEventListener('click', function (e) {
    console.log(e);
    if (e.target.localName === 'i') {
        e.target.classList.toggle('fa-bars')
        e.target.classList.toggle('fa-xmark')
    }
})
menuButton.addEventListener('click', function () {
    if (listMenu.classList.contains('showListMenu')) {
        listMenu.classList.remove('showListMenu');

    } else {
        listMenu.classList.add('showListMenu');
    }

})
// const navbar = document.querySelector('.nav');
// const navLink = document.querySelectorAll('.navLink');
// // ********** fixed navbar ************
// window.addEventListener('scroll', function () {
//     const scrollHeight = window.pageYOffset;
//     const navHeight = navbar.getBoundingClientRect().height;
//     if (scrollHeight > navHeight) {
//         navbar.classList.add('fixedNav');
//         navLink.style.color = '$secondaryColor';
//     } else {
//         navbar.classList.remove('fixedNav');
//     }
// })
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
        context.fillStyle = "#C4B2BC";
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
    let numberOfDots = 15;
    for (let i = 0; i < numberOfDots; i++) {
        let size = (Math.random() * (2, 5));
        let x = (Math.random() * (innerWidth - size * 2));
        let y = (Math.random() * (innerHeight - size * 2));
        let directionX = (Math.random() * 2);
        let directionY = (Math.random() * 2);
        let color = "#C4B2BC";

        dotsArray.push(new connectorDots(x, y, directionX, directionY, size, color));
    }
}

function dotJoin() {
    let lineOpacity = 1;
    for (let a = 0; a < dotsArray.length; a++) {
        for (let b = a; b < dotsArray.length; b++) {
            let distance = ((dotsArray[a].x - dotsArray[b].x) * (dotsArray[a].x - dotsArray[b].x)) +
                ((dotsArray[a].y - dotsArray[b].y) * (dotsArray[a].y - dotsArray[b].y));
            if (distance < (canvas.width / 500) * (canvas.height / 500)) {
                lineOpacity = 0
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
// about shapes
const blobs = document.querySelectorAll(".blob");
let start = 0;
let changeSpeed = randomSpeed();
let returnanimationFrame;

function bringBlob(set) {
    if (!start || set - start >= changeSpeed) {
        start = set;
        blobs.forEach(blob => {
            blob.style.borderTopLeftRadius = `${random() + 20}px ${random() + 20}px`;
            blob.style.borderTopRightRadius = `${random() + 20}px ${random() + 20}px`;
            blob.style.borderBottomLeftRadius = `${random() + 20}px ${random() + 20}px`;
            blob.style.borderBottomRightRadius = `${random() + 20}px ${random() + 20}px`;
        });
    }
    returnanimationFrame = requestAnimationFrame(bringBlob);
}

const random = () => {
    return Math.floor((Math.random() * 360));
};
function randomSpeed() {
    return Math.floor((Math.random() * 130) + 370)
}

bringBlob(start);




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