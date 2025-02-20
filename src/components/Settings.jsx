import { useRef } from "react"

export default function Settings({onStartingClock}) {
  const minutesRef = useRef()
  const secondsRef = useRef()
  const incrementRef = useRef()

  const onSubmitTime = (e, color) => {
    e.preventDefault()
    const minutes = minutesRef.current.value
    const seconds = secondsRef.current.value
    const increment = incrementRef.current.value
    console.log(minutes)
    onStartingClock(minutes, seconds, increment, color)
  }
  return (
    <div className="settings">
      <form onSubmit={(e) => onSubmitTime(e, 'both')}>
        <label>
          Minutes:&nbsp;
          <input type="number" ref={minutesRef} defaultValue='0' min='0'/>
        </label>
        <label>
          Seconds:&nbsp;
          <input 
            type="number" 
            ref={secondsRef} 
            defaultValue={'0'}
            min='0'
          />
        </label>
        <label>
          Increment:&nbsp;
          <input type="number" ref={incrementRef} defaultValue='0'/>
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  )
}
