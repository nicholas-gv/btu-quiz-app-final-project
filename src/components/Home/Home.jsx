import React, { useEffect, useState } from "react";
import "../Base.css";
import { useNavigate } from "react-router-dom";


function Home() {
    let [latest, setLatest] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("history")) {
            let history = JSON.parse(localStorage.getItem("history"));
            let latest = history[0];
            setLatest(history[0]);
            for (let i = 0; i < history.length; i++) {
                latest = (Date.parse(latest.date)<Date.parse(history[i].date)) ? history[i] : latest;
            }
            setLatest(latest);
        } 
    }, [])
    

    return (
        <div className="page home-grid">
            <h1 className="page-title">Quiz Application</h1>
            <div className="home-page-left-div">
                <button className="btn-orange" onClick={() => navigate("/quiz")}>Start Quiz</button>
                <p>latest quiz result:</p>
                <p>{latest && latest.points}pts | {latest && latest.date}</p>
                <button className="btn-orange" onClick={() => navigate("/history")}>Check Your History</button>
            </div>
            <div className="home-page-right-div">
                <div></div>
            </div>
        </div>
    );
}

export default Home;