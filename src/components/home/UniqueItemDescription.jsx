import React from "react";
import { styled } from "styled-components";
import { Passport } from "../icons/Passport";

function toTitleCase(str) {
  const result = str.replace(/([A-Z]|\d)/g, " $1").trim(); // Add space before uppercase letters or digits
  return result
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const UniqueItemDescription = (props) => {
  const { select: item } = props;
  const properties = item.authenticatedItem.properties;

  const link = `${process.env.CERTIFICATE_LINK}/ecertificates/${item.dpp}/viewer`;
  return (
    <Content>
      <Title
        style={{ marginTop: 5, marginBottom: 15 }}
        onClick={() => window.open(link, "_blank")}
      >
        Digital Passport
        <Passport />
      </Title>

      {Object.keys(properties).map((key) =>
        typeof item.authenticatedItem.properties[key] === "object" ? (
          <div key={key}>
            <DataRow>
              <DataTitle>{toTitleCase(key)}</DataTitle>
            </DataRow>
            <ItemDetailsSubsection
              payload={item.authenticatedItem.properties[key]}
            />
          </div>
        ) : (
          <DataRow key={key}>
            <DataTitle>{toTitleCase(key)}</DataTitle>
            <DataInfo>{properties[key].toString() || "-"}</DataInfo>
          </DataRow>
        )
      )}
    </Content>
  );
};

export function ItemDetailsSubsection({ payload }) {
  return (
    <>
      {Object.keys(payload).map((key) => (
        <DataRow key={key} style={{marginLeft: 10}}>
          <DataTitle>
            <DataSubTitle>
              {"•"}
              {toTitleCase(key)}
            </DataSubTitle>
          </DataTitle>
          <DataInfo>{String(payload[key]) || "-"}</DataInfo>
        </DataRow>
      ))}
    </>
  );
}

export default UniqueItemDescription;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-radius: 6px;
  color: white;
  background: var(--color-primary-600);
  padding: 12px 20px;
  cursor: pointer !important;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0px;
  gap: 8px;
  margin-top: 12px;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const DataTitle = styled.h5`
  width: 120px;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;

const DataSubTitle = styled.h6`
  width: 120px;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;

const DataInfo = styled.h5`
  max-width: 200px;
  word-wrap: break-word;
}`;
