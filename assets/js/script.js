var question = [
  {q: "Commonly used data types do not include _____", a: "alerts", answers: ["strings", "booleins", "alerts", "numbers"]},
  {q: "The condition in an if/then statement is enclused with _____", a: "parentheses", answers: ["quotes", "curly brackets", "parentheses", "square brackets"]},
  {q: "String values must be enclused with _____", a: "Question 3 answer"},
  {q: "Question 4", a: "Question 4 answer"},
  {q: "Question 5", a: "Question 5 answer"}
]
var timer = document.getElementById('countdown');
var main = document.getElementById("mainTop");
var mainMid = document.getElementById("mainMiddle");
var mainBottom = document.getElementById("mainBottom");
var currentQuestion  = [];
var score = 0;

// TIMER 75 SECONDS
function countdown() {
  var timeLeft = 75;
  var timeInterval = setInterval(function() {
    if(timeLeft > 0) {
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
  title.setAttribute('style', 'margin:auto; width: 50%; text-align:center; font-size: 40px');
  main = title;
  mainTop.appendChild(main);

  var title2 = document.createElement("h2");
  title2.textContent ="Try to answer the following code-related questions within the time limit.  keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
  title2.setAttribute('style', 'margin:auto; width: 50%; text-align:center; padding-bottom: 25px');
  mainMid = title2;
  mainMiddle.appendChild(mainMid);

  var startBtn = document.createElement("button");
  startBtn.textContent ="Start Quiz";
  startBtn.classList.add("btn");
  btnContainer.appendChild(startBtn);
  startBtn.onclick = go;
}
// END AUTOEXEC

//

// FUNCTION ASK QUESTION
function go(){
  countdown();
  main.textContent = "";
  mainMid.textContent = "";
  var el = document.getElementById('btnContainer');
  el.remove();
  askQuestion()
}

function askQuestion(){

}




// END FUNCTION ASK QUESTION

// FUNCTION CHECK ANSWER


// END CHECK ANSWER


// FUNCTION CREATE BUTTON
function createBtn(text, className, callback) {
  var btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(className);

  if (callback) {
    btn.addEventListener("click", callback);
  }
 c
  mainMiddle.appendChild(btn);
}
// END FUNCTION CREATE BUTTON





  // var startBtn = document.createElement("button");
  // startBtn.textContent = "Start Quiz";
  // startBtn.classList.add("btn");
  // btnContainer.appendChild(startBtn);

startQuiz();
