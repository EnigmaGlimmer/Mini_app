import React from 'react';
import { Assets } from "@assets";

export const HeaderTab = (props) => {
    const { onBack, title, detailScrollRef } = props;

    return (
        <div className="top-nav" ref={detailScrollRef}>
            <img
                className="cursor-pointer"
                onClick={onBack}
                src={Assets.left_arrow}
                alt=""
            />
            <div className="nav-title text-overflow-hide">
                {title}
            </div>
            <div />
        </div>
    );
};
