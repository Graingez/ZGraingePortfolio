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



// HEADER BACKGROUND
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // radius: (canvas.height / 90) * (canvas.width / 90)
    makeDots();
});
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 90) * (canvas.width / 90)
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

        // un comment to activat mouse collision
        // window.addEventListener('click', () => {
        //     let detectX = mouse.x - this.x;
        //     let detectY = mouse.y - this.y;
        //     let distance = Math.sqrt((detectX * detectX) + (detectY * detectY));
        //     if (distance < mouse.radius + this.size) {
        //         if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        //             this.x += 10;
        //         }
        //         if (mouse.x > this.x && this.x > this.size * 10) {
        //             this.x -= 10;
        //         }
        //         if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        //             this.y += 10;
        //         }
        //         if (mouse.y > this.y && this.y > this.size * 10) {
        //             this.y -= 10;
        //         }
        //     }

        // })
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}
function makeDots() {
    dotsArray = [];
    // let numberOfDots = (canvas.width * canvas.height) / 25000;
    let numberOfDots = 10;
    for (let i = 0; i < numberOfDots; i++) {
        // let size = Math.floor(Math.random() * 5) + 1;
        let size = 3;
        let x = (Math.random() * (innerWidth - size * 2));
        let y = (Math.random() * (innerHeight - size * 2));
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
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
            if (distance < (canvas.width / 1.5) * (canvas.height / 1.5)) {
                lineOpacity = 1
                context.strokeStyle = 'rgb(252, 252, 252, ' + lineOpacity + ')';
                context.lineWidth = 1;
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


// projects slide in
const projectBox = document.querySelectorAll('.projectBox')

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
function scrollIn(e) {
    projectBox.forEach(project => {
        const scrollInAt = (window.scrollY + window.innerHeight) - project.height / 2;
        const projectBottom = projectBox.offsetTop + projectBox.height;
        const showProject = scrollInAt > projectBox.offsetTop;
        const scrollToFar = window.scrollY < projectBottom
        if (showProject && scrollToFar) {
            projectBox.classList.add('active')
        } else {
            project.classList.remove('active')
        }
    })
};
window.addEventListener('scroll', debounce(scrollIn));