import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { MapPin, Calendar, Package, Truck, CheckCircle, Clock, ShoppingCart } from "lucide-react";

const batches = {
  available: [
    {
      id: "BT-001",
      crop: "Organic Rice",
      farmer: "Raj Kumar",
      location: "Kurnool, AP",
      quantity: "500 kg",
      price: "₹45/kg",
      quality: "Grade A",
      harvestDate: "2024-01-15",
      certification: "Organic"
    },
    {
      id: "BT-002", 
      crop: "Red Onions",
      farmer: "Priya Sharma",
      location: "Guntur, AP",
      quantity: "1000 kg",
      price: "₹30/kg",
      quality: "Premium",
      harvestDate: "2024-01-20",
      certification: "FPO Verified"
    },
    {
      id: "BT-003",
      crop: "Cotton",
      farmer: "Mohan Singh", 
      location: "Warangal, TS",
      quantity: "200 kg",
      price: "₹85/kg",
      quality: "Grade A",
      harvestDate: "2024-01-18",
      certification: "BCI"
    }
  ],
  inProcess: [
    {
      id: "BT-004",
      crop: "Wheat",
      farmer: "Suresh Reddy",
      location: "Medak, TS",
      quantity: "750 kg",
      price: "₹25/kg",
      status: "In Transit",
      estimatedDelivery: "2024-01-25"
    }
  ],
  owned: [
    {
      id: "BT-005",
      crop: "Turmeric",
      farmer: "Lakshmi Devi",
      location: "Nizamabad, TS",
      quantity: "300 kg",
      price: "₹120/kg",
      purchaseDate: "2024-01-10",
      status: "Delivered"
    }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Available":
      return <Badge className="bg-available hover:bg-available/90 text-available-foreground">Available</Badge>;
    case "In Transit":
      return <Badge className="bg-pending hover:bg-pending/90 text-pending-foreground">In Transit</Badge>;
    case "Delivered":
      return <Badge className="bg-owned hover:bg-owned/90 text-owned-foreground">Delivered</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const BatchTabs = () => {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Batch Management</h2>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>{batches.available.length} Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>{batches.inProcess.length} In Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{batches.owned.length} Owned</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Available for Purchase
          </TabsTrigger>
          <TabsTrigger value="inProcess" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            In Process / Transit
          </TabsTrigger>
          <TabsTrigger value="owned" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Owned Batches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.available.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{batch.crop}</CardTitle>
                      <p className="text-muted-foreground text-sm">Batch ID: {batch.id}</p>
                    </div>
                    {getStatusBadge("Available")}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Farmer:</span>
                      <p className="font-medium">{batch.farmer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quality:</span>
                      <p className="font-medium">{batch.quality}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.quantity}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>Harvested: {new Date(batch.harvestDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <div className="text-lg font-bold text-primary">{batch.price}</div>
                      <Badge variant="outline" className="text-xs mt-1">{batch.certification}</Badge>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Request Purchase
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inProcess" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.inProcess.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-pending">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{batch.crop}</CardTitle>
                      <p className="text-muted-foreground text-sm">Batch ID: {batch.id}</p>
                    </div>
                    {getStatusBadge(batch.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Farmer:</span>
                      <p className="font-medium">{batch.farmer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-medium">{batch.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.quantity}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>Expected: {new Date(batch.estimatedDelivery).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Track your order status
                    </div>
                    <Button variant="outline">
                      Track Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="owned" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.owned.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-owned">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{batch.crop}</CardTitle>
                      <p className="text-muted-foreground text-sm">Batch ID: {batch.id}</p>
                    </div>
                    {getStatusBadge(batch.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Farmer:</span>
                      <p className="font-medium">{batch.farmer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-medium">{batch.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{batch.quantity}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>Purchased: {new Date(batch.purchaseDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Successfully delivered
                    </div>
                    <Button variant="outline">
                      View Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};