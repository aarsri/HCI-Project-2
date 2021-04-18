var title, subToday=[], rand=[], ran, choice, textanswer, count, width = 0;
const seenQuestions = new Set();
var totalNumQs = questions.length;
var numAnswered = 0;
var questionsPerGame = 5;
function onstart() {
	count = 0;
	width = 0;
	let elem = document.getElementById("myProgress");
	elem.style.width = 100 + '%'; //set progress bar with to 100%
	document.getElementById("watch").style.visibility="visible";
	askques();
}
function _(x){return document.getElementById(x);}
function generateRandomNum() {
	ran = Math.floor((Math.random() * totalNumQs)); //generate a random number 
	while (seenQuestions.has(ran)) { //keep picking a number until we've gotten one we havent seen before
		ran = Math.floor((Math.random() * totalNumQs));
	}
	seenQuestions.add(ran); //add the next question's index
}
function askques() {
	if (numAnswered == questionsPerGame) {
		countDownClear();
		return; //end the game
	}
	numAnswered++;
	move();
	countDownStart();
	generateRandomNum(); //pick the next random question index
	let ques = questions[ran].question;
	console.log("questions");
	q.innerHTML="<h3>"+ques+"</h3>";
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
	}
	else {
		leftAns = questions[ran].choices[1];
		rightAns = questions[ran].choices[0]; 
	}
	choicebox.innerHTML += "<div id='choice1'> "+ leftAns +"</div>";
	choicebox.innerHTML += "<div id='choice2'> "+ rightAns +"</div>";
}

function checkAnswer() { //runs everytime the timer expires 
	choice = document.getElementsByName("choices");
	//TODO: HERE we would replace with code to inidcate which side was correct
	countDownClear(); //move on to next question
	askques(); 
}

function countDownStart() {
 	count = 5;//number of seconds per each question
	countDownNow();
}

function countDownNow() {
	--count;
		_("watch").innerHTML="<h4>Remaining Time: "+count+"<h4>";
	if (count > 0) {
		ctimer=setTimeout(countDownNow, 1000);
	}

	if (count == 0) { /*If you have not answered a question in the given time frame , move to next question */
		checkAnswer()
	}
}

function countDownClear() { /* This function clears the timer for every function */
	clearTimeout(ctimer);
}


function move(){ //increments progress bar by 20% each time since there are 5 quesitons
	var elem = document.getElementById("myBar");
	width = width + (100 / questionsPerGame);
  	elem.style.width = width + '%';
}

// adapted from https://github.com/gbhumika/Online-quiz

