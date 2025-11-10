import React, { useState } from 'react';
import { locationService } from '../services/locationService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface FriendFormData {
  name: string;
  email: string;
  citizenship: string;
  placeOfMeeting: string;
}

const FriendForm: React.FC = () => {
    const addLocation = useMutation(api.locations.addLocation);
    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [formData, setFormData] = useState<FriendFormData>({
        name: '',
        email: '',
        citizenship: '',
        placeOfMeeting: `${city || 'Unknown'}, ${country || 'Unknown'}`.trim()
    });

    const getCityAndCountry = async () => {
        const city = await locationService.getCity();
        const country = await locationService.getCountry();

        setCity(city);
        setCountry(country);
        setFormData(prev => ({
            ...prev,
            placeOfMeeting: `${city}, ${country}`.trim()
        }));
    };

    React.useEffect(() => {
        getCityAndCountry();
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    if (city && country) {
      try {
        const locationId = await addLocation({
          city: city,
          country: country
        });
        console.log('Location saved to Convex with ID:', locationId);
      } catch (error) {
        console.error('Failed to save location to Convex:', error);
      }
    }

    setFormData({
      name: '',
      email: '',
      citizenship: '',
      placeOfMeeting: `${city}, ${country}`.trim()
    });
  };

  return (
    <div>
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="citizenship">
            Citizenship
          </label>
          <input
            type="text"
            id="citizenship"
            name="citizenship"
            value={formData.citizenship}
            onChange={handleChange}
            required
            placeholder="Enter your citizenship"
          />
        </div>

        <div>
          <label htmlFor="placeOfMeeting">
            Place of Meeting
          </label>
          <input
            type="text"
            id="placeOfMeeting"
            name="placeOfMeeting"
            value={formData.placeOfMeeting}
            onChange={handleChange}
            required
            placeholder="Enter place of meeting"
          />
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(FriendForm);
