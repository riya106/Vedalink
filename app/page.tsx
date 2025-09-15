"use client";


import { Toaster } from "@/components/toaster"; 
// import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/sonner";
import { TooltipProvider } from "@/components/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./home/page";

import NotFound from "@/app/notFound/page"; 
import About from "./about/page";
// import Login from "./pages/Login";
import Dashboard from "@/app/dashboard/page";
import Producers from "@/app/producers/page";
import Learn from "@/app/learn/page"
import { I18nProvider, useI18n } from "@/lib/i18n"

const queryClient = new QueryClient();

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

function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky px-24 top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b dark:supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-black">V</span>
            <span className="font-extrabold tracking-tight text-lg">VedaLink</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link to="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link>
            <Link to="/learn" className="hover:text-primary transition-colors">{t("nav.learn")}</Link>
            <Link to="/producers" className="hover:text-primary transition-colors">{t("nav.producers")}</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">{t("nav.dashboard")}</Link>
            <Link to="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link>
            <Link to="/login" className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground font-medium hover:opacity-95">{t("nav.login")}</Link>
            <LangSelect />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="px-24 border-t">
        <div className="container py-8 grid gap-4 sm:grid-cols-2 items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VedaLink • Blockchain transparency for agriculture</p>
          <div className="flex sm:justify-end gap-4 text-sm">
            <Link to="/learn" className="hover:text-primary">{t("nav.learn")}</Link>
            <Link to="/producers" className="hover:text-primary">{t("nav.producers")}</Link>
            <Link to="/dashboard" className="hover:text-primary">{t("nav.dashboard")}</Link>
            <Link to="/about" className="hover:text-primary">{t("nav.about")}</Link>
            <Link to="/login" className="hover:text-primary">{t("nav.login")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <I18nProvider>
          <Layout>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/producers" element={<Producers />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {<Route path="*" element={<NotFound />} /> } 
          </Routes>
          </Layout>
        </I18nProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// createRoot(document.getElementById("root")!).render(<App />);


export default App
