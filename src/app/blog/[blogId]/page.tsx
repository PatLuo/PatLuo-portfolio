type BlogPostProps = {
	params: {
		slug: string;
	};
};

export default async function BlogPost({ params }: BlogPostProps) {
	return <p>{params.slug}</p>;
}
