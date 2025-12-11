import "./Body.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, format } from "date-fns";

const Body = ({ currentMonth, selectedDate, setSelectedDate, viewMode, dataByDate }) => {
  const monthStart = startOfMonth(currentMonth);  // 달의 시작 일 출력 ex) 2025.12.01
  const monthEnd = endOfMonth(monthStart);        // 해당 달의 말일 출력 ex) 2025.12.31
  const startDate = startOfWeek(monthStart);      // 해당 일의 주의 시작일 반환 ex) 2025.12.01이라고 하면 2025.11.30 반환
  const endDate = endOfWeek(monthEnd);            // 해당 일의 주의 마지막일 반환 ex) 2025.12.31.(수)라고 하면 2025.01.04.(일) 반환

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
            !isSameMonth(day, monthStart) // 같은 달인지 확인 맞다면 !가 들어갔으므로 같은 달이라면 false 아니라면 true
              ? "disabled"                // 같은 달이 아니기 때문에 disabled 즉 달력에 표시되는 첫일 또는 말일
              : isSameDay(day, selectedDate)  // 같은 달이 맞는지 확인 아니라면 false 맞다면 true
              ? "selected"                    // 선택한 데이터가 같은 달이라면 seleted
              : format(currentMonth, 'M') !== format(day, 'M')  // 달만 서로 뽑아서 다른 달이라면
              ? "not-valid"                                     // 다른 달일 경우
              : "valid"                                         // 같은 달일 경우
          }`}
          key={dateKey}                                         // 현재 날짜를 key 형태로 포멧팅한 값을 삽입
          onClick={() => onDateClick(cloneDay)}                 // cilck시 setSeletedDate값 업데이트
          tabIndex={0}                                          // 키보드 포커스 허용
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')    // 현재 달과 day 비교 다르다면
                ? "text not-valid"                              // text not-valid
                : "text valid"                                  // 같다면 text valid
            }
          >
            {formattedDay}                                      
          </span>

          {/* 요약 렌더링 조건부 랜더링을 위해 && 사용 만약 viewMode === todo가 falsy라면 뒤의 값은 실행되지 않음 */}
          {viewMode === 'todo' &&
            visible.map(item => (
              <div key={item.id} className={`todo-item ${item.completed ? 'completed' : ''}`}>
                {item.text}
              </div>
            ))
          }
          {/* 조건부 랜더링 부분 위와 같은 방식으로 동작 앞 두 조건이 모두 만족해야 뒤 내용이 실행
              viewMode === ledger && dayData.ledger 안에 값이 있는가 */}
          {viewMode === 'ledger' && dayData.ledger.length > 0 && (() => {
            // income에는 type이 income것으로 filter하고 reduce를 통해 값을 더해줌
            const income = dayData.ledger.filter(l => l.type === 'income').reduce((s, l) => s + l.amount, 0);
            const expense = dayData.ledger.filter(l => l.type === 'expense').reduce((s, l) => s + l.amount, 0);
            return (
              <>  {/* 값이 0 이상일때만 <div>가 생성됌 */}
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
