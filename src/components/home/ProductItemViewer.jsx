import React from "react";

import { Assets } from "@assets";
import { Colors } from "@styles/theme";
import DetailPageWrapper from "@/components/DetailPageWrapper";
import ProductDetailItem from "@components/home/ProductDetailItem";

const ProductItemViewer = ({
    item,
    onBack,
    scrollRef,
    image,
    title,
    currency,
    price,
    properties = []
}) => {
    if (!item) {
        return <></>;
    }

    return (
        <DetailPageWrapper title={title} onBack={onBack} ref={scrollRef}>
            <div className="inner-content gap-4">
                {/* Show Product Image with Insurance Badge */}
                <div className="position-relative">
                    <img
                        src={image}
                        alt="product-image"
                        className="w-100"
                    />
                    {item.insurance && (
                        <div
                            className="position-absolute rounded-rect px-3 py-1 text-white"
                            style={{
                                backgroundColor: Colors.primary_600,
                                right: "var(--spacing-3)",
                                top: "var(--spacing-3)"
                            }}
                        > Vault+ Active </div>
                    )}
                </div>

                {/* Show Estimated Value */}
                <div
                    className="d-flex p-3 rounded-rect w-100 justify-content-between flex-row"
                    style={{ backgroundColor: Colors.neutral_100 }}
                >
                    <div className="d-flex flex-row" >
                        <img src={Assets.insured} alt="estimate-icon" />
                        <div className="d-flex flex-column">
                            <h4 className="text-start" style={{ color: Colors.plush_600 }}>{currency} {price}</h4>
                            <h6 className="text-start" style={{ color: Colors.plush_500 }}>Estimated Value</h6>
                        </div>
                    </div>
                    <img src={Assets.chartUp} alt="chart-icon" />
                </div>

                {/* Show Properties */}
                <div className="d-flex flex-column pb-4 w-100 gap-4">
                    {
                        properties.map((_prop) => (
                            <ProductDetailItem item={_prop} key={_prop.title} />
                        ))
                    }
                </div>
            </div>

        </DetailPageWrapper >
    );
};

export default ProductItemViewer;