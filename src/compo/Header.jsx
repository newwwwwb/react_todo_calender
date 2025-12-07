import "./Header.css";
import { format, subMonths, addMonths } from 'date-fns';
import React from "react";

const Header = ({currentMonth, setCurrentMonth}) => {

    // Header 달 이동 버튼
  // 이전
  const pervMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }
  // 이후
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

    return (
        <div className = "header_row">
            <div className = "select_month">
                <button className="prevButton" onClick={pervMonth}>prev</button>
                <div className = "year_month">
                  {/* 현재년도, 현재 달 표시 currentMonth에서 값을 받아와 formating만 진행 별도로 나누지 않음 */}
                  <span>{format(currentMonth, 'yyyy')}년</span>
                  <span>{format(currentMonth, 'M')}월</span>
                </div>
                <button className="nextButton" onClick={nextMonth}>next</button>
            </div>
        </div>
    );
};

export default React.memo(Header);