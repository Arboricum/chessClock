import { useEffect, useState } from "react";

const DEFAULT_INTERVAL = 1000;

export default function WhiteClock(
  { 
    time, 
    whiteClockIsRunning, 
    handleGameEnded, 
    gameEnded,
    handleWhiteClock,
    isGamePaused
  }) {
  const [clockTime, setClockTime] = useState({
    minutes: Number(time.minutes),
    seconds: Number(time.seconds)
  })
  const {minutes, seconds} = clockTime
  const remainingTime = time.remainingTime

  useEffect(() => {
    let timeOut;
    if (whiteClockIsRunning) {
      timeOut = setTimeout(() => {
        handleGameEnded();
        console.log('time out')
      }, remainingTime);
    } else if (!whiteClockIsRunning) {
      console.log('time out 2')
      clearTimeout(timeOut);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [remainingTime, whiteClockIsRunning, handleGameEnded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime((prevTime) => {
        return {
          seconds: prevTime.seconds === 0 ? 59: prevTime.seconds - 1,
          minutes: prevTime.seconds === 0 ? prevTime.minutes - 1: prevTime.minutes
        }
      })
    }, DEFAULT_INTERVAL);
    if (!whiteClockIsRunning || gameEnded) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [whiteClockIsRunning, gameEnded]);

  const handleClick = () => {
    handleWhiteClock(minutes, seconds);
  }

  return (
    <button 
      onClick={handleClick} 
      disabled={isGamePaused || !whiteClockIsRunning}
      className="timer-button"
    >
      {time ? (
        <>
          <p className="timer-white">
            <span className="timer-values">
              {String(minutes).padStart(2, "0")}&nbsp;:&nbsp;
            </span>
            <span className="timer-values">
              {String(seconds).padStart(2, "0")}
            </span>
          </p>
          <p>Increment: {time.increment} second(s)</p>
        </>
      ) : (
        <p>No time set</p>
      )}
    </button>
  );
}