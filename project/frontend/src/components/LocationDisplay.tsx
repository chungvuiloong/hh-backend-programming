import React, { useState } from 'react';
import { locationService } from '../services/locationService';
import Divider from './common/Divider';
import Icon from './common/Icon';
import InfoItem from './common/InfoItem';
import Button from './common/Button';

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

    const tempCelsius = weatherData?.main?.temp ? Math.round(weatherData.main.temp - 273.15) : '--';

    if (loading) return <div className="text-slate-600 text-sm">Loading location...</div>
    if (error) return <div className="text-red-600 text-sm">{error}</div>

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <InfoItem
                        icon="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        text={location?.country_name || 'Unknown'}
                    />
                    <Divider />
                    <InfoItem
                        icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        text={location?.city_name || 'Unknown'}
                    />
                </div>

                {weatherData && (
                    <>
                        <Divider />
                        <div className="flex items-center gap-3">
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt={weatherData.weather[0]?.description || 'Weather icon'}
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{tempCelsius}°C</div>
                                <div className="text-sm text-slate-600 capitalize">
                                    {weatherData.weather[0]?.description || 'Unknown'}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <Button onClick={fetchLocation} loading={loading} path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                    Refresh
                </Button>
            </div>
        </div>
    );
};

export default React.memo(LocationDisplay);
