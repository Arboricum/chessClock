import WhiteClock from "./clock/WhiteClock"
import BlackClock from "./clock/BlackClock"
import ClockTimer from "./clock/ClockTimer.jsx"
import { useTimeContext } from "../context/timeContext.js"
import { useCallback, useState } from "react"

export default function Clock({onOpenSettings}) {
  const {
    counterWhiteMoves,
    handleWhiteMoves,
    counterBlackMoves,
    handleBlackMoves,
    whiteClockTime, 
    handleWhiteClockTime, 
    blackClockTime, 
    handleBlackClockTime, 
    lastPlayingPlayer,
    handleLastPlayer,
    handleGameEnded,
    gameEnded
  } = useTimeContext()
  const [whiteClockIsRunning, setWhiteClockIsRunning] = useState(false)
  const [blackClockIsRunning, setBlackClockIsRunning] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(false)

  const handleWhiteClock = (minutes, seconds) => {
    if (whiteClockIsRunning) {
    setWhiteClockIsRunning(false)
    setBlackClockIsRunning(true)
    handleWhiteClockTime(minutes, seconds)
    handleWhiteMoves()
    handleLastPlayer('black')
    }
  }

  const handleBlackClock = (minutes, seconds) => {
    if (blackClockIsRunning) {
    setBlackClockIsRunning(false)
    setWhiteClockIsRunning(true)
    handleBlackClockTime(minutes, seconds)
    handleBlackMoves()
    handleLastPlayer('white')
    }
  }

  const restartGameAfterPause = () => {
    setIsGamePaused(false)
    if (lastPlayingPlayer === 'white') {
      setWhiteClockIsRunning(true)
    } else if (lastPlayingPlayer === 'black') {
      setBlackClockIsRunning(true)
    }
  }

  const startGame = () => {
    setWhiteClockIsRunning(true)
    setIsGameStarted(true)
    handleLastPlayer('white')
  }

  const pauseGame = () => {
    setIsGamePaused(true)
    setBlackClockIsRunning(false)
    setWhiteClockIsRunning(false)
  }

  const endGame = useCallback(() => {
    handleGameEnded()
    setBlackClockIsRunning(false)
    setWhiteClockIsRunning(false)
  }, [])

  return (
    <div className="clock">
      <ClockTimer 
        key={counterWhiteMoves}
        player='white'
        time={whiteClockTime}
        clockIsRunning={whiteClockIsRunning}
        handleGameEnded={endGame}
        gameEnded={gameEnded}
        handleClock={handleWhiteClock}
        isGamePaused={isGamePaused}
      />
      <section className="clock-menu">
        <button 
          onClick={onOpenSettings}
          disabled={isGameStarted && !isGamePaused}
        >
          Settings
        </button>
        {isGameStarted && (
          <button onClick={pauseGame}>Pause</button>
        )}
        <button 
          onClick={!isGameStarted? startGame: restartGameAfterPause}
        >
          {!isGameStarted? 'Start': 'Unpause'}
        </button>
      </section>
      <ClockTimer 
        key={counterBlackMoves}
        player='black'
        time={blackClockTime}
        clockIsRunning={blackClockIsRunning}
        handleGameEnded={endGame}
        gameEnded={gameEnded}
        handleClock={handleBlackClock}
        isGamePaused={isGamePaused}
      />
    </div>
  )
}
