
var Letter = require("./Letter");

function Word(_author){
    this.author = _author;
    this.letterArray = []; // array containing letter objects
    this.incorrectLetters = [];
    this.incorrectGuess = 0;
    this.init();
}

Word.prototype.init = function(){
  var regExp = /^[a-zA-Z]{1}$/;
    for (var ltr of this.author){
      if (regExp.test(ltr)){
        this.letterArray.push(new Letter(ltr));
      } else {
        this.letterArray.push(new Letter(ltr, true));
      } 
    }
}

Word.prototype.show = function(){
    var displayStr = ""
    this.letterArray.forEach(function(ltr){
        if (ltr.display){
            displayStr += ` ${ltr.letter} `;
        } else {
            displayStr += " __ ";
        }
    })
    console.log(displayStr);
}

 
Word.prototype.showAll = function(){
    var displayStr = ""
    this.letterArray.forEach(function(ltr){
      displayStr += ` ${ltr.letter} `;
      ltr.display = true;
    })
    return displayStr;
}


Word.prototype.hasLetter = function(ltr){
    var newGuess = true;
    var correctGuess = false;
    this.letterArray.forEach(function(ltrObj){
        if (ltrObj.letter == ltr.toUpperCase()){
          if (ltrObj.display){
            newGuess = false;
            correctGuess = true;
          } else {
            correctGuess = true;
            ltrObj.show();
          }
        }
    }) 
    if (!correctGuess){
      newGuess = this.incorrectLetters.indexOf(ltr.toUpperCase()) == -1 ? true : false;
      if (newGuess){
        this.incorrectLetters.push(ltr.toUpperCase());
        this.incorrectGuess +=1;
      }
    }
    return {correct: correctGuess, newGuess: newGuess};
}

Word.prototype.solved = function(){
    var solved = true;
    this.letterArray.forEach(function(ltrObj){
        if (ltrObj.display == false) {
          solved = false;
        }
    });
    return solved;
}

module.exports = Word;
