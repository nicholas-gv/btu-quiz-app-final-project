import React from "react";
import "../Base.css";
import "./Quiz.css";


const QuizSingleAnswer = (props) => {
    return (     
        <div className="single-answer">
            <p mykey={props.myKey} onClick={props.onClick}>{props.children}</p>
        </div>
    );
}

export default QuizSingleAnswer;