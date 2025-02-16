/**
 * @description 
 * This is the entry point of the Hangman game. 
 * The game starts by asking the player if they're ready to play.
 * If the player responds with 'y', the game begins. If the player responds with 'n',
 * the game ends with a thank you message. The game logic is encapsulated in the Game class.
 * 
 * Features:
 * - Simple ASCII-based graphics to represent the hangman and word guessing process.
 * - User can input guesses (letters or spaces).
 * - The game asks the player if they are ready to start, with options to either start or exit.
 * - User can select Easy, Medium or Hard difficulty game setting.
 * - Handles both valid and invalid responses from the player.
 * - The game ends with a message when the user successfully guesses the word or fails the game.
 * 
 * @author MGC-00
 * @version 2.3.0
 * @repository https://github.com/mgc-00
 * @date 16/02/2025
 */

/////////////////////////////////////////////// /* Import Packages*/ //////////////////////////////////////////////////////////
// Importing necessary packages and files
const questions = require('../assets/gameQuery.js');  // Ensure path is correct for gameQuery file
const hangmanFigure = require('../assets/hangmanPic.js');  // Ensure path is correct for hangman picture

// Importing utility classes and modules
const WordConstructor = require('./wordConstructor.js');  // Ensure WordConstructor is defined and exported

// Importing core modules
const fs = require('fs');
const inquirer = require('inquirer');

/////////////////////////////////////////////// /* Game Constructor */ //////////////////////////////////////////////////////////

