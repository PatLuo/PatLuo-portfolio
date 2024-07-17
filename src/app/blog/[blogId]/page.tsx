import { sanityClient } from "@/lib/sanityClient";
import { BlogPostContent } from "@/types/blog";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { BreadcrumbHeader } from "@/components/ui/breadcrumb-header";
import { PortableText } from "@portabletext/react";

type BlogPostProps = {
	params: {
		blogId: string;
	};
};
export const revalidate = 10;
async function getBlogPost(slug: string) {
	const query = `*[_type == 'blog' && slug.current == '${slug}'] {
		title,
        content,
		image,
        "currentSlug": slug.current,
		}[0]`;
	const data: BlogPostContent = await sanityClient.fetch(query);
	return data;
}
export default async function BlogPost({ params }: BlogPostProps) {
	const data: BlogPostContent = await getBlogPost(params.blogId);

	return (
		<div className="max-w-4xl mx-auto">
			<BreadcrumbHeader />
			<h1 className="text-3xl text-center font-bold tracking-tight mt-8">
				{data.title}
			</h1>
			<Image
				className="rounded-lg pt-6 mx-auto "
				src={urlFor(data.image)}
				alt="main picture"
				width={600}
				height={400}
			/>
			<div className="mt-10 prose dark:prose-invert px-8 md:px-0 mx-auto">
				<PortableText value={data.content} />
			</div>
		</div>
	);
}
