"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./breadcrumb";
import { Fragment } from "react";

export const BreadcrumbHeader = () => {
	const paths: string = usePathname();
	const pathNames: string[] = paths.split("/").filter((path) => path);
	return (
		<Breadcrumb className="ml-8 lg:ml-0">
			<BreadcrumbList>
				<BreadcrumbItem key="home">
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{pathNames.length != 0 && <BreadcrumbSeparator />}
				{pathNames.map((path, index) => {
					const isLast = index === pathNames.length - 1;
					return (
						<Fragment key={index}>
							<BreadcrumbItem>
								{/* last breadcrumb item should not be clickable */}
								{isLast ? (
									<BreadcrumbPage>{path}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
