import React, { useEffect, useState } from "react";
import "../Base.css";
import { useNavigate } from "react-router-dom";
import quizImage from "./images/quiz1.png"


function Home() {
    let [latest, setLatest] = useState({});
    let [selectedQuiz, setSelectedQuiz] = useState();
    let navigate = useNavigate();
    const images = require.context('./images', true);

    useEffect(() => {
        if (localStorage.getItem("history")) {
            let history = JSON.parse(localStorage.getItem("history"));
            let latest = history[0];
            setLatest(history[0]);
            for (let i = 0; i < history.length; i++) {
                latest = (Date.parse(latest.date)<Date.parse(history[i].date)) ? history[i] : latest;
            }
            setLatest(latest);
        } 
    }, [])

    const handleSelectChange = (e) => {
        setSelectedQuiz(e.target.value);
        quizImage= images(`./${e.target.value}.png`)
    }

    return (
        <div className="page grid-with-title">
            <h1 className="page-title">Quiz Application</h1>
            <div className="home-page-quiz-selection">
                <select onChange={handleSelectChange} name="quizes" id="">
                    <option value="quiz1">Quiz #1</option>
                    <option value="quiz2">Quiz #2</option>
                    <option value="quiz3">Quiz #3</option>
                    <option value="quiz4">Quiz #4</option>
                    <option value="quiz5">Quiz #5</option>
                </select>
                <img className="quiz-primary-image" src={quizImage} alt="quiz-thumbnail" />
            </div>
            <div className="home-page-right-content">
                <button className="btn-orange" onClick={() => navigate("/quiz", {state:selectedQuiz})}>Start Quiz</button>
                <button className="btn-orange-outline" onClick={() => navigate("/history")}>Check Your History</button>
                <p>Latest quiz result:</p>
                <p>{latest && latest.points}/{latest && latest.totalQuestions}pts | {latest && latest.date}</p>
                <br></br>
                <p id="quiz-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ad deserunt porro similique! Incidunt voluptate ullam 
                    officiis vero illum quo. Minus voluptatum enim dicta
                    consequuntur iure corrupti nostrum nisi, eligendi 
                    repudiandae ullam praesentium quisquam aut eos vero eaque!
                    Aliquam sit doloremque ut, incidunt laboriosam,
                    consequatur nobis unde cumque neque ad suscipit?
                </p>
            </div>
        </div>
    );
}

export default Home;