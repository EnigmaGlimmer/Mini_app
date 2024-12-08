import React, { useEffect } from 'react';

export const useClickOutSide = (ref, handler) => {
    return (
        useEffect(() => {
            const listener = (event) => {
                alert("SS");
                if( !ref.current || ref.current.contains((event.target)) )
                    return;
                handler();
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.addEventListener('touchstart', listener);
            };
        }, [ref, handler])
    );
};