import React from "react";
import "./History.css"
import "../Base.css"

const ContextMenu = () => {

    const handleListItemContextMenu = (e) => {
        e.preventDefault();
        
        const identifier = e.target.parentElement.children[0].textContent.slice(9);
        // მხოლოდ ერთი კონტექტ მენიუ არსებობდეს
        if (document.getElementById("context-menu")) {
            document.getElementById("context-menu").remove();
        }

        // კურსორის კოორდინატებით სწორი პოზიციის დადგენა
        let posH = e.clientY/window.innerHeight*100;
        let posW = e.clientX/window.innerWidth*100;
        let contextMenuAura = document.createElement("div");
        let contextMenu = document.createElement("div");
        contextMenuAura.id = "context-menu-aura";
        contextMenuAura.appendChild(contextMenu);
        let style = `width: 100%; height: 100%; background:rgba(0,0,0,0); position: fixed; top: 0; left: 0; z-index: 10;`
        contextMenuAura.setAttribute("style", style);
        
        // მარცხენა ღილაკით წაშლა
        contextMenuAura.onclick = (e) => {
            console.log(e.target.parentElement);
            if (e.target.parentElement.id!=="context-menu-aura"){
                document.getElementById("context-menu-aura").remove();
            }
        }

        // მარჯვენა ღილაკით წაშლა
        contextMenuAura.oncontextmenu = (e) => {
            e.preventDefault();
            if (e.target.parentElement.id!=="context-menu-aura"){ 
                document.getElementById("context-menu-aura").remove();
            }
        }

        contextMenu.setAttribute("style", `position: fixed; z-index: 1; left: 0; top: 0;\
            top: ${posH}%; left: ${posW}%; width: 100px; padding: 5px 3px;\
            height: auto; border: 3px solid #fff; background-color: #ff9500`);
        contextMenu.id = 'context-menu';
        contextMenu.textContent = e.target.textContent;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "yes";
        removeBtn.onclick = () => {
            if (identifier) {
                let history = JSON.parse(localStorage.getItem("history"));
                let temp = history.filter((el)=>el.date!==identifier);
                localStorage.setItem("history", JSON.stringify(temp));
                e.target.parentElement.remove();
            }
        }

        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        cancelBtn.onclick = (e) => {
            e.preventDefault();
            if (e.target.parentElement.id!=="context-menu-aura"){ 
                document.getElementById("context-menu-aura").remove();
            }
        }
        
        document.getElementById("root").appendChild(contextMenuAura);
        contextMenu.appendChild(removeBtn);
        contextMenu.appendChild(cancelBtn);
    }
    
    return (
        <button className="btn-orange-slim" onContextMenu={handleListItemContextMenu} 
            >delete
        </button>
    )

}

export default ContextMenu;
