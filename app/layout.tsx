import type { Metadata } from "next";
import { Josefin_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/GlobalBackground";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Hoornain Khan — Welcome",
  description:
    "Step into the world of Hoornain Khan — an applied AI FullStack engineer crafting immersive digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${ubuntu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalBackground />
        <main className="relative flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}