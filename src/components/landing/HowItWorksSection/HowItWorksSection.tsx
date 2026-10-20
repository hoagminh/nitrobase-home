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
import { WORKFLOW_STEPS } from "#/constants/landing";
import styles from "./HowItWorksSection.module.css";

export function HowItWorksSection() {
	const { i18n } = useLingui();

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
							"No complex Kubernetes YAML. No terminal gymnastics. Connect your server, pick your stack, and let SaaSBase automate Docker, Traefik, SSL, and secrets.",
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
									"Automated SSH TOFU verification & Docker 27 bootstrap",
								)}
							</Text>
						</Group>
						<Group gap={8} wrap="nowrap" className={styles.checkItem}>
							<CircleCheckBig size={16} className={styles.checkIcon} />
							<Text component="span">
								{i18n._(
									"Production Supabase cluster with Postgres 16, pgvector & Studio",
								)}
							</Text>
						</Group>
						<Group gap={8} wrap="nowrap" className={styles.checkItem}>
							<CircleCheckBig size={16} className={styles.checkIcon} />
							<Text component="span">
								{i18n._(
									"Automated AES-256 encrypted backups to Cloudflare R2 / S3",
								)}
							</Text>
						</Group>
					</Stack>
				</Stack>
			</Group>

			<SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
				{WORKFLOW_STEPS.map((step) => (
					<Box key={step.step} className={styles.stepCard}>
						<Group gap={16} align="flex-start" wrap="nowrap">
							<Text component="span" className={styles.stepNumber}>
								{step.badgeKey}
							</Text>
							<Stack gap={6} className={styles.stepTextGroup}>
								<Group gap={8} align="center" justify="space-between">
									<Title order={3} className={styles.stepTitle}>
										{i18n._(step.title)}
									</Title>
									<MoveRight size={16} className={styles.stepArrow} />
								</Group>
								<Text lineClamp={3} className={styles.stepDesc}>
									{i18n._(step.desc)}
								</Text>
							</Stack>
						</Group>

						<Box className={styles.imageFrame}>
							<img
								src={step.imageUrl}
								alt={i18n._(step.title)}
								className={styles.stepImg}
							/>
						</Box>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
}
