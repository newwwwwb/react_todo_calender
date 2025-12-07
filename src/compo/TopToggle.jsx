import './TopToggle.css';
import React from "react"
import {useCallback} from "react";

function TopToggle({ viewMode, setViewMode }) {
  // useCallback을 이용한 최적화 요망 todo, ledger 
  const showTodo = useCallback(() => setViewMode('todo'), [setViewMode]);
  const showLedger = useCallback(() => setViewMode('ledger'), [setViewMode]);

  return (
    <div className="top-toggle">
      <button
        className={viewMode === 'todo' ? 'active' : ''}
        onClick={showTodo}
      >
        할일 보기
      </button>
      <button
        className={viewMode === 'ledger' ? 'active' : ''}
        onClick={showLedger}
      >
        가계부 보기
      </button>
    </div>
  );
}

export default React.memo(TopToggle);