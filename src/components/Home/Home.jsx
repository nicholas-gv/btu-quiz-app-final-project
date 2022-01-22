import React from "react";
import "../Base.css";
import { Link } from "react-router-dom";


function Home() {
    return (     
        <div className="page">
            <section>
                <h1>Quiz Application</h1>
                <div className="main-text">
                    <Link to="/quiz">Start Quiz</Link>
                    <p>latest game result:</p>
                    <p>points | date</p>
                    <Link to="/history">Check History</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;