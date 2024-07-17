import { sanityClient, urlFor } from "@/lib/sanityClient";
import { BlogCard } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { BreadcrumbHeader } from "@/components/ui/breadcrumb-header";
export const revalidate = 10;

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
		<div className="max-w-5xl mx-10 lg:mx-auto">
			<BreadcrumbHeader />
			<div className="py-8">
				<h1 className="text-4xl md:text-5xl font-bold tracking-tighter pt-8 ">
					Welcome to my blog
				</h1>
				<p className="max-w-[600px] lg:text-lg text-gray-600 dark:text-gray-400 pt-4">
					I write about almost anything that interests me, usually relating to
					technology. It was built using Next.js, Shadcn/ui, and Sanity.io for
					headless CMS.
				</p>
			</div>
			<div className="grid min-w-min grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-5  gap-5">
				{data.map((post, id) => (
					<Card
						key={id}
						className="max-w-md min-w-min flex flex-col justify-between"
					>
						<Image
							src={urlFor(post.image)}
							alt="blog image"
							width={500}
							height={300}
							className="object-cover rounded-t-md h-64"
						/>
						<CardContent className="mt-4 ">
							<h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
							<p className="text-sm line-clamp-4 mt-2 text-gray-600 dark:text-gray-400">
								{post.description}
							</p>
						</CardContent>
						<CardFooter>
							<Button asChild className="mt-7  w-full flex items-end">
								<Link href={`/blog/${post.currentSlug}`}>Read More</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
