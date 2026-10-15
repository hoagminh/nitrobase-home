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
	ThemeIcon,
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
				{/* Left Content */}
				<Stack gap={24} className={styles.content}>
					{/* Tagline */}
					<Text className={styles.tagline}>
						{i18n._("SELF-HOST SUPABASE, SIMPLIFIED")}
					</Text>

					{/* Main Display Title */}
					<Title order={1} className={styles.title}>
						{i18n._("Self-host Supabase.")}
						<span className={styles.gradientSubtitle}>
							{i18n._("Without the setup")}
							<br />
							{i18n._("headache.")}
						</span>
					</Title>

					{/* Description */}
					<Text className={styles.description}>
						{i18n._(
							"SaaSBase helps you deploy and manage Supabase on your own VPS - automatically, securely, and with a simple interface. Focus on building, not configuring.",
						)}
					</Text>

					{/* Action Buttons */}
					<Group gap={16} className={styles.actions}>
						<Button
							component="a"
							href="/signup"
							size="md"
							radius="md"
							className={styles.primaryCta}
							rightSection={<MoveRight size={18} />}
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
							leftSection={<Play size={16} />}
						>
							{i18n._("Explore Demo")}
						</Button>
					</Group>

					{/* 3 Value Props */}
					<Group gap={24} className={styles.valueProps}>
						<Group gap={8} wrap="nowrap" className={styles.valueItem}>
							<ThemeIcon
								variant="transparent"
								size={24}
								className={styles.valueIconWrapper}
							>
								<Zap className={styles.valueIcon} />
							</ThemeIcon>
							<Text className={styles.valueText}>
								{i18n._("Automated\nDeployment")}
							</Text>
						</Group>

						<Divider
							orientation="vertical"
							h={40}
							className={styles.verticalDivider}
						/>

						<Group gap={8} wrap="nowrap" className={styles.valueItem}>
							<ThemeIcon
								variant="transparent"
								size={24}
								className={styles.valueIconWrapper}
							>
								<ShieldCheck className={styles.valueIcon} />
							</ThemeIcon>
							<Text className={styles.valueText}>
								{i18n._("Secure &\nPrivate")}
							</Text>
						</Group>

						<Divider
							orientation="vertical"
							h={40}
							className={styles.verticalDivider}
						/>

						<Group gap={8} wrap="nowrap" className={styles.valueItem}>
							<ThemeIcon
								variant="transparent"
								size={24}
								className={styles.valueIconWrapper}
							>
								<Server className={styles.valueIcon} />
							</ThemeIcon>
							<Text className={styles.valueText}>
								{i18n._("Your VPS,\nYour Control")}
							</Text>
						</Group>
					</Group>
				</Stack>

				{/* Right Visual Mockups */}
				<Box className={styles.visualWrapper}>
					<Box className={styles.ellipseGlow} />

					<Box className={styles.mainCard}>
						<img
							src="/assets/landing/hero-preview.png"
							alt="SaaS Base Dashboard Preview"
							className={styles.mainImg}
						/>
					</Box>

					<Box className={styles.floatingCard}>
						<img
							src="/assets/landing/hero-preview-secondary.png"
							alt="SaaS Base Mobile Preview"
							className={styles.mainImg}
						/>
					</Box>
				</Box>
			</SimpleGrid>

			{/* Interactive Live Demo Modal */}
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
									backgroundColor: "var(--bg-secondary)",
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
											backgroundColor: "var(--surface-primary)",
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
											backgroundColor: "var(--surface-primary)",
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
											backgroundColor: "var(--surface-primary)",
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
									backgroundColor: "var(--bg-secondary)",
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

					<Group justify="flex-end" pt="xs">
						<Button variant="default" onClick={closeDemo}>
							{i18n._("Close Preview")}
						</Button>
						<Button
							component="a"
							href="/signup"
							className={styles.primaryCta}
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
