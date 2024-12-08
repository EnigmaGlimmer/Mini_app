import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'; 
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import Slider from "react-slick";

import { Assets } from "@assets";
import WalkthroughtWrapper from './WalkthroughtWrapper';
import LinkButton from '@/components/LinkButton';
import { useRecoilState } from 'recoil';
import { windowState } from '@/store';
import isVaultikWebApp from '@/utils/isVaultikWebApp';
import { Colors } from '@/styles/theme';


const Walkthrought = ({
    onSignIn,
    onSignUp,
    onRedeem
}) => {
    const [delay, setDelay] = useState(false);
    const [vaultikWindow] = useRecoilState(windowState);
    const isVaultikApp = isVaultikWebApp(vaultikWindow);
    const brandName = vaultikWindow?.brandName;
    
    const items = useMemo(() => {
        return [
        { 
            title: isVaultikApp ? 'Welcome to Vaultik' : 'Welcome to your Digital Vault', 
            description: <span>Protect your luxury purchases <br /> and unlock exclusive experiences</span>, 
            icon: Assets.redeemItem1, 
        },
        { 
            title: 'Vaultik is an invite-only platform', 
            description: <span>{brandName || "Your favorite luxury brands"} will grant you<br /> exclusive access to your digital vault.</span>, 
            icon: Assets.redeemItem2, 
        },
        { 
            title: 'How does it work?', 
            description: 'Register with the same email address that you used to receive a redeem code', 
            icon: Assets.redeemItem3, 
        },
    ]}, [isVaultikApp, brandName])

    useEffect(() => {
        // Add delay until slick css is loaded
        setTimeout(() => {
            setDelay(true);
        }, 1);
    }, []);

    if (!delay) return <></>;

    return (
        <WalkthroughtWrapper onSignIn={onSignIn}>
            <Stack flex={1} pb={6}>
                <Box 
                    flex={1} 
                    sx={{
                        cursor: "pointer",
                        '.slick-slide': {
                            "& > div": {
                                height: "100%",
                            }
                        },
                        '.slick-slider': {
                            height: "100%",
                            '.slick-dots': {
                                'li': {
                                    width: "12px",
                                    height: "12px",
                                    mx: 0.75
                                },
                                'li button': {
                                    padding: 0,
                                    width: "12px",
                                    height: "12px",
                                },
                                'li button:before': {
                                    fontSize: 12,
                                    opacity: 1.0,
                                    width: "12px",
                                    height: "12px",
                                    content: '""',
                                    backgroundColor: 'secondary.light',
                                    borderRadius: '50%',
                                    color: 'secondary.light'
                                },
                                'li.slick-active button:before': {
                                    backgroundColor: 'secondary.main'
                                }
                            }
                        }
                    }}
                >
                    <Slider 
                        arrows={false}
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {items.map((item, idx) => {
                            const {title, description, icon} = item;
                            return (
                                <Stack key={`slider-${idx}`} sx={{ display: "flex !important", height: "100%" }} direction={'column'} px={2.75} gap={3} alignItems={'center'} justifyContent={'center'}>
                                    <img src={icon} width="100px" height="auto" />
                                    <Typography variant='h4' color="secondary.main">{title}</Typography>
                                    <Typography variant='subtitle1' color="#000000" textAlign={'center'}>{description}</Typography>
                                    <Button variant='contained' size='large' color="tertiary" onClick={onRedeem} fullWidth>REDEEM CODE</Button>
                                    {isVaultikApp ? (
                                        <LinkButton onClick={onSignUp}>No code?</LinkButton>
                                    ) : (
                                        <Link href="https://vaultik.com" target="_blank" underline='always' color="text.primary" sx={{ textDecorationColor: Colors.tertiary }}>How it works?</Link>
                                    )}
                                </Stack>
                            );
                        })}
                    </Slider>
                </Box>
            </Stack>
        </WalkthroughtWrapper>
    )
}

Walkthrought.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
    onRedeem: PropTypes.func.isRequired,
}

export default Walkthrought;