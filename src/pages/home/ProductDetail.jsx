import React from "react";

import { CertifiableItemType } from "@/utils";
import { ProductUniqueItem } from "@/components/home/ProductUniqueItem";
import { ProductCatalogItem } from "@/components/home/ProductCatalogItem";
import { useRewards } from "@/store/rewardStore";
import Loading from "@/components/Loading";

export const ProductDetail = ({ select: item, onBack, detailScrollRef: scrollRef }) => {
    if (!item) {
        return <></>;
    }

    const isUniqueItem = item.certifiableItemType === CertifiableItemType.UNIQUE_ITEM;

    return (
        <>
            {
                isUniqueItem
                    ? <ProductUniqueItem
                        item={item}
                        onBack={onBack}
                        scrollRef={scrollRef}
                    />
                    : <ProductCatalogItem
                        item={item}
                        onBack={onBack}
                        scrollRef={scrollRef}
                    />
            }
        </>
    );
};