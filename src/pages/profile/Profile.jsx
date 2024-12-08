import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { Assets } from "@assets";
import { ProfileDetailPages } from "@components/profile/ProfileDetailPages";
import { LinkButton } from "@components/profile/LinkButton";
import { usePage } from "@store";
import { AuthApi } from "@/api";
import { useUser } from '@store/userStore';
import { Colors } from "@/styles/theme";

export const Profile = (props) => {
  const { page, setPageState } = usePage();
  const [openAlert, setOpenAlert] = useState(false);
  const { user, nameInitials } = useUser();

  const detailScrollRef = useRef(null);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handelOpenDetail = (item) => {
    setPageState(true, item.title);
  };

  const handleCloseDetail = async (info) => {
    setPageState(false);
    if (page.select === "Notifications") {
      await AuthApi.updateProfile(info)
    }
  };

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [page?.openDetail]);

  const profileItems = [
    { title: "Personal Data", icon: Assets.user, position: "right", onClick: handelOpenDetail },
    // { title: "Document & KYC", icon: Assets.bookmark, position: "right", onClick: handelOpenDetail },
    { title: "Security", icon: Assets.lock_closed, position: "right", onClick: handelOpenDetail },
    { title: "Notifications", icon: Assets.speakerphone, position: "right", onClick: handelOpenDetail },
    { title: "Support", icon: Assets.support, position: "right", onClick: handelOpenDetail },
    { title: "Others", icon: Assets.view_grid, position: "right", onClick: handelOpenDetail },
  ];

  return (
    <div
      className="inner-card"
    >
      {page?.openDetail ? (
        <ProfileDetailPages
          onBack={handleCloseDetail}
          select={page?.select}
          detailScrollRef={detailScrollRef}
        />
      ) : (
        <>
          <div className="inner-content pt-3">
            <div className="d-flex flex-row">
              {user.avatar ?
                <img
                  alt="profile"
                  src={user.avatar}
                  className="avatar-initials-large"
                /> :
                <div className="avatar-initials avatar-initials-large">
                  <span>{nameInitials}</span>
                </div>
              }
              <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: '12px' }}>
                <Name>{user?.firstName + " " + user?.lastName}</Name>
                <Email>{user?.email}</Email>
              </div>
            </div>
            <div className="flex-col-center pb-12 w-100">
              {openAlert ? (
                <Alert>
                  <div className="d-flex flex-column gap-2">
                    <AlertTitle>You must submit your KYC</AlertTitle>
                    <AlertDesc>
                      You must upload your document for
                      activation of insurance.
                    </AlertDesc>
                  </div>
                  <img
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '10px',
                      cursor: 'pointer'
                    }}
                    src={Assets.close}
                    alt=""
                    onClick={handleCloseAlert}
                  />
                </Alert>
              ) : null}
              <div className="flex-col-center gap-2 w-100" style={{ margin: '25px 0px' }}>
                {profileItems.map(item => (
                  <LinkButton
                    key={item.title}
                    select={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Name = styled.div`
  height: 32px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: var(--letter-spacing);
  overflow: hidden;
`;

const Email = styled.div`
  height: 20px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${Colors.plush_400};
`;

const Alert = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 20px;
  gap: 8px;
  background: ${Colors.warning_50};
  border: 1px solid ${Colors.warning_200};
  border-radius: 6px;
  margin-top: 24px;
`;

const AlertTitle = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.warning_800};
`;

const AlertDesc = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.warning_700};
`;