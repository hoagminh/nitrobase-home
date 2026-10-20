import { useLingui } from "@lingui/react";
import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { MoveRight } from "lucide-react";
import { LocalizedLink } from "#/libs/i18n";
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
				<Box className={styles.glowLeft} />
				<Box className={styles.glowRight} />

				<Group gap={8} className={styles.badgePill}>
					<Box component="span" className={styles.pulseDot} />
					<Text component="span">
						{i18n._("Ready to own your infrastructure?")}
					</Text>
				</Group>

				<Stack align="center" gap={12} className={styles.titleGroup}>
					<Title order={2} className={styles.title}>
						{i18n._("Your backend. Your server. Total data sovereignty.")}
					</Title>
					<Text className={styles.description}>
						{i18n._(
							"Deploy Supabase, PocketBase, and full-stack apps on your own VPS with automated Docker bootstrap, encrypted backups, and zero-downtime migrations.",
						)}
					</Text>
				</Stack>

				<Stack align="center" gap={12} className={styles.actionsArea}>
					<Button
						component={LocalizedLink}
						to="/signup"
						size="md"
						radius="md"
						className={styles.ctaBtn}
						rightSection={<MoveRight size={16} />}
					>
						{i18n._("Get Started Free")}
					</Button>
					<Text component="span" className={styles.subText}>
						{i18n._(
							"Open Source • Free & Self-Hosted • No Credit Card Required",
						)}
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
