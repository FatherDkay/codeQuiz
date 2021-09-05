var questions = [
  {q: "Commonly used data types do not include _____", a: "alerts", answers: ["strings", "booleins", "alerts", "numbers"]},
  {q: "The condition in an if/then statement is enclused with _____", a: "parentheses", answers: ["quotes", "curly brackets", "parentheses", "square brackets"]},
  {q: "String values must be enclosed with _____", a: "quotes", answers: ["quotes", "curly brackets", "square brackets", "parenthesis"]},
  {q: "Array's in javascript can be used to store", a: "all of the above", answers: ["numbers and strings", "other arrays", "booleans", "all of the above"]},
  {q: "Question 5", a: "Question 5 answer"}
]
// ELEMENT VARIABLES
var timer = document.getElementById('countdown');
var main = document.getElementById("mainTop");
var mainMid = document.getElementById("mainMiddle");
var mainBottom = document.getElementById("mainBottom");
var currentQuestion  = 0;
var score = 0;
var answer;
// END
var timeLeft = 75;

// TIMER 75 SECONDS
function countdown() {
  var timeInterval = setInterval(function() {
    if (timeLeft > 0) {
      timer.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      timer.textContent ="";
      clearInterval(timeInterval);
      displayMessage();
    }
  }, 1000);
  }
// END TIMER

// AUTOEXEC
function startQuiz(){
  var title = document.createElement("h1");
  title.textContent = "Coding Quiz Challenge";
  //title.setAttribute('style', 'margin:auto; width: 50%; text-align:center; font-size: 40px');
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
// END AUTOEXEC


// FUNCTION GO
function go(){
  var el = document.getElementById('btnContainer');
  mainMid.textContent = "";
  el.remove();
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
  // check for remaining questions and if not end game
  if (currentQuestion >= questions.length) {
    //END GAME
  }
  // check timer <= 0
  removeButtons();
  var theQuestion = questions[currentQuestion];
  main.textContent =theQuestion.q;
  for (i = 0; i < theQuestion.answers.length; i++){
    createBtn(theQuestion.answers[i],"btn",function(e) {
      if (e.currentTarget.textContent === theQuestion.a) {
        mainBottom.textContent ="Correct";
        score = score + timeLeft;
      } else {
        mainBottom.textContent = "Wrong shithead";
        timeLeft = timeLeft - 10;
      }
      currentQuestion++;
      askQuestion();
    });
  }
  // check answer correct or wrong


}

// END ASK QUESTION

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



 // var startBtn = document.createElement("button");
  // startBtn.textContent = "Start Quiz";
  // startBtn.classList.add("btn");
  // btnContainer.appendChild(startBtn);

startQuiz();
