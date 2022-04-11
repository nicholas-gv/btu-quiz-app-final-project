import React, { useEffect } from "react";
import "./Base.css"
import ContextMenuItem from "./ContextMenuItem";


const ContextMenu = (props) => {

    const handleOutsideClick = (e) => {
        e.preventDefault();
        props.setShowContextMenu(false);
    }

    useEffect(() => {
        const activeContextMenu = document.getElementById("active-context-menu");
        activeContextMenu.style.left = props.pos[0];
        activeContextMenu.style.top = props.pos[1];
        // eslint-disable-next-line
    }, [])

    return (
        <div className="shadow-main" onClick={handleOutsideClick} onContextMenu={handleOutsideClick}>
            <div id="active-context-menu" className="context-menu">
                <ContextMenuItem>Action 1</ContextMenuItem>
                <ContextMenuItem>Action 2</ContextMenuItem>
                <ContextMenuItem>Action 3</ContextMenuItem>
                <ContextMenuItem>Action 4</ContextMenuItem>
                <ContextMenuItem>Action 5</ContextMenuItem>
                <ContextMenuItem>Cancel</ContextMenuItem>
            </div>
        </div>
    )

}

export default ContextMenu;
