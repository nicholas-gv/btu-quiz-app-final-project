import React from "react";
import "./History.css"


const ContextMenu = () => {

    const handleListItemContextMenu = (e) => {
        e.preventDefault();
        
        const identifier = e.target.parentElement.parentElement.parentElement.children[0].textContent.slice(7);
        // მხოლოდ ერთი კონტექტ მენიუ არსებობდეს
        if (document.getElementById("context-menu")) {
            document.getElementById("context-menu").remove();
        }

        // კურსორის კოორდინატებით სწორი პოზიციის დადგენა
        let posH = e.clientY/window.innerHeight*100;
        let posW = e.clientX/window.innerWidth*100;
        let contextMenuAura = document.createElement("div");
        let contextMenu = document.createElement("div");
        contextMenuAura.appendChild(contextMenu);
        contextMenuAura.id = "context-menu-aura";
        let style = `width: 100%; height: 100%; background:rgba(0,0,0,0.2); position: fixed; top: 0; left: 0; z-index: 10;`
        contextMenuAura.setAttribute("style", style);
        
        // მარცხენა ღილაკით წაშლა
        contextMenuAura.onclick = (e) => {
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

        contextMenu.setAttribute("style", `position: absolute; z-index: 1; left: 0; top: 0;\
            top: ${posH}%; left: ${posW}%; width: 100px;\
            height: 50px; border: 3px solid #fff; background-color:${e.target.style.backgroundColor}`)
        contextMenu.id = 'context-menu'
        contextMenu.textContent = e.target.textContent;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "idk";
        removeBtn.onclick = () => {
            if (identifier) {
                let history = JSON.parse(localStorage.getItem("history"));
                let temp = history.filter((el)=>el.date!==identifier);
                localStorage.setItem("history", JSON.stringify(temp));
                e.target.parentElement.parentElement.parentElement.remove();
            }
        }
        
        document.getElementById("root").appendChild(contextMenuAura);
        contextMenu.appendChild(removeBtn);
    }
    
    return (
        <div>
            <div className="list">
                <div id="contextmenu-delete" className="list-item" 
                    onContextMenu={handleListItemContextMenu} 
                    style={{backgroundColor:"orange"}}>delete
                </div>
            </div>
        </div>
    )

}

export default ContextMenu;
