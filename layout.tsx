import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local Info Display',
  description: 'Benign local application that displays real-time session info locally.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen font-mono" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

