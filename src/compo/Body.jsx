import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";

const Body = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const monthStart = startOfMonth(currentMonth);  // 현재달의 시작일
    const monthEnd = endOfMonth(monthStart);        // 현재달의 마지막일
    const startDate = startOfWeek(monthStart)       // 현재달의 시작일이 포함된 주의 시작일
    const endDate = endOfWeek(monthEnd);            // 현재달의 마지막일이 포함된 주의 마지막일

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    // day(날짜)가 endDate(달력표시의 마지막날)보다 작거나 같을 동안 반복
    while(day <= endDate){
        for(let i = 0; i < 7; i++){
            formattedDate = format(day, 'd');
            const cloneDay = day;
            // days 배열에 한주의 날짜들을 추가
            days.push(
                <div
                    className = {`body_cell ${
                        !isSameMonth(day, monthStart)
                        ? "disabled"
                        : isSameDay(day, selectedDate)
                        ? "selected"
                        : format(currentMonth, 'M') !== format(day, 'M')
                        ? "not-valid"
                        : "valid"
                    }`}
                    key = {day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className = {
                            format(currentMonth, 'M') !== format(day, 'M')
                            ? "text not-valid"
                            : "text valid"
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className = "row" key = {day}>
                {days}
            </div>
        );
        days = [];
    }

    return(
        <div className = "Body"> {rows} </div>
    );
};

export default Body;