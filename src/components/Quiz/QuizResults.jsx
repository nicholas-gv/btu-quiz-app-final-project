import React, {useState} from "react";
import "../Base.css";
import "./Quiz.css";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenuItem";
import { useNavigate } from "react-router-dom";



const QuizResults = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    const handlePopupButtonClick = () => {
        setShowPopup(true);        
    }

    const handleSaveHistory = () => {
        let key = "history";
        let item = {
            quizID: props.quizID,
            points: props.data.points,
            totalQuestions: props.questions.length,
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
        <div className="quiz-results-div">
            <p> {props.data.points}/{props.questions.length}pts | {props.data.date} </p>
            <button className="btn-orange" onClick={handlePopupButtonClick}>Try Again?</button>
            <button className="btn-orange-outline" onClick={() => navigate("/history")}>See Attempts History</button>
            {showPopup && 
            <PopupMenu setShowPopup={setShowPopup}>
                <p>Do you want to save this attempt?</p>
                <PopupMenuItem onClick={handleSaveHistory}>Yes</PopupMenuItem>
                <PopupMenuItem onClick={() => navigate("/")}>No</PopupMenuItem>
            </PopupMenu>}
        </div>
    );
}

export default QuizResults;