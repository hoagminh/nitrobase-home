import { useLingui } from "@lingui/react";
import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import { Mouse } from "lucide-react";
import { TECH_PARTNERS } from "#/constants/landing";
import styles from "./TechStackSection.module.css";

export function TechStackSection() {
	const { i18n } = useLingui();

	const handleScrollToExplore = () => {
		const target = document.getElementById("how-it-works");
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<Box component="section" className={styles.section}>
			{/* Infinite Marquee Logo Cloud */}
			<Box className={styles.marqueeContainer}>
				<Box className={styles.marqueeTrack}>
					{/* Group 1 */}
					<Box className={styles.marqueeGroup}>
						{TECH_PARTNERS.map((partner) => (
							<Group
								key={`group1-${partner.id}`}
								gap={10}
								className={styles.logoItem}
							>
								<img
									src={partner.logoUrl}
									alt={partner.name}
									className={styles.logoImg}
								/>
								<Text component="span" className={styles.logoName}>
									{partner.name}
								</Text>
							</Group>
						))}
					</Box>

					{/* Group 2 (Duplicate for continuous loop) */}
					<Box className={styles.marqueeGroup} aria-hidden="true">
						{TECH_PARTNERS.map((partner) => (
							<Group
								key={`group2-${partner.id}`}
								gap={10}
								className={styles.logoItem}
							>
								<img
									src={partner.logoUrl}
									alt={partner.name}
									className={styles.logoImg}
								/>
								<Text component="span" className={styles.logoName}>
									{partner.name}
								</Text>
							</Group>
						))}
					</Box>
				</Box>
			</Box>

			{/* Interactive Scroll To Explore Button */}
			<UnstyledButton
				onClick={handleScrollToExplore}
				className={styles.scrollIndicator}
				aria-label={i18n._("Scroll to explore")}
			>
				<Group justify="center" gap={6}>
					<Mouse size={14} className={styles.mouseIcon} />
					<Text component="span">{i18n._("SCROLL TO EXPLORE")}</Text>
				</Group>
			</UnstyledButton>
		</Box>
	);
}
