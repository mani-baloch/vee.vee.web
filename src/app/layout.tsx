import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F4A3E',
};

export const metadata: Metadata = {
  title: 'vee.vet | Relief Shifts Made Simple for Vets, Techs & Practices',
  description: 'The smart veterinary relief staffing platform. Connect hospitals and practices with top licensed veterinarians and veterinary technicians for seamless shift coverage.',
  keywords: [
    'veterinary relief staffing',
    'relief vet shifts',
    'vet tech shifts',
    'veterinary staffing platform',
    'hospital relief coverage',
    'vee vet',
    'veterinarian locum',
    'vet technician jobs'
  ],
  authors: [{ name: 'vee.vet' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'vee.vet | Relief Shifts Made Simple',
    description: 'One platform for practices, vets, and techs. Search shifts or post your availability with ease.',
    url: 'https://vee.vet',
    siteName: 'vee.vet',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased selection:bg-[#2D9B7C] selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
