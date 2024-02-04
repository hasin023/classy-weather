import React from 'react';
import Day from './Day';

class Weather extends React.Component {

    render() {
        const {
            temperature_2m_max: maxTemp,
            temperature_2m_min: minTemp,
            time: dates,
            weathercode: codes,
        } = this.props.weather;

        return (
            <div>
                <h2 className='font-normal text-5xl tracking-[2px] mb-4'>{this.props.city}</h2>
                <ul className='flex gap-10 list-none'>
                    {dates.map((date, i) => (
                        <Day key={i} date={date} maxTemp={maxTemp[i]} minTemp={minTemp[i]} weatherCode={codes[i]} isToday={i === 0} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Weather;