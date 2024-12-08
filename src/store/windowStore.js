import { atom, useRecoilState } from 'recoil';
import { useCallback } from 'react';

export const windowState = atom({
    key: 'windowStateKey',
    default: {
        iframe: undefined,
        parentWindow: undefined,
        brandPubKey: '',
        logoUrl: '',
        smallLogoUrl: '',
        insuranceRequired: true,
    },
});

export const useWindowState = () => {
    const [vaultikWindow, setWindowState] = useRecoilState(windowState);

    const PostMessage = ({ type, data }) => {
        if (vaultikWindow.parentWindow) {
            vaultikWindow.parentWindow.postMessage({ type, data });
        }
    };

    const setBrandPubKey = useCallback((brandPubKey) => {
        setWindowState(_state => ({
            ..._state,
            brandPubKey
        }))
    }, [vaultikWindow]);

    return {
        vaultikWindow,
        PostMessage,
        setWindowState,
        setBrandPubKey,
    };
};