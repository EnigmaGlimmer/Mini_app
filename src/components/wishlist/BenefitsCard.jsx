import React from 'react';
import { Colors } from '@/styles/theme';
import { styled } from "styled-components";

export const BenefitsCard = (props) => {
    const { item, onOpen } = props;

    return (
        <Content onClick={onOpen}>
            <div className='d-block text-center border' style={{ overflow: "hidden", borderRadius: "15px" }}>
                <img
                    alt="benefit"
                    src={item?.coverImage}
                    className="object-contain rounded"
                    height={210}
                    width="100%"
                />
            </div>
            <div className="flex-row-center px-4 justify-content-between mt-2 mb-4">
                <div>
                    <div className="brand-title">{item?.brand?.brandName}</div>
                    <div className="product-name">{item?.title}</div>
                </div>
                <div className="badge" style={{ backgroundColor: "var(--color-primary-600)" }}>
                    <Status>{item?.category}</Status>
                </div>
            </div>
        </Content>
    )
};

const Content = styled.div`
    padding: 0px;
    width: 100%;
    background: ${Colors.white};
    border-radius: 24px;
    cursor: pointer;
    margin-bottom: 18px;
`;

const Status = styled.div`
    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    max-width: 60px;
    color: ${Colors.white};
`;
