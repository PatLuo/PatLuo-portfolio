import { sanityClient, urlFor } from "@/lib/sanityClient";
import { BlogCard } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { BreadcrumbHeader } from "@/components/ui/breadcrumb-header";

async function getBlogData() {
	// Fetch blog data from Sanity
	const query = `*[_type == 'blog'] |order(_created asc){
  title,
  description,
    "currentSlug": slug.current,
	image,
  }`;
	const data = await sanityClient.fetch(query);
	return data;
}

export default async function Blog() {
	const data: BlogCard[] = await getBlogData();
	return (
		<div className="max-w-4xl mx-auto">
			<BreadcrumbHeader />
			<div className="grid min-w-min grid-cols-1 mx-20 lg:mx-0 md:grid-cols-2  mt-5  gap-5">
				{data.map((post, id) => (
					<Card key={id} className="max-w-md min-w-min ">
						<Image
							src={urlFor(post.image)}
							alt="blog image"
							width={500}
							height={500}
							className="object-cover rounded-t-md"
						/>

						<CardContent className="mt-4">
							<h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
							<p className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-400">
								{post.description}
							</p>
							<Button asChild className="mt-3 w-full">
								<Link href={`/blog/${post.currentSlug}`}>Read More</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
