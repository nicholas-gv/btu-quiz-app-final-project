import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Base.css";
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
        <div className="page">
            <h1>History</h1>
            <button onClick={() => navigate("/")}>Home</button>
            <ul>
                {history && history.map((el, i) => (
                    <div key={i} className="history-entry">
                        <li >{el.points}pts | {el.date}</li>
                        <ContextMenu></ContextMenu>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default History;