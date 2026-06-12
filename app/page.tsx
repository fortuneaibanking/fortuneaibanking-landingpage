import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeatureRows from "@/components/FeatureRow";
import Security from "@/components/Security";
import EverydayLife from "@/components/EverydayLife";
import Faq from "@/components/Faq";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <FeatureRows />
        <Security />
        <EverydayLife />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
