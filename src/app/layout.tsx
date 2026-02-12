import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts";
import "./globals.css";
import {AppBar} from "@/components/shared";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Joaquín Ordóñez | Software Developer",
    template: "%s | Joaquín Ordóñez",
  },
  description:
    "Personal portfolio of Joaquín Ordóñez, a software developer specializing in frontend development. Showcasing projects, skills, and experience in creating engaging user interfaces and web applications.",
  metadataBase: new URL("https://joaquinordonez.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.joaquinordonez.dev",
    siteName: "Joaquín Ordóñez Portfolio",
    title: "Joaquín Ordóñez | Software Developer",
    description:
      "Frontend developer specializing in React, Next.js, and modern web technologies. View my projects and experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joaquín Ordóñez | Software Developer",
    description:
      "Frontend developer specializing in React, Next.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Joaquín Ordóñez",
              jobTitle: "Software Developer",
              url: "https://www.joaquinordonez.dev",
              sameAs: [
                "https://github.com/joac001",
                "https://www.linkedin.com/in/joaquin-ord",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Frontend Development",
                "Web Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased bg-background transition-colors`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
