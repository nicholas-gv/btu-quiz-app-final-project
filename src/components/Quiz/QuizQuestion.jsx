import React, { useState } from "react";
import "../Base.css";
import "./Quiz.css";
import QuizBooleanAnswer from "./QuizBooleanAnswer.jsx";
import QuizMultipleAnswer from "./QuizMultipleAnswer.jsx";
import QuizSingleAnswer from "./QuizSingleAnswer.jsx";
import QuizResults from "./QuizResults";


const QuizQuestion = (props) => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState();
    const [questionUnanswered, setQuestionUnanswered] = useState(true);
    const [points, setPoints] = useState(0);
    const [date, setDate] = useState();
    const [isQuizDone, setIsQuizDone] = useState(false);
    

    const handleNext = () => {
        let questionsAmount = props.data.questions.length;
        if (questionsAmount>activeQuestion+1) {
            setActiveQuestion(activeQuestion+1);
            setChosenAnswers();
            document.getElementsByClassName("question-box")[0].style.backgroundColor = "";
            document.getElementById("nextBtn").style.display = "none";
            setQuestionUnanswered(true);
        } else {
            document.getElementById("gradbox").style.display = "none";
            document.getElementById("page-title").textContent = "Quiz Results:";
            setIsQuizDone(true);
            let newDate = new Date().toLocaleString()
            setDate(newDate);
        }
    }


    const handleSubmit = () => {
        let answer;
        let li = (props.data.questions[activeQuestion].type==="boolean") ? 
            chosenAnswers[0] : chosenAnswers.map((el) => parseInt(el));

        if (typeof props.data.answers[activeQuestion].answer === 'number') {
            answer = JSON.stringify([props.data.answers[activeQuestion].answer])
        } else if (typeof props.data.answers[activeQuestion].answer === 'boolean') {
            answer = "\""+props.data.answers[activeQuestion].answer+"\"";
        } else {
            answer = JSON.stringify(props.data.answers[activeQuestion].answer)
        }
        
        
        if (JSON.stringify(li)===answer) {
            document.getElementsByClassName("question-box")[0].style.backgroundColor = "#56b004";
            document.getElementById("nextBtn").style.display = "inline-block";
            setQuestionUnanswered(false);
            setPoints(points+1);
        } else {
            document.getElementsByClassName("question-box")[0].style.backgroundColor = "red";
            document.getElementById("nextBtn").style.display = "inline-block";
            setQuestionUnanswered(false);
        }

        let questionsAmount = props.data.questions.length;
        let progressBarShare = (activeQuestion+1)/questionsAmount*100;
        document.getElementById("gradbox").style.backgroundImage = 
            `linear-gradient(to right, #ff9500 ${progressBarShare}%,rgba(0,0,0,0)${progressBarShare}%)`;
    }


    const handleChooseOption = (e) => {
        const parent = e.target.parentElement;
        const questionIdentifier = e.target.getAttribute("myKey");

        if (props.data.questions[activeQuestion].type==="single") {
            if (chosenAnswers) {
                let wasItThere = Boolean(parent.style.border);
                parent.style.border = "";
                if (wasItThere) {
                    setChosenAnswers();
                }
            } else if (!chosenAnswers) {
                parent.style.border = "4px solid green";
                setChosenAnswers([questionIdentifier]);
            } 

        } else if (props.data.questions[activeQuestion].type==="multiple") {
            let li = [];

            if (!parent.style.border && !chosenAnswers) {
                parent.style.border = "4px solid green";
                setChosenAnswers([questionIdentifier]);
            }

            if (parent.style.border && chosenAnswers) {
                if (chosenAnswers.includes(questionIdentifier)) {
                    parent.style.border = "";
                    li = chosenAnswers.filter((el) => el!== questionIdentifier);
                    if (chosenAnswers.length===1) setChosenAnswers();
                    else setChosenAnswers(li);
                } 
            }

            if (!parent.style.border && chosenAnswers) {
                if (!chosenAnswers.includes(questionIdentifier)) {
                    li = [...chosenAnswers];
                    li.push(questionIdentifier);
                    parent.style.border = "4px solid green";
                    setChosenAnswers(li);
                }   
            }

        } else if (props.data.questions[activeQuestion].type==="boolean") {
            if (chosenAnswers) {
                let wasItThere = Boolean(parent.style.border);
                parent.style.border = "";
                if (wasItThere) {
                    setChosenAnswers();
                }
            } else if (!chosenAnswers) {
                parent.style.border = "4px solid green";
                setChosenAnswers([questionIdentifier]);
            } 
        }
    }

    if (isQuizDone) {
        return <QuizResults data={{points,date}} questions={props.data.questions} quizID={props.data.id}></QuizResults>
    }

    return (
        <div className="question-box">
            
            <p>{props.data.questions[activeQuestion].question}</p>

            {props.data.questions[activeQuestion].type==="single" && 
                props.data.questions[activeQuestion].options.map((el, i)=> (
                    <QuizSingleAnswer 
                        onClick={questionUnanswered ? handleChooseOption : undefined}
                        key={i}
                        myKey={i+1}>{el}
                    </QuizSingleAnswer>
            ))}

            {props.data.questions[activeQuestion].type==="multiple" && 
                props.data.questions[activeQuestion].options.map((el, i)=> (
                    <QuizMultipleAnswer 
                        onClick={questionUnanswered ? handleChooseOption : undefined}
                        key={i} 
                        myKey={i+1}>{el}
                    </QuizMultipleAnswer>
            ))}

            {props.data.questions[activeQuestion].type==="boolean" && (
                <>
                    <QuizBooleanAnswer 
                        onClick={questionUnanswered ? handleChooseOption : undefined}
                        myKey="true">true
                    </QuizBooleanAnswer>
                    <QuizBooleanAnswer 
                        onClick={questionUnanswered ? handleChooseOption : undefined}
                        myKey="false">false
                    </QuizBooleanAnswer>
                </>
            )}

            <button 
                className="btn-white"
                onClick={(chosenAnswers && questionUnanswered) ? handleSubmit : undefined }>Submit Answer
            </button>
            <button className="btn-white" id="nextBtn" onClick={handleNext} style={{display: "none"}}>Next</button>
            <div id="gradbox">
                <p style={{color:"white"}}>
                    {activeQuestion}/{props.data.questions.length} ({Number.parseInt(activeQuestion*100/props.data.questions.length)}%)
                </p>
            </div>
        </div>
    );
}

export default QuizQuestion;