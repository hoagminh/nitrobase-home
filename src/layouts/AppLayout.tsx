import { useLingui } from "@lingui/react";
import {
	ActionIcon,
	Anchor,
	AppShell,
	Container,
	Group,
	Select,
	useMantineColorScheme,
} from "@mantine/core";
import { Globe, Moon, Sun } from "lucide-react";
import type { PropsWithChildren } from "react";
import { type Locale, LocalizedLink, locales, useLocale } from "#/libs/i18n";
import styles from "./AppLayout.module.css";

export function AppLayout({ children }: PropsWithChildren) {
	const { i18n } = useLingui();
	const { currentLocale, switchLocale } = useLocale();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<AppShell header={{ height: 64 }} padding="md" className={styles.shell}>
			<AppShell.Header className={styles.header}>
				<Container size="lg" h="100%">
					<Group justify="space-between" h="100%">
						<Group gap="xl">
							<LocalizedLink to="/" className={styles.logoLink}>
								<img
									src={
										isDark
											? "/assets/landing/logo-dark.png"
											: "/assets/landing/logo-light.png"
									}
									alt={i18n._("SaaS Base")}
									className={styles.logoImage}
								/>
							</LocalizedLink>

							<Group
								gap="lg"
								component="nav"
								aria-label={i18n._("Main Navigation")}
							>
								<Anchor
									component={LocalizedLink}
									to="/"
									className={styles.navLink}
								>
									{i18n._("Home")}
								</Anchor>
								<Anchor
									component={LocalizedLink}
									to="/about"
									className={styles.navLink}
								>
									{i18n._("About")}
								</Anchor>
								<Anchor
									component={LocalizedLink}
									to="/news"
									className={styles.navLink}
								>
									{i18n._("News")}
								</Anchor>
							</Group>
						</Group>

						<Group gap="xs">
							<Select
								aria-label={i18n._("Switch language")}
								leftSection={<Globe size={15} />}
								data={locales.map((locale) => ({
									value: locale.code,
									label: locale.nativeName,
								}))}
								value={currentLocale}
								onChange={(val) => {
									if (val) switchLocale(val as Locale);
								}}
								allowDeselect={false}
								size="xs"
								w={130}
							/>

							<ActionIcon
								variant="default"
								size="input-xs"
								radius="sm"
								onClick={toggleColorScheme}
								aria-label={i18n._("Toggle theme")}
							>
								{isDark ? <Sun size={15} /> : <Moon size={15} />}
							</ActionIcon>
						</Group>
					</Group>
				</Container>
			</AppShell.Header>

			<AppShell.Main className={styles.main}>
				<Container size="lg" py="xl">
					{children}
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
