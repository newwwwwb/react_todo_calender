import "./Days.css";
import { useMemo } from "react";
import React from "react";

const Days = () => {

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const days = useMemo(() => {
        return dayNames.map((day, i) => (
            <div key = {i} className = "day">
                {day}
            </div>
        ))
    }, [dayNames])
    
    return(
        <div className="days_row">{days}</div>
    );
};

export default React.memo(Days);