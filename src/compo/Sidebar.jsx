import React, { useState } from 'react';
import './Sidebar.css';
import { format } from 'date-fns';

function Sidebar({
  selectedDate,
  viewMode,
  setViewMode,
  dayData,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onAddLedger,
  onDeleteLedger,
}) {
  const [todoText, setTodoText] = useState('');
  const [entryType, setEntryType] = useState('expense'); // 'income' | 'expense'
  const [amount, setAmount] = useState('');
  const [entryText, setEntryText] = useState('');

  const todos = dayData?.todos || [];
  const ledger = dayData?.ledger || [];

  const dateLabel = format(selectedDate, 'yyyy년 M월 d일');

  const income = ledger.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0);
  const expense = ledger.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0);
  const balance = income - expense;

  const canAddLedger = () => {
    const amt = Number(amount);
    return entryText.trim() && Number.isFinite(amt) && amt > 0;
  };

  return (
    <div className="sidebar">
      <h3>{dateLabel}</h3>
      <p className="sub">선택한 날짜의 상세 정보</p>

      <div className="tabs">
        <button
          className={viewMode === 'todo' ? 'active' : ''}
          onClick={() => setViewMode('todo')}
        >
          할 일 ({todos.length})
        </button>
        <button
          className={viewMode === 'ledger' ? 'active' : ''}
          onClick={() => setViewMode('ledger')}
        >
          가계부 ({ledger.length})
        </button>
      </div>

      {viewMode === 'todo' ? (
        <>
          <div className="todo-input">
            <input
              type="text"
              placeholder="할 일을 입력하세요"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && todoText.trim()) {
                  onAddTodo(todoText.trim());
                  setTodoText('');
                }
              }}
            />
            <button
              onClick={() => {
                if (!todoText.trim()) return;
                onAddTodo(todoText.trim());
                setTodoText('');
              }}
            >
              추가
            </button>
          </div>

          <ul className="todo-list">
            {todos.length === 0 && <div className="empty">할 일이 없습니다</div>}
            {todos.map((t) => (
              <li key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => onToggleTodo(t.id)}
                  />
                  <span className="todo-text">{t.text}</span>
                </label>
                <button className="delete" onClick={() => onDeleteTodo(t.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="ledger-summary">
            <span>수입 +{income}원</span><br/>
            <span>지출 -{expense}원</span><br/>
            <span>잔액 {balance}원</span>
          </div>

          <div className="ledger-input">
            <div className="type-toggle">
              <button
                className={entryType === 'expense' ? 'active' : ''}
                onClick={() => setEntryType('expense')}
              >
                - 지출
              </button>
              <button
                className={entryType === 'income' ? 'active' : ''}
                onClick={() => setEntryType('income')}
              >
                + 수입
              </button>
            </div>

            <input
              type="number"
              placeholder="금액"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="내용"
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canAddLedger()) {
                  onAddLedger({ type: entryType, amount: Number(amount), text: entryText.trim() });
                  setAmount('');
                  setEntryText('');
                }
              }}
            />
            <button
              disabled={!canAddLedger()}
              onClick={() => {
                if (!canAddLedger()) return;
                onAddLedger({ type: entryType, amount: Number(amount), text: entryText.trim() });
                setAmount('');
                setEntryText('');
              }}
            >
              추가
            </button>
          </div>

          <ul className="ledger-list">
            {ledger.length === 0 && <div className="empty">내역이 없습니다</div>}
            {ledger.map((i) => (
              <li key={i.id} className="ledger-item">
                <span className={i.type === 'income' ? 'entry-income' : 'entry-expense'}>
                  {i.type === 'income' ? '+' : '-'}{i.amount}원 {i.text}
                </span>
                <button className="delete" onClick={() => onDeleteLedger(i.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
