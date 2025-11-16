import React from 'react';
import Icon from './Icon';

const Button = ({ fetchLocation, loading }) => {
    return (
        <button
            onClick={fetchLocation}
            disabled={loading}
            className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            <Icon
                path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                className="w-4 h-4 text-white"
            />
            Refresh
        </button>
    );
};

export default Button;