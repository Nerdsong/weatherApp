import {useContext, useEffect, useState} from 'react';
import { searchContext, weatherData } from '../App';
import IsLoading from './ui/IsLoading';
import './styles/MainContainer.css'
import WeatherResults from './ui/WeatherResults';
import WelcomeScreen from './ui/WelcomeScreen';


function MainContainer() {
    
    const url: string = "https://api.weatherapi.com/v1/forecast.json?key=71b564ab7ff5470ab4f182355252003&days=2&aqi=no&alerts=no&q="

    const [searchResult, setSearchsearchResult] = useState <weatherData | null >(null);
    const [isLoading, setIsLoading] = useState <boolean> (false);
    const [welcomeScreen, setWelcomeScreen] = useState <boolean> (true)

    
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
                            setIsLoading(true)
                            const response = await fetch(url+searchRef.current.value);
                            if (!response.ok) {
                                throw new Error(`HTTP error Status: ${response.status}`);
                            }
                            const data = await response.json();
                            console.log("API Response:", data);
                            setSearchsearchResult(data);
                            setIsLoading(false);
                            setWelcomeScreen(false);
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
        {welcomeScreen? <WelcomeScreen/> : 
        isLoading? <IsLoading/>: searchResult && <WeatherResults searchResult={searchResult}/>}
        <div className='credits'>
            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" /></a>
        </div>
    </div>
  )
}

export default MainContainer