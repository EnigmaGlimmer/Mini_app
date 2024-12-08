import React from "react";
import { styled } from "styled-components";

export const SupportModal = (props) => {

    const { onSend } = props;
    
    return (
        <div className="inner-modal">
            <div
                className="d-flex flex-column bg-white shadow"
                style={{ height: '440px', width: '350px', gap: '10px', padding: '16px 24px', borderRadius: '30px' }}
            >
            <HeaderDesc
                id="vaultik-support_header"
            >
                Ask to Support
            </HeaderDesc>
            <div id="vaultik-content" className="d-flex w-100 flex-column" style={{ gap: '10px' }}>
                <div>
                <select
                    className="form-select"
                    style={{ border: '1px solid var(--color-neutral-200)', borderRadius: '16px', padding: '16px 24px' }}
                >
                    <option selected>Topic</option>
                </select>
                </div>
                <div>
                <textarea
                    className="w-100"
                    style={{ border: '1px solid var(--color-neutral-200)', height: '240px', borderRadius: '16px', padding: '16px 24px'}}
                >
                </textarea>
                </div>
            </div>
            <button
                onClick={onSend}
                style={{ background: 'var(--color-primary-600)', padding: '12px 20px', borderRadius: '6px'}}
                className="btn text-light mt-2"
            >Send</button>
            </div>
        </div>
    )
};

const HeaderDesc = styled.div`
  color: var(--color-neutral-800);
  text-align: center;
  font-family: "Space Grotesk";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0.8px;
`;
