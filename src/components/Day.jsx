import React from 'react';

function getWeatherIcon(wmoCode) {
    const icons = new Map([
        [[0], "☀️"],
        [[1], "🌤"],
        [[2], "⛅️"],
        [[3], "☁️"],
        [[45, 48], "🌫"],
        [[51, 56, 61, 66, 80], "🌦"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
        [[71, 73, 75, 77, 85, 86], "🌨"],
        [[95], "🌩"],
        [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
}

function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
    }).format(new Date(dateStr));
}

class Day extends React.Component {

    render() {
        const {
            date,
            maxTemp,
            minTemp,
            weatherCode,
            isToday,
        } = this.props;

        return (
            <div className='px-4 py-8 bg-[#f0d2ce] w-48 flex flex-col items-center gap-5 cursor-pointer outline outline-2 outline-[#222]'>
                <span className='text-[5.2rem] p-3'>{getWeatherIcon(weatherCode)}</span>
                <p className='text-xl font-semibold'>{isToday ? "Today" : formatDay(date)}</p>
                <p>{Math.floor(minTemp)}&deg; &mdash; {Math.ceil(maxTemp)}&deg;</p>
            </div>
        );
    }
}

export default Day;