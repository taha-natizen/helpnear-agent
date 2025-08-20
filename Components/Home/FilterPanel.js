import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Clock, Globe, Euro, Shield, MapPin, Users } from "lucide-react";

const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'CZ', name: 'Čeština', flag: '🇨🇿' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'SK', name: 'Slovenčina', flag: '🇸🇰' },
];

const budgetOptions = ['€', '€€', '€€€'];

export default function FilterPanel({ isVisible, filters, onFiltersChange, onClose }) {
  if (!isVisible) return null;

  const updateFilters = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleLanguage = (langCode) => {
    const newLanguages = filters.languages.includes(langCode)
      ? filters.languages.filter(l => l !== langCode)
      : [...filters.languages, langCode];
    updateFilters('languages', newLanguages);
  };

  const toggleBudget = (budget) => {
    const newBudget = filters.budget.includes(budget)
      ? filters.budget.filter(b => b !== budget)
      : [...filters.budget, budget];
    updateFilters('budget', newBudget);
  };

  const clearFilters = () => {
    onFiltersChange({
      openNow: true,
      languages: [],
      budget: [],
      verified: false,
      distance: 10,
      walkInsAccepted: false
    });
  };

  return (
    <Card className="border-blue-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span>Filters</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Open Now */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            <Label className="font-medium">Open Now</Label>
          </div>
          <Switch
            checked={filters.openNow}
            onCheckedChange={(checked) => updateFilters('openNow', checked)}
          />
        </div>

        {/* Languages */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-blue-600" />
            <Label className="font-medium">Languages</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm border transition-all ${
                  filters.languages.includes(lang.code)
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Euro className="w-4 h-4 text-green-600" />
            <Label className="font-medium">Budget</Label>
          </div>
          <div className="flex gap-2">
            {budgetOptions.map((budget) => (
              <button
                key={budget}
                onClick={() => toggleBudget(budget)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  filters.budget.includes(budget)
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* Verified */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <Label className="font-medium">Verified Only</Label>
          </div>
          <Switch
            checked={filters.verified}
            onCheckedChange={(checked) => updateFilters('verified', checked)}
          />
        </div>

        {/* Distance */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <Label className="font-medium">Distance</Label>
            </div>
            <Badge variant="outline" className="text-xs">
              {filters.distance} km
            </Badge>
          </div>
          <Slider
            value={[filters.distance]}
            onValueChange={(value) => updateFilters('distance', value[0])}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Walk-ins */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <Label className="font-medium">Walk-ins Accepted</Label>
          </div>
          <Switch
            checked={filters.walkInsAccepted}
            onCheckedChange={(checked) => updateFilters('walkInsAccepted', checked)}
          />
        </div>

        {/* Clear Filters */}
        <div className="pt-3 border-t">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
