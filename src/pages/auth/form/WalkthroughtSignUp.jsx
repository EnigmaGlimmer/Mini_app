import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import WalkthroughtWrapper from './WalkthroughtWrapper';
import { NewsletterApi } from '@/api';
import useToast from '@/hooks/useToast';
import { LoadingButton } from '@mui/lab';
import { URLS } from '@/utils';

const STEPS = {
    Init: 'Init',
    Completed: 'Completed'
}

const WalkthroughtSignUp = ({
    onSignIn,
    onGotoLandingPage
}) => {
    const { addToast } = useToast();
    const [step, setStep] = useState(STEPS.Init);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handleSendEmail = () => {
        setLoading(true)
        NewsletterApi.subscribeWalkthroughtNewsletter({ email: email, })
            .then(() => {
                setStep(STEPS.Completed);
            })
            .catch(err => {
                if (err.status === 409) {
                    setStep(STEPS.Completed);
                    return;
                }
                addToast('Failed to subscribe newsletter with email');
                console.error("Failed to subscribe email: ", err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const getContent = (step) => {
        switch (step) {
            case STEPS.Init:
                return (
                    <Stack direction={"column"} alignItems={"center"} justifyItems={"center"} gap={3}>
                        <Typography variant='h4' color="secondary.main" fontWeight={700}>If you don’t have a redeem code…</Typography>
                        <Typography variant='subtitle1' color={'text.primary'} textAlign={"center"}>
                            Subscribe to our newsletter and be the first to know when new brands come onboard.
                        </Typography>
                        <TextField
                            id="vaultik-outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            placeholder='insert here your email'
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <LoadingButton variant='contained' color="primary" sx={{ width: "100%" }} onClick={handleSendEmail} loading={loading} disabled={!email}>Keep Me Updated</LoadingButton>
                        <Typography variant='subtitle3' color={'text.primary'} textAlign={"center"}>
                            By clicking on the above you confirm to have read and<br /> agreed to Vaultik's&nbsp;
                            <Link href={URLS.TermsAndConditions} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700 }}>Terms & conditions</Link>
                            &nbsp;and&nbsp;
                            <Link href={URLS.PrivacyPolicy} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700 }}>Privacy Policy</Link>
                            .
                        </Typography>
                    </Stack>
                );

            case STEPS.Completed:
                return (
                    <Stack direction={"column"} alignItems={"center"} justifyItems={"center"} gap={3}>
                        <Typography variant='h4' color="secondary.main" textAlign={"center"} fontWeight={700}>Thank you for subscribing<br />to our newsletter!</Typography>
                        <Typography variant='subtitle1' color={'text.primary'} textAlign={"center"}>
                            You'll be the first to know when <br />new brands are available.
                        </Typography>
                        <Typography variant='subtitle1' color={'text.primary'} textAlign={"center"}>
                            See you soon!
                        </Typography>
                        <Button variant='contained' color="primary" sx={{ width: "100%" }} onClick={onGotoLandingPage}>Back to Home</Button>
                    </Stack>
                );

            default:
                return <></>;
        }
    }

    return (
        <WalkthroughtWrapper onSignIn={onSignIn} hiddenNoCode={true}>
            <Stack py={3} px={3} my={"auto"}>
                {getContent(step)}
            </Stack>
        </WalkthroughtWrapper>
    )
}

WalkthroughtSignUp.propTypes = {
    onSignIn: PropTypes.func.isRequired,
}

export default WalkthroughtSignUp;