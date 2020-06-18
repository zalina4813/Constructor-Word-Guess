
var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";



var UnitedStates = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "neveda",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming"
];


var randomIndex = Math.floor(Math.random() * UnitedStates.length);
var randomWord = UnitedStates[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;


var incorrectLetters = [];
var correctLetters = [];


var guessesLeft = 10;

function theLogic() {
  
  if (requireNewWord) {

    var randomIndex = Math.floor(Math.random() * UnitedStates.length);
    var randomWord = UnitedStates[randomIndex];

    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  
  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);


  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nPlease try again!\n");
          theLogic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nAlready Guessed or Nothing Entered\n");
            theLogic();
          } else {
    
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();


            console.log("Guesses Left: " + guessesLeft + "\n");

            
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            
            if (guessesLeft > 0) {
              
              theLogic();
            } else {
              console.log("Sorry, you lose!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      } else {
        return;
      }
    });
}

theLogic();
