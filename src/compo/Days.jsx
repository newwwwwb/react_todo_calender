import "./Days.css";
import { useMemo } from "react"

const Days = () => {

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const days = useMemo(() => {
        return dayNames.map((day, i) => (
            <div key = {i} className = "day">
                {day}
            </div>
        ))
    }, [dayNames])

    // for(let i = 0; i < 7; i++){
    //     days.push(
    //         <div className = "day">
    //             {dayNames[i]} 
    //         </div>);
    // }

    return(
        <div className="days_row">{days}</div>
    );
};

export default Days;