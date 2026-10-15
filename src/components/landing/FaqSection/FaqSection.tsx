import { useLingui } from "@lingui/react";
import {
	Accordion,
	Alert,
	Badge,
	Box,
	Button,
	Group,
	Modal,
	Select,
	Stack,
	Text,
	Textarea,
	TextInput,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	CheckCircle2,
	ChevronDown,
	Mail,
	MessageSquare,
	MoveRight,
	Send,
	ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "#/constants/landing";
import styles from "./FaqSection.module.css";

interface ISupportForm {
	name: string;
	email: string;
	topic: string | null;
	message: string;
}

export function FaqSection() {
	const { i18n } = useLingui();
	const [contactOpened, { open: openContact, close: closeContact }] =
		useDisclosure(false);

	const [formData, setFormData] = useState<ISupportForm>({
		name: "",
		email: "",
		topic: "vps_setup",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmitSupport = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message) {
			return;
		}

		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			setTimeout(() => {
				setIsSubmitted(false);
				closeContact();
				setFormData({
					name: "",
					email: "",
					topic: "vps_setup",
					message: "",
				});
			}, 3000);
		}, 800);
	};

	return (
		<Box component="section" id="faq" className={styles.section}>
			<Group justify="space-between" align="flex-start" className={styles.grid}>
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
						<Button
							type="button"
							variant="subtle"
							onClick={openContact}
							className={styles.contactBtn}
							rightSection={<MoveRight size={14} />}
							p={0}
							justify="flex-start"
						>
							{i18n._("Contact Support")}
						</Button>
					</Stack>
				</Stack>

				<Box className={styles.rightColumn}>
					<Accordion
						defaultValue="faq-1"
						chevron={<ChevronDown size={20} />}
						classNames={{
							root: styles.accordionRoot,
							item: styles.accordionItem,
							control: styles.accordionControl,
							label: styles.accordionLabel,
							chevron: styles.accordionChevron,
							panel: styles.accordionPanel,
							content: styles.accordionContent,
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

			<Modal
				opened={contactOpened}
				onClose={closeContact}
				title={
					<Group gap={10}>
						<MessageSquare size={20} />
						<Text fw={700} size="lg">
							{i18n._("Contact Support Team")}
						</Text>
						<Badge variant="light" color="green" size="sm">
							{i18n._("Avg. 2h response")}
						</Badge>
					</Group>
				}
				radius="lg"
				centered
				size="md"
			>
				{isSubmitted ? (
					<Alert
						icon={<CheckCircle2 size={24} />}
						title={i18n._("Message Sent Successfully!")}
						color="green"
						radius="md"
						my={16}
					>
						{i18n._(
							"Thank you for contacting us. An engineer will review your inquiry and reply via email shortly.",
						)}
					</Alert>
				) : (
					<form onSubmit={handleSubmitSupport}>
						<Stack gap={16}>
							<Text size="sm" c="dimmed">
								{i18n._(
									"Have a question about custom VPS architecture, security benchmarks, or automated backups? Let us know below.",
								)}
							</Text>

							<TextInput
								label={i18n._("Your Name")}
								placeholder={i18n._("e.g. Alex Henderson")}
								required
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
							/>

							<TextInput
								label={i18n._("Work Email")}
								placeholder="alex@company.com"
								type="email"
								leftSection={<Mail size={16} />}
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>

							<Select
								label={i18n._("Topic")}
								data={[
									{
										value: "vps_setup",
										label: i18n._("VPS Deployment & Setup"),
									},
									{
										value: "custom_domain",
										label: i18n._("SSL & Custom Domain"),
									},
									{
										value: "billing",
										label: i18n._("Pricing & Licensing"),
									},
									{
										value: "other",
										label: i18n._("General Question"),
									},
								]}
								value={formData.topic}
								onChange={(val) => setFormData({ ...formData, topic: val })}
							/>

							<Textarea
								label={i18n._("Message")}
								placeholder={i18n._(
									"Describe what you'd like help with or what VPS provider you are using...",
								)}
								minRows={3}
								maxRows={6}
								required
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
							/>

							<Group justify="flex-end" mt={8}>
								<Button variant="default" onClick={closeContact}>
									{i18n._("Cancel")}
								</Button>
								<Button
									type="submit"
									loading={isSubmitting}
									className={styles.modalSubmitBtn}
									leftSection={<Send size={16} />}
								>
									{i18n._("Send Message")}
								</Button>
							</Group>
						</Stack>
					</form>
				)}
			</Modal>
		</Box>
	);
}
