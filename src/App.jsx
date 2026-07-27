
import Card from './card.jsx'
import AddNewMenu from './addnewmenu.jsx'
import { useState, useEffect, useRef } from 'react';
import SearchBar from './searchbar.jsx';
import SettingsMenu from './settingsmenu.jsx';



import './App.css'

export default function App() {

  function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

  const [menuShown, setMenuShown] = useState(false);
  const [settingsMenuShown, setSettingsMenuShown] = useState(false);


  const [shortcutsList, setShortcutsList] = useState(JSON.parse(localStorage.getItem("SCL")) || [{title: "google", description: "Search the web", link: "https://google.com"}]);

  const[isTransitioning, setIsTransitioning] = useState(false);

  const[subtitle, setSubtitle] = useState("Set this app as your default new tab!");

  async function doBackgroundImage(){
    const rootStyles = window.getComputedStyle(document.documentElement)
    const URL = rootStyles.getPropertyValue('--ImageURL')

    if(URL){
      document.body.style.backgroundImage = `url(${URL})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
    else{
      const response = await fetch('/api/pexels?search=landscape');
      const data = await response.json();
      const image = await data.photos[getRandom(0, data.photos.length)].src.original;
      console.log(image);

      document.body.style.backgroundImage = `url(${image})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
    
  }
   
  async function doSubtitle(){


    try{
        const response  = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        setTimeout(()=>{
          setIsTransitioning(true)

      
          setTimeout(()=>{
            
            setSubtitle(`<i>"${data.quote}"</i> - ${data.author}`)
            
            setIsTransitioning(false)

      }, 400)
      
      
      
    }, 2500)
    }
    catch{
      setTimeout(()=>{
          setIsTransitioning(true)

      
          setTimeout(()=>{
            
            setSubtitle(`<i>"The background won't load because you're probably offline; check your internet connection and refresh the page." - Starjump</i>`)
            
            setIsTransitioning(false)

      }, 400)
    }, 2500)


    
  }
}
  
  useEffect(()=>{
// Correct way to save
    localStorage.setItem("SCL", JSON.stringify(shortcutsList));   
  
  },[shortcutsList])



  useEffect(()=>{
    doBackgroundImage()
    doSubtitle()
  },[])

  return (
    <div className="App">
      <br></br>
    
    <div className="darken"></div>

    <header className="topbar">
      <h1 className="title">Starjump</h1>
 
      <p className="subtitle" className={`subtitle ${isTransitioning ? "fade-out" : "fade-in"}` } dangerouslySetInnerHTML={{ __html: subtitle }}></p>
    </header>
    <div className="searchbar-parent">
      
    </div>
    
    <SearchBar/>
    <section className="buttons">
      <button title="Add new"  onClick={()=>{setMenuShown(true)}}>+</button>
      <button title="Settings" onClick={()=>{setSettingsMenuShown(true)}}>⚙</button>
      <button title="Information"></button>
    </section>
    
    <div className="card-container">
      {shortcutsList.map((shortcut, i) => {
        return <Card title={shortcut.title} description={shortcut.description} link={shortcut.link} shortcutsList={shortcutsList} setShortcutsList={setShortcutsList} index={i}></Card>
      })}
    </div>

    <AddNewMenu setMenuShown={setMenuShown} menuShown={menuShown} shortcutsList={shortcutsList} setShortcutsList={setShortcutsList}></AddNewMenu>
    <SettingsMenu setSettingsMenuShown={setSettingsMenuShown} settingsMenuShown={settingsMenuShown}></SettingsMenu>
    </div>

  )
}

