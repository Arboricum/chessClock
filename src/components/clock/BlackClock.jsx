import { useEffect, useState } from "react";

const DEFAULT_INTERVAL = 1000;

export default function BlackClock(
  { 
    time, 
    blackClockIsRunning, 
    handleGameEnded, 
    gameEnded,
    handleBlackClock,
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
    if (blackClockIsRunning) {
      timeOut = setTimeout(() => {
        handleGameEnded();
        console.log('time out black')
      }, remainingTime);
    } else if (!blackClockIsRunning) {
      clearTimeout(timeOut);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [remainingTime, blackClockIsRunning, handleGameEnded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime((prevTime) => {
        return {
          seconds: prevTime.seconds === 0 ? 59: prevTime.seconds - 1,
          minutes: prevTime.seconds === 0 ? prevTime.minutes - 1: prevTime.minutes
        }
      })
    }, DEFAULT_INTERVAL);
    if (!blackClockIsRunning || gameEnded) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [blackClockIsRunning, gameEnded]);

  const handleClick = () => {
    handleBlackClock(minutes, seconds);
  }

  return (
    <button 
      onClick={handleClick} 
      disabled={isGamePaused || !blackClockIsRunning}
      className="timer-button"
    >
      {time ? (
        <>
          <p className="timer-black">
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