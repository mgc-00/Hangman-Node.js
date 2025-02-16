/////////////////////////////////////////////// /* Import Packages */ //////////////////////////////////////////////////////////
const fs = require('fs'); // File system module for file-related operations
const LetterConstructor = require('./letterConstructor'); // Import the LetterConstructor for managing individual letter objects

/////////////////////////////////////////////// /* Game Object Constructor */ //////////////////////////////////////////////////////////

function WordConstructor(currentWord) {
  // Constructor to manage the word and its gameplay status

  // Properties of the Word object
  this.word = currentWord; // The word the player needs to guess
  this.currentWordArray = currentWord.split(""); // Split the word into an array of letters
  this.guessedLetters = []; // Array that stores Letter objects
  this.wordFound = false; // Boolean to track whether the whole word has been guessed

  // Method to create letter objects for each character in the word
  this.populateGuessedLetters = () => {
    this.currentWordArray.forEach((letter) => {
      this.guessedLetters.push(new LetterConstructor(letter)); // Create a letter object for each character
    });
  }; // End of populateGuessedLetters method

  // Method to check if a guessed letter exists in the word
  this.checkLetter = (letter) => {
    this.guessedLetters.forEach((letterObject) => {
      // Check if the guessed letter matches any letter in the word
      if (letterObject.letter.indexOf(letter) > -1) {
        letterObject.guessed = true; // Mark letter as guessed
      }
    });
  }; // End of checkLetter method

  // Method to display the current state of the word with guessed letters
  this.printWord = () => {
    let displayedWord = ""; // String to hold the word with guesses
    this.guessedLetters.forEach((letterObject) => {
      displayedWord += letterObject.displayLetter(); // Add the correctly guessed or hidden letter to the string
    });
    console.log(displayedWord + "\n"); // Print the current word state
  }; // End of printWord method

  // Method to check if all letters in the word have been guessed
  this.wordGuessCompleted = () => {
    if (this.guessedLetters.every((letterObject) => letterObject.guessed === true)) {
      this.wordFound = true; // All letters guessed, mark word as found
    }
  }; // End of wordGuessCompleted method

}; // End of WordConstructor function

/////////////////////////////////////////////// /* Export Modules */ //////////////////////////////////////////////////////////
module.exports = WordConstructor; // Export the WordConstructor so it can be used in other parts of the game
