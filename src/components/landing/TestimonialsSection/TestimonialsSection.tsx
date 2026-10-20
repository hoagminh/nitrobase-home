import { useLingui } from "@lingui/react";
import { Carousel } from "@mantine/carousel";
import {
	Avatar,
	Box,
	Divider,
	Group,
	Rating,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "#/constants/landing";
import styles from "./TestimonialsSection.module.css";

export function TestimonialsSection() {
	const { i18n } = useLingui();

	return (
		<Box component="section" id="testimonials" className={styles.section}>
			<Group justify="space-between" align="flex-end" className={styles.header}>
				<Stack gap={16} className={styles.titleArea}>
					<Text component="span" className={styles.tag}>
						{i18n._("DEVELOPER REVIEWS")}
					</Text>
					<Title order={2} className={styles.title}>
						{i18n._("Built for teams")}
						<br />
						<span className={styles.highlightText}>
							{i18n._("who demand data sovereignty.")}
						</span>
					</Title>
					<Text className={styles.description}>
						{i18n._(
							"See why solo developers, CTOs, and fast-moving teams choose SaaSBase to run production Supabase clusters and backends on their own hardware.",
						)}
					</Text>
				</Stack>

				<Group gap={24} className={styles.statsArea}>
					<Group gap={12} wrap="nowrap">
						<Avatar.Group>
							<Avatar
								src="/assets/landing/avatar-alex.png"
								alt="Alex"
								radius="xl"
								size={32}
							/>
							<Avatar
								src="/assets/landing/avatar-sophia.png"
								alt="Sophia"
								radius="xl"
								size={32}
							/>
							<Avatar
								src="/assets/landing/avatar-daniel.png"
								alt="Daniel"
								radius="xl"
								size={32}
							/>
						</Avatar.Group>
						<Stack gap={2}>
							<Text fw={600} className={styles.trustTitle}>
								{i18n._("Trusted by 1,000+ developers")}
							</Text>
							<Text className={styles.trustSubtitle}>
								{i18n._("From indie hackers to production teams")}
							</Text>
						</Stack>
					</Group>

					<Divider
						orientation="vertical"
						h={40}
						className={styles.verticalDivider}
					/>

					<Stack gap={4}>
						<Group gap={8} align="center">
							<Rating value={5} readOnly size="xs" color="yellow" />
							<Text fw={700} className={styles.scoreText}>
								4.9/5
							</Text>
						</Group>
						<Text className={styles.ratingCaption}>
							{i18n._("Based on real community feedback.")}
						</Text>
					</Stack>
				</Group>
			</Group>

			<Carousel
				slideSize={{ base: "100%", sm: "50%", md: "33.333333%", lg: "25%" }}
				slideGap="md"
				emblaOptions={{
					align: "start",
					loop: true,
					slidesToScroll: 1,
				}}
				withIndicators
				withControls={false}
				nextControlIcon={<ChevronRight size={18} />}
				previousControlIcon={<ChevronLeft size={18} />}
				classNames={{
					root: styles.carouselRoot,
					slide: styles.carouselSlide,
					indicator: styles.carouselIndicator,
					indicators: styles.carouselIndicators,
					control: styles.carouselControl,
				}}
			>
				{TESTIMONIALS.map((item) => (
					<Carousel.Slide key={item.id}>
						<Stack justify="space-between" className={styles.card}>
							<Stack gap={16} className={styles.quoteGroup}>
								<Quote
									size={24}
									className={styles.quoteIcon}
									fill="currentColor"
								/>
								<Text className={styles.quote}>{i18n._(item.quote)}</Text>
							</Stack>

							<Group gap={12}>
								<Avatar
									src={item.avatarUrl}
									alt={item.name}
									radius="xl"
									size={40}
								/>
								<Stack gap={2}>
									<Text fw={600} className={styles.authorName}>
										{item.name}
									</Text>
									<Text size="xs" className={styles.authorRole}>
										{i18n._(item.role)}
									</Text>
								</Stack>
							</Group>
						</Stack>
					</Carousel.Slide>
				))}
			</Carousel>
		</Box>
	);
}
