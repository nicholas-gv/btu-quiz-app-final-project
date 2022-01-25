import React from "react";
import "./Quiz.css"
import "../Base.css"
import { useNavigate } from "react-router-dom";

const Popup = (props) => {
    const navigate = useNavigate();

    const  handleOutsideClick = (e) => {
        if (e.target === document.getElementsByClassName("main")[0]) {
            document.getElementsByClassName("popup-main")[0].style.display = "none";
            document.getElementsByClassName("main")[0].style.display = "none";
        }
    }

    const handleSaveHistory = () => {
        document.getElementsByClassName("popup-main")[0].style.display="none";
        document.getElementsByClassName("main")[0].style.display = "none";

        let key = "history";
        let item = {
            points: props.data.points,
            date: props.data.date
        };

        // Date.parse(props.data.date) = 1643095503000 (Date)
        // props.data.date = 1/25/2022, 11:25:03 AM (string)

        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([item]));
        } else {
            let temp = JSON.parse(localStorage.getItem(key));
            temp.push(item);
            // eslint-disable-next-line
            temp.sort((a,b) => {
                if (a.points!==b.points) {
                    return b.points - a.points;
                } else if (a.points===b.points) {
                    return Date.parse(b.date) - Date.parse(a.date);
                }
            });
            localStorage.setItem(key, JSON.stringify(temp));
        }
        navigate("/");
    }

    return (
        <div className="main" onClick={handleOutsideClick}>
            <div className="popup-main">
                <p>Do you want to save this attempt?</p>
                <button className="btn-orange" onClick={handleSaveHistory}>Yes</button>
                <button className="btn-orange" onClick={() => navigate("/")}>No</button>
            </div>
        </div>
    )
}

export default Popup;
