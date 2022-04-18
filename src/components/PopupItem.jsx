import React from "react";
import "./Base.css"


const PopupItem = (props) => {

    return (
        <button onClick={props.onClick} className="btn-orange">
            {props.children}
        </button>
    )

}

export default PopupItem;
