import axios from 'axios';

const API_BASE_URL = '';

export interface LocationInfo {
  country: string;
  countryCode: string;
  city: string;
}

export const locationService = {
    // Get all location info
    getLocationInfo: async (): Promise<LocationInfo> => {
        const { data } = await axios.get<LocationInfo>(`/location/info`);
        return data;
    },

    // Get only country
    getCountry: async (): Promise<string> => {
        const { data } = await axios.get<string>(`/location/country`);
        return data;
    },

    // Get only city
    getCity: async (): Promise<string> => {
        const { data } = await axios.get<string>(`/location/city`);
        return data;
    },
};
