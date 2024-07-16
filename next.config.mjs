import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		domains: ["cdn.sanity.io"],
	},
};

export default withMDX()(nextConfig);
