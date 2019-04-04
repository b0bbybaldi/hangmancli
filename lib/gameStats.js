var inquirer = require("inquirer");
var clear = require('clear');
var figlet = require("figlet");

var Stats = function(){
  this.correctQuotes = [];
  this.incorrectQuotes = [];
};

// Methods
Stats.prototype.addCorrect = function(quote){
  this.correctQuotes.push(quote);
};
Stats.prototype.addIncorrect = function(quote){
    this.incorrectQuotes.push(quote);
};
Stats.prototype.getWins = function(){
  return this.correctQuotes.length;
};
Stats.prototype.getLosses = function(){
  return this.incorrectQuotes.length;
};

Stats.prototype.showCorrect = function(){
  var questions = this.correctQuotes.map(function(quote){
    return { message: `Quote: ${quote.quote} \n Author: ${quote.word.author} \n`, name: `${quote.author}`}
  })
  inquirer.prompt(questions).then(function(input){
    console.log(`----------------------------------`);
    this.showOptions();
  }.bind(this));
};

Stats.prototype.showIncorrect = function(){
  var questions = this.incorrectQuotes.map(function(quote){
    return { message: `Quote: ${quote.quote} \n Author: ${quote.word.author} \n`, name: `${quote.author}`}
  })
  inquirer.prompt(questions).then(function(input){
    console.log(`----------------------------------`);
    this.showOptions();
  }.bind(this));
};

Stats.prototype.showOptions = function(){
  inquirer.prompt({
    type: "list",
    name: "option",
    message: "Please select what option you would like to do:",
    choices: [
      "A) View Overall Score",
      "B) View quotes you guessed correctly",
      "C) View quotes that you missed",
      "D) EXIT"
    ]
  }).then(function(input){
    switch(input.option.charAt(0)){
      case "A":
        clear();
        console.log(`----------------------------------`);
        console.log(`You got: ${this.getWins()} correct`);
        console.log(`You got: ${this.getLosses()} wrong`);
        console.log(`----------------------------------`);
        this.showOptions();
      break;
      
      case "B":
        clear();
        console.log(`----------------------------------`);
        this.showCorrect();
      break;

      case "C":
      clear();
        console.log(`----------------------------------`);
        this.showIncorrect();
      break;

      case "D":
        clear();
        console.log(figlet.textSync("Good bye"));
      break;
      default:
        console.dir(this.incorrectQuotes);
        console.dir(this.CorrectQuotes);
        console.log("Something went wrong dudeee");
      break;
    }
  }.bind(this))
}

module.exports = Stats;
