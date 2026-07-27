import './card.css'



export default function Card({ title, description, link, shortcutsList, setShortcutsList, index }) {

    const faviconSRC = `https://www.google.com/s2/favicons?domain=${link}&sz=64`;
   

    function cleanURL(link){
        if(link.startsWith("http://") || link.startsWith("https://")){
            return link;
        }
        else {
            return "https://" + link;
        }
    }

    function deleteSelf(){
        setShortcutsList(shortcutsList.slice(0, index).concat(shortcutsList.slice(index+1)))
    }

 

  return (


     
        
        <a href={cleanURL(link)}  rel="noopener noreferrer">

            <div className="card" title={title}>
                <button className="c-button" onClick={(e)=>{
                    e.preventDefault()
                    deleteSelf()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>   
                </button>
                <img src={faviconSRC} alt={title} style={{margin: '0px', lineSpacing:'0'}} />
                <h2>{title}</h2>
                <p>{description}</p> 
            </div>
        </a>
      

  );

  
}