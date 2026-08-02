let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("header").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${`"` + gameName +`"`} Game Created By Arfaoui Hachem`;

//Setting game options

let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let nbrofhints = 2;


let Wordguess = ""
const words = ["Hachem","Alahly","Samira","Tozeur","Tounsi","Garden","miboun"];

Wordguess = words[Math.floor(Math.random()* words.length)].toLowerCase();

let msgarea = document.querySelector(".message");
function generateInput(){
    const inputsContainer = document.querySelector(".inputs");
    //Create Main Try
    for(i=1;i<=numbersOfTries;i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try- ${i}</span>`;

        if( i !== 1) {
            tryDiv.classList.add("disable-inputs");
        }

        
        //create Inputes
        for(let j =1;j<=numbersOfLetters;j++){
            const input = document.createElement("input");
            input.type ="text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);

        }
        inputsContainer.appendChild(tryDiv);
    }
    //Disable All Inputes Except First Input
    inputsContainer.children[0].children[1].focus();
    const inputsindisablediv = document.querySelectorAll(".disable-inputs input");

    inputsindisablediv.forEach(function(input){
    input.disabled=true;

})
//Convert Letters To UperrCase Letters
const inputs = document.querySelectorAll("input");
inputs.forEach((input,index) => {
    input.addEventListener("input",function(){
        this.value = this.value.toUpperCase();
        //Go To The Next Input
        const nextinput = inputs[index + 1];
        if (nextinput) nextinput.focus();
        input.addEventListener("keydown",function(event){
            console.log(event);
            const currentindex = Array.from(inputs).indexOf(event.target);
            
            if(event.key === "ArrowRight"){
                const nextinput = currentindex + 1;
                if (nextinput < inputs.length) inputs[nextinput].focus();
            }
            if(event.key === "ArrowLeft"){
                const previousindex = currentindex - 1;
                if (previousindex >= 0) inputs[previousindex].focus();
            }
        })
    });
});

}

const guessbtn = document.querySelector(".check");
guessbtn.addEventListener("click",handleguesses);

console.log(Wordguess);
function handleguesses(){
   let success =true;
   for(let i=1 ; i <= numbersOfLetters; i++){
    const inputfield = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputfield.value.toLowerCase();
    const actualword = Wordguess[i-1];
    //Game Logic
    if(  letter === actualword){
        inputfield.classList.add("yes-in-place");
        
    }
    else if(Wordguess.includes(letter) && letter !== ""){
        inputfield.classList.add("not-in-place");
        success =false;
    }
    else{
        inputfield.classList.add("no");
        success =false;

    }
   }
   // Check If user win or Lose
   if(success){

    msgarea.innerHTML = `Congrats You Win After ${currentTry} Try ,The word Is <span> ${Wordguess}</span>`;
//Add Disabled Class In All Divs
    const allinputs = document.querySelectorAll(".inputs > div");
    allinputs.forEach((tryDiv)=> tryDiv.classList.add("disable-inputs"));

    //Disable Button

   /* const btndisabel = document.querySelectora("button");
    btndisabel.style.pointerEvents= "none";
    btndisabel.style.opacity= "0.4";*/
    guessbtn.disabled= true;
    hintbtn.disabled = true;

   }else {
    document.querySelector(`.try-${currentTry}`).classList.add("disable-inputs");
    const currenttryinputs = document.querySelectorAll(`.try-${currentTry} input`);
    currenttryinputs.forEach((input)=> (input.disabled = true));
    currentTry++;
    const nexttryinputs = document.querySelectorAll(`.try-${currentTry} input`);
    nexttryinputs.forEach((input)=> (input.disabled = false));
    
    
    const el =document.querySelector(`.try-${currentTry}`);
    if(el){
        document.querySelector(`.try-${currentTry}`).classList.remove("disable-inputs");
        document.querySelector(`.try-${currentTry}`).children[1].focus();
    }
    else if(currentTry <= numbersOfTries) {
        msgarea.innerHTML="Try Again";
    }
    else{
        msgarea.innerHTML=`You Lose the word is ${Wordguess}`;
        guessbtn.innerHTML="Game Over";
        guessbtn.disabled = true;
        hintbtn.disabled = true;
    }}
   }

//manage Hints 
document.querySelectorAll(".hint span").innerHTML = nbrofhints;
const hintbtn = document.querySelector(".hint");
hintbtn.addEventListener("click",gethint);


function gethint(){
    if(nbrofhints >0 ){
        nbrofhints--;
        document.querySelector(".hint span").innerHTML = nbrofhints;
    }
    if(nbrofhints ===0 ){
        hintbtn.innerHTML ="Hints";
        hintbtn.disabled = true;
    }
    const enabledinputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnablesinputs = Array.from(enabledinputs).filter((input)=> input.value ==="");

    if(emptyEnablesinputs.length > 0){
       const randomindex = Math.floor(Math.random() * emptyEnablesinputs.length) ;
       const randinput = emptyEnablesinputs[randomindex];
       const indextofill = Array.from(enabledinputs).indexOf(randinput);
       if(indextofill !==-1){
        randinput.value = Wordguess[indextofill].toUpperCase();
       }
    }

}
document.addEventListener("keydown",function(event){
    if(event.key ==="Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentindex = Array.from(inputs).indexOf(document.activeElement);
        if(currentindex >0){
            const currentinput = inputs[currentindex];
            const previnput = inputs[currentindex -1];
            currentinput.value="";
            previnput.value="";
            previnput.focus();
        }
    }
})
window.onload = function (){
    generateInput();
}
