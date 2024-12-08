import React from 'react';
import { styled } from "styled-components";
import { PersonalData } from "./PersonalData";
import { Document } from "./Document";
import { Security } from "./Security";
import { Notifications } from "./Notifications";
import { Support } from "./Support";
import { Others } from "./Others";

export const ProfileDetailPages = (props) => {
  const { select, onBack, detailScrollRef } = props;

  switch (select) {
    case "Personal Data":
      return (
        <PersonalData
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    case "Document & KYC":
      return (
        <Document
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    case "Security":
      return (
        <Security
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    case "Notifications":
      return (
        <Notifications
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    case "Support":
      return (
        <Support
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    case "Others":
      return (
        <Others
          onBack={onBack}
          title={select}
          detailScrollRef={detailScrollRef}
        />
      );

    default:
      return (
        <div className='w-100'>
          <div className='text-align-center'>Not Found</div>
        </div>
      );
  }
};