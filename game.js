const btnColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(last_element) {
  if (gamePattern[last_element] === userClickedPattern[last_element]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text(`Game Over!`);
    startOver();

    setTimeout(function () {
      $("body").removeClass("game-over");

      $("#level-title").text("Press any key to Start");
    }, 2 000);
  }
}

function nextSequence() {
  userClickedPattern = [];

  let randomNum = Math.trunc(Math.random() * 4);

  let randomColor = btnColors[randomNum];
  gamePattern.push(randomColor);

  playSound(randomColor);

  $(`.${randomColor}`).fadeOut(70).fadeIn(70);

  level += 1;
  $("#level-title").text(`Level:${level}`);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
