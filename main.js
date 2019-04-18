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

document.addEventListener('click', function (event) {

	// check if element selected contains either black or white
	if (!event.target.classList.contains('black') && !event.target.classList.contains('white')) return;

	event.target.classList.add("highlight");

	console.log("event.target",event.target);
	console.log("event.target closest",event.target.closest(":not(div)"));
	console.log("this square is ",Array.prototype.indexOf.call(chessboard.children, event.target));

	if(event.target.innerHTML.length) {
		event.target.classList.add("moves");
		if (event.target.innerHTML == "♟") {
			console.log("it's a pawn!");
			event.target.closest("div").classList.add("moves");
		}
	}

}, false);