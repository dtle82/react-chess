var chessboard = document.getElementById("chessboard");

// first row
chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9820;</div>
<div class="black">&#9822;</div>
<div class="white">&#9821;</div>
<div class="black">&#9819;</div>
<div class="white">&#9818;</div>
<div class="black">&#9821;</div>
<div class="white">&#9822;</div>
<div class="black">&#9820;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9814;</div>
<div class="white">&#9816;</div>
<div class="black">&#9815;</div>
<div class="white">&#9813;</div>
<div class="black">&#9812;</div>
<div class="white">&#9815;</div>
<div class="black">&#9816;</div>
<div class="white">&#9814;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="bottom-notation">a</div>
    <div class="bottom-notation">b</div>
    <div class="bottom-notation">c</div>
    <div class="bottom-notation">d</div>
    <div class="bottom-notation">e</div>
    <div class="bottom-notation">f</div>
    <div class="bottom-notation">g</div>
    <div class="bottom-notation">h</div>`);

document.addEventListener('click', function (event) {
	var boardNotation;
	var possibleMoves;
	// check if element selected contains either black or white
	if (!event.target.classList.contains('black') && !event.target.classList.contains('white')) return;

	// clear the board of all previous highlight/select classes
	clear_board();

	event.target.classList.add("highlight");

	boardNotation = getBoardNotation(event.target);
	console.log("this square is ", boardNotation);

	if(event.target.innerHTML.length) {
		event.target.classList.add("selected");
		if (event.target.innerHTML == "♟") {
			console.log("it's a black pawn!");
			possibleMoves = getPossibleMoves(boardNotation,"black pawn");
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves);
		}
		if (event.target.innerHTML == "♙") {
			console.log("it's a white pawn!");
			possibleMoves = getPossibleMoves(boardNotation,"white pawn");
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves);
		}
	}

}, false);

function getBoardNotation(paramTarget) {
	var index = Array.prototype.indexOf.call(chessboard.children, paramTarget);
	var rank;
	var file;

	var rank_arr = [8,7,6,5,4,3,2,1];
	var file_arr = ["a","b","c","d","e","f","g","h"];

	rank = rank_arr[Math.floor(index/8)];
	file = file_arr[index % 8];

	console.log("algebraic notation", file+rank);

	return index;
}

function getPossibleMoves(boardIndex,boardPiece) {
	var moveset = [];
	if(boardPiece == 'black pawn') {
		moveset.push(boardIndex+8);
		moveset.push(boardIndex+16);
	}
	if(boardPiece == 'white pawn') {
		moveset.push(boardIndex-8);
		moveset.push(boardIndex-16);
	}
	return moveset;
}

function highlightPossibleMoves(movelist) {
	movelist.map(function(value){
		document.querySelectorAll('#chessboard')[0].children[value].classList.add("moves");
	});
}

function clear_board() {
	Array.from(document.querySelectorAll('#chessboard')[0].children).map(function(ele){
		ele.classList.remove("selected");
		ele.classList.remove("highlight");
		ele.classList.remove("moves");
	});
}