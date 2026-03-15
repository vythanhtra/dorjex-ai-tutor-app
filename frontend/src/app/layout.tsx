import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: "DorjeX AI Tutor",
  description: "Học AI từ cơ bản đến nâng cao với trợ lý AI thông minh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen" style={{ backgroundColor: '#0a0a0f', color: '#f1f5f9' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
