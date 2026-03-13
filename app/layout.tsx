import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NovaFIT - Tu Plan de Nutricion Personalizado con IA",
  description:
    "Genera planes de nutricion y ejercicio personalizados con inteligencia artificial. Adaptado a tu region, tus gustos y tus metas.",
  keywords: [
    "nutricion",
    "plan alimenticio",
    "ejercicio",
    "inteligencia artificial",
    "dieta personalizada",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
