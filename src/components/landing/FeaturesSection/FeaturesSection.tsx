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
import { Database, Grid2x2, MoveRight, ShieldCheck, Zap } from "lucide-react";
import { BENEFIT_ITEMS } from "#/constants/landing";
import styles from "./FeaturesSection.module.css";

export function FeaturesSection() {
	const { i18n } = useLingui();

	const renderIcon = (name: string) => {
		switch (name) {
			case "zap":
				return <Zap size={20} />;
			case "database":
				return <Database size={20} />;
			case "grid-2x2":
				return <Grid2x2 size={20} />;
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
					{i18n._("BENEFITS")}
				</Text>
				<Title order={2} className={styles.title}>
					{i18n._("Less setup.")}
					<br />
					<span className={styles.highlightText}>
						{i18n._("More building.")}
					</span>
				</Title>
				<Text className={styles.description}>
					{i18n._(
						"SaaS Base removes the complexity of self-hosting, so you can focus on what matters most - building your product, not managing infrastructure.",
					)}
				</Text>
			</Stack>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={24}>
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
							<Group gap={6}>
								<Text component="span">{i18n._(item.action)}</Text>
								<MoveRight size={14} />
							</Group>
						</a>
					</Stack>
				))}
			</SimpleGrid>
		</Box>
	);
}
