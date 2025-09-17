import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Badge } from "@/components/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";

const farmers = [
  {
    id: 1,
    name: "Raj Kumar",
    location: "Kurnool, Andhra Pradesh",
    crops: ["Rice", "Wheat", "Cotton"],
    batches: 5,
    rating: 4.8,
    verified: true,
    distance: "12 km"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Guntur, Andhra Pradesh",
    crops: ["Tomato", "Onion", "Chilli"],
    batches: 3,
    rating: 4.9,
    verified: true,
    distance: "8 km"
  },
  {
    id: 3,
    name: "Mohan Singh",
    location: "Warangal, Telangana",
    crops: ["Maize", "Soybean"],
    batches: 7,
    rating: 4.7,
    verified: true,
    distance: "25 km"
  }
];

export const FarmerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cropFilter, setCropFilter] = useState("");

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop =
      cropFilter === "all" ||
      !cropFilter ||
      farmer.crops.some(crop =>
        crop.toLowerCase().includes(cropFilter.toLowerCase())
      );
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farmers by name, location, or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="tomato">Tomato</SelectItem>
              <SelectItem value="onion">Onion</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Farmer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFarmers.map((farmer) => (
          <Card
            key={farmer.id}
            className="hover:shadow-md transition-all duration-200 cursor-pointer border border-border/50 hover:border-primary/30"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{farmer.name}</h3>
                      {farmer.verified && (
                        <Badge className="bg-green-100 text-green-600 text-xs px-2 py-0.5">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{farmer.location}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm font-medium text-yellow-600 flex items-center gap-1">
                      <span>★</span>
                      <span>{farmer.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{farmer.distance}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Available Crops:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {farmer.crops.slice(0, 3).map((crop) => (
                      <Badge
                        key={crop}
                        variant="outline"
                        className="text-xs px-2 py-0.5 border-primary/20 text-primary"
                      >
                        {crop}
                      </Badge>
                    ))}
                    {farmer.crops.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 border-muted text-muted-foreground"
                      >
                        +{farmer.crops.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {farmer.batches} batches available
                  </span>
                  <Button size="sm" className="h-7 px-3 text-xs">
                    View Batches
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No farmers found matching your criteria
          </div>
        </div>
      )}
    </div>
  );
};
