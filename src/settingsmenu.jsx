import { useState, useEffect } from "react";
import './settingsmenu.css';


export default function SettingsMenu({settingsMenuShown, setSettingsMenuShown}) {
    const [settings, setSettings] = useState(
        JSON.parse(localStorage.getItem('settings')) ||
    {
        "transitionsSpeedMultiplier": 1, 
        "buttonSizeMultiplier": 1,
        "ImageURL":""
    });


    useEffect(() => {
        const root = document.documentElement;

        Object.keys(settings).forEach((key) => {
            let value = settings[key];
            if (typeof value === "boolean") {
                value = value ? "block" : "none";
            }
            root.style.setProperty(`--${key}`, value);
        });
        localStorage.setItem('settings', JSON.stringify(settings));

    }, [settings]); // FIX: Empty [] changed to [settings] so it updates the DOM correctly

    return (
        <div hidden={!settingsMenuShown} className="add-new-menu-shell">
            
            <div className="add-new-menu settings-menu" >
            <button style={{position:"absolute", top:"5px", right:"0",  width:"20px", height:"20px"}} onClick={() => {setSettingsMenuShown(false)}}>X</button>
            <h2>Settings</h2>
            <hr />
            More settings coming soon!
            <br/>
           { Object.keys(settings).map((setting)=>{
            return(
                
                <div>
                    {setting}:<input placeholder={settings[setting]} onChange={(event)=>{
                        setSettings(
                            {...settings, [setting] : event.target.value}
                        )
                    }}></input>
                </div>
            )
           })}            
            
            <button onClick={()=>{
                if(window.confirm("Are you sure you want to reset settings?")){
                    localStorage.removeItem("settings")
                    location.reload()

                }
            }}>Reset settings</button>  

            <button onClick={()=>{
                if(window.confirm("CAUTION: CLEARING LOCALSTORAGE WILL DELETE YOU SHORTCUTS! ONLY CONTINUE IF SOMETHING BROKE, OR YOU KNOW WHAT YOU'RE DOING!")){
                    localStorage.clear()
                    location.reload()

                }
            }}>Clear localStorage</button>  

            </div>
        </div>
    );
}
