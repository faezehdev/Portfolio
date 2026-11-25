import './globals.css';
import 'simplebar-react/dist/simplebar.min.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';

import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }

  const isFa = locale === 'fa';

  return (
    <html
      className={`${isFa ? 'persian' : 'english'} cursive`}
      lang={locale}
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-dark mo:h-[auto]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}