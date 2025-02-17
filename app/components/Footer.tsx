import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-customPurple h-[64px] flex justify-center items-center">
      <p className="text-white">
        {t("All Rights Reserved")}
        <span style={{ fontSize: "1.25rem", margin: "0 3px" }}>
          &copy;
        </span>
        {t("Digifly 2024")}
      </p>
    </footer>
  );
}
