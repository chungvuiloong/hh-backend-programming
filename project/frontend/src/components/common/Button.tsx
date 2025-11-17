import React from 'react';
import Icon from './Icon';
interface ButtonProps {
    onClick?: () => void;
    className?: string;
    loading?: boolean;
    path?: string;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, className, loading, path, children, type }: ButtonProps) => {
    const typeStyle = type === "reset" ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700";
    return (
        <button
            onClick={onClick}
            disabled={loading || false}
            type={type}
            className={`${className} ${typeStyle}  flex flex-row justify-center px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed  items-center gap-2`}
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