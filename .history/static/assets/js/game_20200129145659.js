class RandNumGame extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="playGuessNum" className="body">
        <title>Guess a Number</title>
        <h1>Number Guessing Game</h1>
        <div id="statusArea" />
        <input type="number" id="userGuess" size="20" />
        <div id="buttonArea" className="button">
          Start
        </div>
        <div id="historyArea">
          <h2>Your Previous Guesses</h2>
          <table>
            <tr>
              <th>Lowest</th>
              <th>Highest</th>
            </tr>
            <tr>
              <td id="histLow" />
              <td id="histHigh" />
            </tr>
          </table>
          <ol id="historyList" />
        </div>
        <br />
        <div id="footerArea">
          This is created by Marcus Tan to practise React.
        </div>
      </div>
    );
  }
}

React.render(<RandNumGame />, document.getElementById("game"));

const maxAttempt = 15,
  minNum = 0,
  maxNum = 1000,
  helpActvCnt = 5,
  priceCnt = 5;
var secretNumber = 0,
  noAttempt = 0,
  remAttempt = 10;

function writeMessage(elementId, message, appendMessage) {
  var elemToUpdate = document.getElementById(elementId);
  if (appendMessage) {
    elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
  } else {
    elemToUpdate.innerHTML = message;
  }
}

function newGame() {
  secretNumber = Math.floor(Math.random() * maxNum) + 1;
  noAttempt = 0;
  remAttempt = maxAttempt;
  writeMessage(
    "statusArea",
    "<p>Guess a number between " +
      minNum +
      "-" +
      maxNum +
      ". Good luck!</p>" +
      "<p>You only has " +
      maxAttempt +
      " attempts.</p>"
  );
  writeMessage("historyList", "");
  writeMessage("buttonArea", "<p>Start</p>");
  writeMessage("histHigh", "");
  writeMessage("histLow", "");
}

function guessInRange(guess) {
  return guess >= minNum && guess <= maxNum;
}

function userGuessed() {
  var userGuessed = document.getElementById("userGuess").value;
  var statusArea = document.getElementById("statusArea");
  var historyList = document.getElementById("historyList");
  var buttonArea = document.getElementById("buttonArea");
  var histHigh = document.getElementById("histHigh");
  var histLow = document.getElementById("histLow");

  if (remAttempt != 0) {
    if (userGuessed.length == 0 || !guessInRange(userGuessed)) {
      // Nothing entered or our of range.
      writeMessage(
        "statusArea",
        "<p>Please enter a number " +
          minNum +
          "-" +
          maxNum +
          " and press the button.</p>"
      );
    } else if (userGuessed.indexOf(".") != -1) {
      writeMessage(
        "statusArea",
        "<p>Please enter a whole number " +
          minNum +
          "-" +
          maxNum +
          " and press the button.</p>"
      );
    } else {
      noAttempt++;

      if (userGuessed == secretNumber) {
        // Got it
        writeMessage(
          "statusArea",
          "<p>You did it!! Correct answer is " +
            secretNumber +
            ".</p>" +
            "<p>I know you can do it! It only took you " +
            noAttempt +
            " guesses.</p>" +
            "<p>Let's play it again.</p>"
        );
        newGame();
      } else if (userGuessed < secretNumber) {
        writeMessage("statusArea", "<p>Nope, try higher number.</p>");
        writeMessage(
          "historyList",
          "<li>" + userGuessed + " (too low)</li>",
          true
        );
        writeMessage("histLow", userGuessed);
      } else {
        writeMessage("statusArea", "<p>Go lower, try again.</p>");
        writeMessage(
          "historyList",
          "<li>" + userGuessed + " (too high)</li>",
          true
        );
        writeMessage("histHigh", userGuessed);
      }
    }
    remAttempt--;

    if (remAttempt > 0) {
      if (remAttempt == 1) {
        writeMessage("buttonArea", "<p>Last Chance!</p>");
      } else {
        writeMessage("buttonArea", remAttempt);
      }
      if (noAttempt =helpActvCnt) {
        littleHelp();
      }
    } else {
      writeMessage(
        "statusArea",
        "<p>Not your lucky day, huh? " +
          "Answer is " +
          secretNumber +
          ". Let's try it again...</p>"
      );
      writeMessage("buttonArea", "<p>Try Again.</p>");
      newGame();
    }
  }

  document.getElementById("userGuess").value = "";
}

function littleHelp() {
  var helper = document.getElementById("historyArea");
  if (helper.style.display === "none") {
    helper.style.display = "block";
  } else {
    helper.style.display = "none";
  }
}

window.onload = function() {
  newGame();
  document.getElementById("buttonArea").addEventListener("click", userGuessed);
};
