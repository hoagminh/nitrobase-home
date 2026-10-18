import { useLingui } from "@lingui/react";
import {
	Badge,
	Box,
	Button,
	Code,
	CopyButton,
	Divider,
	Group,
	Modal,
	Progress,
	SimpleGrid,
	Stack,
	Tabs,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	Check,
	Code2,
	Copy,
	Database,
	Layers,
	MoveRight,
	Play,
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
	const [demoOpened, { open: openDemo, close: closeDemo }] =
		useDisclosure(false);

	const curlSnippet = "curl -fsSL https://get.saasbase.dev | bash";

	return (
		<Box component="section" className={styles.section}>
			<SimpleGrid
				cols={{ base: 1, md: 2 }}
				spacing={{ base: 32, md: 40 }}
				className={styles.grid}
			>
				<Stack gap={20} className={styles.content}>
					<Box className={styles.badgeTag}>
						<span className={styles.badgeDot} />
						<span>
							{i18n._("SaaSBase v1.0 // Self-Hosted Supabase Architecture")}
						</span>
					</Box>

					<Title order={1} className={styles.title}>
						{i18n._("Self-host Supabase.")}{" "}
						<span className={styles.gradientSubtitle}>
							{i18n._("Without the setup headache.")}
						</span>
					</Title>

					<Text className={styles.description}>
						{i18n._(
							"SaaSBase helps you deploy and manage Supabase on your own VPS - automatically, securely, and with a simple interface. Focus on building, not configuring.",
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
							type="button"
							onClick={openDemo}
							size="md"
							radius="md"
							variant="default"
							className={styles.secondaryCta}
							leftSection={<Play size={15} />}
						>
							{i18n._("Explore Demo")}
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

					<Group gap={18} className={styles.valueProps}>
						<div className={styles.valueItem}>
							<Zap className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("Automated Deployment")}
							</Text>
						</div>

						<Divider
							orientation="vertical"
							className={styles.verticalDivider}
						/>

						<div className={styles.valueItem}>
							<ShieldCheck className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("End-to-End Encryption")}
							</Text>
						</div>

						<Divider
							orientation="vertical"
							className={styles.verticalDivider}
						/>

						<div className={styles.valueItem}>
							<Server className={styles.valueIcon} />
							<Text className={styles.valueText}>
								{i18n._("100% VPS Sovereignty")}
							</Text>
						</div>
					</Group>
				</Stack>

				<Box className={styles.visualWrapper}>
					<HeroWorkflowCanvas />
				</Box>
			</SimpleGrid>

			<Modal
				opened={demoOpened}
				onClose={closeDemo}
				title={
					<Group gap={12}>
						<Text fw={700} size="lg">
							{i18n._("SaaS Base Live Interactive Demo")}
						</Text>
						<Badge variant="light" color="blue" size="sm">
							{i18n._("v1.4 Preview")}
						</Badge>
					</Group>
				}
				size="xl"
				radius="lg"
				centered
			>
				<Stack gap={20}>
					<Text size="sm" c="dimmed">
						{i18n._(
							"Explore how easy it is to deploy and control full Supabase instances directly on your own infrastructure.",
						)}
					</Text>

					<Tabs defaultValue="one-click" radius="md">
						<Tabs.List>
							<Tabs.Tab value="one-click" leftSection={<Layers size={16} />}>
								{i18n._("1-Click Deploy")}
							</Tabs.Tab>
							<Tabs.Tab value="cli" leftSection={<Terminal size={16} />}>
								{i18n._("Terminal CLI")}
							</Tabs.Tab>
							<Tabs.Tab value="database" leftSection={<Database size={16} />}>
								{i18n._("Database & Auth")}
							</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="one-click" pt="md">
							<Stack
								gap={16}
								p={20}
								style={{
									borderRadius: 12,
									border: "1px solid var(--border-default)",
									backgroundColor: "var(--surface-primary)",
								}}
							>
								<Group justify="space-between">
									<div>
										<Text fw={600} size="sm">
											{i18n._("Target VPS Server")}
										</Text>
										<Text size="xs" c="dimmed">
											Hetzner Cloud / Ubuntu 24.04 LTS (159.69.120.44)
										</Text>
									</div>
									<Badge color="green" variant="light">
										{i18n._("Ready to Deploy")}
									</Badge>
								</Group>

								<Box>
									<Group justify="space-between" mb={6}>
										<Text size="xs" c="dimmed">
											{i18n._("Stack Setup Progress")}
										</Text>
										<Text size="xs" fw={600}>
											100% {i18n._("Ready")}
										</Text>
									</Group>
									<Progress value={100} color="blue" size="sm" radius="xl" />
								</Box>

								<SimpleGrid cols={{ base: 1, sm: 3 }} spacing={12}>
									<Box
										p={12}
										style={{
											borderRadius: 8,
											backgroundColor: "var(--bg-secondary)",
											border: "1px solid var(--border-default)",
										}}
									>
										<Text size="xs" c="dimmed">
											Postgres 16
										</Text>
										<Text fw={600} size="sm" c="green">
											{i18n._("Configured & Tuned")}
										</Text>
									</Box>
									<Box
										p={12}
										style={{
											borderRadius: 8,
											backgroundColor: "var(--bg-secondary)",
											border: "1px solid var(--border-default)",
										}}
									>
										<Text size="xs" c="dimmed">
											GoTrue / Auth
										</Text>
										<Text fw={600} size="sm" c="green">
											{i18n._("JWT & OAuth Ready")}
										</Text>
									</Box>
									<Box
										p={12}
										style={{
											borderRadius: 8,
											backgroundColor: "var(--bg-secondary)",
											border: "1px solid var(--border-default)",
										}}
									>
										<Text size="xs" c="dimmed">
											Kong API Gateway
										</Text>
										<Text fw={600} size="sm" c="green">
											{i18n._("SSL Auto-Renew")}
										</Text>
									</Box>
								</SimpleGrid>
							</Stack>
						</Tabs.Panel>

						<Tabs.Panel value="cli" pt="md">
							<Stack
								gap={12}
								p={20}
								style={{
									borderRadius: 12,
									border: "1px solid var(--border-default)",
									backgroundColor: "#0d1117",
									color: "#c9d1d9",
								}}
							>
								<Group justify="space-between">
									<Group gap={8}>
										<Code2 size={16} color="#58a6ff" />
										<Text size="xs" fw={600} style={{ color: "#8b949e" }}>
											bash - automated install command
										</Text>
									</Group>
									<CopyButton value={curlSnippet} timeout={2000}>
										{({ copied, copy }) => (
											<Tooltip
												label={copied ? i18n._("Copied!") : i18n._("Copy")}
												withArrow
											>
												<Button
													size="xs"
													variant="default"
													onClick={copy}
													leftSection={
														copied ? <Check size={14} /> : <Copy size={14} />
													}
												>
													{copied ? i18n._("Copied") : i18n._("Copy Command")}
												</Button>
											</Tooltip>
										)}
									</CopyButton>
								</Group>
								<Code
									block
									style={{
										backgroundColor: "transparent",
										color: "#58a6ff",
										fontSize: "14px",
										padding: "8px 0",
									}}
								>
									{`$ ${curlSnippet}`}
								</Code>
								<Text size="xs" style={{ color: "#8b949e" }}>
									{i18n._(
										"Runs automated prerequisites check, installs Docker & Supabase containers, configures firewall, and issues free SSL certificates.",
									)}
								</Text>
							</Stack>
						</Tabs.Panel>

						<Tabs.Panel value="database" pt="md">
							<Stack
								gap={16}
								p={20}
								style={{
									borderRadius: 12,
									border: "1px solid var(--border-default)",
									backgroundColor: "var(--surface-primary)",
								}}
							>
								<Group justify="space-between">
									<Text fw={600} size="sm">
										{i18n._("Supabase Studio & Realtime")}
									</Text>
									<Badge color="cyan" variant="dot">
										{i18n._("Zero Latency Local")}
									</Badge>
								</Group>
								<Text size="xs" c="dimmed">
									{i18n._(
										"Access the built-in Supabase Studio web dashboard running securely on your private IP or custom domain with basic HTTP authentication or SSO.",
									)}
								</Text>
							</Stack>
						</Tabs.Panel>
					</Tabs>

					<Group justify="flex-end" gap={12} className={styles.modalActions}>
						<Button
							type="button"
							variant="default"
							onClick={closeDemo}
							className={styles.modalCloseBtn}
						>
							{i18n._("Close Preview")}
						</Button>
						<Button
							component={LocalizedLink}
							to="/signup"
							className={styles.modalPrimaryBtn}
							rightSection={<MoveRight size={16} />}
						>
							{i18n._("Deploy Your Instance Now")}
						</Button>
					</Group>
				</Stack>
			</Modal>
		</Box>
	);
}
