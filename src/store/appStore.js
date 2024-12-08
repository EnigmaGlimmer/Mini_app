import { atom, useRecoilState } from 'recoil';

import { AppState } from '../utils';
import { PageTabs } from '@utils/constants';
import { Colors } from '../styles/theme';
import { useCallback } from 'react';

const pageState = atom({
    key: 'pageStateKey',
    default: {
        id: PageTabs.home.id,
        background: Colors.white,
        openDetail: false,
        select: null,
        display: true,
        showFooter: true,
        is3D: false,
        isOpenApp: false,
    },
});

export const usePage = () => {
    const [page, setPage] = useRecoilState(pageState);
    const setPageState = useCallback((openDetail, select) => {
        setPage({
            ...page,
            openDetail: openDetail,
            select: select,
            is3D: false,
        });
    }, [page]);

    return {
        page,
        setPage,
        setPageState
    };
};

const _appState = atom({
    key: 'appStateKey',
    default: {
        isLoggedIn: false,
        activePage: AppState.Home,
        showFooter: true,
        showHeader: true,
    }
});

export const useAppState = () => {
    const [appState, setAppState] = useRecoilState(_appState);
    const setShowFooter = useCallback((showFooter) => {
        setAppState(_state => ({
            ..._state,
            showFooter
        }))
    }, [appState]);

    const setShowHeader = useCallback((showHeader) => {
        setAppState(_state => ({
            ..._state,
            showHeader
        }))
    }, [appState]);

    const setLoggedIn = useCallback((isLoggedIn) => {
        setAppState(_state => ({
            ..._state,
            isLoggedIn: isLoggedIn
        }))
    }, [appState]);

    const setActivePage = useCallback((activePage) => {
        setAppState(_state => ({
            ..._state,
            activePage
        }))
    }, [appState]); 
    
    const openApp = useCallback(() => {
        setAppState(_state => ({
            ..._state,
            isOpenApp: true
        }))
    }, [appState]); 

    const closeApp = useCallback(() => {
        setAppState(_state => ({
            ..._state,
            isOpenApp: false
        }))
    }, [appState]); 

    const toggleOpenApp = useCallback(() => {
        setAppState(_state => ({
            ..._state,
            isOpenApp: !_state.isOpenApp
        }))
    }, [appState]); 

    return {
        appState,
        ...appState,
        setAppState,
        setShowFooter,
        setShowHeader,
        setLoggedIn,
        setActivePage,
        openApp,
        closeApp,
        toggleOpenApp
    };
};