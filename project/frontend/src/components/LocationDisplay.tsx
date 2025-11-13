import React, { useState } from 'react';
import { locationService } from '../services/locationService';

const LocationDisplay: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [location, setLocation] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    

    React.useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        try {
            setLoading(true);
            setError(null);
            const locationData = await locationService.getLocationInfo();
            const weatherInformation = await locationService.getWeatherByCity();
            setWeatherData(weatherInformation);
            setLocation(locationData);
        } catch (err) {
            setError('Failed to fetch location. Make sure the backend is running.');
            console.error('Error fetching location:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <>Loading...</>
    if (error) return <>{error}</>

    return (
        <div>
            <h2>Your Location</h2>
            <div>
                <div>
                    <span>Country:</span>
                    <span>{location?.country_name || 'Unknown'}</span>
                </div>

                <div>
                    <span>City:</span>
                    <span>{location?.city_name || 'Unknown'}</span>
                </div>
                <div>
                    <span>Weather:</span>
                    {/* <span>{weather || 'Unknown'}</span> */}
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                        alt={weatherData?.weather[0]?.description || 'Weather icon'}
                    />
                </div>
            </div>

            <button
                onClick={fetchLocation}
            >
                Refresh Location
            </button>
        </div>
    );
};

export default React.memo(LocationDisplay);
