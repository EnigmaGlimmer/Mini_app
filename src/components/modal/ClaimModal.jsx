import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Upload } from '../icons/Upload';
import { Colors } from '../../styles/theme';
import { OrderApi } from '@api';
import useToast from '@/hooks/useToast';
import { IconButton, Typography } from '@mui/material';
import { Times } from '../icons/Times';

export const ClaimModal = (props) => {

    const { onClose, order, fetchClaimStatus } = props;

    const inputRef = useRef(null);
    const [claimFiles, setClaimFiles] = useState([]);
    const [description, setDescription] = useState("");
    const { addToast } = useToast();
    const [isLoading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setClaimFiles([...claimFiles, ...files]);
        }
    };

    const handleClaim = async () => {
        setLoading(true);
        try {
            const response = await OrderApi.submitClaim(order.id, claimFiles, description);
            await fetchClaimStatus();
        } catch (error) {
            console.log("handleClaim:", error?.message || error);
            addToast("Claiming failed: " + error?.message || error);
        }

        setLoading(false);
        onClose();
    };

    const handleRemoveFile = (idx) => {
        const newFiles = [...claimFiles];
        newFiles.splice(idx, 1);
        setClaimFiles([...newFiles])
    }

    return (
        <>
            <div className="inner-modal" onClick={onClose}>
                <div
                    onClick={e => e.stopPropagation()}
                    className="d-flex flex-column bg-white shadow"
                    style={{ height: "570px", width: "350px", gap: "10px", padding: "16px 24px", borderRadius: "30px" }}
                >
                    <HeaderDesc id="vaultik-support_header">
                        Submit a Claim
                    </HeaderDesc>
                    <div id="vaultik-content" className="d-flex w-100 flex-column h-100 no-scroll" style={{ gap: "10px", overflowY: "auto", maxHeight: "calc(100% - 40px)" }}>
                        <div>
                            Upload an image of the damage and a short description. You will be contacted via email if any more information in needed.
                        </div>
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                padding: "16px 24px",
                                color: "var(--color-neutral-400)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-neutral-200)",
                                background: "var(--color-neutral-100)"
                            }}
                            disabled
                            value={order?.product?.name}
                        />
                        <div className='w-100 d-flex flex-column gap-3'>
                            <div
                                onClick={() => inputRef.current?.click()}
                                className="d-flex w-100 justify-content-between cursor-pointer"
                                style={{
                                    gap: "10px",
                                    borderRadius: "16px", 
                                    padding: "16px 24px",
                                    overflowWrap: "anywhere",
                                    textWrap: "pretty",
                                    border: "1px solid var(--color-neutral-200)", 
                                }}
                            >
                                Upload Jpg, PNG or PDF
                                <Upload fill={Colors.neutral_200} />
                            </div>
                            {claimFiles.map((file, idx) => {
                                return (
                                    <div key={`claim-file-${idx}`} className='d-flex gap-2 align-items-center ps-2'>
                                        <IconButton
                                            sx={{
                                                backgroundColor: 'neutral.100',
                                                borderRadius: '50%'
                                            }}
                                            onClick={() => handleRemoveFile(idx)}
                                        >
                                            <Times sx={{ fontSize: 16, color: "neutral.400" }} />
                                        </IconButton>
                                        <Typography variant='subtitle2'>{file.name}</Typography>
                                    </div>
                                )
                            })}
                        </div>
                        <textarea
                            className="w-100"
                            style={{
                                border: "1px solid var(--color-neutral-200)",
                                minHeight: "190px",
                                borderRadius: "16px",
                                padding: "16px 24px",
                                color: "var(--color-neutral-900)",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "24px",
                                fontFamily: "Space Grotesk",
                                resize: "none",
                            }}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe what happened making sure to include all important details."
                        />
                        <button
                            disabled={(claimFiles.length === 0) || isLoading}
                            onClick={handleClaim}
                            style={{ background: "var(--color-primary-600)", padding: "12px 20px", borderRadius: "6px" }}
                            className="btn text-light mt-2">
                            {isLoading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*, application/pdf"
                onChange={handleUpload}
                style={{ visibility: "hidden" }}
                multiple
            />
        </>
    );
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