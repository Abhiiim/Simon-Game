
// Global Variables

const colors = ["red", "blue", "green", "yellow"];
var prevChosen = [];
var hasStarted = false;
var level = 0;
var start = 0;

// Key Press Event

$(document).keydown(function(event){
  if (!hasStarted){
    nextSequence();
    hasStarted = true;
    $("h2").css("display", "none");
  }
});

// Button Click Event

$(".btn").click(function(event){
  if (hasStarted){
    var clickedColor = event.target.id;
    buttonAnimation(clickedColor);
    game(clickedColor);
    console.log(prevChosen);
  }
});

// Main Function for Playing Game

function game(clickedColor){
  if (prevChosen[start] != clickedColor){
    gameOver();
    totalScore();
    gameStart();
    return;
  }
  else start++;
  if (start === prevChosen.length){
    level++;
    start = 0;
    setTimeout(function () {
      nextSequence();
    }, 500);
  }
}

// Initializing all global variable as in the start of the Game

function gameStart(){
  hasStarted = false;
  level = 0;
  prevChosen = [];
  start = 0;
}

// Function for GameOver

function gameOver(){
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");

  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
}

// Function for printing total Score

function totalScore(){
  $("h2").css("display", "block");
  $(".score").text("Your Score is " + level);
}

// Function for next hint (automatic button animation)

function nextSequence(){
  $("h1").text("Level " + level);

  var num = Math.floor(Math.random() * 4);
  var chosenColor = colors[num];
  prevChosen.push(chosenColor);

  buttonAnimation(chosenColor);
}

// Function for making animation of buttons

function buttonAnimation(chosenColor){
  var activeButton = "#" + chosenColor;
  $(activeButton).addClass("pressed");
  makeSound(chosenColor);

  setTimeout(function(){
    $(activeButton).removeClass("pressed");
  }, 100);
}

// Function for adding sound to the buttons

function makeSound(colour){
  switch (colour) {
    case "blue":
      var audio1 = new Audio("sounds/blue.mp3");
      audio1.play();
      break;

    case "red":
      var audio2 = new Audio("sounds/red.mp3");
      audio2.play();
      break;

    case "green":
      var audio3 = new Audio("sounds/green.mp3");
      audio3.play();
      break;

    case "yellow":
      var audio4 = new Audio("sounds/yellow.mp3");
      audio4.play();
      break;
    default:
  }
}
