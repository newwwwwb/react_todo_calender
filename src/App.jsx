import './App.css';
import { useState } from 'react';
import { format } from 'date-fns';

import Header from './compo/Header';
import Days from './compo/Days';
import Body from './compo/Body';
import Sidebar from './compo/Sidebar';
import TopToggle from './compo/TopToggle';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('todo'); // 'todo' | 'ledger'
  const [dataByDate, setDataByDate] = useState({}); // { 'YYYY-MM-DD': { todos:[], ledger:[] } }

  const selectedKey = format(selectedDate, 'yyyy-MM-dd');
  const dayData = dataByDate[selectedKey] || { todos: [], ledger: [] };

  const onAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setDataByDate(prev => {
      const cur = prev[selectedKey] || { todos: [], ledger: [] };
      return {
        ...prev,
        [selectedKey]: {
          ...cur,
          todos: [...cur.todos, { id: Date.now(), text: trimmed, completed: false }]
        }
      };
    });
  };

  const onToggleTodo = (id) => {
    setDataByDate(prev => {
      const cur = prev[selectedKey] || { todos: [], ledger: [] };
      return {
        ...prev,
        [selectedKey]: {
          ...cur,
          todos: cur.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }
      };
    });
  };

  const onDeleteTodo = (id) => {
    setDataByDate(prev => {
      const cur = prev[selectedKey] || { todos: [], ledger: [] };
      return {
        ...prev,
        [selectedKey]: {
          ...cur,
          todos: cur.todos.filter(t => t.id !== id)
        }
      };
    });
  };

  const onAddLedger = ({ type, amount, text }) => {
    const amt = Number(amount);
    const trimmed = String(text).trim();
    if (!trimmed || !Number.isFinite(amt) || amt <= 0) return;

    setDataByDate(prev => {
      const cur = prev[selectedKey] || { todos: [], ledger: [] };
      return {
        ...prev,
        [selectedKey]: {
          ...cur,
          ledger: [...cur.ledger, { id: Date.now(), type, amount: amt, text: trimmed }]
        }
      };
    });
  };

  const onDeleteLedger = (id) => {
    setDataByDate(prev => {
      const cur = prev[selectedKey] || { todos: [], ledger: [] };
      return {
        ...prev,
        [selectedKey]: {
          ...cur,
          ledger: cur.ledger.filter(l => l.id !== id)
        }
      };
    });
  };

  return (
    <div className='App'>
      <div className='App_main'>
        <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
        <TopToggle viewMode={viewMode} setViewMode={setViewMode} />
        <Days />
        <Body
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewMode={viewMode}
          dataByDate={dataByDate}
        />
      </div>

      <Sidebar
        selectedDate={selectedDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        dayData={dayData}
        onAddTodo={onAddTodo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
        onAddLedger={onAddLedger}
        onDeleteLedger={onDeleteLedger}
      />
    </div>
  );
}

export default App;
