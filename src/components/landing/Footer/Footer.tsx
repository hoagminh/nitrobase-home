import { useLingui } from "@lingui/react";
import { Box, Group, Text, Title, useMantineColorScheme } from "@mantine/core";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FOOTER_SECTIONS } from "#/constants/landing";
import styles from "./Footer.module.css";

export function Footer() {
	const { i18n } = useLingui();
	const { colorScheme } = useMantineColorScheme();
	const [email, setEmail] = useState("");

	const isDark = colorScheme === "dark";

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			alert(i18n._("Thank you for subscribing!"));
			setEmail("");
		}
	};

	return (
		<Box component="footer" className={styles.footer}>
			<div className={styles.mainRow}>
				{/* Col 1: Brand Info */}
				<div className={styles.brandCol}>
					<img
						src={
							isDark
								? "/assets/landing/logo-dark.png"
								: "/assets/landing/logo-light.png"
						}
						alt="SaaS Base"
						className={styles.logoImg}
					/>
					<Title order={3} className={styles.brandHeadline}>
						{i18n._("Self-host Supabase, without\nthe complexity.")}
					</Title>
					<Text className={styles.brandDesc}>
						{i18n._(
							"SaaS Base helps you deploy and manage your own\nSupabase infrastructure on VPS - automatically,\nsecurely, and without the DevOps headache.",
						)}
					</Text>

					{/* 4 Social boxes */}
					<div className={styles.socialRow}>
						{/* GitHub */}
						<a
							href="https://github.com"
							target="_blank"
							rel="noreferrer"
							className={styles.socialBox}
							aria-label="GitHub"
						>
							<span className={styles.srOnly}>GitHub</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
						</a>

						{/* Twitter / X */}
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noreferrer"
							className={styles.socialBox}
							aria-label="Twitter"
						>
							<span className={styles.srOnly}>Twitter</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
								<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
							</svg>
						</a>

						{/* LinkedIn */}
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noreferrer"
							className={styles.socialBox}
							aria-label="LinkedIn"
						>
							<span className={styles.srOnly}>LinkedIn</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect x="2" y="9" width="4" height="12" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>

						{/* Discord / Community */}
						<a
							href="https://discord.com"
							target="_blank"
							rel="noreferrer"
							className={styles.socialBox}
							aria-label="Discord"
						>
							<span className={styles.srOnly}>Discord</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M18 6h0a14.5 14.5 0 0 0-4-1.5 9.6 9.6 0 0 0-.4 1.5 13.8 13.8 0 0 0-3.2 0 9.6 9.6 0 0 0-.4-1.5 14.5 14.5 0 0 0-4 1.5C3.5 11 3.5 16 5 18a14.5 14.5 0 0 0 4.5 2.5 11 11 0 0 0 1-1.5 9 9 0 0 1-2.5-1.2c.2-.2.4-.3.6-.5a10 10 0 0 0 8 0c.2.2.4.3.6.5a9 9 0 0 1-2.5 1.2 11 11 0 0 0 1 1.5 14.5 14.5 0 0 0 4.5-2.5c1.5-2 1.5-7-1-12z" />
								<circle cx="8.5" cy="12" r="1.5" />
								<circle cx="15.5" cy="12" r="1.5" />
							</svg>
						</a>
					</div>
				</div>

				{/* Col 2 & 3: Link groups */}
				{FOOTER_SECTIONS.map((section) => (
					<div key={section.titleKey} className={styles.linksCol}>
						<h4 className={styles.colTitle}>{i18n._(section.titleKey)}</h4>
						<div className={styles.linksList}>
							{section.links.map((link) => (
								<a key={link.labelKey} href={link.href} className={styles.link}>
									{i18n._(link.labelKey)}
								</a>
							))}
						</div>
					</div>
				))}

				{/* Col 4: Stay Updated Newsletter */}
				<div className={styles.newsletterCol}>
					<h4 className={styles.colTitle}>{i18n._("STAY UPDATED")}</h4>
					<div className={styles.newsletterTitle}>
						{i18n._("Get the latest updates")}
					</div>
					<p className={styles.newsletterDesc}>
						{i18n._(
							"Be the first to know about new features,\nproduct updates and more.",
						)}
					</p>

					<form onSubmit={handleSubscribe} className={styles.newsletterForm}>
						<Mail size={16} className={styles.mailIcon} />
						<input
							type="email"
							placeholder={i18n._("Enter your email")}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={styles.emailInput}
							required
						/>
						<button
							type="submit"
							className={styles.arrowBtn}
							aria-label={i18n._("Subscribe")}
						>
							<ArrowRight size={16} />
						</button>
					</form>
				</div>
			</div>

			{/* Bottom Bar */}
			<Group
				justify="space-between"
				align="center"
				className={styles.bottomRow}
			>
				<Text component="span" className={styles.copyright}>
					{i18n._("@2025 SaaS Base. All rights reserved.")}
				</Text>
				<Group gap={8} align="center" className={styles.secureBadge}>
					<ShieldCheck size={16} />
					<Text component="span">
						{i18n._("Secure infrastructure. Your data. Your control.")}
					</Text>
				</Group>
			</Group>
		</Box>
	);
}
