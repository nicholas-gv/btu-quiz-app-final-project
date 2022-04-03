import React, { useEffect, useState } from "react";
import "./Base.css"


const ContextMenu = (props) => {

    const handleOutsideClick = (e) => {
        e.preventDefault();
        props.setShowContextMenu(false);
    }

    useEffect(() => {
        const activeContextMenu = document.getElementById("active-context-menu");
        activeContextMenu.style.left = props.pos[0];
        activeContextMenu.style.top = props.pos[1];
    }, [])

    return (
        <div className="shadow-main" onClick={handleOutsideClick} onContextMenu={handleOutsideClick}>
            <div id="active-context-menu" className="context-menu">
                <button>confirm</button>
                <button>cancel</button>
            </div>
        </div>
    )

}

export default ContextMenu;
