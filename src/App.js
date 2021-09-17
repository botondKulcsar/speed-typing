import { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {
  const STARTING_TIME = 10;

  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [text, setText] = useState('');
  const [numWords, setNumWords] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const textRef = useRef(null);

  const calculateWords = (text) => text.trim().split(' ').map(word => word).length;

  const endGame = () => {
    setIsRunning(false);
    const wordsTyped = calculateWords(text);
    setNumWords(wordsTyped)
  }

  useEffect(() => {
    if (timeRemaining > 0 && isRunning) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeRemaining <= 0) {
      endGame();
    }
    
  }, [timeRemaining, isRunning]);

  const startGame = () => {
    setIsRunning(true);
    setText('');
    setTimeRemaining(STARTING_TIME)
    setNumWords(0);
    textRef.current.disabled = false;
    textRef.current.focus();
  }

  const handleChange = (event) => {
    setText(event.target.value);
  }

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        ref = { textRef }
        value = { text }
        onChange = { handleChange }
        disabled = { !isRunning }
       />
      <h3>{isRunning ? `Time remaining: ${ timeRemaining } seconds` : 'Check your typing speed!'}</h3>
      <button
        onClick = { () => startGame() }
        disabled = { isRunning }
      >Start</button>
      { numWords ? <h2>Result: <br /> { numWords } words in {STARTING_TIME} seconds</h2> : '' }
    </div>
  );
}

export default App;
