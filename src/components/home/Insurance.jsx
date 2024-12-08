import React, { useState, useEffect, useMemo } from "react";
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";

import { OrderApi } from "@api";
import { Assets } from "@assets";
import Loading from '@components/Loading';
import { ClaimStatus } from "@/utils";
import { ClaimModal } from '@/components/modal/ClaimModal';
import { RightArrowIcon } from "../icons/RightArrowIcon";

export const Insurance = ({ select, content }) => {
  const [claimStatus, setClaimStatus] = useState(undefined);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { description, links, } = useMemo(() => {
    const { description, links } = content?.[0] || {};

    return {
      description, links
    }
  }, [content]);

  const fetchClaimStatus = async () => {
    setLoading(true);

    try {
      const status = await OrderApi.getClaimStatus(select.id);
      setClaimStatus(ClaimStatus[status.status || "CREATED"]);
    } catch (err) {
      setClaimStatus(undefined);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchClaimStatus();
  }, []);

  const handleOpenClaimModal = async () => {
    setShowClaimModal(true);
  }

  return (
    <>
      <Content>
        <LogoBox>
          <Logo src={Assets.vault_plus_logo} alt="" />
          <Logo src={Assets.powered_by_avata} alt="" />
        </LogoBox>
        <Desc className="html-wrapper">
          {description || ""}
          {links.map((link, idx) => {
            const { title, value } = link;
            return (<span>&nbsp;<a key={`vault-link-item-${idx}`} href={value} target="_blank">{title}</a></span>)
          })}
        </Desc>
        {isLoading ? <Loading />
          : (
            !claimStatus ? (
              <button
                onClick={handleOpenClaimModal}
                style={{ border: '1px solid var(--color-neutral-400)', padding: '12px 20px', borderRadius: '6px' }}
                className="d-flex w-100 justify-content-between bg-white"
              >
                Submit a Claim
                <RightArrowIcon fill={Colors.black} />
              </button>
            ) : (
              <button
                // onClick={openClaim}
                className="d-flex w-100 justify-content-center"
                style={{
                  background: claimStatus.bgcolor,
                  border: '1px solid var(--color-neutral-400)',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  color: claimStatus.color,
                }}
              >
                {claimStatus.label}
              </button>
            )
          )}
      </Content >

      {showClaimModal && <ClaimModal
        order={select}
        onClose={() => setShowClaimModal(false)}
        fetchClaimStatus={fetchClaimStatus}
      />
      }
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
`;

const LogoBox = styled.div`
  width: 100%;
  height: 92.58px;
  padding: 0px 32px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Colors.neutral_900};
  border-radius: 16px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 130px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.white};
  margin-left: 31px;
  margin-right: 31px;
`;

const Logo = styled.img``;

const Desc = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_500};
  width: 100%;
`;
