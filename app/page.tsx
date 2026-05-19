"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import YouTubeFeature from "@/components/YouTubeFeature";
import SpotifyFeature from "@/components/SpotifyFeature";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <YouTubeFeature />
          <SpotifyFeature />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
