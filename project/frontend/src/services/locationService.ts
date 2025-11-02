import axios from 'axios';
import { get } from 'http';

const IP_API_URL = "http://ip-api.com/json/";

export interface LocationInfo {
    country: string;
    countryCode: string;
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
        return data.country;
    },

    getCity: async (): Promise<string> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data.city;
    },

    getCountryCode: async (): Promise<string> => {
        const { data } = await axios.get<LocationInfo>(IP_API_URL);
        return data.countryCode;
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
