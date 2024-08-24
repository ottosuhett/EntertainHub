import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainContextProvider } from "./context/ContextWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EntertainHub",
  description: "An interface to manage your media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MainContextProvider>
        <body className={inter.className}>{children}</body>
      </MainContextProvider>
    </html>
  );
}
