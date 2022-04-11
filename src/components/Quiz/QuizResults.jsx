import React, {useState} from "react";
import "../Base.css";
import "./Quiz.css";
import PopupMenu from "../PopupMenu";
import { useNavigate } from "react-router-dom";



const QuizResults = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    const handlePopupButtonClick = () => {
        setShowPopup(true);        
    }

    return (     
        <div className="quiz-results-div">
            <p> {props.data.points}/{props.questions.length}pts | {props.data.date} </p>
            <button className="btn-orange" onClick={handlePopupButtonClick}>Try Again?</button>
            <button className="btn-orange-outline" onClick={() => navigate("/history")}>See Attempts History</button>
            {showPopup && 
            <PopupMenu setShowPopup={setShowPopup} data={props.data} totalQuestions={props.questions.length} quizID={props.quizID}></PopupMenu>}
        </div>
    );
}

export default QuizResults;