import { createTheme, type MantineThemeOverride } from "@mantine/core";

export const mantineTheme: MantineThemeOverride = createTheme({
	fontFamily:
		"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	headings: {
		fontFamily:
			"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		sizes: {
			h1: { fontSize: "4rem", lineHeight: "1.125", fontWeight: "700" },
			h2: { fontSize: "2rem", lineHeight: "1.25", fontWeight: "600" },
			h3: { fontSize: "1.5rem", lineHeight: "1.33", fontWeight: "600" },
		},
	},
	defaultRadius: "md",
	radius: {
		xs: "4px",
		sm: "6px",
		md: "10px",
		lg: "14px",
		xl: "20px",
	},
	cursorType: "pointer",
	colors: {
		dark: [
			"#C9C9C9",
			"#B3B3B3",
			"#828282",
			"#616161",
			"#333333",
			"#2C2C2C",
			"#1C1C1C",
			"#161616",
			"#101010",
			"#0A0A0A",
		],
	},
});
