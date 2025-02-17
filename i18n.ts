import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import enMessages from "./app/messages/en.json";
import arMessages from "./app/messages/ar.json";

export const locales = ["en", "ar"] as const;

const messagesMap: Record<(typeof locales)[number], typeof enMessages> = {
  en: enMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale ?? "")) notFound();

  return {
    messages: messagesMap[locale as keyof typeof messagesMap],
  };
});
