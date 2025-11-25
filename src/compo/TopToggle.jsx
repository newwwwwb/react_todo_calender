import './TopToggle.css';

export default function TopToggle({ viewMode, setViewMode }) {
  return (
    <div className="top-toggle">
      <button
        className={viewMode === 'todo' ? 'active' : ''}
        onClick={() => setViewMode('todo')}
      >
        할일 보기
      </button>
      <button
        className={viewMode === 'ledger' ? 'active' : ''}
        onClick={() => setViewMode('ledger')}
      >
        가계부 보기
      </button>
    </div>
  );
}