function GameConstructor() {
  // Initialize game properties
  this.wordsWon = 0;         // Track number of correctly guessed words
  this.wordsLose = 0;        // Track number of incorrectly guessed words
  this.guessRemaining = 10;  // Number of remaining guesses
  this.currentWord = null;   // Stores the current word object
  this.lettersGuessed = [];  // Stores all guessed letters

  // Function to initiate a new game
  this.newGame = () => {
    // Reset game state before starting a new game
    if (this.guessRemaining !== 10) {
      this.guessRemaining = 10;  // Reset remaining guesses to 10
    }

    // Reset the guessed letters array and start a new game
    this.lettersGuessed = [];
    console.log("\n --------------------- \n Let's start, good luck! \n --------------------- \n");
    this.generateRandomWordObject();  // Generate a new word object for the game
  };

  // Function to fetch a random word from a text file
  this.getWordPromise = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./assets/words.txt", "utf-8", (error, data) => {
        if (error) {
          console.log(`An error occurred while reading the text file: ${error}\n`);
          reject(error);  // Reject the promise if an error occurs
          return;
        }

        const wordsArray = data.split('\n').map(line => line.replace("\r", ""));
        const choosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        resolve(choosenWord);  // Resolve promise with a randomly selected word
      });
    });
  };

  // Function to fetch a word and create a new Word object
  this.generateRandomWordObject = () => {
    this.getWordPromise()
      .then(this.createWordObject)  // Create word object when promise resolves
      .catch(this.handleError);     // Handle errors if promise is rejected
  };

  // Function to handle any errors during word selection
  this.handleError = (error) => {
    console.log(`Error occurred while generating word object: ${error}`);
  };

  // Function to create a new Word object from the random word
  this.createWordObject = (randomWord) => {
    this.currentWord = new WordConstructor(randomWord);  // Create Word object with the random word
    this.currentWord.populateGuessedLetters();  // Initialize the guessed letters
    this.currentWord.printWord();  // Display the word with current progress
    this.recursivePrompt();  // Ask the user to guess a letter
  };

  // Function to ask the user to guess a letter (main game loop)
  this.recursivePrompt = () => {
    // Prompt user for a guessed letter
    inquirer.prompt(questions.guessLetter).then((letterAnswer) => {
      let currentLetter = letterAnswer.guessLetter.toLowerCase();  // Normalize the guessed letter

      // Check if the letter has been guessed before
      if (this.hasLetterBeenGuessed(currentLetter)) {
        this.handlePreviouslyGuessedLetter();
      } else {
        this.processNewGuess(currentLetter);
      }
    });
  };

  // Check if a letter has been guessed before
  this.hasLetterBeenGuessed = (letter) => {
    return this.lettersGuessed.indexOf(letter) > -1;
  };

  // Handle a previously guessed letter (message to user)
  this.handlePreviouslyGuessedLetter = () => {
    console.log(`\n Letters well done! You already guessed: ${this.lettersGuessed.join(",")} \n`);
    console.log("You already chose this letter!\n");
    this.recursivePrompt();  // Ask for another letter guess
  };

  // Process a new letter guess
  this.processNewGuess = (currentLetter) => {
    this.lettersGuessed.push(currentLetter);  // Add the guessed letter to the list
    console.log(`\n Letters guessed: ${this.lettersGuessed.join(",")} \n`);
    this.currentWord.checkLetter(currentLetter);  // Check if the letter is in the word

    // Check if the guessed letter is part of the word
    if (this.isWrongGuess(currentLetter)) {
      this.handleWrongGuess();  // Handle wrong guess
    } else {
      this.handleCorrectGuess();  // Handle correct guess
    }
  };

  // Check if the guessed letter is wrong
  this.isWrongGuess = (letter) => {
    return this.currentWord.currentWordArray.indexOf(letter) === -1;
  };

  // Handle a wrong guess (update remaining guesses and print hangman)
  this.handleWrongGuess = () => {
    this.guessRemaining--;  // Decrease remaining guesses
    this.currentWord.printWord();  // Display current word progress
    console.log("Nope, try again! \n");
    console.log(`You have ${this.guessRemaining} tries left, keep thinking!\n`);
    console.log(hangmanFigure[this.guessRemaining]);  // Show the hangman figure

    if (this.guessRemaining <= 0) {
      this.handleGameLoss();  // End game if no guesses left
    } else {
      this.recursivePrompt();  // Continue asking for guesses if remaining guesses
    }
  };

  // Handle a correct guess
  this.handleCorrectGuess = () => {
    this.currentWord.printWord();  // Display current word progress
    console.log("Yes! Correct guess!\n");
    this.currentWord.wordGuessCompleted();

    // If word is fully guessed, end the game with a win
    if (this.currentWord.wordFound) {
      this.handleGameWin();
    } else {
      this.recursivePrompt();  // Continue prompting for more guesses if not complete
    }
  };

  // Handle game loss (display message and stats)
  this.handleGameLoss = () => {
    this.wordsLose++;  // Increment loss count
    console.log(`No more tries, sorry! The correct word was ${this.currentWord.word}.\n`);
    this.showGameStats();  // Show stats
    this.askToPlayAgain();  // Ask if the player wants to play again
  };

  // Handle game win (display message and stats)
  this.handleGameWin = () => {
    this.wordsWon++;  // Increment win count
    console.log(`Yes! The word was ${this.currentWord.word}, congratulations!\n`);
    this.showGameStats();  // Show stats
    this.askToPlayAgain();  // Ask if the player wants to play again
  };

  // Display game statistics (win/loss counts)
  this.showGameStats = () => {
    console.log(`Games Won: ${this.wordsWon} | Games Lost: ${this.wordsLose}\n`);
  };

  // Ask the player if they want to play again
  this.askToPlayAgain = () => {
    inquirer.prompt(questions.playAgain).then((answer) => {
      if (answer.playAgain.toLowerCase().slice(0, 1) === "y") {
        console.log("Starting a new game!\n");
        this.newGame();  // Start a new game
      } else {
        console.log("GAME OVER! Thanks for playing, goodbye!\n");
        process.exit();  // Exit the game
      }
    });
  };
}

/////////////////////////////////////////////// /* Export the Game Constructor */ //////////////////////////////////////////////////////////
module.exports = GameConstructor;
