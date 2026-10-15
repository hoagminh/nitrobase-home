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
import { Globe, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "#/constants/landing";
import { type Locale, locales, useLocale } from "#/libs/i18n";
import styles from "./Navbar.module.css";

export function Navbar() {
	const { i18n } = useLingui();
	const { colorScheme, toggleColorScheme, setColorScheme } =
		useMantineColorScheme();
	const { currentLocale, switchLocale } = useLocale();
	const [opened, setOpened] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const isDark = colorScheme === "dark";

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
			<div className={styles.container}>
				{/* Logo */}
				<a href="/" className={styles.logoWrapper} aria-label="SaaS Base Home">
					<img
						src={
							isDark
								? "/assets/landing/logo-dark.png"
								: "/assets/landing/logo-light.png"
						}
						alt="SaaS Base Logo"
						className={styles.logoImage}
					/>
				</a>

				{/* Desktop Navigation Links */}
				<nav className={styles.navLinks} aria-label="Main Navigation">
					{NAV_LINKS.map((link) => (
						<a key={link.id} href={link.href} className={styles.navLink}>
							{i18n._(link.labelKey)}
						</a>
					))}
				</nav>

				{/* Actions */}
				<div className={styles.actions}>
					{/* Locale Switcher */}
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

					{/* Theme Toggle */}
					<ActionIcon
						variant="default"
						size="lg"
						radius="md"
						onClick={toggleColorScheme}
						aria-label={i18n._("Toggle theme")}
					>
						{isDark ? <Sun size={18} /> : <Moon size={18} />}
					</ActionIcon>

					{/* Sign In */}
					<a href="/login" className={styles.signInBtn}>
						{i18n._("Sign in")}
					</a>

					{/* Get Started CTA */}
					<a href="/signup" className={styles.primaryBtn}>
						{i18n._("Get Started")}
					</a>

					{/* Mobile Menu Burger */}
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

			{/* Mobile Drawer */}
			<Drawer
				opened={opened}
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
						{NAV_LINKS.map((link) => (
							<a
								key={link.id}
								href={link.href}
								className={styles.drawerNavLink}
								onClick={() => setOpened(false)}
							>
								{i18n._(link.labelKey)}
							</a>
						))}
					</nav>

					{/* Theme & Language on Mobile */}
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
							href="/login"
							className={styles.signInBtn}
							style={{
								textAlign: "center",
								border: "1px solid var(--border-default)",
							}}
							onClick={() => setOpened(false)}
						>
							{i18n._("Sign in")}
						</a>
						<a
							href="/signup"
							className={styles.primaryBtn}
							style={{ textAlign: "center" }}
							onClick={() => setOpened(false)}
						>
							{i18n._("Get Started")}
						</a>
					</div>
				</div>
			</Drawer>
		</header>
	);
}
