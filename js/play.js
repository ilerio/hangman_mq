let word = "";
let inProgress = [];
let life = 8;
let wordLength;

// Call init to begin game
$(function() {
  init();
});
function init() {
  word = getWord();
  wordLength = word.length;

  for (let i=0; i<wordLength; i++) {
    inProgress[i] = "_";
  }

  $('#display').text(inProgress.join(''));
  $("#display-and-buttons").css("display","inline");
}

function guess(letter) {
  $("#"+letter).prop("disabled", true); // disable to disallow double clicks
  let flag = false;

  for (let i=0; i<wordLength; i++) {
    if (letter === word.charAt(i)) {
      rightGuess(i, letter);
      flag = true;
    }
  }

  if (!flag) {
    wrongGuess();
  }
}

function rightGuess(index, letter) {
  inProgress[index] = letter;
  $("#display").text(inProgress.join(''));
  checkWinState();
}

function wrongGuess() {
  life--;
  $("#hm-img").prop("src",`imgs/hm${life}.jpg`);
  checkWinState();
}

function checkWinState() {
  if (word === inProgress.join('')) {
    $("#hm-img").prop("src","imgs/win.jpg");
    displayWinState(`Congratulations! You got the word ${word}.`);
  } else if(life < 0) {
    $("#hm-img").prop("src","imgs/lose.jpg");
    displayWinState(`Sorry, you lose! The word was ${word}.`);
  }
}

function displayWinState(msg) {
  $("#message").text(msg);
  $("#display-and-buttons").css("display","none");
  $("#winstate").css("display","inline");
}

function resetGame() {
  location.reload();
}
