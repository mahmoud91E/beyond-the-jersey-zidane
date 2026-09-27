import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';
export const metadata: Metadata = { title: 'Beyond the Jersey — Zidane: France 1998 → 2006', description: 'An independent sports-marketing concept by Mahmoud. A carefully edited football archive with the pacing of a documentary.', icons: {icon:'/favicon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
