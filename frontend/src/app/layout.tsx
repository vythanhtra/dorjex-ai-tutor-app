import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DorjeX AI Tutor",
  description: "Học AI từ cơ bản đến nâng cao với trợ lý AI thông minh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
