import React from 'react';
import { styled } from 'styled-components';
import { Button } from '../Button';
import { Colors } from '@/styles/theme';

export const TransferModal = (props) => {

  const { onWarn, onClose } = props;

  return (
    <div className="inner-modal" onClick={onClose}>
      <div
        className="d-flex flex-column bg-white shadow justify-content-center"
        style={{ width: '300px', height: '280px', gap: '10px', borderRadius: '30px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-col-center w-100 p-3 text-center gap-2">
          <CardImg $success={false}>
            <span style={{ fontSize: '40px' }}>😉</span>
            <HeaderDesc>
              Transfer is not
              <br />
              available at this time.
              <br />
              We are working on it!
            </HeaderDesc>
          </CardImg>

          <Button
            onClick={onWarn}
            title="I Understand!"
            background={Colors.primary_600}
          />
        </div>
      </div>
    </div>
  )
};

const HeaderDesc = styled.div`
  color: ${Colors.netural_800};
  text-align: center;
  font-family: "Space Grotesk";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.8px;
  margin-top: ${(props) => (props.$success ? 69 : 0)}px;
`;

const CardImg = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`;
