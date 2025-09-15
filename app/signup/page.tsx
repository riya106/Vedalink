"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "../../lib/i18n";

export default function Login() {
  const navigate = useRouter();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError(t("login.error"));
      return;
    }
    setLoading(true);
    // Simulate auth request
    setTimeout(() => {
      localStorage.setItem("agri_auth_token", "demo-token");
      navigate.push("/dashboard");
    }, 600);
  };

  return (
    <section className="container grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {t("login.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("login.sub")}</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("login.name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Your Name"
              required
            />
            <label htmlFor="email" className="text-sm font-medium">
              {t("login.email")}
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="farmer@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow hover:opacity-95 disabled:opacity-50"
          >
            {loading ? t("login.signing") : t("login.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
