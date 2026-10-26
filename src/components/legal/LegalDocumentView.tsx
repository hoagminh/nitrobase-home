import { useLingui } from "@lingui/react";
import {
	Anchor,
	Badge,
	Box,
	Button,
	Container,
	Grid,
	Group,
	NavLink,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import type { Legal } from "content-collections";
import {
	ArrowLeft,
	Calendar,
	CheckCircle2,
	ChevronRight,
	FileText,
	Mail,
	Shield,
} from "lucide-react";
import { LocalizedLink } from "#/libs/i18n";
import styles from "./LegalDocumentView.module.css";

interface LegalDocumentViewProps {
	doc: Legal;
	activeSlug: "policy" | "terms";
}

function formatLegalDate(dateStr: string, locale: string): string {
	const parsed = new Date(dateStr);
	if (Number.isNaN(parsed.getTime())) {
		return dateStr;
	}
	return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(parsed);
}

export function LegalDocumentView({ doc, activeSlug }: LegalDocumentViewProps) {
	const { i18n } = useLingui();

	return (
		<Container size={1200} className={styles.container}>
			<header className={styles.headerSection}>
				<Anchor
					component={LocalizedLink}
					to="/"
					className={styles.backLink}
					underline="never"
				>
					<Group gap={8}>
						<ArrowLeft size={16} />
						<Text size="sm" fw={500}>
							{i18n._("Back to home")}
						</Text>
					</Group>
				</Anchor>

				<Group gap={12} mb="md">
					<Badge
						variant="light"
						size="md"
						radius="xl"
						leftSection={<Shield size={12} />}
						className={styles.docBadge}
					>
						{i18n._("Trust & Security")}
					</Badge>
				</Group>

				<Title order={1} className={styles.title}>
					{doc.title}
				</Title>

				{doc.description && (
					<Text size="lg" className={styles.description}>
						{doc.description}
					</Text>
				)}

				<Group gap="xl" className={styles.metaRow}>
					{doc.lastUpdated && (
						<Group gap={6} className={styles.metaItem}>
							<Calendar size={14} />
							<Text size="xs">
								{i18n._("Last updated: {date}", {
									date: formatLegalDate(doc.lastUpdated, i18n.locale),
								})}
							</Text>
						</Group>
					)}
					<Group gap={6} className={styles.metaItem}>
						<CheckCircle2 size={14} />
						<Text size="xs">{i18n._("Official Version")}</Text>
					</Group>
				</Group>
			</header>

			<Grid gap={48}>
				<Grid.Col span={{ base: 12, md: 8 }}>
					<Paper
						// p={{ base: "lg", sm: 24 }}
						bg="transparent"
						radius="lg"
					>
						<Box
							className={styles.markdownBody}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted HTML compiled from internal markdown collection
							dangerouslySetInnerHTML={{ __html: doc.html }}
						/>
					</Paper>
				</Grid.Col>

				<Grid.Col span={{ base: 12, md: 4 }}>
					<Stack gap={24} className={styles.sidebarSticky}>
						<Paper p="lg" radius="md" withBorder className={styles.sidebarCard}>
							<Text
								size="xs"
								fw={700}
								tt="uppercase"
								c="dimmed"
								mb="md"
								className={styles.sidebarTitle}
							>
								{i18n._("Legal Documents")}
							</Text>
							<Stack gap={8}>
								<NavLink
									component={LocalizedLink}
									to="/policy"
									label={i18n._("Privacy Policy")}
									leftSection={<FileText size={16} />}
									rightSection={<ChevronRight size={14} />}
									active={activeSlug === "policy"}
									className={styles.navLink}
								/>
								<NavLink
									component={LocalizedLink}
									to="/terms-of-service"
									label={i18n._("Terms of Service")}
									leftSection={<FileText size={16} />}
									rightSection={<ChevronRight size={14} />}
									active={activeSlug === "terms"}
									className={styles.navLink}
								/>
							</Stack>
						</Paper>

						<Paper p="lg" radius="md" withBorder className={styles.sidebarCard}>
							<Text
								size="xs"
								fw={700}
								tt="uppercase"
								c="dimmed"
								mb="md"
								className={styles.sidebarTitle}
							>
								{i18n._("Need Legal Assistance?")}
							</Text>
							<Stack gap="md" className={styles.supportBox}>
								<Text size="xs" lh={1.6}>
									{i18n._(
										"Have specific questions about data handling or our terms? Our compliance team is ready to help.",
									)}
								</Text>
								<Button
									component="a"
									href="mailto:legal@nitrobase.dev"
									leftSection={<Mail size={16} />}
									fullWidth
									className={styles.contactBtn}
								>
									{i18n._("Contact Legal Team")}
								</Button>
							</Stack>
						</Paper>
					</Stack>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
