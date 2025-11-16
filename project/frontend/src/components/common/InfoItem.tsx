import React from "react";
import Icon from "./Icon";

const InfoItem = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center gap-2">
        <Icon path={icon} />
        <span className="font-semibold text-slate-900">{text}</span>
    </div>
);

export default React.memo(InfoItem);