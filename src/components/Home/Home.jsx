import React from "react";
import "../Base.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Home() {
    let navigate = useNavigate();

    return (     
        <div className="page">
            <section>
                <h1>Quiz Application</h1>
                <div className="main-text">
                    <button onClick={() => navigate("/quiz")}>Start Quiz</button>
                    <p>latest quiz result:</p>
                    <p>points | date</p>
                    <button onClick={() => navigate("/history")}>Check Your History</button>
                </div>
            </section>
        </div>
    );
}

export default Home;