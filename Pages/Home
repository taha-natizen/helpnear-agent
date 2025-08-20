import React, { useState, useEffect } from "react";
import { Provider } from "@/entities/Provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import CategoryChips from "../components/home/CategoryChips";
import FilterPanel from "../components/home/FilterPanel";
import ProviderCard from "../components/home/ProviderCard";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    openNow: true,
    languages: [],
    budget: [],
    verified: false,
    distance: 10,
    walkInsAccepted: false
  });

  useEffect(() => {
    // Проверяем, завершен ли онбординг
    const onboardingComplete = localStorage.getItem('helpnear_onboarding_complete');
    if (!onboardingComplete) {
      navigate(createPageUrl('Onboarding'));
      return;
    }
    loadProviders();
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [providers, filters, selectedCategory, searchQuery]);

  const loadProviders = async () => {
    setIsLoading(true);
    try {
      const data = await Provider.list();
      setProviders(data);
    } catch (error) {
      console.error('Error loading providers:', error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...providers];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Open now filter
    if (filters.openNow) {
      const now = new Date();
      const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
      const currentTime = now.getHours() * 100 + now.getMinutes();

      filtered = filtered.filter(provider => {
        const todayHours = provider.open_hours?.[dayOfWeek];
        if (!todayHours || todayHours === 'Closed') return false;
        
        try {
          const [open, close] = todayHours.split('-').map(time => {
            const [hours, minutes] = time.trim().split(':').map(Number);
            return hours * 100 + minutes;
          });
          
          return currentTime >= open && currentTime <= close;
        } catch {
          return true; // Если не удается распарсить время, считаем что открыто
        }
      });
    }

    // Language filter
    if (filters.languages.length > 0) {
      filtered = filtered.filter(p => 
        filters.languages.some(lang => p.languages?.includes(lang))
      );
    }

    // Budget filter
    if (filters.budget.length > 0) {
      filtered = filtered.filter(p => filters.budget.includes(p.budget));
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(p => p.verified);
    }

    // Walk-ins filter
    if (filters.walkInsAccepted) {
      filtered = filtered.filter(p => p.accepts_walkins);
    }

    // Sort by distance (mock calculation)
    filtered.sort((a, b) => {
      const distanceA = Math.random() * filters.distance;
      const distanceB = Math.random() * filters.distance;
      return distanceA - distanceB;
    });

    setFilteredProviders(filtered);
  };

  const handleProviderClick = (provider) => {
    navigate(`${createPageUrl('ProviderDetail')}?id=${provider.id}`);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Category Chips */}
      <CategoryChips
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge 
            variant={filters.openNow ? "default" : "outline"}
            className={`px-3 py-1 ${filters.openNow ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
          >
            <Clock className="w-3 h-3 mr-1" />
            Open Now
          </Badge>
          <span className="text-sm text-gray-500">
            {filteredProviders.length} results
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isVisible={showFilters}
        filters={filters}
        onFiltersChange={setFilters}
        onClose={() => setShowFilters(false)}
      />

      {/* Results */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onClick={() => handleProviderClick(provider)}
            />
          ))
        )}
      </div>
    </div>
  );
}
