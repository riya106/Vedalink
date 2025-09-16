'use client';

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n"
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
    <header className="sticky px-4 sm:px-8 lg:px-20 top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b dark:supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-black">
            V
          </span>
          <span className="font-extrabold tracking-tight text-lg">
            VedaLink
          </span>
        </Link>
        {/* Hamburger for mobile */}
        <button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <nav className="hidden sm:flex items-center gap-4 sm:gap-6 text-sm">
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
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95"
            >
              {t("nav.login")}
            </Link>
          </SignedOut>
          <SignedIn>
            <SignOutButton
              redirectUrl="/home"
            >
              <button className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95">Sign Out</button>
            </SignOutButton>
          </SignedIn>
          <LangSelect />
        </nav>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4 pt-2 flex flex-col gap-2 text-base bg-white dark:bg-background border-b">
          <Link href="/home" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("nav.home")}
          </Link>
          <Link href="/learn" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("nav.learn")}
          </Link>
          <Link href="/producers" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("nav.producers")}
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("nav.dashboard")}
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("nav.about")}
          </Link>
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.login")}
            </Link>
          </SignedOut>
          <SignedIn>
            <SignOutButton redirectUrl="/home">
              <button className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95 w-full text-left" onClick={() => setMenuOpen(false)}>Sign Out</button>
            </SignOutButton>
          </SignedIn>
          <LangSelect />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
