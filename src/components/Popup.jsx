import React from "react";
import "./Quiz/Quiz.css"
import "./Base.css"
import { useNavigate } from "react-router-dom";


const Popup = (props) => {
    const navigate = useNavigate();

    const  handleOutsideClick = () => {
        props.setShowPopup(false);
    }

    const handleSaveHistory = () => {
        let key = "history";
        let item = {
            quizID: props.quizID,
            points: props.data.points,
            totalQuestions: props.totalQuestions,
            date: props.data.date
        };

        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([item]));
        } else {
            let temp = JSON.parse(localStorage.getItem(key));
            temp.push(item);
            // eslint-disable-next-line
            temp.sort((a,b) => {
                if (a.points/a.totalQuestions!==b.points/b.totalQuestions) {
                    return b.points/b.totalQuestions - a.points/a.totalQuestions;
                } else if (a.points/a.totalQuestions===b.points/b.totalQuestions) {
                    return Date.parse(b.date) - Date.parse(a.date);
                }
            });
            localStorage.setItem(key, JSON.stringify(temp));
        }
        navigate("/");
    }

    return (
        <div className="shadow-main" onClick={handleOutsideClick}>
            <div className="popup-main">
                <p>Do you want to save this attempt?</p>
                <button className="btn-orange" onClick={handleSaveHistory}>Yes</button>
                <button className="btn-orange" onClick={() => navigate("/")}>No</button>
            </div>
        </div>
    )
}

export default Popup;
