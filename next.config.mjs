import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		domains: ["cdn.sanity.io"],
		unoptimized: true,
	},
	output: "export",
};

export default withMDX()(nextConfig);
