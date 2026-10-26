import { useLingui } from "@lingui/react";
import {
	Box,
	Group,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FOOTER_SECTIONS } from "#/constants/landing";
import { LocalizedLink } from "#/libs/i18n";
import styles from "./Footer.module.css";

export function Footer() {
	const { i18n } = useLingui();
	const location = useLocation();
	const { colorScheme } = useMantineColorScheme();
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);

	const isDark = colorScheme === "dark";
	const isHomePage = /^\/(?:[a-z]{2}\/?)?$/.test(location.pathname);

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsSubscribed(true);
			setEmail("");
			setTimeout(() => {
				setIsSubscribed(false);
			}, 4000);
		}
	};

	return (
		<Box component="footer" className={styles.footer}>
			<div className={styles.mainRow}>
				<Stack gap={16}>
					<img
						src={
							isDark
								? "/assets/landing/logo-dark.png"
								: "/assets/landing/logo-light.png"
						}
						alt="Nitrobase"
						className={styles.logoImg}
					/>
					<Title order={3} className={styles.brandHeadline}>
						{i18n._("Self-host Supabase & BaaS, without the complexity.")}
					</Title>
					<Text className={styles.brandDesc} maw={350}>
						{i18n._(
							"Nitrobase is the open-source self-hosted PaaS & BaaS deployer. Connect any VPS, deploy Supabase full-stack or templates in minutes, and own your infrastructure 100%.",
						)}
					</Text>

					<Group gap={12} className={styles.socialRow}>
						<a
							href="https://github.com/hoagminh/nitrobase-landing"
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
					</Group>
				</Stack>

				{FOOTER_SECTIONS.map((section) => (
					<div key={section.id} className={styles.linksCol}>
						<h4 className={styles.colTitle}>{i18n._(section.title)}</h4>
						<div className={styles.linksList}>
							{section.links.map((link) => {
								if (link.href.startsWith("/")) {
									return (
										<LocalizedLink
											key={link.id}
											to={link.href}
											className={styles.link}
										>
											{i18n._(link.label)}
										</LocalizedLink>
									);
								}

								if (link.href.startsWith("#") && link.href.length > 1) {
									if (isHomePage) {
										return (
											<a key={link.id} href={link.href} className={styles.link}>
												{i18n._(link.label)}
											</a>
										);
									}

									return (
										<LocalizedLink
											key={link.id}
											to="/"
											hash={link.href.slice(1)}
											className={styles.link}
										>
											{i18n._(link.label)}
										</LocalizedLink>
									);
								}

								return (
									<a key={link.id} href={link.href} className={styles.link}>
										{i18n._(link.label)}
									</a>
								);
							})}
						</div>
					</div>
				))}

				<div className={styles.newsletterCol}>
					<h4 className={styles.colTitle}>{i18n._("STAY UPDATED")}</h4>
					<div className={styles.newsletterTitle}>
						{i18n._("Get the latest updates")}
					</div>
					<p className={styles.newsletterDesc}>
						{i18n._(
							"Be the first to know about new features, product updates and more.",
						)}
					</p>

					{isSubscribed ? (
						<div className={styles.newsletterSuccess}>
							<CheckCircle2 size={18} className={styles.successIcon} />
							<Text size="sm" className={styles.successText}>
								{i18n._("Thank you for subscribing! Check your inbox.")}
							</Text>
						</div>
					) : (
						<form onSubmit={handleSubscribe} className={styles.newsletterForm}>
							<Mail size={16} className={styles.mailIcon} />
							<input
								id="newsletter-email"
								name="email"
								type="email"
								autoComplete="email"
								aria-label={i18n._("Enter your email")}
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
					)}
				</div>
			</div>

			<Group
				justify="space-between"
				align="center"
				className={styles.bottomRow}
			>
				<Text component="span" className={styles.copyright}>
					{i18n._("@2025 Nitrobase. All rights reserved.")}
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
