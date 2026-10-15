export interface INavLink {
	id: string;
	labelKey: string;
	href: string;
}

export interface ITechPartner {
	id: string;
	name: string;
	logoUrl: string;
}

export interface IWorkflowStep {
	step: number;
	titleKey: string;
	descKey: string;
	imageUrl: string;
	badgeKey: string;
}

export interface IFeatureHighlight {
	id: string;
	titleKey: string;
	descKey: string;
	iconName: "zap" | "shield-check" | "server" | "database" | "grid-2x2";
}

export interface ITestimonial {
	id: string;
	name: string;
	role: string;
	quoteKey: string;
	avatarUrl: string;
}

export interface IFaqItem {
	id: string;
	questionKey: string;
	answerKey: string;
}

export interface IFooterLink {
	labelKey: string;
	href: string;
}

export interface IFooterSection {
	titleKey: string;
	links: IFooterLink[];
}
