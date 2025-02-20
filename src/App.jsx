import { useState } from 'react';
import './App.css';
import { useTimeContext } from './context/timeContext';
import Settings from './components/Settings';
import Clock from './components/Clock';

function App() {
  const { time, handleTime } = useTimeContext();
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [isClockOpen, setIsClockOpen] = useState(false);

  const onStartingClock = (minutes, seconds, increment, color) => {
    setIsSettingOpen(false);
    setIsClockOpen(true);
    handleTime({
      minutes,
      seconds,
      increment
    }, color);
    console.log('starting');
  };

  const handleSettingOpen = () => {
    setIsSettingOpen(true);
    setIsClockOpen(false);
  };

  return (
    <main>
      <h1 className='title'>Chess Clock</h1>
      {isSettingOpen && <Settings onStartingClock={onStartingClock} />}
      {isClockOpen && <Clock onOpenSettings={handleSettingOpen} />}
    </main>
  );
}

export default App;