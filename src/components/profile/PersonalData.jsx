import React, { useState, useRef, useCallback } from "react";
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";
import { Assets } from "../../assets";
import { Button } from "../Button";
import { ProfileInput } from "./ProfileInput";
import { AuthApi, MediaApi } from '@api';
import { useUser } from "../../store";
import DetailPageWrapper from "../DetailPageWrapper";

export const PersonalData = (props) => {
  const { onBack, title, detailScrollRef } = props;
  const { user, setUser, nameInitials } = useUser();
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleChangeName = (e) => {
    setDisabled(false);
    setFirstName(e.target.value);
  };

  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleUpload = async (e) => {
    try {
      const response = await MediaApi.uploadFile(e.target.files[0]);
      setDisabled(false);
      setAvatar(response.path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUsername = (e) => {
    setDisabled(false);
    setLastName(e.target.value);
  };

  const handleSave = async () => {
    setDisabled(true);
    try {
      const optedUser = await AuthApi.updateProfile({
        ...user,
        firstName,
        lastName,
        avatar,
      });

      const newUser = { ...user, ...optedUser };
      setUser(newUser);
      onBack();
    } catch (error) {
      console.log(error);
    }

    setDisabled(false);
  };

  return (
    <DetailPageWrapper onBack={onBack} title={title} ref={detailScrollRef}>
      <Content className="inner-content pt-2">
        <div className="flex-col-center no-scroll pb-4 gap-4">
          <Avatar>
            {avatar ?
              <AvatarImg
                alt=""
                src={avatar}
                style={{ width: '80px', height: '80px', borderRadius: '24px' }}
              /> :
              <div className="avatar-initials avatar-initials-large">
                <span>{nameInitials}</span>
              </div>
            }
            <EditIcon onClick={handleClick}>
              <Icon src={Assets.pencil} alt="" />
            </EditIcon>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </Avatar>
          <div className="d-grid w-100">
            <ProfileInput
              type="text"
              title="First Name"
              value={firstName}
              onChange={handleChangeName}
              disabled={false}
            />
            <InputBox>
              <Title>Last Name</Title>
              <UsernameInputBoxt>
                <UsernameInput
                  value={lastName}
                  onChange={handleChangeUsername}
                  disabled={false}
                />
                {/* <Status>
                  <Text>Available</Text>
                  <StatusIcon fill={Colors.success_600} />
                </Status> */}
              </UsernameInputBoxt>
            </InputBox>
          </div>
          <div className="flex-col-center">
            <Button
              title="Save"
              onClick={handleSave}
              background={disabled ? Colors.primary_600 : Colors.primary}
              disabled={disabled}
            />
          </div>
        </div>
      </Content>
    </DetailPageWrapper>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 30px;
  position: relative;
  margin-top: 14px;
  margin-bottom: 11px;
`;

const AvatarImg = styled.img``;

const EditIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  position: absolute;
  left: 59px;
  top: 61px;
  background: ${Colors.white};
  border-radius: 24px;
  cursor: pointer;
`;

const Icon = styled.img``;

const InputBox = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-top: 16px;
  width: 100%;
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_900};
`;

const UsernameInputBoxt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 12px;
  width: 100%;
  height: 60px;
  background: ${Colors.white};
  border: 1px solid ${Colors.neutral_200};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
`;

const UsernameInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  outline: none;
  background: ${Colors.white};

  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.netural_800};
`;

const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Text = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.success_600};
`;
