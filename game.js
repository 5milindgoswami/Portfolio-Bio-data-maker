const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole")
const timerDisplay = document.querySelector(".time-left");
const timeUpDisplay = document.querySelector(".time-up");
let lastHole;
let timeUp = false;
let score = 0;
let countdown;

function randomTime(min,max){
    return Math.round(Math.random() * (max-min) + min);
}

function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        console.log("ah nah thats the same one bud");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up");
        if(!timeUp) peep();
    }, time);
}

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    timerDisplay.textContent = 10;
    timeUpDisplay.style.display = "none";
    peep();
    countdown = 10;
    const timer = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(timer);
            timeUp = true;
            timeUpDisplay.style.display = "block";
        }
    }, 1000);
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove("up");
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk))