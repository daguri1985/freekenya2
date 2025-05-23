import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import  ClientLayout from '@/components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers> {/* <-- Wrap everything inside Providers */}
      <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
        </Providers>
      </body>
    </html>
  );
}
