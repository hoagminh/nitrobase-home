import { useLingui } from "@lingui/react";
import {
	Box,
	Container,
	Grid,
	Group,
	NavLink,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import type { Doc } from "content-collections";
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Boxes,
	Code2,
	Compass,
	GitPullRequest,
	HardDrive,
	LayoutGrid,
	Rocket,
	Server,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DOC_SECTIONS } from "#/constants/docs-navigation";
import { LocalizedLink } from "#/libs/i18n";
import styles from "./DocsView.module.css";

const SECTION_ICONS: Record<
	string,
	React.ComponentType<{
		size?: number;
		className?: string;
		strokeWidth?: number;
	}>
> = {
	"getting-started": Rocket,
	"core-concepts": Boxes,
	"server-networking": Server,
	"apps-templates": LayoutGrid,
	guides: Compass,
	"backup-recovery": HardDrive,
	maintenance: Activity,
	"api-reference": Code2,
	contributing: GitPullRequest,
};

interface DocsViewProps {
	doc: Doc;
	currentSlug: string;
}

export function DocsView({ doc, currentSlug }: DocsViewProps) {
	const { i18n } = useLingui();
	const { colorScheme } = useMantineColorScheme();
	const contentRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Re-run effect when document content or colorScheme changes
	useEffect(() => {
		const root = contentRef.current;
		if (!root) return;

		// 1. Wrap tables in responsive horizontal scroll container
		const tables = root.querySelectorAll("table");
		for (const table of tables) {
			if (
				!table.parentElement?.classList.contains(styles.tableScrollContainer)
			) {
				const wrapper = document.createElement("div");
				wrapper.className = styles.tableScrollContainer;
				table.parentNode?.insertBefore(wrapper, table);
				wrapper.appendChild(table);
			}
		}

		// 2. Render Mermaid diagrams
		const mermaidTargets = root.querySelectorAll<HTMLElement>(
			"pre:has(code.language-mermaid), pre.language-mermaid, div[data-mermaid-code]",
		);

		if (mermaidTargets.length > 0) {
			import("mermaid").then(({ default: mermaid }) => {
				const isDark =
					colorScheme === "dark" ||
					document.documentElement.getAttribute("data-mantine-color-scheme") ===
						"dark";

				mermaid.initialize({
					startOnLoad: false,
					theme: isDark ? "dark" : "default",
					themeVariables: isDark
						? {
								fontFamily: "Inter, sans-serif",
								primaryColor: "#1e293b",
								primaryTextColor: "#f1f5f9",
								primaryBorderColor: "#334155",
								lineColor: "#94a3b8",
								secondaryColor: "#0f172a",
								tertiaryColor: "#1e293b",
							}
						: {
								fontFamily: "Inter, sans-serif",
								primaryColor: "#f8fafc",
								primaryTextColor: "#0f172a",
								primaryBorderColor: "#cbd5e1",
								lineColor: "#64748b",
								secondaryColor: "#f1f5f9",
								tertiaryColor: "#ffffff",
							},
					securityLevel: "loose",
				});

				mermaidTargets.forEach(async (target, idx) => {
					let code = target.dataset.mermaidCode;
					if (!code) {
						const codeEl = target.querySelector("code");
						code = codeEl?.textContent || target.textContent || "";
					}
					if (!code) return;

					const id = `mermaid-${isDark ? "dark" : "light"}-${idx}-${Date.now()}`;

					try {
						const { svg } = await mermaid.render(id, code.trim());
						let container: HTMLDivElement;

						if (target.dataset.mermaidCode) {
							container = target as HTMLDivElement;
						} else {
							container = document.createElement("div");
							container.className = styles.mermaidContainer;
							container.dataset.mermaidCode = code.trim();
							target.parentNode?.replaceChild(container, target);
						}

						container.innerHTML = svg;
					} catch (e) {
						console.error("Mermaid render error:", e);
					}
				});
			});
		}

		// 3. Process Code blocks (Copy button, language badge, ASCII diagrams)
		const preNodes = root.querySelectorAll("pre");

		for (const pre of preNodes) {
			// Skip if already has copy button or is a mermaid container
			if (
				pre.querySelector(".codeCopyButton") ||
				pre.querySelector("code.language-mermaid") ||
				pre.classList.contains("language-mermaid")
			) {
				continue;
			}

			pre.style.position = "relative";

			const code = pre.querySelector("code");
			const className = code?.className || pre.className || "";
			const langMatch = className.match(/language-([a-zA-Z0-9_-]+)/);
			let lang = langMatch ? langMatch[1].toUpperCase() : "";

			// Detect ASCII box-drawing diagrams
			const isAsciiDiagram = /(\+[-=]{4,}\+|[┌├└][─┬┴]{4,}[┐┤┘])/.test(
				code?.textContent || "",
			);
			if (isAsciiDiagram) {
				pre.classList.add(styles.asciiDiagramBlock);
				lang = i18n._("DIAGRAM");
			}

			if (lang && !pre.querySelector(".codeLangBadge")) {
				const langBadge = document.createElement("span");
				langBadge.className = "codeLangBadge";
				langBadge.textContent = lang;
				pre.appendChild(langBadge);
				pre.style.paddingTop = "34px";
			}

			const btn = document.createElement("button");
			btn.className = "codeCopyButton";
			btn.type = "button";
			btn.setAttribute("aria-label", i18n._("Copy code"));
			btn.innerHTML = `
				<svg class="copySvg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
				<svg class="checkSvg" style="display:none;" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
				<span class="copyText">${i18n._("Copy")}</span>
			`;

			btn.addEventListener("click", async () => {
				const text = code?.innerText || pre.innerText;
				await navigator.clipboard.writeText(text);

				const copySvg = btn.querySelector(".copySvg") as HTMLElement;
				const checkSvg = btn.querySelector(".checkSvg") as HTMLElement;
				const copyText = btn.querySelector(".copyText") as HTMLElement;

				if (copySvg && checkSvg && copyText) {
					copySvg.style.display = "none";
					checkSvg.style.display = "inline";
					copyText.textContent = i18n._("Copied!");

					setTimeout(() => {
						copySvg.style.display = "inline";
						checkSvg.style.display = "none";
						copyText.textContent = i18n._("Copy");
					}, 2000);
				}
			});

			pre.appendChild(btn);
		}
	}, [doc.html, i18n, colorScheme]);

	// Navigation accordion state
	const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
		() => {
			const initial: Record<string, boolean> = {};
			for (const section of DOC_SECTIONS) {
				const isCurrent = section.items.some(
					(item) => item.slug === currentSlug,
				);
				if (isCurrent) {
					initial[section.id] = true;
				}
			}
			if (Object.keys(initial).length === 0 && DOC_SECTIONS.length > 0) {
				initial[DOC_SECTIONS[0].id] = true;
			}
			return initial;
		},
	);

	// Auto-expand the active section whenever the current page changes
	useEffect(() => {
		const activeSection = DOC_SECTIONS.find((s) =>
			s.items.some((item) => item.slug === currentSlug),
		);
		if (activeSection) {
			setOpenedSections((prev) => ({
				...prev,
				[activeSection.id]: true,
			}));
		}
	}, [currentSlug]);

	// Flatten all navigation items to compute Prev/Next links
	const flatItems = DOC_SECTIONS.flatMap((s) => s.items);
	const currentIndex = flatItems.findIndex((item) => item.slug === currentSlug);
	const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
	const nextItem =
		currentIndex >= 0 && currentIndex < flatItems.length - 1
			? flatItems[currentIndex + 1]
			: null;

	const currentSection = DOC_SECTIONS.find((s) =>
		s.items.some((item) => item.slug === currentSlug),
	);

	return (
		<Container size={1320} className={styles.container}>
			<Grid gap={40} className={styles.layoutGrid}>
				{/* Sidebar (Navigation) */}
				<Grid.Col span={{ base: 12, md: 3.5, lg: 3 }}>
					<div className={styles.sidebarWrapper}>
						<div className={styles.sidebarHeader}>
							<Text
								size="xs"
								fw={700}
								tt="uppercase"
								className={styles.sidebarSectionTitle}
							>
								{i18n._("Documentation")}
							</Text>
						</div>
						<Stack gap={4}>
							{DOC_SECTIONS.map((section) => {
								const SectionIcon = SECTION_ICONS[section.id] || BookOpen;
								const isOpened = openedSections[section.id] ?? false;
								const hasActiveChild = section.items.some(
									(item) => item.slug === currentSlug,
								);

								return (
									<NavLink
										key={section.id}
										label={i18n._(section.title)}
										leftSection={
											<SectionIcon
												size={16}
												strokeWidth={1.8}
												className={`${styles.sectionNavIcon} ${hasActiveChild ? styles.sectionNavIconActive : ""}`}
											/>
										}
										opened={isOpened}
										onChange={(opened) =>
											setOpenedSections((prev) => ({
												...prev,
												[section.id]: opened,
											}))
										}
										childrenOffset={0}
										className={`${styles.sectionNavLink} ${hasActiveChild ? styles.sectionNavLinkHasActive : ""}`}
										classNames={{
											root: styles.sectionNavLinkRoot,
											label: styles.sectionNavLinkLabel,
											chevron: styles.sectionNavLinkChevron,
											children: styles.sectionNavChildren,
										}}
									>
										{section.items.map((item) => {
											const isActive = currentSlug === item.slug;
											return (
												<NavLink
													key={item.slug}
													component={LocalizedLink}
													to={`/docs/${item.slug}`}
													label={i18n._(item.title)}
													active={isActive}
													className={`${styles.childNavLink} ${isActive ? styles.childNavLinkActive : ""}`}
													classNames={{
														root: styles.childNavLinkRoot,
														label: styles.childNavLinkLabel,
													}}
												/>
											);
										})}
									</NavLink>
								);
							})}
						</Stack>
					</div>
				</Grid.Col>

				{/* Main Content Area */}
				<Grid.Col span={{ base: 12, md: 8.5, lg: 9 }}>
					<Paper className={styles.contentPaper}>
						<header className={styles.headerSection}>
							{currentSection && (
								<div className={styles.badgeTag}>
									<BookOpen size={13} className={styles.badgeIcon} />
									{i18n._(currentSection.title)}
								</div>
							)}

							<Title order={1} className={styles.title}>
								{doc.title}
							</Title>

							{doc.description && (
								<Text size="md" className={styles.description}>
									{doc.description}
								</Text>
							)}
						</header>

						<Box
							ref={contentRef}
							className={styles.markdownBody}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted HTML compiled from internal markdown collection
							dangerouslySetInnerHTML={{ __html: doc.html }}
						/>

						{/* Pagination (Prev & Next) */}
						<div className={styles.paginationGrid}>
							<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
								{prevItem ? (
									<LocalizedLink
										to={`/docs/${prevItem.slug}`}
										className={styles.pageCard}
									>
										<Group gap={6} mb={4}>
											<ArrowLeft size={14} color="var(--text-secondary)" />
											<Text size="xs" c="dimmed">
												{i18n._("Previous")}
											</Text>
										</Group>
										<Text size="sm" fw={600} c="var(--text-primary)">
											{i18n._(prevItem.title)}
										</Text>
									</LocalizedLink>
								) : (
									<div />
								)}

								{nextItem && (
									<LocalizedLink
										to={`/docs/${nextItem.slug}`}
										className={styles.pageCard}
										style={{ textAlign: "right" }}
									>
										<Group gap={6} justify="flex-end" mb={4}>
											<Text size="xs" c="dimmed">
												{i18n._("Next")}
											</Text>
											<ArrowRight size={14} color="var(--text-secondary)" />
										</Group>
										<Text size="sm" fw={600} c="var(--text-primary)">
											{i18n._(nextItem.title)}
										</Text>
									</LocalizedLink>
								)}
							</SimpleGrid>
						</div>
					</Paper>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
