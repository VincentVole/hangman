$(document).ready(function(){
	let gameStart = false;
	let wins = 0;
	let losses = 0;
	let guesses;
	let words = ['cate', 'doggos', 'floofer', 'pupper', 'snek', 'birb'];
	let targetWord;
	let curWord;
	let guessedLetters = {};
	let gameEnd = false;
	
	function resetWord(){
		targetWord = words[Math.floor(Math.random() * words.length)];
		curWord = [];
		for(let i = 0; i < targetWord.length; i++){
			curWord.push('_');
		}
		$('#word').text(curWord.join(' '));
		// console.log(targetWord);
	}

	$(document).on('keypress', function(e){
		if(!gameStart){
			gameStart = true;
			guesses = 10;

			resetWord();
			$('#game').show();
			$('#reset').hide();
		}
		else if(!gameEnd){
			let playerChoice = String.fromCharCode(e.keyCode);
			if(!guessedLetters.hasOwnProperty(playerChoice)){
				guessedLetters[playerChoice] = true;
				$('#guessedLetters').text(`Guessed letters: ${Object.keys(guessedLetters).join(' ')}`)


				for(let i = 0; i < targetWord.length; i++){
					if(targetWord[i] == playerChoice){
						curWord[i] = playerChoice;
					}
				}
				$('#word').text(curWord.join(' '));

				guesses--;
				$('#guesses').text(`Guesses: ${guesses}`);

				if(!curWord.includes('_')){
					wins++;
					$('#wins').text(`Wins: ${wins}`);
					gameEnd = true;
					$('#reset').show();
				}			
				else if(guesses == 0){
					losses++;
					$('#losses').text(`Losses: ${losses}`)
					gameEnd = true;
					$('#reset').show();
				}
			}
		}
	})

	$('#reset').on('click', function(){
		gameEnd = false;
		resetWord();
		guesses = 10;
		$('#guesses').text(`Guesses: ${guesses}`);

		guessedLetters = {};
		$('#guessedLetters').text('Guessed letters: ');

		$('#reset').hide();
	})


})