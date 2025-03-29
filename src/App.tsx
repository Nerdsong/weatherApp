import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import DinamicBackground from './components/ui/dinamicBackground';
import './components/styles/DinamicBackground.css';



interface conditionData{
    code: number;
    icon: string;
    text: string;
}

export interface weatherData {
    location: {
        country: string;
        lat: number;
        localtime: string;
        name: string; 
        region: string;
    };
    current: {
        cloud: boolean;
        condition: conditionData;
        temp_c: number;
        dewpoint_c: number;
        feelslike_c: number;
        last_updated: string;        
    };
}

export interface backgroundData{
    code: number;
    isDay: boolean;
}

interface contextTyping {

    shouldSearch: boolean;
    setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>;
    backgroundCondition: backgroundData;
    setBackgroundCondition: React.Dispatch<React.SetStateAction<backgroundData>>;
    searchRef: React.RefObject<HTMLInputElement | null>;
}

export const searchContext = createContext <contextTyping | undefined>( undefined ) ;

function App() {

    
    const [shouldSearch, setShouldSearch] = useState <boolean>(false);
    const [backgroundCondition, setBackgroundCondition] = useState <backgroundData>({code:0, isDay:true});
    const searchRef = useRef <HTMLInputElement | null> (null);
    return (
    <searchContext.Provider value={{shouldSearch,setShouldSearch,backgroundCondition,setBackgroundCondition,searchRef}}>
        <DinamicBackground/>
        <Header/>
        <MainContainer/>
    </searchContext.Provider>
    )
}

export default App