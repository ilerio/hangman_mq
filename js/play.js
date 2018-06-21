//Variables
var score = 0;
var word = "";
var mult = 1;
var guessedWord;
var numWrong = 0;
var life = 0; // goes up not down (images)
var inprogress = "";
var flag = false;
var index = [];
var MAX; // word length

init();
function init() {
  word = getWord();
  console.log(word);
}

function guess(str)
{
  guessedWord = str.toLocaleLowerCase();
  $("#"+str).prop("disabled", true);
  //window.console.log("guessedWord = " + str);// for debugging

  for(var i=0;i<MAX;i++)
  {
    if (word.charAt(i) === guessedWord)
    {
      flag = true;
      index[i] = str;
      mult++;//increment multiplier for each individual letter (e.g. l[ee]ch -> e x2)
    }
  }

  if (flag === true)
  {
    var temp = inprogress;
    inprogress = "";

    var debug = "";

    for(var i=0; i<MAX; i++)
    {
      debug += "[" + index[i] + "]";
      if(index[i] !== -1)
      {
        inprogress += index[i];
      }
      else
      {
        inprogress += temp.charAt(i);
      }
    }
    inprogress = inprogress.toLocaleLowerCase();
    $("#display").text(inprogress);
    score += (19 * (mult));
    flag = false;
    //window.console.log(debug);
    //window.console.log("mult = " + mult); // for debugging
    //window.console.log("score = " + score);//debug

    if(word === inprogress)
    {
      $("#" + life).css("display","none");
      $("#win").css("display","inline");
      winState(word + ": Congratulations you win!");
    }
    else
    {
      //window.console.log("done = " + word + " === " + inprogress + " = " + (word === inprogress) + "\n\n");//debug
    }
  }
  else
  {
    //window.console.log("life = " + life);//debug
    numWrong++;
    mult = ((mult - 1) < 1)? 1 : mult - 1; // multiplier decrement
    $("#" + life).css("display","none");
    $("#" + (++life)).css("display","inline");
    score = ((score - (7*numWrong) < 0)? 0 : (score - (7*numWrong)));
    if(score < 0){score = 0;};
    //window.console.log("mult = " + mult); // for debugging
    //window.console.log("score = " + score);//debug

    if(life === 8)
    {
      $("#" + life).css("display","none");
      $("#dead").css("display","inline");
      winState("Oh, so sorry but you lose! The word was " + word + ".");
    }
    else
    {
      //window.console.log("dead = " + (life === 8) + "\n\n");
    }
  }
}

function winState(str)
{
  $("#message").text(str);
  $("#a-z-buttons").css("display","none");
  $("#winstate").css("display","inline");
}

function resetGame()
{
  //window.console.log("resetGame()");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var response = xmlhttp.responseText;
      //window.console.log(response);
      if (response === "true"){
        location.reload();
      }
    };
  };
  xmlhttp.open("GET", "save_score.php?score=" + score, true);
  xmlhttp.send();
}

function endGame()
{
  //window.console.log("endGame()");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var response = xmlhttp.responseText;
      window.console.log(response);
      if (response === "true"){
        location.replace("home.php");
      }
    };
  };
  xmlhttp.open("GET", "save_score.php?score=" + score, true);
  xmlhttp.send();
}
