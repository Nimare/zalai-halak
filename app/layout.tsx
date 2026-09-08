import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Zalai halak – Horgászfesztivál | 2027. március 5–7.', description: 'Minden, ami horgászat! Zalai halak horgászfesztivál, 2027. március 5–7., Lábatlani Panoráma Panzió. Kiállítók, horgászboltok, előadások, bemutatók és családi programok.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="hu"><body>{children}</body></html>; }
