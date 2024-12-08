import React from "react";

import { Home } from "./home/Home";
import { Scan } from "./scan/Scan";
import { Profile } from "./profile/Profile";
import { BenefitsTab } from "./benefits/BenefitsTab";

import { AppState } from "@/utils";
import { useAppState } from "@store/appStore";

export const PageBase = () => {
    const { appState } = useAppState();

    const getPage = () => {
        switch (appState?.activePage) {
            case AppState.Home:
                return <Home />;

            case AppState.Scan:
                return <Scan />;

            case AppState.Perks:
                return <BenefitsTab />;

            case AppState.Profile:
                return <Profile />;

            default:
                return <div className="text-center">Not Found</div>;
        }
    };

    return getPage();
};

