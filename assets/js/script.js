var questions = [
  {q: "Commonly used data types do not include _____:", a: "alerts", answers: ["strings", "booleans", "alerts", "numbers"]},
  {q: "The condition in an if / else statement is enclused with _____.", a: "parentheses", answers: ["quotes", "curly brackets", "parentheses", "square brackets"]},
  {q: "String values must be enclosed with _____:", a: "quotes", answers: ["quotes", "curly brackets", "square brackets", "parenthesis"]},
  {q: "Array's in javascript can be used to store:", a: "all of the above", answers: ["numbers and strings", "other arrays", "booleans", "all of the above"]},
  {q: "A very useful tool used development and debuttging for printing content to the debugger is _____:", a: "console.log", answers: ["JavaScript", "for loops", "console.log", "git bash"]}
]
var timer = document.getElementById('countdown');
var main = document.getElementById("mainTop");
var mainMid = document.getElementById("mainMiddle");
var mainBottom = document.getElementById("mainBottom");
var highScoreList = document.getElementById("highScoreList");
var currentQuestion  = 0;
var score = 0;
var answer;
var timeLeft = 75;
var gameRunning = false;
var timeInterval;
var input;

document.getElementById("viewHighScore").addEventListener("click", checkStop);

function checkStop () {
  if(!gameRunning) {
    showHighScores();
  }
  else {
    pauseTime = timeLeft;
    var reallyStop = window.confirm("Are you sure you want to end this game and display the scoreboard?");
    if(reallyStop) {
      timer.textContent ="";
      clearInterval(timeInterval);
      gameRunning = false;
      showHighScores();
    }else {
      timeLeft = pauseTime;
}
}
}

// TIMER 75 SECONDS
function countdown() {
  timeInterval = setInterval(function() {
    //check if the game is still in progress
    if(!gameRunning) {
      endGame();
    //check if the timer has time remaining
    }else if(timeLeft <= 0){
      endGame();
    } else {
      timer.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
  }, 1000);
  }
// END TIMER

// START ONLOAD
function startQuiz(){
  var title = document.createElement("h1");
  title.textContent = "Coding Quiz Challenge";
  main = title;
  mainTop.appendChild(main);

  var title2 = document.createElement("h2");
  title2.textContent ="Try to answer the following code-related questions within the time limit.  keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
  //title2.setAttribute('style', 'margin:auto; width: 50%; text-align:center; padding-bottom: 25px');
  mainMid = title2;
  mainMiddle.appendChild(mainMid);

  var startBtn = document.createElement("button");
  startBtn.textContent ="Start Quiz";
  startBtn.classList.add("btn");
  btnContainer.appendChild(startBtn);
  startBtn.onclick = go;
}
// END ONLOAD

// FUNCTION GO
function go(){
  gameRunning = true;
  var el = document.getElementById('btnContainer');
   el.remove();
  mainMid.textContent = "";
  countdown();
  askQuestion();
}
// END GO

// FUNCTION REMOVE BUTTONS
function removeButtons(className){
  const elements = document.getElementsByClassName("btn");
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}
// END REMOVE BUTTONS

// FUNCTION ASK QUESTION
function askQuestion (){
  // check for remaining questions  or out of time
  if (currentQuestion >= questions.length || timeLeft <= 0) {
    endGame();
    return;
  }
  removeButtons();
  var theQuestion = questions[currentQuestion];
  main.textContent =theQuestion.q;
  main.setAttribute('style', 'text-align: left');
  mainBottom.setAttribute('style', 'text-align: left; font-size: 25px; border-top: solid')
  for (i = 0; i < theQuestion.answers.length; i++){
    createBtn(theQuestion.answers[i],"btn",function(e) {
      // check answer
      if (e.currentTarget.textContent === theQuestion.a) {
        mainBottom.textContent ="Correct!";
        score = score + timeLeft;
      } else {
        mainBottom.textContent = "Wrong!";
        timeLeft = timeLeft - 10;
      }
      currentQuestion++;
      askQuestion();
    });
  }
}
// END ASK QUESTION

// FUNCTION END GAME
function endGame () {
  timer.textContent ="";
  clearInterval(timeInterval);
  gameRunning = false;
  main.textContent ="All Done!"
  main.setAttribute('style', 'text-align: left');
  mainMiddle.textContent ="Your final score is " + score;
  mainMiddle.setAttribute('style', 'text-align: left; font-size: 24px');
  mainBottom.textContent = "";
 
  //high score process
  const label = document.createElement("label");
  label.setAttribute('style', 'text-align: left');
  label.setAttribute("for", "input");
  label.innerHTML = "Enter Initials: ";
  highScoreInitials.appendChild(label);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id","initials");
  highScoreInitials.appendChild(input);

  var submitBtn = document.createElement("button");
  submitBtn.textContent ="Submit";
  submitBtn.classList.add("submitBtn");
  highScoreInitials.appendChild(submitBtn);
  submitBtn.onclick = saveScore;

}
// END END GAME

// FUNCTION CREATE BUTTON
function createBtn(text, className, callback) {
  var btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(className);
  
  if (callback) {
    btn.addEventListener("click", callback);
  }
  mainMiddle.appendChild(btn);
}
// END FUNCTION CREATE BUTTON

// SAVE SCORE
function saveScore () {
  var scores = getSavedHighScores();
  var newScore = {
    initials: document.getElementById("initials").value,
    score: score
  };
  //insert score into scores array
  scores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(scores));
 showHighScores();
}
// GET SAVED SCORES
function getSavedHighScores(){
   var saved = localStorage.getItem("highScores");
   if(!saved) {
     return [];
   }
   return JSON.parse (saved);
}

// SHOW HIGH SCORES
function showHighScores (){
main.textContent = "High Scores";
mainMiddle.textContent = "";
mainBottom.textContent = "";
var el = document.getElementById('highScoreInitials');
el.remove();

// list high scores from local storage
var highestScores = getSavedHighScores();
var i = 0;
while(i < highestScores.length){
  var listItem = highestScores[i].initials +" - " + highestScores[i].score;
  listScore = document.createElement("h2");
  listScore.textContent = (listItem);
  highScoreList.appendChild(listScore);
  i++;
}

// create try again button
var againBtn = document.createElement("button");
  againBtn.textContent ="New Game";
  againBtn.classList.add("submitBtn");
  highScoreList.appendChild(againBtn);
  againBtn.onclick = restart;

// create clear high score buttons
var clearBtn = document.createElement("button");
  clearBtn.textContent ="Clear High Scores";
  clearBtn.classList.add("clearBtn");
  highScoreList.appendChild(clearBtn);
  clearBtn.onclick = localClear;
}

function restart(){
location.reload();
}

function localClear(){
  var clearIt = window.confirm("Are you sure you want to clear the high scores?  This can not be undone");
    if(clearIt){
      localStorage.clear();
      restart();
    }else {
      restart();
    }
  }

startQuiz();
