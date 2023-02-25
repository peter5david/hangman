//import the components
import React, {Component} from "react";
import { randomWord } from "./Words";
import Hide from "./Hide.js";

// import all of the picture, what is used to display the hangman
import state1 from '../img/state1.jpeg';
import state2 from '../img/state2.GIF';
import state3 from '../img/state3.GIF';
import state4 from '../img/state4.GIF';
import state5 from '../img/state5.GIF';
import state6 from '../img/state6.GIF';
import state7 from '../img/state7.GIF';
import state8 from '../img/state8.GIF';
import state9 from '../img/state9.GIF';
import state10 from '../img/state10.gif';
import state11 from '../img/state11.GIF';

class Hangman extends Component {

    //set up the images and the max wrong steps
    static defaultProps= {
        maxWrong: 10,
        images: [state1,state2,state3,state4,state5,state6,state7,state8,state9,state10,state11]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set([]),
            answer: ''
    
        }
    }
    // declare the word which is a from a random word function
    async fetchWord(){
         const word = await randomWord();
    
        this.setState({ answer: word });
    
    }

    // guess word function, to display the _
    guessWord(){
        console.log(this.state);
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
    }

    // handle the guesses
    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    // generate the buttons
    generateButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button key={letter} value={letter} onClick={this.handleGuess} disabled={this.state.guessed.has(letter)} className="abcButtons">
                {letter}
            </button>
        )
    );
    }
    // restart the game with the reset button
    resetButton = () => {
        this.setState ({
            mistake: 0,
            guessed: new Set([]),
            answer: this.fetchWord()
        });
    }

    

      render(){
        if(this.state.answer != '' && typeof this.state.answer !== "undefined"){
            
        
        let gameOver = this.state.mistake >= this.props.maxWrong;
        let isWinner = this.guessWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();

  // display if winner
        if (isWinner) {
            gameStat = "You won the word is: " + this.state.answer;
        } 
        // display if lost
        if (gameOver) {
            gameStat = "You lost the word was: " +this.state.answer;
        }

        return (
            <div className="container">
                <h1>Capstone Project</h1>
                <h2>Hangman Game</h2>
              <div className="wrongGuesses">
                Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
                </div> 
              <div>
                <img src={this.props.images[this.state.mistake]} alt="hangman"/>
                </div> 
                <div>
                    <p className="startToPlay">Lets start to play</p>
                    <p className="gameWords">{!gameOver ? this.guessWord() : this.state.answer}</p>
                    <p className="gameStatDisplay">{gameStat}</p>
                    <button onClick={this.resetButton} className="restartGameButton">Restart the game</button>
                </div>
                <div className="hideHelp">
                   <Hide /> 
                </div>
            </div>
        )
        }
        else{
            this.fetchWord();
        }
    }
}

export default Hangman;