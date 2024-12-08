import React, { useMemo } from "react";
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";

export const Repair = ({ content }) => {

  const { description, links, } = useMemo(() => {
    const { description, links } = content?.[0] || {};

    return {
      description, links
    }
  }, [content]);

  return (
    <Content>
      <Desc className="html-wrapper">
        {description || ""}
        {links.map((link, idx) => {
          const { title, value } = link;
          return (<span>&nbsp;<a key={`repair-link-item-${idx}`} href={value} target="_blank">{title}</a></span>)
        })}
      </Desc>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  margin-top: 24px;
`;

const Desc = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.netural_800};
`;
