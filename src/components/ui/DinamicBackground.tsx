import  { useContext } from 'react'
import { searchContext } from '../../App'

function DinamicBackground() {

    const backgroundContext = useContext (searchContext);
    if (!backgroundContext) {
        throw new Error('context is undefined');
    }
    const {backgroundCondition} = backgroundContext;

    //const clear:number = 1000; 

    //const partlyCloudly: number = 1003; 

    const cloudly: number[] = [1006, 1009, 1030, 1135, 1147];

    const rain: number[] = [
        1063, 1150, 1153, 1180, 1183, 
        1186, 1189, 1192, 1195, 1240, 
        1243, 1246, 1168, 1171, 1198, 1201
      ];

    const snow: number[] =[
        1066, 1210, 1213, 1216, 1219, 
        1222, 1225, 1114, 1117, 1255, 1258
      ];
      
    //const thunderStorm: number[] = [1087, 1273, 1276, 1279, 1282];

    const weatherClasses = {
        clear:{
            day:'dinamic-background-clear-day',
            night:'dinamic-background-clear-night'
        },
        partlyCloudly:{
            day:'dinamic-background-partlycloudly-day',
            night:'dinamic-background-partlycloudly-night'
        },
        cloudly:{
            day:'dinamic-background-cloudly-day',
            night:'dinamic-background-cloudly-night'
        },
        rain:{
            day:'dinamic-background-rain-day',
            night:'dinamic-background-rain-night'
        },
        snow:{
            day:'dinamic-background-snow-day',
            night:'dinamic-background-snow-night'
        },
        thunderStorm:{
            day:'dinamic-background-thunderstorm-day',
            night:'dinamic-background-thunderstorm-night'
        }
    }

    const determineBackgroundClass = () => {
        if(backgroundCondition.code === 1000){
            return backgroundCondition.isDay? weatherClasses.clear.day : weatherClasses.clear.night;
        }
        else if(backgroundCondition.code === 1003){
            return backgroundCondition.isDay? weatherClasses.partlyCloudly.day : weatherClasses.partlyCloudly.night;
        }
        else if(cloudly.includes(backgroundCondition.code)){
            return backgroundCondition.isDay? weatherClasses.cloudly.day : weatherClasses.cloudly.night;
        }
        else if(rain.includes(backgroundCondition.code)){
            return backgroundCondition.isDay? weatherClasses.rain.day : weatherClasses.rain.night;
        }
        else if(snow.includes(backgroundCondition.code)){
            return backgroundCondition.isDay? weatherClasses.snow.day : weatherClasses.snow.night;
        }
        else{
            return backgroundCondition.isDay? weatherClasses.thunderStorm.day : weatherClasses.thunderStorm.night;
        }
        
    }

    return (
        <div className= {determineBackgroundClass()}></div>
    )
   
    
    
}

export default DinamicBackground