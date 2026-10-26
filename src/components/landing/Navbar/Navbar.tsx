import { useLingui } from "@lingui/react";
import {
	ActionIcon,
	Burger,
	Drawer,
	Group,
	Menu,
	SegmentedControl,
	Stack,
	Text,
	useMantineColorScheme,
} from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { Globe, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "#/constants/landing";
import { type Locale, LocalizedLink, locales, useLocale } from "#/libs/i18n";
import type { INavLink } from "#/types/landing";
import styles from "./Navbar.module.css";

function GithubIcon({ size = 18 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
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
	);
}

export function Navbar() {
	const { i18n } = useLingui();
	const location = useLocation();
	const { colorScheme, toggleColorScheme, setColorScheme } =
		useMantineColorScheme();
	const { currentLocale, switchLocale } = useLocale();
	const [opened, setOpened] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const isDark = colorScheme === "dark";
	const isHomePage = /^\/(?:[a-z]{2}\/?)?$/.test(location.pathname);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const renderNavLink = (
		link: INavLink,
		className: string,
		onClick?: () => void,
	) => {
		if (link.href.startsWith("/")) {
			return (
				<LocalizedLink
					key={link.id}
					to={link.href}
					className={className}
					onClick={onClick}
				>
					{i18n._(link.label)}
				</LocalizedLink>
			);
		}

		if (link.href.startsWith("#")) {
			if (isHomePage) {
				return (
					<a
						key={link.id}
						href={link.href}
						className={className}
						onClick={onClick}
					>
						{i18n._(link.label)}
					</a>
				);
			}

			return (
				<LocalizedLink
					key={link.id}
					to="/"
					hash={link.href.slice(1)}
					className={className}
					onClick={onClick}
				>
					{i18n._(link.label)}
				</LocalizedLink>
			);
		}

		return (
			<a key={link.id} href={link.href} className={className} onClick={onClick}>
				{i18n._(link.label)}
			</a>
		);
	};

	return (
		<header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
			<div className={styles.container}>
				<LocalizedLink
					to="/"
					className={styles.logoWrapper}
					aria-label="SaaS Base Home"
				>
					<img
						src={
							isDark
								? "/assets/landing/logo-dark.png"
								: "/assets/landing/logo-light.png"
						}
						alt="SaaS Base Logo"
						className={styles.logoImage}
					/>
				</LocalizedLink>

				<nav className={styles.navLinks} aria-label="Main Navigation">
					{NAV_LINKS.map((link) => renderNavLink(link, styles.navLink))}
				</nav>

				<div className={styles.actions}>
					<div className={styles.desktopActions}>
						<Menu shadow="md" width={140} position="bottom-end">
							<Menu.Target>
								<ActionIcon
									variant="default"
									size="lg"
									radius="md"
									aria-label={i18n._("Switch language")}
								>
									<Globe size={18} />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								{locales.map((loc) => (
									<Menu.Item
										key={loc.code}
										onClick={() => switchLocale(loc.code as Locale)}
										fw={currentLocale === loc.code ? 700 : 400}
									>
										{loc.nativeName}
									</Menu.Item>
								))}
							</Menu.Dropdown>
						</Menu>

						<ActionIcon
							variant="default"
							size="lg"
							radius="md"
							onClick={toggleColorScheme}
							aria-label={i18n._("Toggle theme")}
						>
							{isDark ? <Sun size={18} /> : <Moon size={18} />}
						</ActionIcon>

						<ActionIcon
							component="a"
							href="https://github.com/hoagminh/nitrobase-landing"
							target="_blank"
							rel="noreferrer"
							variant="default"
							size="lg"
							radius="md"
							aria-label={i18n._("GitHub")}
						>
							<GithubIcon size={18} />
						</ActionIcon>

						<LocalizedLink to="/signup" className={styles.primaryBtn}>
							{i18n._("Get Started")}
						</LocalizedLink>
					</div>

					<div className={styles.mobileMenu}>
						<Burger
							opened={opened}
							onClick={() => setOpened(!opened)}
							size="sm"
							aria-label={i18n._("Toggle navigation")}
						/>
					</div>
				</div>
			</div>

			<Drawer
				opened={opened}
				position="right"
				offset={10}
				radius="md"
				onClose={() => setOpened(false)}
				size="sm"
				title={
					<img
						src={
							isDark
								? "/assets/landing/logo-dark.png"
								: "/assets/landing/logo-light.png"
						}
						alt="SaaS Base"
						className={styles.logoImage}
					/>
				}
				padding="lg"
			>
				<div className={styles.drawerContent}>
					<nav className={styles.drawerNavLinks} aria-label="Mobile Navigation">
						{NAV_LINKS.map((link) =>
							renderNavLink(link, styles.drawerNavLink, () => setOpened(false)),
						)}
					</nav>

					<Stack gap={12} className={styles.drawerMetaControls}>
						<Group justify="space-between" w="100%">
							<Text className={styles.drawerMetaText}>
								{i18n._("Appearance")}
							</Text>
							<SegmentedControl
								value={colorScheme}
								onChange={(val) => setColorScheme(val as "dark" | "light")}
								data={[
									{ label: i18n._("Dark"), value: "dark" },
									{ label: i18n._("Light"), value: "light" },
								]}
								size="xs"
								radius="md"
							/>
						</Group>

						<Group justify="space-between" w="100%">
							<Text className={styles.drawerMetaText}>
								{i18n._("Language")}
							</Text>
							<SegmentedControl
								value={currentLocale}
								onChange={(val) => switchLocale(val as Locale)}
								data={locales.map((l) => ({
									label: l.nativeName,
									value: l.code,
								}))}
								size="xs"
								radius="md"
							/>
						</Group>
					</Stack>

					<div className={styles.drawerActions}>
						<a
							href="https://github.com/hoagminh/nitrobase-landing"
							target="_blank"
							rel="noreferrer"
							className={styles.drawerSignInBtn}
							onClick={() => setOpened(false)}
						>
							<Group gap={8} justify="center">
								<GithubIcon size={18} />
								<span>{i18n._("GitHub")}</span>
							</Group>
						</a>
						<LocalizedLink
							to="/signup"
							className={styles.drawerPrimaryBtn}
							onClick={() => setOpened(false)}
						>
							{i18n._("Get Started")}
						</LocalizedLink>
					</div>
				</div>
			</Drawer>
		</header>
	);
}
