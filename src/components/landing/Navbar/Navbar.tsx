import { useLingui } from "@lingui/react";
import {
	ActionIcon,
	Burger,
	Drawer,
	Menu,
	useMantineColorScheme,
} from "@mantine/core";
import { Globe, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "#/constants/landing";
import { type Locale, locales, useLocale } from "#/libs/i18n";
import styles from "./Navbar.module.css";

export function Navbar() {
	const { i18n } = useLingui();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { currentLocale, switchLocale } = useLocale();
	const [opened, setOpened] = useState(false);

	const isDark = colorScheme === "dark";

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				{/* Logo */}
				<a href="/" className={styles.logoWrapper}>
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
				<nav className={styles.navLinks}>
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
							aria-label="Toggle navigation"
						/>
					</div>
				</div>
			</div>

			{/* Mobile Drawer */}
			<Drawer
				opened={opened}
				onClose={() => setOpened(false)}
				size="xs"
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
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					{NAV_LINKS.map((link) => (
						<a
							key={link.id}
							href={link.href}
							className={styles.navLink}
							onClick={() => setOpened(false)}
							style={{ fontSize: "16px", padding: "8px 0" }}
						>
							{i18n._(link.labelKey)}
						</a>
					))}
					<div
						style={{
							marginTop: "16px",
							display: "flex",
							flexDirection: "column",
							gap: "12px",
						}}
					>
						<a
							href="/login"
							className={styles.signInBtn}
							style={{ textAlign: "center" }}
						>
							{i18n._("Sign in")}
						</a>
						<a
							href="/signup"
							className={styles.primaryBtn}
							style={{ justifyContent: "center" }}
						>
							{i18n._("Get Started")}
						</a>
					</div>
				</div>
			</Drawer>
		</header>
	);
}
