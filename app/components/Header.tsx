"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale(); // Get current language
  const router = useRouter();
  const t = useTranslations("Header");

  // Determine text direction
  const isRTL = locale === "ar";

  // Change `dir` attribute of the document when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  // Function to handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(`/${newLocale}`); // Redirect to selected language
  };

  return (
    <header className="bg-background py-4 h-[88px]">
      <div
        className={`mx-auto flex items-center justify-between px-4 lg:px-10 md:px-10`}
      >
        {/* Logo - Moves to the right when Arabic */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={76.5} height={56} />
          </Link>
        </div>

        {/* Menu with proper spacing */}
        <nav
          className={`hidden md:flex ${
            isRTL ? "space-x-reverse space-x-6" : "space-x-6"
          }`}
        >
          <Link
            href="/"
            className="hover:text-customGreen active:text-customGreen text-customGreen font-semibold"
          >
            {t("Home")}
          </Link>
          <Link
            href="/"
            className="hover:text-customGreen active:text-customGreen"
          >
            {t("Categories")}
          </Link>
          <Link
            href="/"
            className="hover:text-customGreen active:text-customGreen"
          >
            {t("Contact Us")}
          </Link>
          <Link
            href="/"
            className="hover:text-customGreen active:text-customGreen"
          >
            {t("About")}
          </Link>
        </nav>

        <div className={`hidden md:flex items-center`}>
          <select
            className="bg-transparent border-2 border-white py-1 px-4 rounded"
            value={locale}
            onChange={handleLanguageChange}
          >
            <option value="en">EN</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#6D5CBC"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sticky w-full md:hidden bg-customPurple py-4 z-10">
          <nav className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              className="active:text-customGreen text-customGreen font-semibold"
            >
              {t("Home")}
            </Link>
            <Link
              href="/"
              className="hover:text-customGreen active:text-customGreen"
            >
              {t("Categories")}
            </Link>
            <Link
              href="/"
              className="hover:text-customGreen active:text-customGreen"
            >
              {t("Contact Us")}
            </Link>
            <Link
              href="/"
              className="hover:text-customGreen active:text-customGreen"
            >
              {t("About")}
            </Link>
            <select
              className="bg-transparent border-2 border-white py-1 px-4 rounded mt-4"
              value={locale}
              onChange={handleLanguageChange}
            >
              <option value="en">EN</option>
              <option value="ar">العربية</option>
            </select>
          </nav>
        </div>
      )}
    </header>
  );
}
