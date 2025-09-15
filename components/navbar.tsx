import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n"

const Navbar = () => {

  const { t } = useI18n();

  function LangSelect() {
  const { lang, setLang } = useI18n();
  return (
    <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as any)} className="h-8 rounded-md border border-border bg-background px-2 text-sm">
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="sa">संस्कृतम्</option>
    </select>
  );
}

  return (
    <header className="sticky px-24 top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b dark:supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-black">
            V
          </span>
          <span className="font-extrabold tracking-tight text-lg">
            VedaLink
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("nav.home")}
          </Link>
          <Link href="/learn" className="hover:text-primary transition-colors">
            {t("nav.learn")}
          </Link>
          <Link
            href="/producers"
            className="hover:text-primary transition-colors"
          >
            {t("nav.producers")}
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-primary transition-colors"
          >
            {t("nav.dashboard")}
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95"
          >
            {t("nav.login")}
          </Link>
          <LangSelect />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
