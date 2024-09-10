import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import Navigation from "./components/Navigation";
import { fetchNavigationEntries } from "./lib/contentful";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plastic Protocols", // TODO: make this dynamic
  description:
    "Website for people who want to be more aware of plastic and especially micro-and nano-plastics in their daily life.", // TODO: make this dynamic
};

type MenuItem = {
  title: string;
  slug: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = (await fetchNavigationEntries()) as MenuItem[];

  return (
    <html lang="en">
      <body className="bg-sky-950">
        <Navigation pages={menuItems} />
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  );
}
