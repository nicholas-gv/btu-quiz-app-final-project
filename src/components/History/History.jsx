import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Base.css";
import "./History.css";
import ContextMenu from "./ContextMenu";


function History() {
    const [history, setHistory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("history")) {
            setHistory(JSON.parse(localStorage.getItem("history")));
        } 
    }, []);

    return (
        <div className="page grid-with-title">
            <h1 className="page-title">History</h1>
            <div>
                <button className="btn-orange" onClick={() => navigate("/")}>Home</button>
                <ul className="history-entries-list">
                    {history && history.map((el, i) => (
                        <div key={i} index={i} className="history-entry">
                            <li >{el.points}/{el.totalQuestions}pts | {el.date}</li>
                            <ContextMenu></ContextMenu>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default History;