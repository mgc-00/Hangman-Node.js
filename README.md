https://github.com/mgc-00/

Hangman-Node.js

Hangman-Node is a command-line Hangman game built with JavaScript, Node.js, and the Inquirer package. Players guess letters to uncover a randomly chosen word.

Features

* Random word selection from a text file.
* Letter-by-letter validation and tracking.
* ASCII Hangman drawings for incorrect guesses.
* Basic error handling for invalid input.

Installation

1. Clone the repository:

git clone https://github.com/roverkim/Hangman-Node

2. Navigate to the project directory:

cd Hangman-Node

3. Install dependencies:

npm install

4. Run the game:

node index.js

5. Start the game (Y - Yes or N - No), then select your game difficulty Easy, Medium or Hard!

Project Structure

To keep the code modular, the project is divided into multiple files:
* index.js – Entry point; initializes a new game instance.
* constructors/gameConstructor.js – Handles game logic and word selection.
* constructors/wordConstructor.js – Manages word processing and letter objects.
* constructors/letterConstructor.js – Defines letter behavior and state tracking.
* assets/hangmanDrawings.js – Stores ASCII Hangman figures for incorrect guesses.
* assets/questions.js – Contains Inquirer.js prompts for user interaction.
* assets/word.txt – A list of words used in the game. You can add custom words, ensuring each word is on a separate line.

How It Works

1. A random word is selected from word.txt.
2. Each letter in the word is transformed into an object.
3. Players enter letter guesses through the terminal.
4. Correct guesses reveal letters; incorrect guesses display Hangman drawings.
5. The game ends when the word is fully guessed or the Hangman figure is completed.

Development Notes
* Function constructors were used to implement various objects.
* A custom promise ensures the game object is initialized with a valid word before the game starts.
* Basic error handling prevents invalid input.

Enjoy the game, good luck! 

