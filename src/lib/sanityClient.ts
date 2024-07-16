import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import default_img from "../../public/assets/default_img.png";

export const sanityClient = createClient({
	apiVersion: "2023-05-03",
	dataset: "production",
	projectId: "tb6tl7q5",
	useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
	if (source === null) return default_img;
	return builder.image(source).url();
}
