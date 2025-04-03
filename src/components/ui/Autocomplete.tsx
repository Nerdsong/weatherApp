import { useState,useEffect, useRef } from "react";
import autocompleteElement from "../interfaces/autocompleteElement.ts"
import IsLoadingSugestion from "./IsLoadingSugestion.tsx";
import "../styles/Autocomplete.css"


interface autocompleteProps{
    searchValue : string|null;
    setSearchValue: React.Dispatch<React.SetStateAction<string|null>>;
    searchRef: React.RefObject<HTMLInputElement|null>;
}

function Autocomplete({searchValue,setSearchValue,searchRef}:autocompleteProps) {

    const [autocomplete, setAutocomplete] = useState <autocompleteElement[]| null> (null);
    const [isLoadingSugestion, setIsLoadingSugestion] = useState <boolean> (false)
    const autoCompleteUrl: string = "https://api.weatherapi.com/v1/search.json?key=71b564ab7ff5470ab4f182355252003&q="
    const  autocompleteRef = useRef <HTMLDivElement>(null);


    useEffect(
        ()=>{
            const fetchLocations = async() =>{
                try{
                    if(searchValue){
                        setIsLoadingSugestion(true)
                        const result = await fetch(autoCompleteUrl+searchValue)
                        if (!result.ok) {
                            throw new Error(`HTTP error Status: ${result.status}`);
                        }
                        const data = await result.json();
                        setIsLoadingSugestion(false);
                        setAutocomplete(data);
                    }
                }
                catch (error) {
                    console.error("Error fetching data:", error); 
                }
            }
            fetchLocations();
        }
        , [searchValue] // to remember: references could not be used as a dependencies, that is why here goes a state value and its value is assigned with onChange in the html element. 
    );

    function handleClickSugestion(element: autocompleteElement){
        setSearchValue?.(`${element.name}, ${element.region}, ${element.country}`);
        if(searchRef?.current){
            searchRef.current.value = `${element.name}, ${element.region}, ${element.country}`;
        }
        setAutocomplete([]);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setAutocomplete(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };


    }, []);


if(isLoadingSugestion){
    return(
        <IsLoadingSugestion/>
    )
}

else if(autocomplete!=null){
  
    return (
        <div  ref={autocompleteRef}>
            <ul  className='autocomplete-list'>
            {autocomplete.map((element, index) => (
            <li className="autocomplete-list-element" key={index} onClick={() => handleClickSugestion(element)}>
                {element.name}, {element.region}, {element.country}    
                </li>
            ))}
        </ul>
       </div>
   )
}
}

export default Autocomplete