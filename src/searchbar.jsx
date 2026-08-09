import './searchbar.css';
import {useState} from 'react';
export default function SearchBar() {

    const [focused, setFocused] = useState(false);

    return (
        <div>


            {focused && (
                <>
                    <div className="searchbar-container"/>
                    
                </>
            )}
                
            
           
            <form action="https://google.com/search" method="GET">
                
                    <input type="text" name="q" placeholder="Search Google..." className="searchbar" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} autocomplete="off"/>
                    </form>  

            
          
            
           
        </div>
        
    )
}