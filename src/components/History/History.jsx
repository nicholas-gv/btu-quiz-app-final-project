import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Base.css";
import "./History.css";
import ContextMenu from "../ContextMenu"


function History() {
    const [history, setHistory] = useState();
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [position, setPosition] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("history")) {
            setHistory(JSON.parse(localStorage.getItem("history")));
        } 
    }, []);

    const handleContextMenuClick = (e) => {
        e.preventDefault();
        const posX = e.pageX + 'px';
        const posY = e.pageY + 'px';
        setPosition([posX, posY]);
        setShowContextMenu(true); 
    }

    const onDeleteClick = (e) => {
        const identifier = e.target.previousSibling.textContent;
        if (identifier) {
            let history = JSON.parse(localStorage.getItem("history"));
            let temp = history.filter((el)=>el.date!==identifier);
            localStorage.setItem("history", JSON.stringify(temp));
            e.target.parentElement.remove();
        }
    }

    return (
        <div className="page grid-with-title">
            <h1 className="page-title">History</h1>
            <div>
                <button className="btn-orange" onClick={() => navigate("/")}>Home</button>
                <ul className="history-entries-list">
                    {history && history.map((el, i) => (
                        <li key={i} index={i} className="history-entry" onContextMenu={handleContextMenuClick}>
                            {el.quizID && `Quiz #${el.quizID} |`} {el.points}/{el.totalQuestions}pts 
                            ({Number.parseInt(el.points*100/el.totalQuestions)}%) | <p id="date">{el.date}</p>
                            <img width="15" src="trash-can-solid.svg" alt="delete-icon" onClick={onDeleteClick}/>
                        </li>
                    ))}
                    {showContextMenu && <ContextMenu pos={position} setShowContextMenu={setShowContextMenu}/>}
                </ul>
            </div>
        </div>
    );
}

export default History;