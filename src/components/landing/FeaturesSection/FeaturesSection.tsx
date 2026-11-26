import { useLingui } from "@lingui/react";
import {
	Box,
	Group,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	Boxes,
	Database,
	Grid2x2,
	MoveRight,
	RefreshCw,
	Server,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { LocalizedLink } from "#/libs/i18n";
import { useLandingContent } from "#/libs/landing";
import styles from "./FeaturesSection.module.css";

const FEATURE_DOC_LINKS: Record<string, string> = {
	"vps-bootstrap": "/docs/core-concepts/architecture",
	"supabase-full-stack": "/docs/apps-templates/deploying-apps",
	"cloud-sync-migration": "/docs/guides/supabase-cloud-sync",
	"enterprise-security": "/docs/core-concepts/security-encryption",
};

export function FeaturesSection() {
	const { i18n } = useLingui();
	const { benefitItems } = useLandingContent();

	const renderIcon = (name: string) => {
		switch (name) {
			case "zap":
				return <Zap size={20} />;
			case "server":
				return <Server size={20} />;
			case "database":
				return <Database size={20} />;
			case "grid-2x2":
				return <Grid2x2 size={20} />;
			case "refresh-cw":
				return <RefreshCw size={20} />;
			case "shield-check":
				return <ShieldCheck size={20} />;
			case "boxes":
				return <Boxes size={20} />;
			default:
				return null;
		}
	};

	return (
		<Box component="section" id="features" className={styles.section}>
			<Stack gap={16} align="center" className={styles.header}>
				<div className={styles.badgeTag}>
					<Boxes size={13} className={styles.badgeIcon} />
					<span>{i18n._("Features")}</span>
				</div>
				<Title order={2} className={styles.title}>
					{i18n._("Enterprise power.")}
					<br />
					<span className={styles.highlightText}>
						{i18n._("Zero cloud lock-in.")}
					</span>
				</Title>
				<Text className={styles.description}>
					{i18n._(
						"Say goodbye to unpredictable cloud bills. Nitrobase provides the complete developer experience of hosted platforms, running entirely on your own private infrastructure.",
					)}
				</Text>
			</Stack>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
				{benefitItems.map((item) => (
					<Stack key={item.id} justify="space-between" className={styles.card}>
						<Stack gap={12}>
							<ThemeIcon
								size={40}
								radius="md"
								variant="default"
								className={styles.iconWrapper}
							>
								{renderIcon(item.iconName)}
							</ThemeIcon>
							<Title order={3} className={styles.cardTitle}>
								{item.title}
							</Title>
							{item.tags && item.tags.length > 0 && (
								<Group gap={6} wrap="wrap" className={styles.tagsGroup}>
									{item.tags.map((tag) => (
										<span key={tag} className={styles.tagBadge}>
											{tag}
										</span>
									))}
								</Group>
							)}
							<Text className={styles.cardDesc}>{item.desc}</Text>
						</Stack>

						<LocalizedLink
							to={FEATURE_DOC_LINKS[item.id] ?? "/docs"}
							className={styles.cardAction}
						>
							<Group gap={6} wrap="nowrap" className={styles.actionRow}>
								<Text component="span">{item.action}</Text>
								<MoveRight size={14} style={{ flexShrink: 0 }} />
							</Group>
						</LocalizedLink>
					</Stack>
				))}
			</SimpleGrid>
		</Box>
	);
}
