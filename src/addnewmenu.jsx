import './addnewmenu.css';
import { useState } from 'react';

export default function AddNewMenu({setMenuShown, menuShown, shortcutsList, setShortcutsList}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    function cleanURL(link){
        if(link.startsWith("http://") || link.startsWith("https://")){
            return link;
        }
        else {
            return "https://" + link;
        }
    }
    return (
        <div hidden={!menuShown} className="add-new-menu-shell">
            <div className="add-new-menu" >
            <button style={{position:"absolute", top:"5px", right:"0px", width:"20px", height:"20px"}} onClick={() => {setMenuShown(false); console.log(menuShown)}}>X</button>
            <h2>Add New Link</h2>
            <hr />
            <input type="text" placeholder="Title" id="titleinp" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <input type="URL" placeholder="URL" value={link} onChange={(e) => setLink(e.target.value)}></input>
            <button onClick={() => {

                if(title !== "" && link !==""){

                if (description === ""){
                    setShortcutsList([...shortcutsList, {title: title, description: title, link: cleanURL(link)}]);

                }
                else{
                    setShortcutsList([...shortcutsList, {title: title, description: description, link: cleanURL(link)}]);

                }
                setTitle("");
                setDescription("")
                
                setLink("");
                setMenuShown(false);
                }
                

                
            }}>Add</button>
            </div>
            
        </div>
    )
}