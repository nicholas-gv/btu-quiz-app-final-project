import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Quiz.css";
import QuizQuestion from "./QuizQuestion.jsx";
import ErrorBoundary from "../ErrorBoundary";
import { Watch } from "react-loader-spinner";


function Quiz() {
    const time = new Date().getTime();
    const [questions] = useFetch({
        key: "questions",
        currentTime: time,
        url: "db.json"
        // url: "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db"
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
                <h1 id="page-title">Quiz</h1>
                <QuizQuestion data={questions} id="d1"></QuizQuestion>
            </div>
        </ErrorBoundary>
    );
}

export default Quiz;