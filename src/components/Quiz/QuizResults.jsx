import React, {useState} from "react";
import "../Base.css";
import "./Quiz.css";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";



const QuizResults = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    const handlePopupButtonClick = () => {
        setShowPopup(true);        
    }

    return (     
        <>
            <p> {props.data.points}/{props.questions.length}pts | {props.data.date} </p>
            <button className="btn-orange" onClick={handlePopupButtonClick}>Try Again?</button>
            <button className="btn-orange-outline" onClick={() => navigate("/history")}>See Attempts History</button>
            {showPopup && 
            <Popup setShowPopup={setShowPopup} data={props.data} totalQuestions={props.questions.length} quizID={props.quizID}></Popup>}
        </>
    );
}

export default QuizResults;