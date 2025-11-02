import './App.css';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import { LocationInfo, locationService } from './services/locationService';
import React from 'react';

function App() {
    const [locationInfo, setLocationInfo] = React.useState<LocationInfo | null>(null);
    const [ country, setCountry ] = React.useState<string | null>(null);
    const [ city, setCity ] = React.useState<string | null>(null);
    const [ countryCode, setCountryCode ] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchLocationInfo = async () => {
            const info = await locationService.getLocationInfo();
            setLocationInfo(info);
            setCountry(info.country);
            setCity(info.city);
            setCountryCode(info.countryCode);
        };

        fetchLocationInfo();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Friend List
        </h1>
        <div>
            {country}
            {city}
            {countryCode}
        </div>
        {/* <LocationDisplay /> */}
        <div>
          {/* <Form /> */}
        </div>
    </div>
  );
}

export default App;
