// -sequence of both which are going to be compared
let userSeq = [];
let gameSeq = [];

// -all the buttons availiable.
let btns = ["green","yellow","red","blue"];

// -variables for starting game and increasing levels and displaying text
let gameStarted = false;
let level = 0;
let h2 = document.querySelector("h2");
let highScore = 0;                           // --> me
let userScore = 0;                          // --> me
let body = document.querySelector("body"); // --> me


let heading2 = document.createElement("h2");


// -game getting started and the next step afterwards
document.addEventListener("keypress",function(){
    if(gameStarted == false){
        console.log("game started!");
        gameStarted = true;

        // -Now level up and start
        levelUp();
    }
    
})

// -flashing btn for the game
function flashGame(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}


function flashUser(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },250);
}


function checkAns(idx){
    // console.log("curr Level:", level);

    // this is litral beauty with all the functions switching on eachother
    // then at the end of the day. will depend upon user's next step
    // to initate another series of action.

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
            userScore = level*10;                  //--> me
        }
    }else{
        if(userScore> highScore){
            h2.innerText = `Game Over! congo!! New High Score: ${userScore} \npress any 'key' to start.`
            highScore = userScore;
            // initiated reset which is defined in the end there
            heading2.innerHTML = `<b> High Score : ${highScore} </b>`
            h2.insertAdjacentElement("beforebegin",heading2)
            reset(); 
        }else{
            h2.innerText = `Game Over! your score was: ${userScore} \npress any 'key' to start.`

            // initiated reset which is defined in the end there
            // h2.insertAdjacentElement("beforebegin",heading2);
            reset(); 
        }
    }
}


function levelUp(){
    // -resetting userSeq to an empty array. now user will have to guess from the beginning.
    userSeq = []     

    level++;
    h2.innerText = `Level ${level}`

    // -index to access colors for levels
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // -now putting that button for it to flash
    flashGame(randBtn);

    // -for addition info of confirmation you can see forj yourself 
    // -by printing all the variables created in this function.

    // -adding colors which were flashed by the computer in an array
    gameSeq.push(randColor);

    // console.log(gameSeq);
}


function btnPress(){
    let btn = this;
    flashUser(btn);
    // console.log(btn);

    // -kyuki 2 classes bhi thi I suppose
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    // console.log(userSeq);
    checkAns(userSeq.length- 1);
}

let allBtn = document.querySelectorAll(".btn");

for (btn of allBtn){

    // - that this in line 64ish is being used here
    btn.addEventListener("click",btnPress);
}

// back to line 17!
function reset(){
    gameStarted = false;
    gameSeq =[];
    userSeq =[];
    level =0;

    userScore = 0;  //--> me

    redBg();
    setTimeout(()=>{
        body.classList.remove("bgFlash");
    }, 250)  //--> for red background color behind
}

function redBg(){
    body.classList.add("bgFlash");
}

// The question then arrives 
// That can I make i entire list of colors that 
// computer has chose re-flash. in that order?
// I think so. Will take a loop.

// And making tools to optimize my life with this skill.