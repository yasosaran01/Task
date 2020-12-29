//get the dom elements

const HOTAIRBALLOON = document.querySelector(".hotairballoon");
const SKY = document.querySelector(".bkground");

const QUESTIONBOX = document.querySelector(".question");
const OPTIONS = document.querySelectorAll(".option");

const MODALWINDOW = document.querySelector(".overlay");

const SPACEBOX =  document.querySelector(".container");
const SPACEHEIGHT = SPACEBOX.offsetHeight;

let y = 0;
let ts = 0;
let counter = 0;

let balloonUp = function(){
      clearTimeout(ts);
      HOTAIRBALLOON.style.top ="10px";
}
let moveUpTheBalloon = function(){
      clearTimeout(ts);
      HOTAIRBALLOON.style.top ="10px";
      SKY.style.transform = "translateY("+(SKY.offsetHeight-y)+"px)";
}

let balloonDown = function(){
      clearTimeout(ts);
      HOTAIRBALLOON.style.top ="700px";
}
//function to drop the hot air balloon
let dropTheHotAirBalloon = function(){
    let balloonTop = HOTAIRBALLOON.offsetTop;
    if(balloonTop < SPACEHEIGHT+HOTAIRBALLOON.offsetWidth){
        HOTAIRBALLOON.style.top = balloonTop+50+"px";
        ts = setTimeout(dropTheHotAirBalloon,30);
    }else{
        
        showModal();
    }
}

//function to move up the sky
let moveTheSky = function(){
    y+=100;
    SKY.style.transform = "translateY("+y+"px)";
   
}

//function to check the answer- 
let Check = function(ele){

    if(ele.innerText === words[counter].answer){
        ele.classList.add("correct");//adds backgrouncolor
        moveTheSky(); //move the sky
        counter++; //counter for the questions

        //check for the game over
        if(gameOver()){
                //game over - clear the time and display the popup
                ele.classList.remove("correct");
                moveUpTheBalloon();
                setTimeout(showModal,500);
        }else{
            balloonUp(); //move the balloon to the top
            //after a second remove the bakground color and display the next question and start dropping the balloon
            setTimeout(function(){
                ele.classList.remove("correct");
                displayTheQuestion();
                dropTheHotAirBalloon();
            },1000);
        }
    }else{
       
        ele.classList.add("wrong");//adds red background
        let correctWord;

        //get the answer box
        for(let i=0;i<OPTIONS.length;i++){
          if(OPTIONS[i].innerText === words[counter].answer){
            correctWord = OPTIONS[i];
            console.log(correctWord);
            break;
          }
        }
        correctWord.classList.add('correct');//adds ggreen background
        
        setTimeout(function(){
            balloonDown();//drop the baloon

            //remove the background colors
            correctWord.classList.remove('correct');
            ele.classList.remove("wrong");

            //show popup
            showModal();
        },1000);

      }
    }
   

let displayTheQuestion = function(){
    QUESTIONBOX.innerText = words[counter].question;
    OPTIONS.forEach(function(item,i){
        item.innerText = words[counter].options[i];
    });

}

let gameOver = function(){
    let result = counter == words.length ? true : false;
    return result;
}

let startGame = function(){
    counter=0;
    y=0;
    dropTheHotAirBalloon();
    displayTheQuestion();
}

let showModal = function(){
      document.querySelector(".overlay").classList.add("show");
      let scoreCard = document.querySelector(".overlay > div");
      setTimeout(function(){
        scoreCard.classList.remove('hide');
      },200);
}
let resetGame = function(){
    HOTAIRBALLOON.style.top ="10px";
    document.querySelector(".overlay").classList.remove("show");
    document.querySelector(".overlay > div").classList.add('hide');
     SKY.style.transform = "translateY(0px)";
    setTimeout(startGame,1000);
}
startGame();
