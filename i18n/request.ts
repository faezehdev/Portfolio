import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing'; // مسیر رو بسته به مکان فایل تنظیم کن

export default getRequestConfig(async ({requestLocale}) => {
  // دریافت locale درخواست‌شده
  const requested = await requestLocale;

  // بررسی اینکه آیا locale معتبر هست یا نه
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // برگردوندن تنظیمات نهایی شامل پیام‌های متنی
  return {
    locale,
   messages: (await import(`@/messages/${locale}.json`)).default
    // messages: (await import(`@/messages/${locale}.json`)).default
    // messages: (await import(`../../messages/${locale}.json`)).default
  };
});
