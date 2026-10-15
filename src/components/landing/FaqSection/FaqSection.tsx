import { useLingui } from "@lingui/react";
import {
	Accordion,
	Box,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { ChevronDown, MoveRight, ShieldCheck } from "lucide-react";
import { FAQ_ITEMS } from "#/constants/landing";
import styles from "./FaqSection.module.css";

export function FaqSection() {
	const { i18n } = useLingui();

	return (
		<Box component="section" id="faq" className={styles.section}>
			<Group justify="space-between" align="flex-start" className={styles.grid}>
				{/* Left Support Column */}
				<Stack gap={48} className={styles.leftColumn}>
					<Stack gap={12} className={styles.titleArea}>
						<Text component="span" className={styles.tag}>
							{i18n._("FAQ")}
						</Text>
						<Title order={2} className={styles.title}>
							{i18n._("Everything you need")}
							<br />
							{i18n._("to know")}
							<span className={styles.highlightText}>
								{" "}
								{i18n._("before deploying.")}
							</span>
						</Title>
						<Text className={styles.description}>
							{i18n._(
								"Find quick answers to the most common questions about SaaS Base, from pricing and setup to security and support.",
							)}
						</Text>
					</Stack>

					{/* Support Card */}
					<Stack gap={16} className={styles.supportCard}>
						<ThemeIcon
							size={40}
							radius="md"
							variant="default"
							className={styles.supportIcon}
						>
							<ShieldCheck size={20} />
						</ThemeIcon>
						<Stack gap={4}>
							<Title order={3} className={styles.supportTitle}>
								{i18n._("Still have questions?")}
							</Title>
							<Text className={styles.supportDesc}>
								{i18n._("Our team is here to help. Reach out anytime.")}
							</Text>
						</Stack>
						<a href="#support" className={styles.contactBtn}>
							<Group gap={6}>
								<Text component="span">{i18n._("Contact Support")}</Text>
								<MoveRight size={14} />
							</Group>
						</a>
					</Stack>
				</Stack>

				{/* Right Mantine Accordion */}
				<Box className={styles.rightColumn}>
					<Accordion
						defaultValue="faq-1"
						chevron={<ChevronDown size={18} />}
						classNames={{
							item: styles.accordionItem,
							control: styles.accordionControl,
							panel: styles.accordionPanel,
						}}
					>
						{FAQ_ITEMS.map((item) => (
							<Accordion.Item key={item.id} value={item.id}>
								<Accordion.Control>
									{i18n._(item.questionKey)}
								</Accordion.Control>
								<Accordion.Panel>{i18n._(item.answerKey)}</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
				</Box>
			</Group>
		</Box>
	);
}
