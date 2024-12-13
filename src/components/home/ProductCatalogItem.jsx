import React, { useMemo, useState, useEffect } from "react";

import { Assets } from "@/assets";
import { Currencies } from "@/utils";
import { ProductApi } from "@/api";
import { windowState } from '@/store';
import { useRecoilState } from "recoil";

import ProductItemViewer from "./ProductItemViewer";
import CatalogItemDescription from "./CatalogItemDescription";
import Loading from "../Loading";
import { useRewards } from "@/store/rewardStore";
import { Repair } from "./Repair";
import { Reward } from "./Reward";
import { Insurance } from "./Insurance";
import { BlockchainData } from "./BlockchainData";
import { Transfer } from "./Transfer";
import {VaultCare} from "./Vaultcare";


export const ProductCatalogItem = ({ item, onBack, scrollRef }) => {
    if (!item) return <></>;

    const [vaultikWindow] = useRecoilState(windowState);

    const [rewardList, setReward] = useState([]);
    const [vaultContent, setVaultContent] = useState([]);
    const [repairContent, setRepairContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isFetching: isRewardLFetching, rewards } = useRewards(true);

    const productId = item.product?.id;

    const currency = Currencies[item.product?.currency || "USD"];
    const price = (item.product?.price || 0).toLocaleString("en-US");
    const image = item.product.images[0];
    const title = item.brand.brandName + " - " + item.product.name;

    useEffect(() => {
        const _rewards = rewards.filter(_reward => (
            _reward.triggerProductIds.includes(item?.product?.id)
        ));

        setReward(_rewards);
    }, [rewards]);


    const fetchVaultContent = async () => {
        return new Promise((resolve) => {
            ProductApi.getVaultContentByProductId(item?.brand?.apiPublicKey, productId)
                .then(res => {
                    setVaultContent(res.data)
                })
                .catch(() => {
                    setVaultContent([]);
                })
                .finally(() => {
                    resolve();
                })
        })
    }

    const fetchRepairContent = async () => {
        return new Promise((resolve) => {
            ProductApi.getRepairContentByProductId(vaultikWindow.brandPubKey, productId)
                .then((res) => {
                    setRepairContent(res.data);
                })
                .catch(() => {
                    setRepairContent([]);
                })
                .finally(() => {
                    resolve();
                })
        });
    }

    const getData = async () => {
        setIsLoading(true);

        await Promise.all([
            fetchVaultContent(),
            fetchRepairContent()
        ]);

        setIsLoading(false);
    }

    useEffect(() => {
        if (productId) {
            getData();
        }
    }, [productId]);

    const properties = useMemo(() => ([
        {
            title: "Description",
            icon: Assets.description,
            element: <CatalogItemDescription select={item} />
        },
        {
            title: "Rewards and Benefits",
            icon: Assets.reward,
            element: <Reward select={item} />,
            hidden: rewardList.length === 0
        },
        {
            title: "Vault+",
            icon: Assets.insurance,
            desc: <Insurance item={item} content={vaultContent} />,
            hidden: vaultContent.length === 0 || !item.insurance
        },
        {
            title: "Blockchain Data",
            icon: Assets.blockchain,
            element: <BlockchainData select={item} />,
        },
        {
            title:"VaultCare",
            icon: Assets.insurance,
            element: <VaultCare select={item} onBack={onBack} scrollRef={scrollRef} image={image} title={title}/>
        },
        {
            title: "Repair",
            icon: Assets.repair,
            desc: <Repair content={repairContent} />,
            hidden: repairContent.length === 0
        },

        {
            title: "Transfer",
            icon: Assets.transfer,
            element: <Transfer />
        },
    ]), [item, rewardList]);


    if (isLoading || isRewardLFetching) {
        return <Loading />;
    }

    return (
        <ProductItemViewer
            item={item}
            onBack={onBack}
            scrollRef={scrollRef}
            image={image}
            title={title}
            currency={currency}
            price={price}
            properties={properties}
        />
    );
};
