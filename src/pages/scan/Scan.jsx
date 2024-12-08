import React, { useEffect, useState, useRef } from "react";
import { Stack } from "@mui/material";
import { styled } from "styled-components";
import { RedeemItem } from "@components/scan/RedeemItem";
import { Button } from "@components/Button";
import { usePage } from "@store";
import { Colors } from "@/styles/theme";

const codeLength = 13;

export const Scan = (props) => {
  const { page, setPageState } = usePage();
  const [hasPlaceholder, setHasPlaceholder] = useState(true);
  const [code, setCode] = useState("");

  const detailScrollRef = useRef(null);

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setHasPlaceholder(true);
    } else {
      setHasPlaceholder(false);
    }
  };

  const handleChangeCode = (e) => {
    if (e.target.value === "") {
      setHasPlaceholder(true);
    } else {
      setHasPlaceholder(false);
    }

    let _code = e.target.value;
    _code = _code.replace(/[^0-9]/g, '');

    setCode(_code);
  };

  const handelOpenDetail = () => {
    setPageState(true, null);
  };

  const handleCloseDetail = () => {
    setPageState(false, null);
  };

  const handleCode = () => {
    handelOpenDetail();
  };

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [page]);

  if (page?.openDetail) {
    return (
      <RedeemItem
        onBack={handleCloseDetail}
        detailScrollRef={detailScrollRef}
        code={code}
      />
    )
  }

  return (
    <Stack px={3} height={"100%"}>
      <Stack gap={2} py={2} my={"auto"} direction={"column"} justifyContent={"center"} width={"100%"}>
        <div className="text mt-0" style={{}}>
          Enter the redeem code found
          <br />
          in your confirmation email
        </div>
        <CodeInput
          type="text"
          placeholder={`Put here the ${codeLength} digit Code`}
          value={code}
          onChange={handleChangeCode}
          onBlur={handleBlur}
          className={hasPlaceholder ? "has-placeholder" : ""}
        />
        <Button
          title="Redeem"
          onClick={handleCode}
          background={Colors.primary_600}
          disabled={code.length < codeLength}
        />
      </Stack>
    </Stack>
  );
};

const CodeInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 8px 12px;
  outline: none;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  background: ${Colors.white};
  box-shadow: 0px 1px 2px 0px #1018280d;
  font-family: "Space Grotesk";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 1em;
  text-align: left;
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield;
  color: ${Colors.neutral_900};
  margin-bottom: 12px;

  &.has-placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: ${Colors.neutral_400};
  }
`;
