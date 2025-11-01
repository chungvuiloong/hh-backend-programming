import React, { useState } from 'react';
import { locationService } from '../services/locationService';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const LocationDisplay: React.FC = () => {
    const convexLocation = useQuery(api.locations.getLatestLocation);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLocation = async () => {
        try {
            setLoading(true);
            setError(null);
            await locationService.getLocationInfo();

            const weatherInformation = await locationService.getCityWeather();
            setWeatherData(weatherInformation);
        } catch (err) {
            setError('Failed to fetch location. Make sure the backend is running.');
            console.error('Error fetching location:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <p>Loading location...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button
                    onClick={fetchLocation}
                >
                    Retry
                </button>
            </div>
        );
    }

    console.log(weatherData);

    return (
        <div>
            <h2>Your Location</h2>

            {convexLocation && (
                <div>
                    <div>
                        <span>Country:</span>
                        <span>{convexLocation.country || 'Unknown'}</span>
                    </div>

                    <div>
                        <span>City:</span>
                        <span>{convexLocation.city || 'Unknown'}</span>
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
            )}

            <button
                onClick={fetchLocation}
            >
                Refresh Location
            </button>
        </div>
    );
};

export default React.memo(LocationDisplay);
