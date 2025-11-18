const Days = () => {

    const days = [];
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    for(let i = 0; i < 7; i++){
        days.push(dayNames[i]);
    }

    return(
        <div>{days}</div>
    );
};

export default Days;