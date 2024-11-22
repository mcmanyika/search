"use client";

import { useState } from "react";
import { SearchIcon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock database - in a real app, this would be an API call
const mockDatabase = {
  "Larry": "+1 (555) 123-4567",
  "Mr Easy": "+1 (555) 987-6543",
  "Alice Johnson": "+1 (555) 246-8135",
  "Easy Larry": "+1 (555) 246-8135",
};

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = mockDatabase[name as keyof typeof mockDatabase];
    
    if (phone) {
      setResult(phone);
      toast({
        title: "Found!",
        description: "Phone number retrieved successfully.",
      });
    } else {
      setResult(null);
      toast({
        title: "Not Found",
        description: "No phone number found for this name.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Glass Card */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 mx-auto mb-4 text-white" />
              <h1 className="text-3xl font-bold text-white mb-2">Phone Lookup</h1>
              <p className="text-white/80">Enter a name to find their phone number</p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-white text-purple-600 hover:bg-white/90"
              >
                Search
              </Button>
            </form>

            {/* Result */}
            {result && (
              <div className="mt-8 p-4 rounded-lg bg-white/20 border border-white/30">
                <p className="text-white text-center">
                  <span className="block text-sm opacity-80 mb-1">Phone Number:</span>
                  <span className="text-xl font-semibold">{result}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}