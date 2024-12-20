import React from 'react';

export const WallIcon = (props) => {
  const { fill, onClick } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.83898 14.193L3.16798 16.088C2.79298 16.354 2.63598 16.834 2.78098 17.27L3.78498 20.285C3.92598 20.712 4.32498 21 4.77498 21H8.11098C8.56098 21 8.95998 20.712 9.10198 20.285L10.106 17.27C10.251 16.834 10.094 16.354 9.71898 16.088L7.04798 14.193C6.68498 13.936 6.20098 13.936 5.83898 14.193Z"
        stroke={fill}
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.19287 3.5H8.69287C9.24487 3.5 9.69287 3.948 9.69287 4.5V9C9.69287 9.552 9.24487 10 8.69287 10H4.19287C3.64087 10 3.19287 9.552 3.19287 9V4.5C3.19287 3.948 3.64087 3.5 4.19287 3.5Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6331 14V14C15.7001 14 14.1331 15.567 14.1331 17.5V17.5C14.1331 19.433 15.7001 21 17.6331 21V21C19.5661 21 21.1331 19.433 21.1331 17.5V17.5C21.1331 15.567 19.5661 14 17.6331 14Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6049 4.07L14.0579 8.146C13.5529 8.953 14.1339 10 15.0849 10H20.1799C21.1319 10 21.7119 8.953 21.2069 8.146L18.6609 4.07C18.1859 3.31 17.0799 3.31 16.6049 4.07Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
