import { useLingui } from "@lingui/react";
import {
	Badge,
	Box,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { CircleCheckBig, MoveRight, Workflow } from "lucide-react";
import { useLandingContent } from "#/libs/landing";
import styles from "./HowItWorksSection.module.css";

export function HowItWorksSection() {
	const { i18n } = useLingui();
	const { workflowSteps } = useLandingContent();

	return (
		<Box component="section" id="how-it-works" className={styles.section}>
			<Group
				justify="space-between"
				align="flex-start"
				className={styles.header}
			>
				<Stack gap={16} className={styles.titleArea}>
					<div className={styles.badgeTag}>
						<Workflow size={13} className={styles.badgeIcon} />
						<span>{i18n._("How It Works")}</span>
					</div>
					<Title order={2} className={styles.title}>
						{i18n._("From a fresh VPS")}&nbsp;
						<span className={styles.highlightText}>
							{i18n._("to a production backend in minutes.")}
						</span>
					</Title>
					<Text className={styles.description}>
						{i18n._(
							"No complex Kubernetes YAML. No terminal gymnastics. Connect your server, pick your stack, and let Nitrobase automate Docker, Traefik, SSL, and secrets.",
						)}
					</Text>
				</Stack>

				<Stack gap={16} align="flex-end" className={styles.metaArea}>
					<Badge
						variant="outline"
						radius="xl"
						size="lg"
						className={styles.stepsPill}
					>
						{i18n._("3 simple steps")}
					</Badge>
					<Stack gap={10}>
						<Group gap={8} wrap="nowrap" className={styles.checkItem}>
							<CircleCheckBig size={16} className={styles.checkIcon} />
							<Text component="span">
								{i18n._(
									"Guided SSH TOFU verification, Docker CE & Traefik v3 bootstrap",
								)}
							</Text>
						</Group>
						<Group gap={8} wrap="nowrap" className={styles.checkItem}>
							<CircleCheckBig size={16} className={styles.checkIcon} />
							<Text component="span">
								{i18n._(
									"Supabase, Appwrite, PocketBase, databases & Git apps in 1 click",
								)}
							</Text>
						</Group>
						<Group gap={8} wrap="nowrap" className={styles.checkItem}>
							<CircleCheckBig size={16} className={styles.checkIcon} />
							<Text component="span">
								{i18n._(
									"Verified backups to S3 / R2 / B2 & built-in MCP server for AI agents",
								)}
							</Text>
						</Group>
					</Stack>
				</Stack>
			</Group>

			<SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
				{workflowSteps.map((step) => (
					<Box key={step.step} className={styles.stepCard}>
						<Group gap={16} align="flex-start" wrap="nowrap">
							<Text component="span" className={styles.stepNumber}>
								{step.badgeKey}
							</Text>
							<Stack gap={6} className={styles.stepTextGroup}>
								<Group gap={8} align="center" justify="space-between">
									<Title order={3} className={styles.stepTitle}>
										{step.title}
									</Title>
									<MoveRight size={16} className={styles.stepArrow} />
								</Group>
								<Text lineClamp={3} className={styles.stepDesc}>
									{step.desc}
								</Text>
							</Stack>
						</Group>

						<Box className={styles.imageFrame}>
							<img
								src={step.imageUrl}
								alt={step.title}
								className={styles.stepImg}
							/>
						</Box>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
}
