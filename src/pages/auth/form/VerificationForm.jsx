import React, { useState } from 'react'
import { IconButton, Stack, TextField, Typography } from '@mui/material';

import { LoginButton } from '@/components/login/LoginButton';
import { AuthApi } from '@/api';
import { Colors } from '@/styles/theme';
import { useUser } from '@/store';
import { ArrowLeft } from '@components/icons/ArrowLeft';
import LinkButton from '@/components/LinkButton';
import AuthPageWrapper from '../AuthPageWrapper';

const codeLength = 6; // Set the desired code length

export const VerificationForm = ({
    onBack,
    onSignInSocial,
    onVerification,
}) => {
    const iframe = document.getElementById("#vaultik-miniapp");
    const doc = iframe.contentDocument;

    const [code, setCode] = useState(new Array(codeLength).fill(''));
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const { verifyEmail } = useUser();

    const handleResendCode = async (e) => {
        e.preventDefault();
        setResending(true);
        try {
            await AuthApi.resendVerification(verifyEmail);
        } catch (err) {
            setError(err?.message || "Resending Failed.");
        }
        setResending(false);
    }

    const submitVerifyCode = async () => {
        try {
            setLoading(true);
            const otpCode = code.join('');
            const loggedUser = await AuthApi.verifyEmail(verifyEmail, otpCode);
            onVerification(otpCode, loggedUser);
            setLoading(false);
        } catch (err) {
            setError(err?.message || "Validation Failed.");
            setLoading(false);
        }
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Automatically focus the next input or submit the code if all fields are filled
            if (index < codeLength - 1) {
                doc.getElementById(`code-input-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            if (index > 0) {
                doc.getElementById(`code-input-${index - 1}`).focus();
            }
        } else if (code[index] !== "" && index < codeLength - 1) {
            doc.getElementById(`code-input-${index + 1}`)?.focus();
        }
    };

    const handlePaste = (e) => {
        const pastedCode = e.clipboardData.getData('text').slice(0, codeLength);
        if (/^\d*$/.test(pastedCode) && pastedCode.length === codeLength) {
            setCode(pastedCode.split(''));
        }
    };

    const handleVerify = () => {
        submitVerifyCode();
    }

    return (
        <AuthPageWrapper
            header={
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <IconButton size="small" onClick={onBack} sx={{ p: 1.25 }}>
                        <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
                    </IconButton>
                    <Typography variant='h6' sx={{ p: 1.25, mx: "auto" }}>Email Code</Typography>
                </Stack>
            }
            footer={
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Do you want to use Social Login? &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignInSocial}>
                        <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                            Sign In here
                        </Typography>
                    </LinkButton>
                </Stack>
            }
        >
            <Stack direction={"column"} mt={2.5} px={2.75} gap={1.5}>
                <Typography variant='subtitle1' sx={{ lineHeight: "24px" }} textAlign={"center"}>
                    We've sent a 6 digits code <br />
                    to <strong>{verifyEmail}</strong>
                </Typography>
                <Stack direction="row" gap={0.5}>
                    {code.map((value, index) => (
                            <TextField
                                key={index}
                                type="number"
                                id={`code-input-${index}`}
                                value={value}
                                maxLength={1}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                                sx={{
                                    flex: 1,
                                    ".MuiInputBase-root": {
                                        borderRadius: "10px",
                                    },
                                    ".MuiInputBase-input": {
                                        p: 1,
                                        width: '100%',
                                        height: '54px',
                                        textAlign: "center",
                                        backgroundColor: "plush.100",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        borderRadius: "10px"
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                <LoginButton
                    background={Colors.plush_1000}
                    color={Colors.radiant_dawn_100}
                    title="Confirm"
                    loading={loading}
                    onClick={handleVerify}
                    disabled={resending}
                />
                <Stack justifyContent={"center"} mt={2}>
                    <LinkButton onClick={handleResendCode} sx={{ textAlign: "center" }} disabled={resending || loading}>
                        <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                            Resend the Code
                        </Typography>
                    </LinkButton>
                </Stack>
                {error && <div className="mt-5 alert alert-danger">{error}</div>}
            </Stack>
        </AuthPageWrapper>
    )
}