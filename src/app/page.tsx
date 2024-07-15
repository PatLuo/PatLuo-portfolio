/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getBlogPosts, getJSONData } from "@/lib/serverUtils";
import Link from "next/link";
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
	GlobeIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
	const data = await getJSONData();
	const posts = await getBlogPosts();

	return (
		<main>
			{/* Banner Section */}
			<section
				id="home"
				className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
			>
				<div className="flex flex-col lg:flex-row items-center justify-center gap-12">
					<div className="w-1/2 mx-auto lg:w-1/3">
						<Image
							src="/assets/profile-pic.png"
							width={280}
							height={280}
							alt="Developer"
							className="mx-auto aspect-square overflow-hidden object-cover object-center rounded-full border"
						/>
					</div>

					{/* Intro and bio */}
					<div className="w-full lg:w-2/3 space-y-4">
						<div className="space-y-2">
							<h1 className="text-4xl md:text-5xl font-bold tracking-tighter ">
								Hi, I&apos;m {data.personalInfo.name}
							</h1>
						</div>
						<p className="max-w-[600px] lg:text-lg text-gray-500 dark:text-gray-400">
							{data.personalInfo.bio}
						</p>

						{/* Contact links */}
						<div className="space-x-4">
							<Link
								target="_blank"
								href={data.contactInfo.github}
								prefetch={false}
							>
								<Button variant="secondary" size="icon">
									<GitHubLogoIcon className="h-4 w-4" />
								</Button>
							</Link>

							<Link
								target="_blank"
								href={data.contactInfo.linkedin}
								prefetch={false}
							>
								<Button variant="secondary" size="icon">
									<LinkedInLogoIcon className="h-4 w-4" />
								</Button>
							</Link>

							<Link href={`mailto:${data.contactInfo.email}`}>
								<Button variant="secondary" size="icon">
									<EnvelopeClosedIcon className="h-4 w-4" />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section
				id="experience"
				className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
			>
				<h2 className="font-bold text-3xl md:text-5xl mb-12">
					Work Experience
				</h2>
				<div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
					{data.workExperience.map((exp) => (
						<div key={exp.id} className="grid gap-1 relative">
							<div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

							{/* Role title and company */}
							<h4 className="text-xl font-medium">
								{exp.role} @
								<Link
									href={exp.companyWebsite}
									target="_blank"
									className="ml-2 text-primary underline"
								>
									{exp.company}
								</Link>
							</h4>
							<div className="text-gray-500 dark:text-gray-400">
								{exp.startDate} - {exp.endDate}
							</div>

							{/* List of responsibilities */}
							<div className="mt-2">
								<h6 className="font-medium">Key Responsibilities:</h6>
								<ul className="text-gray-700 dark:text-gray-400 text-sm list-disc pl-4">
									{exp.keyResponsibilities.map((resp) => (
										<li key={resp} className="pt-1">
											{resp}
										</li>
									))}
								</ul>
							</div>

							{/* tech badges */}
							<div className="flex flex-wrap gap-2 pt-1">
								{exp.technologies.map((tech) => (
									<Badge key={tech} variant="secondary">
										{tech}
									</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Projects Section */}
			<section
				id="projects"
				className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
			>
				<h2 className="font-bold text-3xl md:text-5xl mb-12">My Projects</h2>
				<div className="grid grid-cols-1 gap-4 lg:gap-6">
					{data.projects.map((project) => (
						<Card key={project.title} className="flex flex-col lg:flex-row">
							<div className="w-full lg:w-1/3 flex items-center">
								<Image
									src={project.cover}
									alt="Project 1"
									height={200}
									width={300}
									className="rounded-md object-cover ml-6 md:mt-6 lg:mt-0"
								/>
							</div>

							<div className="w-full lg:w-2/3">
								<CardHeader>
									<CardTitle>{project.title}</CardTitle>
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<Badge key={tech} variant="secondary">
												{tech}
											</Badge>
										))}
									</div>
								</CardHeader>
								<CardContent>
									<CardDescription>{project.description}</CardDescription>
								</CardContent>
								<CardFooter>
									<div className="flex space-x-3">
										<Link
											target="_blank"
											href={project.live_url}
											prefetch={false}
										>
											<Button size="sm">
												<GlobeIcon className="h-3 w-3 mr-2" />
												Live Demo
											</Button>
										</Link>
										<Link
											target="_blank"
											href={project.code_repo_url}
											prefetch={false}
										>
											<Button size="sm" variant="outline">
												<GitHubLogoIcon className="h-3 w-3 mr-2" />
												Open Repository
											</Button>
										</Link>
									</div>
								</CardFooter>
							</div>
						</Card>
					))}
				</div>
			</section>

			{/* Education Section */}
			<section
				id="education"
				className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
			>
				<h2 className="font-bold text-3xl md:text-5xl mb-12">Education</h2>
				<div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
					{data.education.map((ed) => (
						<div key={ed.id} className="grid gap-1 relative">
							<div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

							<h4 className="text-xl font-medium">{ed.degree}</h4>
							<h5 className="font-medium">{ed.institution}</h5>
							<div className="text-gray-500 dark:text-gray-400">
								{ed.startDate} - {ed.endDate}
							</div>
							<p className="mt-2 text-md">{ed.courses}</p>
							<p className="mt-2 text-sm text-gray-500">{ed.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Blogs Section */}
			<section
				id="blogs"
				className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
			>
				<h2 className="font-bold text-3xl md:text-5xl mb-12">Blogs</h2>

				<div className="space-y-6">
					{posts.map((post) => (
						<Link key={post.slug} href={`/blogs/${post.slug}`}>
							<h3 className="text-xl md:text-3xl font-semibold">
								{post.title}
							</h3>
							<p className="md:text-lg font-light">{post.description}</p>
							<p className="text-sm font-medium text-gray-500 mt-2">
								Published at: {post.publishDate}
							</p>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
