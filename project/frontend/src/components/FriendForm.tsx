import React, { useState } from 'react';
import { locationService } from '../services/locationService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

interface FriendFormData {
    fullName: string;
    email?: string;
    identity?: string;
    placeOfMeeting?: string;
    phoneNumber?: string;
    notesAboutFriend?: string;
}

const FriendForm: React.FC = () => {
    const { userId } = useAuth();
    const addFriend = useMutation(api.users.addFriendToUser);
    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [formData, setFormData] = useState<FriendFormData>({
        fullName: '',
        email: '',
        identity: '',
        placeOfMeeting: `${city || 'Unknown'}, ${country || 'Unknown'}`.trim(),
        phoneNumber: '',
        notesAboutFriend: ''
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
    await addFriend({
      userID: userId,
      friend: {
        fullname: formData.fullName,
        firstMeet: formData.placeOfMeeting || '',
        identity: formData.identity,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        notesAboutFriend: formData.notesAboutFriend
      }
    });

    setFormData({
      fullName: '',
      email: '',
      identity: '',
      placeOfMeeting: `${city}, ${country}`.trim(),
      phoneNumber: '',
      notesAboutFriend: ''
    });
  };

  return (
    <div>
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">
            Fullname
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter Full name"
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
            // required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">
            PhoneNumber
          </label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            // required
            placeholder="Enter phoneNumber"
          />
        </div>

        <div>
          <label htmlFor="identity">
            identity
          </label>
          <input
            type="text"
            id="identity"
            name="identity"
            value={formData.identity}
            onChange={handleChange}
            // required
            placeholder="Enter identity"
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
            // required
            placeholder="Enter place of meeting"
          />
        </div>
        <div>
          <label htmlFor="notesAboutFriend">
            Notes About Friend
          </label>
          <input
            type="text"
            id="notesAboutFriend"
            name="notesAboutFriend"
            value={formData.notesAboutFriend}
            onChange={handleChange}
            // required
            placeholder="Enter notes about new friend"
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
