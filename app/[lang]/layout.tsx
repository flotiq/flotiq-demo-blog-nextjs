import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { ReactNode } from 'react';
import Navbar from '@/app/_components/Navbar/Navbar';
import Footer from '@/app/_components/Footer/Footer';
import { DraftModeInfo } from '../_components/DraftModeInfo/DraftModeInfo';
import NextTopLoader from 'nextjs-toploader';
import { LivePreviewStatus } from '@flotiq/nextjs-live-preview/client';
import { livePreview } from '@flotiq/nextjs-live-preview/server';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Demo blog with Flotiq and Next.js',
  description: 'Next.js demo for blog with Flotiq source',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pl' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { isEnabled } = await draftMode();
  const { isEnabled: isLivePreviewEnabled } = await livePreview();
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body>
        {isLivePreviewEnabled ? (
          <LivePreviewStatus editorKey={process.env.FLOTIQ_EDITOR_KEY || ''} />
        ) : null}
        <Navbar lang={lang} />
        <NextTopLoader
          color="#0083FC"
          height={4}
          shadow=""
          template='<div class="bar shadow-[0_3px_5px_#015bd7a1,0_0_0px_#015bd78f]" role="bar">'
          zIndex={100}
        />
        {isEnabled ? (
          <DraftModeInfo editorKey={process.env.FLOTIQ_EDITOR_KEY || ''} />
        ) : null}

        <main className="max-w-7xl mx-auto px-4 md:px-8">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
