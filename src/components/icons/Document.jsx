import React from 'react';

export const Document = (props) => {
    
    const { fill } = props;

    return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 4.75C4.75 3.7835 5.5335 3 6.5 3H10.5126C10.9767 3 11.4218 3.18437 11.75 3.51256L14.7374 6.5C15.0656 6.82819 15.25 7.27331 15.25 7.73744V15.25C15.25 16.2165 14.4665 17 13.5 17H6.5C5.5335 17 4.75 16.2165 4.75 15.25V4.75Z" fill="#FAFAFA"/>
    </svg>
    );
}