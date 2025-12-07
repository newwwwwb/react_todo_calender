import "./Body.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, format } from "date-fns";

const Body = ({ currentMonth, selectedDate, setSelectedDate, viewMode, dataByDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  const onDateClick = (d) => {
    setSelectedDate(d);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDay = format(day, 'd');
      const cloneDay = day;
      const dateKey = format(day, 'yyyy-MM-dd');
      const dayData = dataByDate[dateKey] || { todos: [], ledger: [] };
      const items = viewMode === 'todo' ? dayData.todos : dayData.ledger;

      const MAX_VISIBLE = 3;
      const visible = items.slice(0, MAX_VISIBLE);
      const hiddenCount = Math.max(items.length - MAX_VISIBLE, 0);

      days.push(
        <div
          className={`body_cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, 'M') !== format(day, 'M')
              ? "not-valid"
              : "valid"
          }`}
          key={dateKey}
          onClick={() => onDateClick(cloneDay)}
          tabIndex={0}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? "text not-valid"
                : "text valid"
            }
          >
            {formattedDay}
          </span>

          {/* 요약 렌더링 */}
          {viewMode === 'todo' &&
            visible.map(item => (
              <div key={item.id} className={`todo-item ${item.completed ? 'completed' : ''}`}>
                {item.text}
              </div>
            ))
          }

          {viewMode === 'ledger' && dayData.ledger.length > 0 && (() => {
            const income = dayData.ledger.filter(l => l.type === 'income').reduce((s, l) => s + l.amount, 0);
            const expense = dayData.ledger.filter(l => l.type === 'expense').reduce((s, l) => s + l.amount, 0);
            return (
              <>
                {income > 0 && <div className="entry-income">+{income}원</div>}
                {expense > 0 && <div className="entry-expense">-{expense}원</div>}
              </>
            );
          })()}

          {hiddenCount > 0 && viewMode === 'todo' && (
            <button
              className="more-indicator"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDateClick(cloneDay);
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                  sidebar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
            >
              +{hiddenCount}개 더보기
            </button>
          )}
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={format(day, 'yyyy-MM-dd')}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="Body">{rows}</div>;
};

export default Body;
