let tiles = document.getElementsByClassName('tile')
let count = 0;
let lastPiece;
let pieces = document.getElementsByClassName('piece')

for (let tile of tiles) {
    tile.addEventListener('click', function () {
		let piece = tile.querySelector('.piece')
		if (piece.id !== 'display' && count > -1) {
			count++
			piece.setAttribute('id', 'display')
			if (count === 2) {    
				count = 0
				if (piece.src !== lastPiece.src) {
					// this is to fix the bug where i could keep playing before hiding the incorrect pairs again (in setTimout)
					count = -1 // <---
					// causing to mess up my lastPiece variable, this way 'click' event is blocked.
					setTimeout(function() {
						piece.removeAttribute('id')
						lastPiece.removeAttribute('id')
						count = 0
					}, 700)
				}
			} else lastPiece = piece
		}
    })
}

document.getElementById('newgame').addEventListener('click', function () {
	let imgs = shuffle(pieces);

	for (let piece of pieces) {
		piece.removeAttribute('id')	
		piece.src = imgs.pop()
	}
})

function shuffle(pieces) {
	let imgs = []
	for (let piece of pieces) {
		imgs.push(piece.src)
	}
	let currentIndex = imgs.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = imgs[currentIndex];
    imgs[currentIndex] = imgs[randomIndex];
    imgs[randomIndex] = temporaryValue;
	}
	return imgs
}
