import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import 'simplebar-react/dist/simplebar.min.css';

// import { EncodeSans, Inter ,Caveat} from '@/lib/myFont';
// import { useRef } from 'react';
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${params.locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }
  const isFa = params.locale === 'fa';
  return (
    <html  className={`${isFa ? 'persian': 'english'} 'cursive`}
    lang={params.locale}
    dir={ isFa ? 'rtl' : 'ltr' }
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* <link href="/global.css" rel="stylesheet"></link> */}
      </head>
      <body className='bg-dark mo:h-[auto]'>     
        <NextIntlClientProvider locale={params.locale} messages={messages}>
       
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}