import React from "react";
import "../Base.css";
import "./Quiz.css";


const QuizMultipleAnswer = (props) => {
    return (     
        <div className="multiple-answer">
            <p mykey={props.myKey} onClick={props.onClick}>{props.children}</p>
        </div>
    );
}

export default QuizMultipleAnswer;