let hardMode = false;
let tiles = document.getElementsByClassName('tile')
let pieces;
let imgs;
let board;
let hardTiles = document.getElementsByClassName('hard')
let count = 0;
let lastPiece;
let lastTile;

init();

// tile = tiles[i]

for (let i = 0; i < tiles.length; i++) {
	let tile = tiles[i];
    tile.addEventListener('click', function () {
		let piece = tile.querySelector('.piece')
		if (!(piece.classList.contains('display')) && count > -1) {
			count++
			piece.classList.add('display')
			if (count === 2) {    
				count = 0
				if (piece.src !== lastPiece.src) {
					// this is to fix the bug where i could keep playing before hiding the incorrect pairs again (in setTimout)
					count = -1 // <---
					// causing to mess up my lastPiece variable, this way 'click' event is blocked.
					setTimeout(function() {
						piece.classList.remove('display')
						lastPiece.classList.remove('display')
						count = 0
					}, 900)
				} else {
					piece.setAttribute('id', 'piece-animation')
					lastPiece.setAttribute('id', 'piece-animation')
					tile.setAttribute('id', 'tile-animation')
					lastTile.setAttribute('id', 'tile-animation')
				}
			} else {
				lastPiece = piece
				lastTile = tile;
			}
		}
    })
}

document.getElementById('newgame').addEventListener('click', init)

document.getElementById('diff').addEventListener('click', function() {
	let diffBtn = document.getElementById('diff');
	if (diffBtn.textContent === 'hard mode') diffBtn.textContent = 'easy mode'
	else diffBtn.textContent = 'hard mode'
	hardMode === false ? hardMode = true : hardMode = false
	init();
});

function init() {

	if (hardMode) {
		imgs = ["img/bat.svg", "img/bat.svg", "img/beetle.svg", "img/beetle.svg", "img/chinese_dragon.svg", "img/chinese_dragon.svg", "img/crow.svg", "img/crow.svg", "img/dog.svg", "img/dog.svg", "img/flying_fish.svg", "img/flying_fish.svg", "img/frog.svg", "img/frog.svg", "img/ibex.svg", "img/ibex.svg", "img/killer_whale.svg", "img/killer_whale.svg", "img/mammoth.svg", "img/mammoth.svg", "img/mantaray.svg", "img/mantaray.svg", "img/monkey.svg", "img/monkey.svg", "img/owl.svg", "img/owl.svg", "img/peacock.svg", "img/peacock.svg", "img/rabbit.svg", "img/rabbit.svg", "img/ram.svg", "img/ram.svg", "img/salamander.svg", "img/salamander.svg", "img/turtle.svg", "img/turtle.svg", "img/cobra.svg", "img/cobra.svg", "img/alligator.svg", "img/alligator.svg"]
		pieces = document.getElementsByClassName('piece')
		board = document.querySelector(".board")
		board.classList.add("hard-board")
		for (let i = 0; i < hardTiles.length; i++) {
			hardTiles[i].removeAttribute("style")
		}
	} else {
		imgs = ["img/bat.svg", "img/bat.svg", "img/beetle.svg", "img/beetle.svg", "img/chinese_dragon.svg", "img/chinese_dragon.svg", "img/crow.svg", "img/crow.svg", "img/dog.svg", "img/dog.svg", "img/flying_fish.svg", "img/flying_fish.svg", "img/frog.svg", "img/frog.svg", "img/ibex.svg", "img/ibex.svg", "img/killer_whale.svg", "img/killer_whale.svg", "img/mammoth.svg", "img/mammoth.svg"]
		for (let i = 0; i < hardTiles.length; i++) {
			hardTiles[i].style.display = "none";
		}
		board = document.querySelector(".board")
		board.classList.remove('hard-board')
	}

	copyImgs = shuffle(imgs);

	for (let tile of tiles) {
		let piece = tile.querySelector(".piece");
		tile.removeAttribute('id')
		piece.classList.remove('display')
		piece.removeAttribute('id')
		piece.src = copyImgs.pop()
	}
}

function shuffle(imgs) {
	let copyImgs = [];
	for (let img of imgs) {
		copyImgs.push(img);
	}
	let currentIndex = copyImgs.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = copyImgs[currentIndex];
    copyImgs[currentIndex] = copyImgs[randomIndex];
    copyImgs[randomIndex] = temporaryValue;
	}
	return copyImgs
}
