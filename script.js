var title, subToday = [],
  rand = [],
  ran, choice, textanswer, count, width = 0;
const seenQuestions = new Set();
var totalNumQs = questions.length;
var numAnswered = 0;
var questionsPerGame = 5;
var correct = ""; 

// START GAME
function onstart() {
  count = 0;
  width = 0;
  
  $("#myProgress").fadeIn("slow");
  $("#qnumber").fadeIn("slow");
  $("._questionnumber").text("0");
  $("._color").css("opacity", "1");
  $("#draw").css("z-index", "10");
  $("#watch").css("display", "block");
  
  askques();
}



function generateRandomNum() {
  ran = Math.floor((Math.random() * totalNumQs)); //generate a random number 
  while (seenQuestions.has(ran)) { //keep picking a number until we've gotten one we havent seen before
    ran = Math.floor((Math.random() * totalNumQs));
  }
  seenQuestions.add(ran); //add the next question's index
}


// END GAME

function endGame() {
  $("#draw").css("z-index", "-9"); //hide the canvas after the game ends
  $("#q").fadeOut("slow");
  $("#myProgress").fadeOut("slow");
  $("#question").fadeOut("slow");
  $("#end").fadeIn("5000").css("display", "flex");
  $("#watch").css("display", "none");
}

function askques() {
  // Ask a new question
  // reset width
  $("#myBar").css("width", "0");
  width = 0;
  if (numAnswered == questionsPerGame) {
    countDownClear();
    endGame();
    setTimeout(function () {
      location.reload();
    }, 20000); // wait 20 seconds for quiz to restart
    return; //end the game
  }
  numAnswered++;
  move();
  countDownStart();
  generateRandomNum(); //pick the next random question index
  let ques = questions[ran].question;

  q.innerHTML = "<h3>" + ques + "</h3>";
  showChoice();
}


function showChoice() {
  let choicebox = document.getElementById("choice-box");
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
  $("._color div[data-status='right']").addClass("right");
  $("._color div[data-status='wrong']").addClass("wrong");
  setTimeout(function () {
    countDownClear(); //move on to next question in 5 seconds
    askques();
  }, 5000);

}

function countDownStart() {
  //number of seconds per each question
  totalCount = 10;
  count = 10; 
  countDownNow();
}

function countDownNow() {
  --count;
  
  $("#watch").html("<h4> Remaining Time: " + count + " <h4> ");
  
  if (count > 0) {
    width += (100 / totalCount);
    $("#myBar").css("width", width + "%");
    ctimer = setTimeout(countDownNow, 1000);
  }

  if (count == 0) {
    $("#watch").html("<h4>Time's Up!</h4>");
    width += (100 / totalCount);
    $("#myBar").css("width", width + "%");
    // If you have not answered a question in the given time frame , move to next question
    checkAnswer()
  }
}

function countDownClear() {
  /* This function clears the timer and removes red/green effect */
  $("._color div[data-status='wrong']").removeClass("wrong");
  $("._color div[data-status='right']").removeClass("right");
  clearTimeout(ctimer);
}


// Increment new progress bar above question
function move() { //increments question number
  $("._questionnumber").text(parseInt($("._questionnumber").text()) + 1);
}

// code for timer and filling in questions adapted from https://github.com/gbhumika/Online-quiz