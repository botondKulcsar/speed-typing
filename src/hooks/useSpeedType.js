import { useState, useEffect, useRef } from "react"

const useSpeedType = (startingTime = 10) => {

    const [timeRemaining, setTimeRemaining] = useState(startingTime);
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
        setTimeRemaining(startingTime)
        setNumWords(0);
        textRef.current.disabled = false;
        textRef.current.focus();
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    return {
        textRef,
        text,
        handleChange,
        isRunning,
        timeRemaining,
        numWords,
        startGame,
        startingTime
    }

}

export default useSpeedType