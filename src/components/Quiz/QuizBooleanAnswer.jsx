import React from "react";
import "../Base.css";
import "./Quiz.css";


const QuizBooleanAnswer = (props) => {
    return (     
        <div className="boolean-answer">
            <p mykey={props.myKey} onClick={props.onClick}>{props.children}</p>
        </div>
    );
}

export default QuizBooleanAnswer;