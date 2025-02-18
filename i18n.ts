import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import enMessages from "./app/messages/en.json";
import arMessages from "./app/messages/ar.json";

export const locales = ["en", "ar"] as const;

const messagesMap: Record<(typeof locales)[number], typeof enMessages> = {
  en: enMessages,
  ar: arMessages,
};

// Ensure locale is typed as 'en' | 'ar'
export default getRequestConfig(async ({ locale }: { locale: "en" | "ar" }) => {
  if (!locales.includes(locale)) notFound();

  return {
    locale, // Ensure locale is returned
    messages: messagesMap[locale],
  };
});
