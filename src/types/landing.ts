import type { MessageDescriptor } from "@lingui/core";

export interface INavLink {
	id: string;
	label: MessageDescriptor;
	href: string;
}

export interface ITechPartner {
	id: string;
	name: string;
	logoUrl: string;
}

export interface IWorkflowStep {
	step: number;
	badgeKey: string;
	title: MessageDescriptor;
	desc: MessageDescriptor;
	imageUrl: string;
}

export interface IBenefitItem {
	id: string;
	iconName:
		| "zap"
		| "database"
		| "grid-2x2"
		| "shield-check"
		| "server"
		| "refresh-cw";
	title: MessageDescriptor;
	desc: MessageDescriptor;
	action: MessageDescriptor;
}

export interface ITestimonial {
	id: string;
	name: string;
	role: MessageDescriptor;
	quote: MessageDescriptor;
	avatarUrl: string;
}

export interface IFaqItem {
	id: string;
	question: MessageDescriptor;
	answer: MessageDescriptor;
}

export interface IFooterLink {
	id: string;
	label: MessageDescriptor;
	href: string;
}

export interface IFooterSection {
	id: string;
	title: MessageDescriptor;
	links: IFooterLink[];
}
