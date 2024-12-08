import React from 'react';

export const ListIcon = (props) => {
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
        d="M8.99878 6.43667H20.0034"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0034 12H8.99878"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99878 17.5633H20.0034"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49703 5.93646C4.22078 5.93646 3.99683 6.16041 3.99683 6.43667C3.99683 6.71293 4.22078 6.93688 4.49703 6.93688C4.77329 6.93688 4.99724 6.71293 4.99724 6.43667C4.99724 6.16041 4.77329 5.93646 4.49703 5.93646"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49703 11.4998C4.22078 11.4998 3.99683 11.7237 3.99683 12C3.99683 12.2762 4.22078 12.5002 4.49703 12.5002C4.77329 12.5002 4.99724 12.2762 4.99724 12C4.99724 11.7237 4.77329 11.4998 4.49703 11.4998"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49703 17.0631C4.22078 17.0631 3.99683 17.2871 3.99683 17.5633C3.99683 17.8396 4.22078 18.0635 4.49703 18.0635C4.77329 18.0635 4.99724 17.8396 4.99724 17.5633C4.99724 17.2871 4.77329 17.0631 4.49703 17.0631"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
