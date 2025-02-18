import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import { getMessages } from "next-intl/server";

// Use AppProps type to correctly type the children prop
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { StoreProvider } from "../store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page For Digi Fly Agency",
  keywords: ["Next.js", "React", "Next-Intl", "TypeScript"],
  openGraph: {
    title: "My Awesome App",
    description: "Digi Fly Agency Application",
    url: "https://be-group-fawn.vercel.app/en",
    type: "website",
    images: [
      {
        url: "../../public/images/image.png",
        width: 1200,
        height: 630,
        alt: "Preview Image for My Awesome App",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();
  return (
    <StoreProvider>
      <NextIntlClientProvider messages={messages}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
