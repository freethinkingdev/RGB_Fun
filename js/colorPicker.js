/**
 * Created by marcin on 09/05/17.
 */
var colorDivs = document.querySelectorAll("#colorDivsGroup .colorDivs");
var gameFeedbackSpan = document.querySelector("#gameFeedback");
var btnResetGame = document.querySelector("#btnResetGame");
var horizontalStripe = document.querySelector("#stripe");
var btnHardMode = document.querySelector("#btnGameModeHard");
var gameModeButtons = document.querySelectorAll(".gameMode");
var titlePickedColorSpan = document.querySelector("#pickedColor");
var colors = generateArrayWithRandomColors(6);
var hardGameMode = true;

appInit();
btnResetGame.addEventListener("click", funcResetGameColors);
changeSquareColors(colorDivs, colors);
/*Main initialization function that runs at the beginning of the app*/
function appInit() {
    btnHardMode.classList.add("activeButton");
    titlePickedColorSpan.textContent = colors[generateRandomNumber(6)];

    for (var i = 0; i < gameModeButtons.length; i++) {
        gameModeButtons[i].addEventListener("click", function () {
            var gameModeNumberOfTiles;
            funcResetGameColors();
            gameModeButtons[0].classList.remove("activeButton");
            gameModeButtons[1].classList.remove("activeButton");
            this.classList.add("activeButton");

            if (this.textContent === "Easy") {

                gameModeNumberOfTiles = 3;
                hardGameMode = false;
                colors = generateArrayWithRandomColors(gameModeNumberOfTiles);
                changeSquareColors(colorDivs, colors);
                titlePickedColorSpan.textContent = colors[generateRandomNumber(gameModeNumberOfTiles)];

            } else {
                hardGameMode = true;
                gameModeNumberOfTiles = 6;
                colors = generateArrayWithRandomColors(gameModeNumberOfTiles);
                changeSquareColors(colorDivs, colors);
                titlePickedColorSpan.textContent = colors[generateRandomNumber(gameModeNumberOfTiles)];
            }
        })
    }
}
/*Function returning random number based on provided number*/
function generateRandomNumber(num) {
    return Math.floor(Math.random() * num);
}
/*Function generating 1 random rgb color*/
function generateRandomRGBColor() {
    return "rgb("
        + Math.floor(Math.random() * 256) + ", "
        + Math.floor(Math.random() * 256) + ", "
        + Math.floor(Math.random() * 256) + ")";
}
/*Function that generates array with a random rgb colors. Array length is provided in argument*/
function generateArrayWithRandomColors(arraysElements) {
    var newArray = [];
    for (var i = 0; i < arraysElements; i++) {
        newArray.push(generateRandomRGBColor());
    }
    return newArray;
}
/*Function resets elements color to white */
function resetElementToDefaultColors(element) {
    element.style.color = 'white';
    // element.style.textShadow = "none";
}
/*Function responsible for the click event for the buttons*/
function funcColorSquareClick() {
    // alert(this.style.backgroundColor);

    /*If user answered correctly*/
    if (this.style.backgroundColor === titlePickedColorSpan.textContent) {
        horizontalStripe.style.backgroundColor = this.style.backgroundColor;
        btnResetGame.textContent = "Play again?";
        gameFeedbackSpan.textContent = "Correct!";
        titlePickedColorSpan.style.color = this.style.backgroundColor;
        // titlePickedColorSpan.style.textShadow = "1px 1px 2px black";
        for (var i = 0; i < colorDivs.length; i++) {
            colorDivs[i].style.backgroundColor = titlePickedColorSpan.textContent;
        }
    }
    /*If user made a mistake*/
    else {
        gameFeedbackSpan.textContent = 'Try again!';
        this.style.backgroundColor = 'white';
        this.style.border = '0px';
        this.style.boxShadow = 'none';
    }
}
/*Function that changes color divs background color*/
function changeSquareColors(squareList, colorsArray) {

    for (var i = 0; i < squareList.length; i++) {
        if (i >= colors.length) {
            squareList[i].style.display = 'none';
        } else {
            squareList[i].style.display = 'block';
            squareList[i].style.backgroundColor = colorsArray[i];
            squareList[i].addEventListener("click", funcColorSquareClick);
        }
    }
}
/*Function responsible for resetting divs colors and change button labels*/
function funcResetGameColors() {
    if (hardGameMode == true) {
        colors = generateArrayWithRandomColors(6);

        titlePickedColorSpan.textContent = colors[generateRandomNumber(6)];
    } else {
        colors = generateArrayWithRandomColors(3);
        titlePickedColorSpan.textContent = colors[generateRandomNumber(3)];

    }
    for (var i = 0; i < colorDivs.length; i++) {
        colorDivs[i].style.backgroundColor = colors[i];
        colorDivs[i].addEventListener("click", funcColorSquareClick);
    }
    resetElementToDefaultColors(titlePickedColorSpan);
    btnResetGame.textContent = "New Colors";
    horizontalStripe.style.backgroundColor = "white";
    gameFeedbackSpan.textContent = "";
}


