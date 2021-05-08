var title, subToday = [],
  rand = [],
  ran, choice, textanswer, count, width = 0;
const seenQuestions = new Set();
var totalNumQs = questions.length;
var numAnswered = 0;
var questionsPerGame = 5;
var correct = ""; // change this later pls

function onstart() {
  count = 0;
  width = 0;
  $("._color").css("opacity", "1");
  $("#draw").css("z-index", "10");
  $("#myProgress").css("width", "100%"); //set progress bar with to 100%
  $("#watch").css("display", "block");
  //  document.getElementById("watch").style.visibility = "visible";
  askques();
}

function _(x) {
  return document.getElementById(x);
}

function generateRandomNum() {
  ran = Math.floor((Math.random() * totalNumQs)); //generate a random number 
  while (seenQuestions.has(ran)) { //keep picking a number until we've gotten one we havent seen before
    ran = Math.floor((Math.random() * totalNumQs));
  }
  seenQuestions.add(ran); //add the next question's index
}


function endGame() {
  $("#draw").css("z-index", "-9"); //hde the canvas
  $("#q").fadeOut("slow");
  $("#question").fadeOut("slow");
  $("#end").fadeIn("5000").css("display", "flex");
  $("#watch").css("display", "none");
}

function askques() {

  if (numAnswered == questionsPerGame) {
    countDownClear();
    //console.log(start_flag)
    endGame();
    setTimeout(function () {
      location.reload();
    }, 30000); // wait 30 seconds for quiz to restart
    return; //end the game
  }
  numAnswered++;
  move();
  countDownStart();
  generateRandomNum(); //pick the next random question index
  let ques = questions[ran].question;
  console.log("questions");
  q.innerHTML = "<h3>" + ques + "</h3>";
  showChoice();

}


function showChoice() {
  let choicebox = _("choice-box");
  choicebox.innerHTML = ""; //clear previous answers
  let randomOrder = Math.random();
  let leftAns;
  let rightAns;
  //randomly decide which answer appears on which side
  if (randomOrder > 0.5) {
    leftAns = questions[ran].choices[0];
    rightAns = questions[ran].choices[1];
  } else {
    leftAns = questions[ran].choices[1];
    rightAns = questions[ran].choices[0];
  }


  console.log("Correct: " + questions[ran].correctChoice);

  // save correct choice to correct
  correct = questions[ran].correctChoice;


  if (leftAns == correct) {
    $("._left").attr('data-status', 'right');
    $("._right").attr('data-status', 'wrong');
    choicebox.innerHTML += "<div id='choice1' class='_choice' data-status='right'> " + leftAns + "</div>";
    choicebox.innerHTML += "<div id='choice2' class='_choice' data-status='wrong'> " + rightAns + "</div>";
  } else {
    $("._right").attr('data-status', 'right');
    $("._left").attr('data-status', 'wrong');
    choicebox.innerHTML += "<div id='choice1' class='_choice' data-status='wrong'> " + leftAns + "</div>";
    choicebox.innerHTML += "<div id='choice2' class='_choice' data-status='right'> " + rightAns + "</div>";
  }


}


function checkAnswer() { //runs everytime the timer expires 
  choice = document.getElementsByName("choices");
  //TODO: HERE we would replace with code to indicate which side was correct

  // CHANGE LATER: color div with the correct choice -- this is still broken ish

  //  $("._color div:not(:contains('" + correct + "'))").addClass("wrong");
  $("._color div[data-status='right']").addClass("right");
  $("._color div[data-status='right']").addClass("correct-status");
  $("._color div[data-status='wrong']").addClass("wrong");
  setTimeout(function () {
    countDownClear(); //move on to next question in 5 seconds
    askques();
  }, 5000);

}

function countDownStart() {
  count = 15; //number of seconds per each question
  countDownNow();
}

function countDownNow() {
  --count;
  $("#watch").html("<h4> remaining time: " + count + " <h4> ");
  if (count > 0) {
    ctimer = setTimeout(countDownNow, 1000);
  }

  if (count == 0) {
    /*If you have not answered a question in the given time frame , move to next question */
    checkAnswer()
  }
}

function countDownClear() {
  /* This function clears the timer for every function */

  // im sorry
  $("._color div[data-status='wrong']").removeClass("wrong");
  $("._color div[data-status='right']").addClass("correct-status");
  $("._color div[data-status='right']").removeClass("right");

  clearTimeout(ctimer);
}


function move() { //increments progress bar by 20% each time since there are 5 quesitons
  var elem = document.getElementById("myBar");
  width = width + (100 / questionsPerGame);
  elem.style.width = width + '%';
}

// adapted from https://github.com/gbhumika/Online-quiz