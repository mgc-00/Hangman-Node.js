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

/////////////////////////////////////////////// /* Import Modules */ //////////////////////////////////////////////////////////
// Import the Game class to handle gameplay
const Game = require('./constructors/gameConstructor');

// Import the inquirer module for user input
const inquirer = require('inquirer');

// Import the questions for game readiness
const { readyToPlay } = require('./assets/gameQuery');

/////////////////////////////////////////////// /* Word Difficulty Setup */ //////////////////////////////////////////////////////////
const easyWords = ['cat', 'dog', 'fish', 'book', 'apple'];
const mediumWords = ['mountain', 'elephant', 'computer', 'guitar', 'soccer'];
const hardWords = ['flabbergasted', 'pneumonia', 'misunderstanding', 'dichotomy', 'antidisestablishmentarianism'];

// Function to ask the user for difficulty level
async function chooseDifficulty() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'difficulty',
      message: 'Choose your difficulty level:',
      choices: ['easy', 'medium', 'hard'],
    },
  ]);

  return answers.difficulty;
}

// Function to get a random word based on difficulty
function getRandomWord(difficulty) {
  let wordList;
  if (difficulty === 'easy') {
    wordList = easyWords;
  } else if (difficulty === 'medium') {
    wordList = mediumWords;
  } else {
    wordList = hardWords;
  }

  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

/////////////////////////////////////////////// /* Game Execution*/ //////////////////////////////////////////////////////////

console.log("\n Let's get ready for Hangman, good luck! (Remember, a space _ also counts as a guess!) \n"); // Display a welcome message

// Start the game logic in an asynchronous function
const startGame = async () => {
  try {
    // Ask if the user is ready to play using inquirer
    const answers = await inquirer.prompt(readyToPlay);
    const isReady = answers.ready.toLowerCase().slice(0, 1); // Normalize the response to lowercase

    // Check the user's response and decide the game flow
    switch (isReady) {
      case 'y': // If user is ready to play
        // Ask for difficulty level before starting the game
        const difficulty = await chooseDifficulty(); // Get the difficulty level
        const wordToGuess = getRandomWord(difficulty); // Get a random word from the chosen difficulty

        console.log(`\n Starting the game with a ${difficulty} word: ${wordToGuess} \n`);

        const newGame = new Game(wordToGuess); // Pass the word to the game instance (you may need to modify your Game class to accept a word)
        newGame.newGame(); // Start the game
        break;
      case 'n': // If user is not ready to play
        console.log("\n Thank you for playing Hangman! \n"); // Exit the game with a message
        process.exit(); // Terminate the program
        break;
      default: // If user inputs an invalid response
        console.log("\n Not a valid input. Please respond with 'y' or 'n'. \n"); // Ask for a valid input
        startGame(); // Restart the game prompt
        break;
    }
  } catch (error) {
    console.error("\n An error occurred: ", error); // Handle any errors that might occur
  }
};

// Start the game
startGame();
