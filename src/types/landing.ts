import type { MessageDescriptor } from "@lingui/core";

export interface INavLink {
	id: string;
	label: MessageDescriptor;
	href: string;
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
