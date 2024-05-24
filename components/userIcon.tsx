import { Avatar, Badge } from "antd";
import React from "react";

interface Props {
    user: string;
    badge: number;
    color?: string;
}

const UserIcon: React.FC<Props> = ({ user, badge, color }) => {
    const nameInitial = user.charAt(0).toUpperCase();

    const getColor = (badge: number): string => {
        switch(badge) {
            case 1:
                return '#85C1E9'; // light blue
            case 2:
                return '#F5B041'; // light orange
            case 3:
                return '#58D68D'; // light green
            default:
                return color || '#D5D8DC'; // default light gray
        }
    };

    const badgeColor = getColor(badge);

    return (
        <Badge count={badge} size="small" color={badgeColor}>
            <Avatar style={{ backgroundColor: badgeColor }} className="font-bold" shape="circle" size="large">
                {nameInitial}
            </Avatar>
        </Badge>
    );
};

export default UserIcon;
