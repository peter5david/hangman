import words from './dictionary.txt';

// use the dictionary. txt to get the words to play
let WordsToPlay=[];

fetch(words)
.then(r => r.text())
.then(text => {
 
let array = text.split('\n');
    for (let i=0; i <= array.length-1; i++){
        WordsToPlay.push(array[i]);
    }

});
 
function randomWord() {
    return WordsToPlay[Math.floor(Math.random() * WordsToPlay.length)]
} 

export {randomWord} 
