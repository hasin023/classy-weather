import React from "react"
import Weather from "./Weather";

function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

class SearchCity extends React.Component {

    state = {
        city: "",
        isLoading: false,
        displayLocation: "",
        weather: {},
    }

    handleOnChange = (e) => {
        this.setState({ city: e.target.value });
    }

    fetchWeather = async () => {
        try {
            this.setState({ isLoading: true });

            // 1) Getting location (geocoding)
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.city}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);

            if (!geoData.results) throw new Error("Location not found");

            const { latitude, longitude, timezone, name, country_code } =
                geoData.results.at(0);
            this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}`, });

            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            this.setState({ weather: weatherData.daily });
        } catch (err) {
            console.err(err);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="flex flex-col items-center gap-16 w-[112rem] border-solid border-2 border-[#222] outline outline-[#222] outline-2 outline-offset-[1.2rem] py-24">
                <h1 className="font-normal text-8xl tracking-[2px]">Classy Weather</h1>
                <div>
                    <input className="text-3xl bg-[#f0d2ce] px-[3.2rem] py-[1.6rem] border-none w-[32rem] focus:outline outline-2 outline-[#222]"
                        onChange={this.handleOnChange}
                        type="text" placeholder="Search from Location" value={this.state.city} />
                </div>
                <button onClick={this.fetchWeather}
                    className="px-4 py-2 font-medium bg-red-400 drop-shadow-lg hover:bg-red-500 active:drop-shadow-none">
                    Search
                </button>

                {this.state.isLoading && <p className="font-bold text-[2.4rem]">Loading...</p>}
                {this.state.weather.weathercode && <Weather weather={this.state.weather} city={this.state.displayLocation} />}
            </div>
        )
    }
}

export default SearchCity