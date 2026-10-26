import { useLingui } from "@lingui/react";
import {
	Box,
	Button,
	Code,
	CopyButton,
	Divider,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	Check,
	ChevronRight,
	Copy,
	MoveRight,
	Server,
	ShieldCheck,
	Terminal,
	Zap,
} from "lucide-react";
import { LocalizedLink } from "#/libs/i18n";
import { HeroWorkflowCanvas } from "../HeroWorkflowCanvas/HeroWorkflowCanvas";
import styles from "./HeroSection.module.css";

export function HeroSection() {
	const { i18n } = useLingui();

	const curlSnippet = "curl -fsSL https://get.nitrobase.dev | bash";

	return (
		<Box component="section" className={styles.section}>
			<SimpleGrid
				cols={{ base: 1, md: 2 }}
				spacing={{ base: 32, md: 40 }}
				className={styles.grid}
			>
				<Stack gap={20} className={styles.content}>
					<a
						href="https://github.com/hoagminh/nitrobase-landing"
						target="_blank"
						rel="noreferrer"
						className={styles.badgeTag}
					>
						<span className={styles.badgeDot} />
						<span className={styles.badgeText}>
							{i18n._("Nitrobase v1.0 is live")}
						</span>
						<ChevronRight size={13} className={styles.badgeChevron} />
					</a>

					<Title order={1} className={styles.title}>
						{i18n._("Self-host Modern PaaS & BaaS.")}&nbsp;
						<span className={styles.gradientSubtitle}>
							{i18n._("On your own VPS without the DevOps headache.")}
						</span>
					</Title>

					<Text className={styles.description}>
						{i18n._(
							"Nitrobase is the open-source self-hosted PaaS & BaaS deployer. Connect any VPS over SSH, bootstrap Docker & Traefik in 1 click, and run production-grade Supabase, PocketBase, Appwrite, n8n and more with zero vendor lock-in.",
						)}
					</Text>

					<Group gap={14} className={styles.actions}>
						<Button
							component={LocalizedLink}
							to="/signup"
							size="md"
							radius="md"
							className={styles.primaryCta}
							rightSection={<MoveRight size={17} />}
						>
							{i18n._("Get Started Free")}
						</Button>
						<Button
							component="a"
							href="https://github.com/hoagminh/nitrobase-landing"
							target="_blank"
							rel="noreferrer"
							size="md"
							radius="md"
							variant="default"
							className={styles.secondaryCta}
							leftSection={
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg>
							}
						>
							{i18n._("GitHub")}
						</Button>
					</Group>

					<Box className={styles.cliSnippet}>
						<Terminal size={14} className={styles.cliIcon} />
						<Code className={styles.cliCode}>{curlSnippet}</Code>
						<CopyButton value={curlSnippet} timeout={2000}>
							{({ copied, copy }) => (
								<Tooltip
									label={
										copied ? i18n._("Copied!") : i18n._("Copy install command")
									}
								>
									<Button
										type="button"
										size="xs"
										variant="subtle"
										onClick={copy}
										className={styles.copyBtn}
									>
										{copied ? (
											<Check size={13} color="#10b981" />
										) : (
											<Copy size={13} />
										)}
									</Button>
								</Tooltip>
							)}
						</CopyButton>
					</Box>

					<Group gap={14} wrap="nowrap" className={styles.valueProps}>
						<div className={styles.valueItem}>
							<Zap className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("1-Click VPS Bootstrap")}
							</Text>
						</div>

						<Divider
							orientation="vertical"
							className={styles.verticalDivider}
						/>

						<div className={styles.valueItem}>
							<ShieldCheck className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("AES-256 Encrypted Backups")}
							</Text>
						</div>

						<Divider
							orientation="vertical"
							className={styles.verticalDivider}
						/>

						<div className={styles.valueItem}>
							<Server className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("100% Data Sovereignty")}
							</Text>
						</div>
					</Group>
				</Stack>

				<Box className={styles.visualWrapper}>
					<HeroWorkflowCanvas />
				</Box>
			</SimpleGrid>
		</Box>
	);
}
