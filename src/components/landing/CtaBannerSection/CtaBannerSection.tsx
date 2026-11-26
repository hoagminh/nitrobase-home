import { useLingui } from "@lingui/react";
import { Box, Button, Stack, Text, Title } from "@mantine/core";
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

				<div className={styles.badgePill}>
					<span className={styles.pulseDot} />
					<span>{i18n._("Get Started")}</span>
				</div>

				<Stack align="center" gap={12} className={styles.titleGroup}>
					<Title order={2} className={styles.title}>
						{i18n._("Your backend. Your server. Total data sovereignty.")}
					</Title>
					<Text className={styles.description}>
						{i18n._(
							"Deploy Supabase, Appwrite, PocketBase, standalone databases, and Git apps on your own VPS with guided bootstrap, verified backups, and built-in MCP support.",
						)}
					</Text>
				</Stack>

				<Stack align="center" gap={12} className={styles.actionsArea}>
					<Button
						component={LocalizedLink}
						to="/docs/getting-started/quickstart-vps"
						radius="md"
						className={styles.ctaBtn}
						rightSection={<MoveRight size={16} />}
					>
						{i18n._("Get Started Free")}
					</Button>
					<Text component="span" className={styles.subText}>
						{i18n._(
							"Fair Source (FSL-1.1-ALv2) • Free & Self-Hosted • No Credit Card Required",
						)}
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
