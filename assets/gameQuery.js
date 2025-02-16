//////////////////////////////////////////////// /* Validation Functions */ //////////////////////////////////////////////////////////

const validateYesNo = (value) => {
  const response = value.trim().charAt(0).toLowerCase();
  return response === "y" || response === "n" ? true : "Please input either yes or no only!";
};

const validateLetter = (value) => /^[a-zA-Z]$/.test(value) ? true : "You have to choose a letter of the alphabet, or a space!";

//////////////////////////////////////////////// /* Questions Object */ //////////////////////////////////////////////////////////

const questions = {
  readyToPlay: [
    {
      type: "input",
      name: "ready",
      message: "Start Hangman?",
      default: "yes",
      validate: validateYesNo
    }
  ],

  guessLetter: [
    {
      type: "input",
      name: "guessLetter",
      message: "Choose a letter!",
      validate: validateLetter
    }
  ],

  playAgain: [
    {
      type: "input",
      name: "playAgain",
      message: "Play again?",
      default: "yes",
      validate: validateYesNo
    }
  ]
};

//////////////////////////////////////////////// /* Export Module */ //////////////////////////////////////////////////////////

module.exports = questions;
