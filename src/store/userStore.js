import { atom, selector, useRecoilValue, useRecoilState } from 'recoil';

import { SetStorageObject, Storage } from "@/utils";

const emailState = atom({
    key: 'emailStateKey',
    default: "",
});

const userState = atom({
    key: 'userStateKey',
    default: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        refreshToken: '',
        walletId: '',
        avatar: '',
    },
});

const fullNameState = selector({
    key: 'fullNameKey',
    get: ({ get }) => {
        const user = get(userState);
        const fullName = `${user?.firstName} ${user?.lastName}`;

        return fullName;
    }
});

const nameInitialState = selector({
    key: 'nameInitialStateKey',
    get: ({ get }) => {
        const user = get(userState);
        const nameInitials = (user?.firstName && user?.lastName)
            ? user?.firstName[0] + user?.lastName[0]
            : '';

        return nameInitials;
    }
})

export const useUser = () => {
    const [verifyEmail, setVerifyEmail] = useRecoilState(emailState);
    const [user, setUserData] = useRecoilState(userState);
    const fullName = useRecoilValue(fullNameState);
    const nameInitials = useRecoilValue(nameInitialState);

    const setUser = (payload, persist = true) => {
        setUserData(payload);
        
        if (persist) {
            SetStorageObject(Storage?.OptedUser, payload);
        }
    };
    
    return {
        verifyEmail,
        setVerifyEmail,
        user,
        fullName,
        nameInitials,
        setUser,
    };
};
