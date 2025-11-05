import axios from 'axios';
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://friend-list-d047c88faa49.herokuapp.com'
    : 'http://localhost:8080';

export interface LocationInfo {
    country_name: string;
    country_code: string;
    city: string;
    weather?: string;
}

export const locationService = {
    getPublicIP: async (): Promise<string> => {
        const response = await fetch(`${API_BASE_URL}/ip`);
        return response.text();
    },

    getLocationInfo: async (): Promise<LocationInfo> => {
        const response = await fetch(`${API_BASE_URL}/location`);
        const data = await response.json();
        return data;
    },

    getWeatherByCity: async (): Promise<string | null> => {
        const response = await fetch(`${API_BASE_URL}/location/country/city/weather`);
        const data = await response.json();
        return data;
    }

    // getLocationInfo: async (): Promise<LocationInfo> => {
    //     const { data } = await axios.get<LocationInfo>(IP2_LOCATION_URL + `?ip=` + await locationService.getPublicIP());
    //     return data;
    // }

    // getLocationInfo: async (): Promise<LocationInfo> => {
    //     const geo = await geoip.lookup(await locationService.getPublicIP());
    //     return {
    //         country_name: geo.country,
    //         country_code: geo.country_code,
    //         city: geo.city,
    //     };
    // },

    // getLocationInfo: async (): Promise<LocationInfo> => {
    //     const { data } = await axios.get<LocationInfo>(IP_API_URL);
    //     return data;
    // },

    // getCountry: async (): Promise<string> => {
    //     const { data } = await axios.get<LocationInfo>(IP_API_URL);
    //     return data.country_name;
    // },

    // getCity: async (): Promise<string> => {
    //     const { data } = await axios.get<LocationInfo>(IP_API_URL);
    //     return data.city;
    // },

    // getCountryCode: async (): Promise<string> => {
    //     const { data } = await axios.get<LocationInfo>(IP_API_URL);
    //     return data.country_code;
    // }

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
