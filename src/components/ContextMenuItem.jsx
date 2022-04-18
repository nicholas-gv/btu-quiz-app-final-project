import React from "react";
import "./Base.css"


const ContextMenuItem = (props) => {

    return (
        <p className="context-menu-item" >
            {props.children}
        </p>
    )

}

export default ContextMenuItem;
