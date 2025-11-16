import React from "react";

const Icon = ({ path, className = "w-5 h-5" }: { path: string; className?: string }) => (
    <svg className={`${className} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

export default React.memo(Icon);