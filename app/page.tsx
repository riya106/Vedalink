"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

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


function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
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
