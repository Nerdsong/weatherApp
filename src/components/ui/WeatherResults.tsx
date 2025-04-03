import { weatherData } from "../../App"

interface hourIndex{
    day: number;
    hour: number;
}

function WeatherResults({searchResult}: {searchResult: weatherData}) {
 
    const extractHour = (epochNumber: number, timeZoneData: string): string => { 
        const date:Date = new Date (epochNumber*1000)
        
        return(date.toLocaleString('en-US', {
            timeZone: timeZoneData,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }))

    }

    const extractDate = (epochNumber: number): string => {
        const date:Date = new Date (epochNumber *1000);
        return (date.toLocaleString('en-US',{
            month: "short",
            day: "2-digit",
            dayPeriod: "short"    
        }))
    }

    //this function receives a epoch number and returns an array with the epoch number corresponding to the next 5 hours 
    const calculateFutureHours = (epochNumber: number): number[] =>{
        const futureHours: number[] = [];
        const originalDate: Date = new Date (epochNumber *1000);
        const dateAdjusted: Date = new Date (originalDate); // this date would be rounded to make the calculation with rounded hours.
        dateAdjusted.setHours(dateAdjusted.getHours() + 1);
        dateAdjusted.setMinutes(0,0,0);

        for(let i:number = 0; i < 5 ; i++){
            let futureDate: Date = new Date (dateAdjusted);
            futureDate.setHours(dateAdjusted.getHours() + (i * 3));
            futureHours.push(futureDate.getTime()/1000);
        }

        return (futureHours)
    }

    //this function is for searching the corresponding epoch number in the json file given by the api
    const findIndexOfFutureHoursData = (epochNumber: number): hourIndex[] => {
        const futureHours: number[] = calculateFutureHours(epochNumber);
        let stillRemain: boolean = true;
        const dayAndHourIndex: hourIndex[] = [];
        let matches: number = 0;

        searchResult.forecast.forecastday.forEach((day, dayIndex) => {
            
            if(stillRemain){
                futureHours.forEach((futureHourNumber) => {
                    const hourIndex = day.hour.findIndex((hourlyData) => hourlyData.time_epoch === futureHourNumber)
                    if(hourIndex > -1){
                        matches ++;
                        dayAndHourIndex.push({day: dayIndex, hour: hourIndex})
                    }
                })

                matches === 5 ? stillRemain = false : stillRemain = true ;
            }
            else{console.log("all epoch numbers had been found")}
        })
        

        return dayAndHourIndex;
    }

    const futureDataIndex: hourIndex[] = findIndexOfFutureHoursData(searchResult.location.localtime_epoch);

    console.log(futureDataIndex)

    return (
    <div className= 'content'>
            {searchResult && (<>
                <div className='content-title'>
                    <img src="/icons/gps.png" alt="" />
                    <h6>{searchResult.location.name}, {searchResult.location.region}, {searchResult.location.country}.</h6>
                </div>
                <div className='content-top'>
                        <div className="local-time">
                            <h6>Local Time: </h6>
                            <h1>{extractHour(searchResult.location.localtime_epoch, searchResult.location.tz_id)}</h1>
                        </div>
                    <div className='content-top-wrapper'>
                        <span>
                        <img src = {searchResult.current.condition.icon}/>
                        <h1>{Math.floor(searchResult.current.temp_c)}</h1>
                        <p>°C</p>
                        </span>
                        <div>
                            <h3>{searchResult.current.condition.text}</h3>
                            <p>Feels Like: {searchResult.current.feelslike_c}°C</p>
                        </div>
                    </div>
                </div>
                <div className="hourly-report">
                    {futureDataIndex.map((hourIndex, key)=>(
                        <div className="hourly-element" key = {key} >
                            <div className="hourly-element-hour">
                                {extractHour(searchResult.forecast.forecastday[hourIndex.day].hour[hourIndex.hour].time_epoch,searchResult.location.tz_id)}
                            </div>
                            <div className="hourly-element-condition">
                                    <img className="hourly-report-img" src= {searchResult.forecast.forecastday[hourIndex.day].hour[hourIndex.hour].condition.icon} title={searchResult.forecast.forecastday[hourIndex.day].hour[hourIndex.hour].condition.text} />
                                    {Math.floor(searchResult.forecast.forecastday[hourIndex.day].hour[hourIndex.hour].temp_c)}<p>°C</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className='content-bottom'>
                    <p>Last Updated: {searchResult.current.last_updated}</p>
                </div>
                </>
            )}
        </div>
  )
}

export default WeatherResults