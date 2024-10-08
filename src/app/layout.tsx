import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainContextProvider } from "./context/ContextWrapper";
import "./global.css"
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
      <body className={`${inter.className}`}>
        <MainContextProvider>
            {children}
        </MainContextProvider>
      </body>
    </html>
  );
}