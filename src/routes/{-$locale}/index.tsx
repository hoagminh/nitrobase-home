import { createFileRoute } from "@tanstack/react-router";
import { allAuthors } from "content-collections";
import { AppLayout } from "#/layouts/AppLayout";

export const Route = createFileRoute("/{-$locale}/")({ component: Home });

function Home() {
	return (
		<AppLayout>
			<div className="p-8">
				<h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
				<p className="mt-4 text-lg">
					Edit <code>src/routes/index.tsx</code> to get started.
				</p>

				<div className="mt-8">
					<h2 className="mb-4 text-2xl font-bold">
						Authors ({allAuthors.length})
					</h2>
					<ul className="flex flex-col gap-4">
						{allAuthors.map((author) => (
							<li
								key={author.slug}
								className="flex gap-4 rounded-lg border border-slate-200 p-4"
							>
								{author.avatar && (
									<img
										src={author.avatar}
										alt={author.name}
										className="h-16 w-16 shrink-0 rounded-full object-cover"
									/>
								)}
								<div>
									<h3 className="text-xl font-semibold">{author.name}</h3>
									{author.bio && (
										<p className="mt-1 text-slate-600">{author.bio}</p>
									)}
									<div className="mt-2 flex gap-3 text-sm text-blue-600">
										{author.email && (
											<a
												href={`mailto:${author.email}`}
												className="hover:underline"
											>
												Email
											</a>
										)}
										{author.github && (
											<a
												href={author.github}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
											>
												GitHub
											</a>
										)}
										{author.twitter && (
											<a
												href={author.twitter}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
											>
												Twitter
											</a>
										)}
										{author.website && (
											<a
												href={author.website}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
											>
												Website
											</a>
										)}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</AppLayout>
	);
}
