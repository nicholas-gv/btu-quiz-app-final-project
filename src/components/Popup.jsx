import React from "react";
import "./Quiz/Quiz.css"
import "./Base.css"


const Popup = (props) => {

    const  handleOutsideClick = () => {
        props.setShowPopup(false);
    }

    return (
        <div className="shadow-main" onClick={handleOutsideClick}>
            <div className="popup-main">
                {props.children}
            </div>
        </div>
    )
}

export default Popup;
