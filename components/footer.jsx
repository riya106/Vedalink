'use client';

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n"

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="px-24 border-t">
      <div className="container py-8 grid gap-4 sm:grid-cols-2 items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} VedaLink • Blockchain transparency for
          agriculture
        </p>
        <div className="flex sm:justify-end gap-4 text-sm">
          <Link href="/learn" className="hover:text-primary">
            {t("nav.learn")}
          </Link>
          <Link href="/producers" className="hover:text-primary">
            {t("nav.producers")}
          </Link>
          <Link href="/dashboard" className="hover:text-primary">
            {t("nav.dashboard")}
          </Link>
          <Link href="/about" className="hover:text-primary">
            {t("nav.about")}
          </Link>
          <Link href="/login" className="hover:text-primary">
            {t("nav.login")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
