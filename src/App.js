import React from "react";
import { useState, useEffect, useRef } from "react";


function App() {
  //initialized the time consatnt
  const STARTING_TIME = 10;
  //A use state to get the text from  the text area
  const [text, setText] = useState(""); 
  //A use State to declare the tme and a setTimeRemaining function to update the time
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  //A use state to declare the game runnung state and a setGameRunning function to update the game running state
  const [gameRunning, setGameRunning] = useState(false);
  //A use state to declare the word count and a setWordCount function to update the word count
  const [wordCount, setWordCount] = useState(0);
  //A use ref to get the text area element
  const textAreaRef = useRef(null);

 
//Afunction that gets the word  value from the text area
  function handleChange(event) {
    const { value } = event.target;
    //console.log(value.length);
     setText( prevValue => value);
  }
  //A function that gets the length of the strings passed to the text area and converts it to an array
  function calculateWordLength(text){
    return (text.trim().split(" ").filter( word => word !== " ").length);
  }
  //A function that starts the game
  function startGame() {
    setGameRunning(prevGameRunning => !prevGameRunning)
    // setGameRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    setWordCount(0);
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
  }
  
  function endGame() {
    setWordCount(calculateWordLength(text));
    setGameRunning(false);
}


useEffect(() => {
  if(timeRemaining > 0 && gameRunning) {
      setTimeout(() => {
          setTimeRemaining(time => time - 1)
      }, 1000)
  } else if(timeRemaining === 0) {
      endGame();
  }
  
}, [timeRemaining, gameRunning])

  return (
    <section>
      <div className="card">
        <h1>Typing Game</h1>
        <p>How fast can you type?</p>
        <textarea placeholder="Start Typing..." onChange={handleChange} 
        value={text} disabled={!gameRunning} ref={textAreaRef} />
        <h4>Time Remaining:{timeRemaining}</h4>
        <button onClick={startGame} disabled={gameRunning}>
          Start
        </button>
        <h1>Word Count:{wordCount}</h1>
      </div>
    </section>
  );
}

export default App;
