import { sanityClient } from "@/lib/sanityClient";
import { BlogPostContent } from "@/types/blog";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { BreadcrumbHeader } from "@/components/ui/breadcrumb-header";

type BlogPostProps = {
	params: {
		blogId: string;
	};
};

async function getBlogPost(slug: string) {
	const query = `*[_type == 'blog' && slug.current == '${slug}'] {
		title,
        content,
		image,
        "currentSlug": slug.current,
		}[0]`;
	const data: BlogPostContent = await sanityClient.fetch(query);
	console.log(data);
	return data;
}
export default async function BlogPost({ params }: BlogPostProps) {
	const data: BlogPostContent = await getBlogPost(params.blogId);

	return (
		<>
			<BreadcrumbHeader />
			<h1 className="text-3xl text-center font-bold tracking-tight">
				{data.title}
			</h1>
			<Image
				className="rounded-lg pt-4 "
				src={urlFor(data.image)}
				alt="main picture"
				width={600}
				height={400}
			/>
		</>
	);
}
