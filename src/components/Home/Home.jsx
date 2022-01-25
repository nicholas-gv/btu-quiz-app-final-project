import React, { useEffect, useState } from "react";
import "../Base.css";
import { useNavigate } from "react-router-dom";


function Home() {
    let [latest, setLatest] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("history")) {
            let temp = JSON.parse(localStorage.getItem("history"));
            let tempLatest = temp[0];
            setLatest(temp[0]);
            for (let i = 0; i < temp.length; i++) {
                tempLatest = (Date.parse(tempLatest.date)<Date.parse(temp[i].date)) ? temp[i] : tempLatest;
            }
            setLatest(tempLatest)
        } 
    }, [])
    

    return (
        <div className="page">
            <h1>Quiz Application</h1>
            <div className="main-text">
                <button onClick={() => navigate("/quiz")}>Start Quiz</button>
                <p>latest quiz result:</p>
                <p>{latest && latest.points}pts | {latest && latest.date}</p>
                <button onClick={() => navigate("/history")}>Check Your History</button>
            </div>
        </div>
    );
}

export default Home;