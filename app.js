let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "pink", "green", "purple"];   //random no ---> 0 to 3 index

let started = false;
let level = 0;
let highestScore = localStorage.getItem('highestScore') || 0;

document.getElementById('highest').textContent = highestScore;

function updateHighestScore(){
    if(level>highestScore){
        highestScore = level;
        localStorage.setItem('highestScore', highestScore);
        document.getElementById('highest').textContent = highestScore;
    }
}

let h2 = document.querySelector ('h2');

document.addEventListener ("keypress", function(){
    if (started == false){
        console.log ("Game Started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector (`.${randColor}`);
    // console.log (randIdx);
    // console.log (randColor);
    // console.log (randBtn);
    gameSeq.push (randColor);
    console.log (gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){

    if (gameSeq[idx] === userSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout (levelUp, 1000);
        }
    }else{
        updateHighestScore()
        h2.innerHTML =  `Game Over! Your score was <b>${level}<b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        }, 150);
        console.log("Current Level:", level);
        console.log("Current Highest Score:", highestScore);
        console.log("Stored Highest Score:", localStorage.getItem('highestScore'));
        reset();
        
    }
}

function btnPress(){
    // console.log (this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push (userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll (".btn")
for (btn of allBtns){
    btn.addEventListener ("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
