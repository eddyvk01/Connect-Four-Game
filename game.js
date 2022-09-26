var player1 = prompt("Player one: Enter your Name, \n You will be BLUE");
var player1color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your Name, \n You will be Red");
var player2color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

//just for debugging if find any
function reportWin(rowNum, colNum) {
  console.log("You won starting at this row ,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row >=0; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined);
}

//check for horizontal wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if ( colorMatchCheck( returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
        console.log("horizontal");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

//check for vertical wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if ( colorMatchCheck( returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
        console.log("vertical");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

//check for Diagonal wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if ( colorMatchCheck( returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
        console.log("Diagonal");
        reportWin(row, col);
        return true;
      } else if (
        colorMatchCheck( returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
        console.log("Diagonal");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

var currentplayer = 1;
var currentName = player1;
var currentColor = player1color;

$("h3").html("<b>" + player1 + "</b>" + " it is your turn , pick a column to drop in! ");
//The closest() method returns the first ancestor of the selected element.
$(".board button").on("click", function () {
  var col = $(this).closest('td').index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').html("<b>" + currentName + "</b>" + " You Have Won The Game !! <br> <b> For Restart the game refresh the page ( <i>ctrl +R </i>)</b> ");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    alert(currentName + " You Have Won The Game !! ");
  }
  currentplayer = currentplayer * -1;

  if (currentplayer === 1) {
    currentName = player1;
    $("h3").html("<b>" + currentName + "</b>" + " it is your turn, pick a column to drop in!  ");
    currentColor = player1color;
  } else {
    currentName = player2;
    $("h3").html("<b>" + currentName + "</b>" + " it is your turn, pick a column to drop in! ");
    currentColor = player2color;
  }
});
