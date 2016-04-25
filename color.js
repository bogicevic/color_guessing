// initial variable values
var numSquares = 6;
var colors = [];
var pickedColor;

// selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setUpEventListeners();
  setUpSquares();
  reset();
}

function setUpEventListeners() {
  // mode buttons, hard/easy
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      // if else verison
      // if (this.textContent === "Easy") {
      //   numSquares = 3;
      // } else {
      //   numSquares = 6;
      // }
      // does the same as ternary operator version, if prefered
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
  // reset button
  resetButton.addEventListener("click", function(){
    reset();
  });
}

function setUpSquares() {
  for(var i = 0; i < squares.length; i++){
    // add click listeners to squares
    squares[i].addEventListener("click", function(){
      // grab full string containing color of clicked square
      var clickedColorFullString = this.style.background;
      // housekeeping of full string to extract just a color
      var clickedColor = clickedColorFullString.slice(0, clickedColorFullString.indexOf(")") + 1);
      // compare color to pickedColor
      if(clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?"
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // change coloer display to match picked color
  colorDisplay.textContent = pickedColor;
  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}

function changeColors(color){
  // loop through all squares
  // change each color to match given color
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    // repeat num times
    for (var i = 0; i < num; i++) {
      // get random color and push into arr
      arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor(){
  // generate R from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // generate G from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // generate B from 0 - 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
