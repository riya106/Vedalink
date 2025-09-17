"use client";

import { useState } from "react";
import { FarmerSearch } from "@/components/distributor/FarmerSearch";
import { BatchTabs } from "@/components/distributor/BatchTabs";
import { DistributorNav, SalesSection, OrdersSection, HelpSection } from "@/components/distributor/DistributorNav";

type Section = "dashboard" | "sales" | "orders" | "help";

const Distributor = () => {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard");

  const renderContent = () => {
    switch (currentSection) {
      case "sales":
        return <SalesSection />;
      case "orders":
        return <OrdersSection />;
      case "help":
        return <HelpSection />;
      default:
        return (
          <div className="space-y-8">
            <FarmerSearch />
            <BatchTabs />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">VedaLink Distributor</h1>
          <p className="text-muted-foreground">Connect directly with verified farmers and manage your orders</p>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto p-4">
        <DistributorNav 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Distributor;