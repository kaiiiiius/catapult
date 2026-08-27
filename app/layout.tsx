import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "CATAPULT 宁波｜UNLEASH YOURSELF",
    description: "CATAPULT 宁波官方网站：活动、音乐鉴赏、现场相册与预订信息。",
    icons: {
      icon: "/catapult-logo.jpg",
      shortcut: "/catapult-logo.jpg",
    },
    openGraph: {
      title: "CATAPULT｜UNLEASH YOURSELF",
      description: "声音不是背景。它是你进入夜晚的方式。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1536, height: 1024, alt: "CATAPULT" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "CATAPULT｜UNLEASH YOURSELF",
      description: "声音不是背景。它是你进入夜晚的方式。",
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
