import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/app/components/ui/sonner";
import "./globals.css";
import { UserProvider } from "./components/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educify Demo Task",
  description:
    "A demo page built off Educify's recommendation page, with server integration included",
  authors: [
    {
      url: "https://cyprianobi.vercel.app/",
      name: "Cyprian Obi",
    },
  ],
  creator: "Cyprian Obi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
