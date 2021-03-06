var container = document.getElementById("matrix-container");

const greenColor = "#292";
const startingPointColor = "#CFC";
const height = 60; // row size
const width = 50; // column size
const randomiseSpeed = 80; // how much char replaced at a time
const startPointStreamSpeedMin = 0.1; // rain min speed
const startPointStreamSpeedMax = 80; // rain max speed
const tailColors = ["#9D9", "#7C7", "#5A5", "#3A3","#1A1"]; 
let letterArray = []; // [{color:"", "letter"}]
let startPoint = []; // head of each line(tail)
let startPointSpeeds = []; // head changing speed
let blackAreaSizes = [];


// at start, fill all the letters with green color and random unicode char (will be invoke once)
function fillLineArray(){
    letterArray = [];
    for(let i=0; i<width; i++){
        letterArray.push([]);
        for(let j=0; j<height; j++)
        letterArray[i].push({
            color: greenColor,
            letter: getRandomUnicode()
        });
    }
}
fillLineArray();


setInterval(() => {
    randomizeLetters();
    renderLineArray();
    shiftStartingPointLetter();
}, 100);


createStreamStartPoint();
createBlackAreaSizes();

function shiftStartingPointLetter(){
    for(let i=0; i<startPoint.length; i++){
        startPoint[i] += ((startPoint[i] + startPointSpeeds[i]) / 100) % height;
        
        for(let j=0; j<blackAreaSizes[i]; j++){
            letterArray[(i) % width][Math.ceil(startPoint[i]+j) % height].color = "#111";
        }
        letterArray[i][Math.ceil(startPoint[i]) % height].color = startingPointColor;
        try{
            for(let j=5; j>0; j--){
                letterArray[i][(Math.ceil(startPoint[i]) - j) % height].color = tailColors[j-1];
            }
            letterArray[i][(Math.ceil(startPoint[i]) - 6) % height].color = greenColor;
        }catch(e){}

        startPoint[i] = startPoint[i] % height;
    }
}

function createBlackAreaSizes(){
    blackAreaSizes = [];
    for(let i=0; i<height; i++){
        blackAreaSizes.push(Math.ceil(Math.random() * height/3*2));
    }
}

function createStreamStartPoint(){
    startPoint = [];
    for(let i=0; i<width; i++){
        startPoint[i] = Math.random() * height % height - 1; // index of random vertical line
        startPointSpeeds.push(Math.random() * (startPointStreamSpeedMax - startPointStreamSpeedMin) + startPointStreamSpeedMin);
        letterArray[i][Math.ceil(startPoint[i])].color = startingPointColor;
    }
}

function renderLineArray(){
    container.innerHTML = "";
    for(let i=0; i<width; i++){
        let elem = document.createElement("div");
        elem.id = "line-" + i+1;
        elem.classList.add("matrix-line");
        container.append(elem);

        for(let j=0; j<height; j++){
            let elemLetter = document.createElement("span");
            elemLetter.classList.add("letter");
            elemLetter.id = "letter-" + (i + 1)  + "x" + j;
            elemLetter.innerHTML = letterArray[i][j].letter;
            elemLetter.style.color = letterArray[i][j].color;
            elem.append(elemLetter);
        }
    }
}

function randomizeLetters(){
    for(let i=0; i<randomiseSpeed; i++){
        letterArray[Math.ceil(Math.random()*width) % width][Math.ceil(Math.random()*height)%height].letter = getRandomUnicode();
    }
}

function getRandomUnicode(){
    return String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1));
}

