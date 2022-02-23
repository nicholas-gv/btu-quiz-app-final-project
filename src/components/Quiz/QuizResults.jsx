import React from "react";
import "../Base.css";
import "./Quiz.css";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";



const QuizResults = (props) => {
    const navigate = useNavigate();


    const handlePopupButtonClick = () => {
        document.getElementsByClassName("popup-main")[0].style.display="block";
        document.getElementsByClassName("main")[0].style.display="block";
    }

    return (     
        <>
            <p> {props.data.points}/{props.questions.length}pts | {props.data.date} </p>
            <Popup points={props.data.points} date={props.data.date} totalQuestions={props.questions.length}></Popup>
            <button className="btn-orange" onClick={handlePopupButtonClick}>Try Again?</button>
            <button className="btn-orange-outline" onClick={() => navigate("/history")}>See Attempts History</button>
        </>
    );
}

export default QuizResults;