import { notFound } from "next/navigation";
import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import enMessages from "./app/messages/en.json";
import arMessages from "./app/messages/ar.json";

export const locales = ["en", "ar"] as const;

const messagesMap: Record<(typeof locales)[number], typeof enMessages> = {
  en: enMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  if (!locales.includes(locale as "en" | "ar")) notFound();

  return {
    locale,
    messages: messagesMap[locale as "en" | "ar"],
  };
});
