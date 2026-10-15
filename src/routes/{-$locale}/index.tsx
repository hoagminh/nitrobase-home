import { createFileRoute } from "@tanstack/react-router";
import { CtaBannerSection } from "#/components/landing/CtaBannerSection/CtaBannerSection";
import { FaqSection } from "#/components/landing/FaqSection/FaqSection";
import { FeaturesSection } from "#/components/landing/FeaturesSection/FeaturesSection";
import { Footer } from "#/components/landing/Footer/Footer";
import { HeroSection } from "#/components/landing/HeroSection/HeroSection";
import { HowItWorksSection } from "#/components/landing/HowItWorksSection/HowItWorksSection";
import { Navbar } from "#/components/landing/Navbar/Navbar";
import { TechStackSection } from "#/components/landing/TechStackSection/TechStackSection";
import { TestimonialsSection } from "#/components/landing/TestimonialsSection/TestimonialsSection";

export const Route = createFileRoute("/{-$locale}/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<main
			style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Navbar />
			<HeroSection />
			<TechStackSection />
			<HowItWorksSection />
			<FeaturesSection />
			<TestimonialsSection />
			<FaqSection />
			<CtaBannerSection />
			<Footer />
		</main>
	);
}
