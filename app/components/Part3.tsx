import { useTranslations } from "next-intl";
export default function Part3() {
  const t = useTranslations("Part3");

  return (
    <>
      <div className="flex items-center bg-background px-6 lg:px-12 md:px-12 pt-4">
        <span className="w-[64px] h-[4px] bg-customPurple rounded-sm"></span>
        <h2 className="text-xl mx-4">{t("Part 3")}</h2>
      </div>

      <section className="bg-background">
        <div>Part3</div>
      </section>
    </>
  );
}
