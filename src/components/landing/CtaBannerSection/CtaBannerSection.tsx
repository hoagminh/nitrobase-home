import { useLingui } from "@lingui/react";
import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { MoveRight } from "lucide-react";
import styles from "./CtaBannerSection.module.css";

export function CtaBannerSection() {
	const { i18n } = useLingui();

	return (
		<Box component="section" className={styles.section}>
			<Stack
				align="center"
				justify="center"
				gap={24}
				className={styles.bannerCard}
			>
				{/* Glows */}
				<Box className={styles.glowLeft} />
				<Box className={styles.glowRight} />

				{/* Badge Pill */}
				<Group gap={8} className={styles.badgePill}>
					<Box component="span" className={styles.pulseDot} />
					<Text component="span">{i18n._("Ready to get started?")}</Text>
				</Group>

				{/* Title Group */}
				<Stack align="center" gap={12} className={styles.titleGroup}>
					<Title order={2} className={styles.title}>
						{i18n._("Your backend. Your server. Your control.")}
					</Title>
					<Text className={styles.description}>
						{i18n._(
							"Deploy and manage your own Supabase infrastructure - easily, automatically, and securely.",
						)}
					</Text>
				</Stack>

				{/* CTA Actions */}
				<Stack align="center" gap={12} className={styles.actionsArea}>
					<Button
						component="a"
						href="/signup"
						size="md"
						radius="md"
						className={styles.ctaBtn}
						rightSection={<MoveRight size={16} />}
					>
						{i18n._("Get Started for Free")}
					</Button>
					<Text component="span" className={styles.subText}>
						{i18n._("No credit card required")}
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
