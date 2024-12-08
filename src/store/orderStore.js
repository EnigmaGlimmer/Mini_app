import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { windowState } from './windowStore';
import { OrderApi } from '@/api';

const ordersState = atom({
    key: 'ordersStateKey',
    default: [],
});

export const useOrders = (fetchOnStart = true, isForce = false) => {
    const [isFetching, setFetching] = useState(false);
    const [orders, setOrders] = useRecoilState(ordersState);
    const [vaultikWindow] = useRecoilState(windowState);

    const fetchOrders = async (page, size) => {
        if (!vaultikWindow.brandPubKey && process.env.FETCH_ONLY_BRANDS === "true") {
            setOrders([]);
            return [];
        }

        setFetching(true);

        try {
            const _orders = await OrderApi.getOrders(vaultikWindow.brandPubKey, page, size);

            setOrders(_orders.data);
            setFetching(false);

            return _orders.data;
        } catch (error) {
            setFetching(false);
            throw error;
        }
    };

    useEffect(() => {
        if (isForce) {
            fetchOrders();
        }
        if (fetchOnStart && orders.length === 0) {
            fetchOrders();
        }
    }, []);

    return {
        isFetching,
        orders,
        setOrders,
        fetchOrders,
    };
};
