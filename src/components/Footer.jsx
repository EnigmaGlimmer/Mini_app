import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Colors } from "../styles/theme";
import { HomeIcon } from "./icons/HomeIcon";
import { ScanIcon } from "./icons/ScanIcon";
import { Assets } from "@assets";
import { WishlistIcon } from "./icons/WishlistIcon";
import { PageTabs, FrameWidth, FooterHeight } from "@utils/constants";
import { useAppState, usePage } from "../store";
import { AppState } from "@utils/constants";
import { useUser } from "../store";
import { GetStorageObject, Storage } from "@/utils";

export const Footer = () => {
  const { appState, setActivePage } = useAppState();
  const { page, setPage } = usePage();

  const handleChangeTab = useCallback((id, background, ...rest) => {
    setActivePage(id);
    setPage({ ...page, openDetail: false });
  }, [appState])

  const populateFooterIcon = (id, color) => {
    switch (id) {
      case AppState.Home:
        return <HomeIcon fill={color} />
      case AppState.Scan:
        return <ScanIcon fill={color} />
      case AppState.Perks:
        return <WishlistIcon fill={color} />
      case AppState.Profile:
        return <ProfileIcon />
    }
  }

  const populateFooter = (id, label) => {
    const isSelected = id === appState?.activePage;
    const color = isSelected ? Colors.primary_600 : Colors.neutral_400;
    return (
      <>
        {isSelected &&
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              width: '30px',
              height: '3px',
              background: 'var(--color-primary)'
            }}
          />
        }
        {populateFooterIcon(id, color)}
        <Label $isSelected={isSelected}>{label}</Label>
      </>
    )
  }

  if (!appState?.showFooter) {
    return <></>
  }

  return (
    <Container>
      <Tabs>
        {Object.values(PageTabs).map((item) => {
          const { id, label, background } = item;

          return (
            <Tab key={id} onClick={() => handleChangeTab(id, background)}>
              {populateFooter(id, label)}
            </Tab>
          );
        })}
      </Tabs>
      <h6 className="mt-3 text-center" style={{ color: "darkgray" }}>
        Powered By {" "}<a href="https://www.vaultik.com" target="_blank" style={{ color: Colors.primary_600 }}>Vaultik</a>
      </h6>
    </Container>
  );
};

export const ProfileIcon = () => {
  const { user, nameInitials } = useUser();
  const [avatar, setAvatar] = useState("");
  const { appState } = useAppState();
  const isSelected = appState?.activePage === AppState.Profile;
  useEffect(() => {
    setAvatar(user.avatar);
  }, [GetStorageObject(Storage.OptedUser)])

  return (
    <>
      {avatar
        ? <img
          src={avatar} alt="" style={{ width: '24px', height: '24px' }}
        />
        : <div
          className="avatar-initials"
          style={{
            width: "24px",
            height: "24px",
            fontSize: "12px",
            background: "#fff",
            border: `1px solid ${isSelected ? Colors.primary_600 : Colors.neutral_400}`,
            color: `${isSelected ? Colors.primary_600 : Colors.neutral_400}`,
          }}
        >
          <span>{nameInitials}</span>
        </div >
      }
    </>
  )
};

const Container = styled.div`
  color: ${Colors.primary_600};
  flex-shrink: 0;
  width: 100%;
  height: ${FooterHeight}px;
  bottom: 0px;
  border-radius: 36px 36px 0px 0px;
  border-top: 1px solid #CCCCCC;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  gap: 12px;
`;

const Tab = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 75px;
  cursor: pointer;
  margin-top: 16px;
`;

const Label = styled.div`
  height: 20px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: ${(props) =>
    props.$isSelected ? Colors.primary_600 : Colors.neutral_400};
  margin-top: 4px;
`;
