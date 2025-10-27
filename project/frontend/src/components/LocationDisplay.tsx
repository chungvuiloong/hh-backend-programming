import React, { useState, useEffect } from 'react';
import { locationService, LocationInfo } from '../services/locationService';

const LocationDisplay: React.FC = () => {
    const [location, setLocation] = useState<LocationInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await locationService.getLocationInfo();
            setLocation(data);
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

    return (
        <div>
            <h2>Your Location</h2>

            {location ? (
                <div>
                    <div>
                        <span>Country:</span>
                        <span>{location.country || 'Unknown'}</span>
                    </div>

                    <div>
                        <span>City:</span>
                        <span>{location.city || 'Unknown'}</span>
                    </div>
                </div>
            ) : (
                <p>No location data available</p>
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
