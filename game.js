var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');

var getQuote = require("./lib/quoteAPI");
var printColor = require("./lib/printColor");
var gameStats = require("./lib/gameStats");
var Stats = new gameStats();

playGame(true);

function playGame(firstTimeBool){
  question = { message: "Play another game?", type: "confirm", name: "play"};
  if (firstTimeBool){
    clear();
    console.log(figlet.textSync("Welcome!"));
    question["message"] = "Want to play hangman?";
  } 

  inquirer.prompt(question)
  .then(function(input){
    if (input.play){
      clear()
      getQuote().then(quoteObj => {
        guessLetter(false, quoteObj);
      })
      .catch(err => {console.log(err)});
    } else {
      clear();
      Stats.showOptions();
    }
  }) 
}; 

function guessLetter(againBool, quoteObj){
  if (!againBool){
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    quoteObj.word.show();
  }

  if (quoteObj.word.incorrectLetters.length !== 0){
    console.log(`Incorrect Letter(s): ${quoteObj.word.incorrectLetters.join(", ")}`);
  }
  var question = {
    type: "input", 
    name: "letter", 
    validate: function(value){
      var regexp = /^[a-zA-Z]{1}$/gi;
      return regexp.test(value) ? true : "please enter only one letter";
    }
  };
  question["message"] = againBool ? "Guess another letter: " :  "Guess a letter: ";

  inquirer.prompt(question)
  .then(function(input){
    clear(); 
    var guess = input.letter;
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    
    var result = quoteObj.word.hasLetter(input.letter);
    var message;
    if (result.correct){
      quoteObj.word.show();
      message = result.newGuess ?
      `Nice! we found a(n) "${guess.toUpperCase()}"`:
      `You already guessed a(n) "${guess.toUpperCase()}" - silly!`;
      console.log(printColor.success(message));
    } else {
      quoteObj.word.show();
      message = result.newGuess ? 
        `Sorry, no "${guess.toUpperCase()}" found` : 
        `Sorry bud, "${guess.toUpperCase()}" still isn't the right letter.`;
      console.log(printColor.wrong(message));
    };

    if (quoteObj.word.solved()){
          console.log(figlet.textSync("You WON!!!"));
          console.log(`You had ${quoteObj.word.incorrectGuess} incorrect guess(es)`);
          Stats.addCorrect(quoteObj);
          playGame(false);
    } else if (quoteObj.word.incorrectGuess > 7){
      console.log(`Out of Guesses! \n The answer was: ${quoteObj.word.showAll()}`);
      Stats.addIncorrect(quoteObj);
      playGame(false);
    } else {
      guessLetter(true, quoteObj);
    }
  }) 
}; 