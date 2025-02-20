import { useCallback, useEffect, useState } from "react";
import { TimeContext } from "./timeContext";

export default function TimeContextProvider({ children }) {
  const [counterWhiteMoves, setCounterWhiteMoves] = useState('w0')
  const [counterBlackMoves, setCounterBlackMoves] = useState('b0')
  const [time, setTime] = useState(null);
  const [whiteClockTime, setWhiteClockTime] = useState({
    minutes: 0,
    seconds: 0,
    increment: 0,
    remainingTime: 0
  });
  const [blackClockTime, setBlackClockTime] = useState({
    minutes: 0,
    seconds: 0,
    increment: 0,
    remainingTime: 0
  });
  const [lastPlayingPlayer, setLastPlayingPlayer] = useState('')
  const [gameEnded, setGameEnded] = useState(false);

  const handleWhiteMoves = () => {
    setCounterWhiteMoves((prev) => prev + 1)
  }

  const handleBlackMoves = () => {
    setCounterBlackMoves((prev) => prev + 1)
  }

  const handleTime = (newTime, color) => {
    setTime(newTime);
    console.log(newTime, 'newTime');

    const remainingTime = (Number(newTime.minutes) * 60 * 1000) + Number(newTime.seconds * 1000); // Converti in millisecondi
    console.log(remainingTime, 'remainingTime');

    if (color === 'both') {
      setWhiteClockTime({
        ...newTime,
        remainingTime: remainingTime
      });
      setBlackClockTime({
        ...newTime,
        remainingTime: remainingTime
      });
    }
  };

  const handleWhiteClockTime = (currentMinutes, currentSeconds) => {
    const {
      remainingTime, 
      minutes, 
      seconds
    } = calcRemaingTime(whiteClockTime, currentMinutes, currentSeconds)
    setWhiteClockTime({
      ...whiteClockTime,
      minutes,
      seconds,
      remainingTime
    });
  }

  useEffect(() => {
    console.log(whiteClockTime, 'whiteClockTime')
  }, [whiteClockTime])

  const handleBlackClockTime = (currentMinutes, currentSeconds) => {
    const {
      remainingTime, 
      minutes, 
      seconds
    } = calcRemaingTime(blackClockTime, currentMinutes, currentSeconds)
    setBlackClockTime({
      ...blackClockTime,
      minutes,
      seconds,
      remainingTime: remainingTime
    });
  };

  useEffect(() => {
    console.log(blackClockTime, 'blackClockTime')
  }, [blackClockTime])

  const calcRemaingTime = (currentTime, currentMinutes, currentSeconds) => {
    let minutes = Number(currentMinutes);
    let seconds = Number(currentSeconds);
    let remainingTime = (minutes * 60 * 1000) + (seconds * 1000);

    if (Number(currentTime.increment) > 0) {
      seconds += Number(currentTime.increment);
      remainingTime += Number(currentTime.increment * 1000);
      
      if (seconds > 59) {
        minutes += 1;
        seconds -= 60;
      }
    }
    return {remainingTime, minutes, seconds}
  }

  const handleLastPlayer = (player) => {
    setLastPlayingPlayer(player)
  }

  const handleGameEnded = useCallback(() => {
    setGameEnded(true);
  }, []);

  const resetGame = () => {}

  return (
    <TimeContext.Provider
      value={{
        counterWhiteMoves,
        handleWhiteMoves,
        counterBlackMoves,
        handleBlackMoves,
        time,
        handleTime,
        whiteClockTime,
        handleWhiteClockTime,
        blackClockTime,
        handleBlackClockTime,
        gameEnded,
        handleGameEnded,
        resetGame,
        lastPlayingPlayer,
        handleLastPlayer
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}