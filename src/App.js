import useSpeedType from './hooks/useSpeedType'
import './App.css';

const App = () => {

  const {
    textRef,
    text,
    handleChange,
    isRunning,
    timeRemaining,
    numWords,
    startGame,
    startingTime
  } = useSpeedType(10);

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        ref={textRef}
        value={text}
        onChange={handleChange}
        disabled={!isRunning}
      />
      <h3>{isRunning ? `Time remaining: ${timeRemaining} seconds` : 'Check your typing speed!'}</h3>
      <button
        onClick={() => startGame()}
        disabled={isRunning}
      >Start</button>
      {numWords ? <h2>Your result: <br /> {numWords} words in {startingTime} seconds</h2> : ''}
    </div>
  );
}

export default App;
