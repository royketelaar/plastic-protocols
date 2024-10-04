import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import Navigation from "./components/Navigation";
import { fetchNavigationEntries } from "./lib/contentful";
import { GlobalProvider } from "./lib/GlobalContext";
import SideBar from "./components/SideBar";
import Image from "next/image";

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
        <GlobalProvider>
          <Navigation pages={menuItems} />
          <div className="flex w-full">
            <SideBar pages={menuItems} />
            <main className="text-sky-50 max-w-4xl mx-auto px-8 xl:max-w-4xl xl:mx-0">
              {children}
            </main>
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
