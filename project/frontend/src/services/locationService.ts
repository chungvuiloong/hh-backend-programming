import axios from 'axios';
import { get } from 'http';

const IP_API_URL = "https://ipapi.co/json/";

export interface LocationInfo {
    country_name: string;
    country_code: string;
    city: string;
    weather: string;
}

export const locationService = {
    getLocationInfo: async (): Promise<LocationInfo> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data;
    },

    getCountry: async (): Promise<string> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data.country_name;
    },

    getCity: async (): Promise<string> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data.city;
    },

    getCountryCode: async (): Promise<string> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data.country_code;
    }

    // Get all location info
    // getLocationInfo: async (): Promise<LocationInfo> => {
    //     const { data } = await axios.get<LocationInfo>(`/location/info`);
    //     return data;
    // },

    // Get only country
    // getCountry: async (): Promise<string> => {
    //     const { data } = await axios.get<string>(`/location/country`);
    //     return data;
    // },

    // Get only city
    // getCity: async (): Promise<string> => {
    //     const { data } = await axios.get<string>(`/location/city`);
    //     return data;
    // },

    //Get city weather
    // getCityWeather: async (): Promise<string> => {
    //     const { data } = await axios.get<string>(`/location/city/weather`);
    //     return data;
    // },
};
