/////////////////////////////////////////////// /* Letter Constructor */ //////////////////////////////////////////////////////////

function LetterConstructor(letter) { 
  // Constructor to create a letter object for each character in the word

  // Store the passed in letter and initial guess state
  this.letter = letter; // The character assigned to this letter object
  this.guessed = false; // A flag to check if the letter has been guessed

  // Method that determines how the letter should appear based on its guessed state
  this.displayLetter = () => {
    // Check if the letter has been guessed
    if (!this.guessed) { // If not guessed, show an underscore
      return " _ ";
    }
    if (this.letter === " ") { // If it's a space, directly display a space and mark as guessed
      this.guessed = true;
      return " ";
    }
    return this.letter; // If guessed, return the letter itself
  }; // End of displayLetter method
}; // End of LetterConstructor function

/////////////////////////////////////////////// /* Export Module */ //////////////////////////////////////////////////////////
module.exports = LetterConstructor; // Make the LetterConstructor available for other parts of the program
