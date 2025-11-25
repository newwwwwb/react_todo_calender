import './App.css';
import Body from './compo/Body';
import Days from './compo/Days';
import Header from './compo/Header';

import { useState } from 'react';
import Sidebar from './compo/Sidebar';

function App() {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLedger, setShowLedger] = useState(false);

  return (
    <div className='App'>
      <div className='App_main'>
        <Header currentMonth = {currentMonth} setCurrentMonth = {setCurrentMonth}></Header>
        <Days/>
        <Body currentMonth = {currentMonth} selectedDate = {selectedDate} setSelectedDate = {setSelectedDate}></Body>
      </div>

      <Sidebar showLedger={showLedger} setShowLedger={setShowLedger}/>
    </div>
  )
}

export default App
