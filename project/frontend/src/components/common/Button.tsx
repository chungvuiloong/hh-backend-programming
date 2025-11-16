import React from 'react';
import Icon from './Icon';
interface ButtonProps {
    onClick?: () => void;
    loading?: boolean;
    path?: string;
    children?: React.ReactNode;
}

const Button = ({ onClick, loading, path, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={loading || false}
            className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            <Icon
                path={path}
                className="w-4 h-4 text-white"
            />
            {children}
        </button>
    );
};

export default React.memo(Button);