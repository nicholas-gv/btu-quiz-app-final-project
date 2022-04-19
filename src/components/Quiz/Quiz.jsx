import React from "react";
import useFetch from "../../api/useFetch";
import "./Quiz.css";
import QuizQuestion from "./QuizQuestion.jsx";
import ErrorBoundary from "../ErrorBoundary";
import { Watch } from "react-loader-spinner";
import { useLocation } from "react-router-dom";


function Quiz(props) {
    const time = new Date().getTime();
    const { state } = useLocation();
    const [questions] = useFetch({
        key: "questions",
        currentTime: time,
        url: "db.json",
        quiz: state
    });

    if (!questions) {
        return (
            <div className="page">
                <div className="loader">
                    <Watch ariaLabel="loading-indicator" color="#ff9500" height="200px" width="200px" />
                </div>
            </div>
        )                
    }

    return (
        <ErrorBoundary>
            <div className="page">
                <h1 id="page-title">Quiz {questions.id}</h1>
                <QuizQuestion data={questions} id="d1"></QuizQuestion>
            </div>
        </ErrorBoundary>
    );
}

export default Quiz;