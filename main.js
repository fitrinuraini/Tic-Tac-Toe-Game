$(document).ready(function() {
  var optionsButton = document.getElementById("options_scalable");
  var o_win = 0;
  var x_win = 0;
  optionsButton.addEventListener("click", function(){
    optionsButton.innerHTML = "Reset";
    
    function isEven(value){
        if (value % 2 == 0) {
            return true;
        } else {
            return false;
      };
    };
    
    function isOdd(value){
      if (value % 1 == 0) {
        return true;
      } else {
        return false;
      };
    };
    
    function allSame(array) {
        var first = array[0];
    
        if (array[0] == "") {
          return false;
        } else {
          return array.every(function(element) {
              return element == first;
          });
        };
    };
    
    var customColor = document.getElementById("color").value;
    var boardScale = parseInt(document.getElementById("scale").value);

    if (boardScale <2 || boardScale >10) {
      alert("Attention! The minimum scale is 2 and the maximum is 10.")
    } else {
      var numSquares = (boardScale * boardScale);
    
      document.getElementById("game").innerHTML = '<div id="board"></div>';
      var board = document.getElementById("board");
      board.style.margin = '0 auto';
      board.style.height = (100 * boardScale) + 'px';
      board.style.width = (100 * boardScale) + 'px';
      board.style.border = 'solid 1px black';
      
      for (var i = 0; i < numSquares; i++) {
        board.innerHTML += '<div class="square"></div>';
      };
    
      var squares = document.getElementsByClassName("square");
      for (var i = 0; i < numSquares; i++) {
        squares[i].style.height = '100px';
        squares[i].style.width = '100px';
        squares[i].style.float = "left";
        squares[i].style.lineHeight = "100px";
        squares[i].setAttribute("id", i.toString());
      };
    
      if (numSquares % 2 !== 0) {
        for (var i = 0; i < numSquares; i += 2) {
          squares[i].style.backgroundColor = customColor;
        };
      } else {
        for (i = 0; i < numSquares; i += 1) {
          if (isEven(i/boardScale)) {
            for (var squareNum = i; squareNum < (i + boardScale); squareNum += 2) {
              squares[squareNum].style.backgroundColor = customColor;	
            };
          } else if (isOdd(i/boardScale)) {
            for (var squareNum = i+1; squareNum < (i + boardScale); squareNum += 2) {
              squares[squareNum].style.backgroundColor = customColor;	
            };
          } else {
          };
        };
      };
    
      var indicator = document.getElementById("indicator")
      indicator.style.color = "red";
      indicator.style.fontWeight = "100";
      indicator.innerHTML = "Turn: X";
      var boardClicks = 0;
      var winnerFound = false;

      board.addEventListener("click", function() {
      if (determineWinner()) {
        indicator.style.color = "green";
        indicator.style.fontWeight = "900";
        indicator.innerHTML = winningPlayer[0] + ' wins!';
        if (winningPlayer[0] == 'O'){
          o_win++;
          $('#o_win').text(o_win);
        } else {
          x_win++;
          $('#x_win').text(x_win);
        }

        winnerFound = true;
        alert(winningPlayer[0] + ' has won the game. Start a new game.')
        determineWinner = function() {
          return false;
        };
      } else if (isEven(boardClicks)) {
        indicator.style.color = "blue";
        indicator.style.fontWeight = "100";
        indicator.innerHTML = "Turn: O";
      } else {
        indicator.style.color = "red";
        indicator.style.fontWeight = "100";
        indicator.innerHTML = "Turn: X";
      };
      boardClicks++;
      });
    
      var squareClicks = [];
      for (var i = 0; i < numSquares; i++) {
        squareClicks[i] = 0;
      };
    
      var winningPlayer;
      var determineWinner = function() {
        for (i = 0; i < numSquares; i += 1) {
          if ((i % boardScale) == 0) {
            var rowCheck = [];
            for (var squareNum = i; squareNum < (i + boardScale); squareNum += 1) {
              rowCheck.push(squares[squareNum].innerHTML);
            };
      
            if (allSame(rowCheck)) {
              winningPlayer = rowCheck;
              return true;
            };
          };
        };

        for (i = 0; i < numSquares; i += 1) {
          if (i < boardScale) {
            var colCheck = [];
            for (var squareNum = i; squareNum < numSquares; squareNum += boardScale) {
              colCheck.push(squares[squareNum].innerHTML);
            };
            
            if (allSame(colCheck)) {
              winningPlayer = colCheck;
              return true;
            };	
          };
        };

        var diag1Check = [];
        for (i = 0; i < numSquares; i += 1) {
          if ((i % (boardScale + 1)) == 0) {
            diag1Check.push(squares[i].innerHTML);
          };
        };
        if (allSame(diag1Check)) {
          winningPlayer = diag1Check;
          return true;
        };

        var diag2Check = [];
        for (i = (boardScale - 1); i < (numSquares - 1); i += 1) {
          if ((i % (boardScale - 1)) == 0) {
            diag2Check.push(squares[i].innerHTML);
          };
        };
        if (allSame(diag2Check)) {
          winningPlayer = diag2Check;
          return true;
        };
      };
    
      var count = 0;
      var countClicks = function() {
        var divID = this.getAttribute("id");
        squareClicks[divID] += 1;
        if (isEven(boardClicks) && squareClicks[divID] == 1) {
          this.innerHTML = 'X';
          this.style.color = "red";
          count++;
        } else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
          this.innerHTML = 'O';
          this.style.color = "blue";
          count++;
        } else if (!determineWinner()){
          alert('Already selected');
          boardClicks -= 1;
        };

        if (determineWinner()) {
          for (var i = 0; i < numSquares; i++) {
            squareClicks[i] = 2;
          };
          document.getElementById("options_scalable").innerHTML = "Play again?"
        } else if (count == numSquares && !winnerFound){
          alert('Its a tie. Start a new game.')
          document.getElementById("options_scalable").innerHTML = "Play again?"
        };
      };
    
      for (var i = 0; i < numSquares; i++) {
        squares[i].addEventListener("click", countClicks);
      };
    }
  });
});