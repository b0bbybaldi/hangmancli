
function Letter(ltr, displayBool){
    this.display = displayBool || false;
    this.letter;
    this.init(ltr);
}

Letter.prototype.init = function(ltr){
  if (ltr == " "){
    this.display = true;
    this.letter = "//";
  } else {
    this.letter = ltr.toString().toUpperCase();
  }
}

Letter.prototype.show = function(){
    this.display = true;
}

module.exports = Letter;