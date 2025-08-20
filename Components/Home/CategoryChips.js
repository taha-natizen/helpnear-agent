import React from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Wrench, HandHeart } from "lucide-react";

const categories = [
  { key: "all", label: "All", icon: null },
  { key: "medical", label: "Medical", icon: Heart },
  { key: "social_support", label: "Social Support", icon: Users },
  { key: "repair", label: "Repair", icon: Wrench },
  { key: "volunteers", label: "Volunteers", icon: HandHeart },
];

export default function CategoryChips({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.key;
        const Icon = category.icon;
        
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="font-medium text-sm">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
