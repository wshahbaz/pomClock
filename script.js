//initialize containers
let seshUpBtn = document.querySelector("#session-time-up");
let seshDownBtn = document.querySelector("#session-time-down");

let breakUpBtn = document.querySelector("#break-time-up");
let breakDownBtn = document.querySelector("#break-time-down");

let playBtn = document.querySelector("#play");
let pauseBtn = document.querySelector("#pause");
let resetBtn = document.querySelector("#restart");
let stopBtn = document.querySelector("#stop");


//event listeners
seshUpBtn.addEventListener("click", function () { modSeshTime(60)});
seshDownBtn.addEventListener("click", function () { modSeshTime(-60)});

breakUpBtn.addEventListener("click", function () { modBreakTime(60)});
breakDownBtn.addEventListener("click", function () { modBreakTime(-60)});

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
stopBtn.addEventListener("click", stop); 


//variables (all times in seconds)
let seshTime = 1500;
let playTime = seshTime;
let dispTime = seshTime;
let breakTime = 300;

let timerVar = -1;
let breakTimer = -1;

let breakProg = false;


//display containers
const timeDisplay = document.querySelector("#time");
const seshDisplay = document.querySelector("#session-time");
const breakDisplay = document.querySelector("#break-time")

var timeDisp = document.createElement("p");
timeDisp.classList.add("timeDisp");
timeDisp.setAttribute("style", "color: white; font-size: 3.5em;");
timeDisp.textContent = displayTime(dispTime);
timeDisplay.appendChild(timeDisp);

var seshDisp = document.createElement("p");
seshDisp.classList.add("seshDisp");
seshDisp.textContent = (seshTime/60).toString();
seshDisplay.appendChild(seshDisp);

var breakDisp = document.createElement("p");
breakDisp.classList.add("breakDisp");
breakDisp.textContent = (breakTime/60).toString();
breakDisplay.appendChild(breakDisp);


//functions
function modSeshTime(modTime) {
    if (seshTime+modTime > 0)
    {
        seshTime += modTime;
        displaySeshTime();
        timeDisp.textContent = displayTime(seshTime);
    }
}
function displaySeshTime() {
    seshDisp.textContent = (seshTime/60).toString();
}

function modBreakTime(modTime) {
    if (breakTime+modTime > 0) {
        breakTime += modTime;
        displayBreakTime();
    }
}
function displayBreakTime() {
    breakDisp.textContent = (breakTime/60).toString();
}

function displayTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var min = Math.floor(seconds / 60);
    seconds %= 60;
    string = pad(hours) + ":" + pad(min) + ":" + pad(seconds);
    return string;
}

function pad(time)
{
    result = "";
    if (time>10) {
        time = time.toString();
        result = time;
    } else {
        time = time.toString();
        result = "0" + time;
    }
    return time;
}


function play() {
    hideButtons();
    resetBtn.hidden = false;

    startTimer(playTime, timeDisp);
}


function startTimer(duration, display) {
    let timer = duration;
    let minutes=duration;
    let seconds=duration;
    let hours=duration;
    let timePassed = 0;

    timerVar = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer%3600) / 60, 10);
        seconds = parseInt((timer%3600) % 60, 10);
        
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (--timer <= 0) {
            clearInterval(timerVar);
        }
        else if (timePassed / 60 >= 25) {
            startBreakTimer(breakTime, timer);
            breakProg = true;
            timePassed = timePassed - 1;
        } 
        else {
            //account for break
            if (breakProg && timePassed > 0) {
                timer++;
                timePassed = timePassed - 1;
            } else {
                display.textContent = hours + ":" + minutes + ":" + seconds;
                timePassed = timePassed + 1;
                breakProg = false;
            }
        }

        playTime = timer;

    }, 1000);

    if (timer <= 0) {
        showButtons();
    }
}

function startBreakTimer(time) {

    timeDisp.textContent = "BREAK";

    setTimeout(function() {}, 1000*time);
}

function hideButtons() {
    seshUpBtn.hidden = true;
    seshDownBtn.hidden = true;

    breakUpBtn.hidden = true;
    breakDownBtn.hidden = true;

    playBtn.hidden = true;
}

function showButtons() {
    seshUpBtn.hidden = false;
    seshDownBtn.hidden = false;

    breakUpBtn.hidden = false;
    breakDownBtn.hidden = false;

    resetBtn.hidden = false;

    playBtn.hidden = false;
}


function reset() {
    clearInterval(timerVar);
    startTimer(seshTime, timeDisp);
}

function stop() {
    clearInterval(timerVar);
    showButtons();
} 

function pause() {
    clearInterval(timerVar);
    showValidButtons();
}

function showValidButtons() {
    hideButtons();

    resetBtn.hidden = true;
    playBtn.hidden = false;
}