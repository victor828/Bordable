import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Header } from "./lib/component/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bordables",
  description: "proyect Fullstack based on #NextJS and TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
