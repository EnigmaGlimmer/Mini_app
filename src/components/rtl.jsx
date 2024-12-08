import React, { useEffect } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import stylisRTLPlugin from "stylis-plugin-rtl";

const styleCacheLTR = (container) =>
	createCache({
		key: "ltr",
		container: container,
		prepend: true,
	});

const styleCacheRTL = (container) =>
	createCache({
		key: "rtl",
		prepend: true,
		stylisPlugins: [stylisRTLPlugin],
		container: container,
	});

export const RTL = (props) => {
	const { children, direction, document } = props;

	useEffect(() => {
		document.dir = direction;
	}, [direction, document]);

	if (direction === "rtl") {
		return <CacheProvider value={styleCacheRTL(document.head)}>{children}</CacheProvider>;
	}

	return <CacheProvider value={styleCacheLTR(document.head)}>{children}</CacheProvider>;
};

RTL.propTypes = {
	children: PropTypes.node.isRequired,
	direction: PropTypes.oneOf(["ltr", "rtl"]),
};
