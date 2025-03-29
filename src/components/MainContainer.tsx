import {useContext, useEffect, useState} from 'react';
import { searchContext, weatherData } from '../App';
import './styles/MainContainer.css'


function MainContainer() {
    
    const url: string = "https://api.weatherapi.com/v1/current.json?key=71b564ab7ff5470ab4f182355252003&q="

    const [searchResult, setSearchsearchResult] = useState <weatherData | null >(null);

    
    const consumeContext = useContext(searchContext) 
    
    if(!consumeContext){
        throw new Error('context is undefined');
    }

    const { shouldSearch, searchRef, setBackgroundCondition } = consumeContext;

    
    useEffect (
            ()=>{
                const fetchingData = async () =>{
                    try {
                        if (searchRef.current){
                            const response = await fetch(url+searchRef.current.value);
                            if (!response.ok) {
                                throw new Error(`HTTP error Status: ${response.status}`);
                            }
                            const data = await response.json();
                            console.log("API Response:", data);
                            setSearchsearchResult(data);
                            setBackgroundCondition({code: data.current.condition.code, isDay: data.current.is_day})
                        }
                    } 
                    catch (error) {
                        console.error("Error fetching data:", error);
                    }
                }
                fetchingData();
            }, [shouldSearch])


  return (
    <div className='main-container'>
        <div className= 'content'>
            {searchResult && (<>
                <div className='content-title'>
                    <img src="/icons/gps.png" alt="" />
                    <h6>{searchResult.location.name}, {searchResult.location.region}, {searchResult.location.country}.</h6>
                </div>
                <div className='content-top'>
                    <div className='content-top-wrapper'>
                        <span>
                        <img src = {searchResult.current.condition.icon}/>
                        <h1>{searchResult.current.temp_c}</h1>
                        <p>°C</p>
                        </span>
                        <div>
                            <h3>{searchResult.current.condition.text}</h3>
                            <p>Feels Like: {searchResult.current.feelslike_c}°C</p>
                        </div>
                    </div>
                </div>
                <div className='content-bottom'>
                    <p>Last Updated: {searchResult.current.last_updated}</p>
                </div>
                </>
            )}
        </div>
        <div className='credits'>
            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" /></a>
        </div>
    </div>
  )
}

export default MainContainer