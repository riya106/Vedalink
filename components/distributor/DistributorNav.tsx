import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";

interface DistributorNavProps {
  currentSection: "dashboard" | "sales" | "orders" | "help";
  onSectionChange: (section: "dashboard" | "sales" | "orders" | "help") => void;
}

export const DistributorNav = ({ currentSection, onSectionChange }: DistributorNavProps) => {
  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <Button
          variant={currentSection === "dashboard" ? "default" : "ghost"}
          onClick={() => onSectionChange("dashboard")}
          className="flex-1"
        >
          Dashboard
        </Button>
        <Button
          variant={currentSection === "sales" ? "default" : "ghost"}
          onClick={() => onSectionChange("sales")}
          className="flex-1"
        >
          Sales & Analytics
        </Button>
        <Button
          variant={currentSection === "orders" ? "default" : "ghost"}
          onClick={() => onSectionChange("orders")}
          className="flex-1"
        >
          Order History
        </Button>
        <Button
          variant={currentSection === "help" ? "default" : "ghost"}
          onClick={() => onSectionChange("help")}
          className="flex-1"
        >
          Help & Support
        </Button>
      </div>
    </div>
  );
};

export const SalesSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹1,24,500</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-sm text-muted-foreground">In transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">45</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { farmer: "Raj Kumar", batch: "TX-13373445", amount: "₹25,000", date: "Dec 15", status: "Delivered" },
              { farmer: "Priya Sharma", batch: "TX-13373467", amount: "₹18,500", date: "Dec 14", status: "In Transit" },
              { farmer: "Mohan Singh", batch: "TX-13373457", amount: "₹32,000", date: "Dec 13", status: "Delivered" }
            ].map((purchase, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{purchase.farmer}</div>
                  <div className="text-sm text-muted-foreground">Batch: {purchase.batch}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{purchase.amount}</div>
                  <div className="text-sm text-muted-foreground">{purchase.date}</div>
                </div>
                <Badge variant={purchase.status === "Delivered" ? "default" : "secondary"}>
                  {purchase.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const OrdersSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "ORD-001", farmer: "Raj Kumar", crop: "Rice", quantity: "500 kg", amount: "₹25,000", date: "Dec 15, 2024", status: "Delivered" },
              { id: "ORD-002", farmer: "Priya Sharma", crop: "Tomato", quantity: "200 kg", amount: "₹18,500", date: "Dec 14, 2024", status: "In Transit" },
              { id: "ORD-003", farmer: "Mohan Singh", crop: "Maize", quantity: "800 kg", amount: "₹32,000", date: "Dec 13, 2024", status: "Delivered" },
              { id: "ORD-004", farmer: "Lakshmi Devi", crop: "Cotton", quantity: "300 kg", amount: "₹45,000", date: "Dec 12, 2024", status: "Cancelled" },
              { id: "ORD-005", farmer: "Kumar Reddy", crop: "Wheat", quantity: "600 kg", amount: "₹28,000", date: "Dec 11, 2024", status: "Delivered" }
            ].map((order, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-lg">{order.id}</div>
                    <div className="text-muted-foreground">{order.farmer}</div>
                  </div>
                  <Badge variant={
                    order.status === "Delivered" ? "default" : 
                    order.status === "In Transit" ? "secondary" : 
                    "destructive"
                  }>
                    {order.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Crop</div>
                    <div className="font-medium">{order.crop}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Quantity</div>
                    <div className="font-medium">{order.quantity}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Amount</div>
                    <div className="font-medium">{order.amount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Date</div>
                    <div className="font-medium">{order.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const HelpSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• How to search and connect with farmers</li>
              <li>• Understanding batch certifications</li>
              <li>• Order tracking and management</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Contact Support</h3>
            <div className="space-y-2 text-sm">
              <div>📞 Support Hotline: +91 98765 43210</div>
              <div>✉️ Email: distributor-support@vedalink.com</div>
              <div>💬 Live Chat: Available 9 AM - 6 PM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};