import { useLingui } from "@lingui/react";
import {
	ActionIcon,
	Alert,
	Anchor,
	Button,
	Checkbox,
	Menu,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
	ArrowLeft,
	ArrowRight,
	CheckCircle2,
	Globe,
	Lock,
	Mail,
	Moon,
	Sun,
} from "lucide-react";
import { useState } from "react";
import { type Locale, LocalizedLink, locales, useLocale } from "#/libs/i18n";
import { DatabaseCanvasBackground } from "../DatabaseCanvasBackground/DatabaseCanvasBackground";
import styles from "./LoginForm.module.css";

export function LoginForm() {
	const { i18n } = useLingui();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { currentLocale, switchLocale } = useLocale();
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const isDark = colorScheme === "dark";

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : i18n._("Invalid email address"),
			password: (value) =>
				value.length >= 6
					? null
					: i18n._("Password must be at least 6 characters"),
		},
	});

	const handleSubmit = (_values: typeof form.values) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
		}, 1200);
	};

	return (
		<div className={styles.pageContainer}>
			<header className={styles.topBar}>
				<LocalizedLink
					to="/"
					className={styles.backLink}
					aria-label={i18n._("Back to home")}
				>
					<ArrowLeft size={16} />
					<span className={styles.backLinkText}>{i18n._("Back to home")}</span>
				</LocalizedLink>

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
						className={styles.logoImg}
					/>
				</LocalizedLink>

				<div className={styles.actions}>
					<Menu shadow="md" width={140} position="bottom-end">
						<Menu.Target>
							<ActionIcon
								variant="default"
								size="md"
								radius="md"
								aria-label={i18n._("Switch language")}
							>
								<Globe size={16} />
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
						size="md"
						radius="md"
						onClick={toggleColorScheme}
						aria-label={i18n._("Toggle theme")}
					>
						{isDark ? <Sun size={16} /> : <Moon size={16} />}
					</ActionIcon>
				</div>
			</header>

			<main className={styles.mainContent}>
				<DatabaseCanvasBackground isDark={isDark} />

				<div className={styles.formWrapper}>
					<Paper className={styles.authCard}>
						<div className={styles.headerGroup}>
							<Title order={1} className={styles.title}>
								{i18n._("Welcome back")}
							</Title>
							<Text className={styles.subtitle}>
								{i18n._("Sign in to your account to continue")}
							</Text>
						</div>

						<div className={styles.socialGrid}>
							<a href="/api/auth?provider=github" className={styles.socialBtn}>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									/>
								</svg>
								<span>GitHub</span>
							</a>

							<button
								type="button"
								className={styles.socialBtn}
								onClick={() => alert("Google OAuth integration")}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									/>
								</svg>
								<span>Google</span>
							</button>
						</div>

						<div className={styles.divider}>
							<span>{i18n._("Or continue with email")}</span>
						</div>

						{submitted && (
							<Alert
								color="green"
								icon={<CheckCircle2 size={16} />}
								title={i18n._("Success")}
								radius="md"
								mb="md"
							>
								{i18n._("Signed in successfully! Redirecting...")}
							</Alert>
						)}

						<form
							onSubmit={form.onSubmit(handleSubmit)}
							className={styles.formStack}
						>
							<TextInput
								label={i18n._("Email address")}
								placeholder="name@company.com"
								leftSection={<Mail size={16} />}
								radius="md"
								size="md"
								key={form.key("email")}
								{...form.getInputProps("email")}
							/>

							<div>
								<div className={styles.passwordHeader}>
									<Text size="sm" fw={500}>
										{i18n._("Password")}
									</Text>
									<Anchor
										href="#"
										className={styles.forgotLink}
										onClick={(e) => {
											e.preventDefault();
											alert(
												i18n._(
													"Password reset link will be sent to your email.",
												),
											);
										}}
									>
										{i18n._("Forgot password?")}
									</Anchor>
								</div>
								<PasswordInput
									placeholder="••••••••"
									leftSection={<Lock size={16} />}
									radius="md"
									size="md"
									key={form.key("password")}
									{...form.getInputProps("password")}
								/>
							</div>

							<Checkbox
								label={i18n._("Remember me for 30 days")}
								size="sm"
								radius="xs"
								key={form.key("rememberMe")}
								{...form.getInputProps("rememberMe", { type: "checkbox" })}
							/>

							<Button
								type="submit"
								className={styles.submitBtn}
								loading={loading}
								rightSection={!loading && <ArrowRight size={16} />}
							>
								{loading ? i18n._("Signing in…") : i18n._("Sign in")}
							</Button>
						</form>

						<div className={styles.footerRow}>
							<span>{i18n._("Don't have an account?")}</span>
							<LocalizedLink to="/signup" className={styles.footerLink}>
								{i18n._("Sign up")}
							</LocalizedLink>
						</div>
					</Paper>
				</div>
			</main>
		</div>
	);
}
