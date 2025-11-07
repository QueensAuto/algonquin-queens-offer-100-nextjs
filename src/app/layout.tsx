import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Queens Auto Service — Instant Auto Repair Savings',
  description: 'Book online to get an instant savings code. The more you spend, the more you save.',
  icons: {
    icon: [
      {
        url: 'https://queensautoserviceselgin.com/wp-content/uploads/2023/02/1485941900_wheel.png',
        href: 'https://queensautoserviceselgin.com/wp-content/uploads/2023/02/1485941900_wheel.png',
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W56FDLTF');`}}/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
        <script src="https://fast.wistia.com/player.js" async></script>
        <script src="https://fast.wistia.com/embed/7759m49oox.js" async type="module"></script>
        <style dangerouslySetInnerHTML={{__html: `wistia-player[media-id='7759m49oox']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/7759m49oox/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`}}></style>
      </head>
      <body
        className={cn(
          'font-body antialiased bg-gradient-to-br from-black to-slate-950 text-gray-200 selection:bg-blue-500/20 selection:text-blue-300'
        )}
      >
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W56FDLTF"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
