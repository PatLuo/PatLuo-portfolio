import { sanityClient } from "@/lib/sanityClient";

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
	return <p>hello</p>;
}
