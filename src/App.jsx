import './App.css';
import Body from './compo/body';
import Days from './compo/days';
import Header from './compo/Header';

import { useState } from 'react';

function App() {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Header currentMonth = {currentMonth} setCurrentMonth = {setCurrentMonth}></Header>
      <Days></Days>
      <Body currentMonth = {currentMonth} selectedDate = {selectedDate} setSelectedDate = {setSelectedDate}></Body>
    </>
  )
}

export default App
