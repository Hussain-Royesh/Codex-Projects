import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Afghanistan Futsal National Team",
  description: "Premium national team website for Afghanistan futsal supporters.",
  icons: {
    icon: "/images/trophy-placeholder.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="site-bg">
        <PreferencesProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </PreferencesProvider>
      </body>
    </html>
  );
}
