import { Box, Group, Text } from "@mantine/core";
import { useLandingContent } from "#/libs/landing";
import styles from "./TechStackSection.module.css";

export function TechStackSection() {
	const { techPartners } = useLandingContent();

	return (
		<Box component="section" className={styles.section}>
			<Box className={styles.marqueeContainer}>
				<Box className={styles.marqueeTrack}>
					<Box className={styles.marqueeGroup}>
						{techPartners.map((partner) => (
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

					<Box className={styles.marqueeGroup} aria-hidden="true">
						{techPartners.map((partner) => (
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
		</Box>
	);
}
