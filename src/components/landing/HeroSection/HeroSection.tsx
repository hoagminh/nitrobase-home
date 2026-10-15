import { useLingui } from "@lingui/react";
import {
	Box,
	Button,
	Divider,
	Group,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { MoveRight, Server, ShieldCheck, Zap } from "lucide-react";
import styles from "./HeroSection.module.css";

export function HeroSection() {
	const { i18n } = useLingui();

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
							component="a"
							href="#demo"
							size="md"
							radius="md"
							variant="default"
							className={styles.secondaryCta}
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
		</Box>
	);
}
