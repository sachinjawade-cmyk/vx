import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";

const leniaSans = localFont({
  src: [
    {
      path: "./fonts/LeniaSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/LeniaSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/LeniaSans-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lenia-sans",
});

export const metadata: Metadata = {
  title: "Creative Developer | Portfolio",
  description: "A high-end scrollytelling personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={clsx(leniaSans.className, leniaSans.variable, "bg-[#121212] text-white selection:bg-white selection:text-black")}>
        {children}
      </body>
    </html>
  );
}
