import React, { useMemo, useState, useEffect } from "react";

import { Assets } from "@/assets";
import { Currencies } from "@/utils";
import { Reward } from "./Reward";
import { BlockchainData } from "./BlockchainData";
import { VaultCare } from "./Vaultcare";
import { Transfer } from "./Transfer";
import { useRewards } from "@/store/rewardStore";
import ProductItemViewer from "./ProductItemViewer";
import UniqueItemDescription from "./UniqueItemDescription";

export const ProductUniqueItem = ({ item, onBack, scrollRef }) => {

    if (item.hidden) return <></>;

    const [rewardList, setReward] = useState([]);

    const title = item.brand.brandName + " - " + item.eCertificateItemCategory.name;
    const currency = Currencies[item.authenticatedItem.estimatedRetailValue.currency] || "USD";
    const price = item.authenticatedItem.estimatedRetailValue.amount.toLocaleString("en-US");
    const image = item.authenticatedItem.imageUrls[0];

    const { rewards } = useRewards(true);

    useEffect(() => {
        const _rewards = rewards.filter(_reward => (
            _reward.triggerProductIds.includes(item?.id)
        ));

        setReward(_rewards);
    }, [rewards]);

    const properties = useMemo(() => ([
        {
            title: "Description",
            icon: Assets.description,
            element: <UniqueItemDescription select={item} />
        },
        // TODO: Insurance is now only for Catalogue Product.
        // {
        //     title: "Rewards and Benefits",
        //     icon: Assets.reward,
        //     element: <Reward select={item} />,
        //     hidden: rewardList.length === 0
        // },
        // TODO: Insurance is now only for Catalogue Product.
        // {
        //     title: "Vault+",
        //     icon: Assets.insurance,
        //     desc: <Insurance item={item} content={vaultContent} />,
        //     hidden: vaultContent.length === 0 || !item.insurance
        // },
        {
            title: "Blockchain Data",
            icon: Assets.blockchain,
            element: <BlockchainData select={item} />,
        },
        {
            title:"VaultCare",
            icon: Assets.blockchain,
            element: <VaultCare />
        },
        {
            title: "Transfer",
            icon: Assets.transfer,
            element: <Transfer />
        },
    ]), [item, rewardList]);

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
