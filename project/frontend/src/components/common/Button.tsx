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
            className="flex flex-row px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed  items-center gap-2"
        >
            {path && (
                <Icon
                    path={path}
                    className="text-white"
                />
            )}
            <span className="w-auto">{children}</span>
        </button>
    );
};

export default React.memo(Button);