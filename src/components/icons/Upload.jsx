import React from 'react';

export const Upload = (props) => {

    const { fill } = props;
    
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13.5L3 14.375C3 15.8247 4.17525 17 5.625 17L14.375 17C15.8247 17 17 15.8247 17 14.375L17 13.5M13.5 6.5L10 3M10 3L6.5 6.5M10 3L10 13.5" stroke="#A3A3A3" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};
