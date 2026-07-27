import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Engineer Portfolio',
  description:
    'A calm, premium portfolio for a senior AI engineer, machine learning researcher, software engineer, and system architect.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
