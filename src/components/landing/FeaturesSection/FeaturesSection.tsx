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
	Database,
	Grid2x2,
	MoveRight,
	RefreshCw,
	Server,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { BENEFIT_ITEMS } from "#/constants/landing";
import styles from "./FeaturesSection.module.css";

export function FeaturesSection() {
	const { i18n } = useLingui();

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
			default:
				return null;
		}
	};

	return (
		<Box component="section" id="features" className={styles.section}>
			<Stack gap={16} align="center" className={styles.header}>
				<Text component="span" className={styles.tag}>
					{i18n._("ARCHITECTURE & CAPABILITIES")}
				</Text>
				<Title order={2} className={styles.title}>
					{i18n._("Enterprise power.")}
					<br />
					<span className={styles.highlightText}>
						{i18n._("Zero cloud lock-in.")}
					</span>
				</Title>
				<Text className={styles.description}>
					{i18n._(
						"Say goodbye to unpredictable cloud bills. SaaSBase provides the complete developer experience of hosted platforms, running entirely on your own private infrastructure.",
					)}
				</Text>
			</Stack>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
				{BENEFIT_ITEMS.map((item) => (
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
								{i18n._(item.title)}
							</Title>
							<Text className={styles.cardDesc}>{i18n._(item.desc)}</Text>
						</Stack>

						<a href="#how-it-works" className={styles.cardAction}>
							<Group gap={6} wrap="nowrap" className={styles.actionRow}>
								<Text component="span">{i18n._(item.action)}</Text>
								<MoveRight size={14} style={{ flexShrink: 0 }} />
							</Group>
						</a>
					</Stack>
				))}
			</SimpleGrid>
		</Box>
	);
}
