import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, MessageCircle, Navigation,
  Clock, Shield, Users, Star
} from "lucide-react";

export default function ProviderCard({ provider, onClick }) {
  const distance = (Math.random() * 3 + 0.1).toFixed(1); // Mock distance
  const isOpenNow = Math.random() > 0.3; // Mock open status

  const getCategoryColor = (category) => {
    const colors = {
      medical: 'bg-red-100 text-red-700 border-red-200',
      social_support: 'bg-blue-100 text-blue-700 border-blue-200',
      repair: 'bg-orange-100 text-orange-700 border-orange-200',
      volunteers: 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getBudgetColor = (budget) => {
    const colors = {
      '€': 'bg-green-100 text-green-700',
      '€€': 'bg-yellow-100 text-yellow-700',
      '€€€': 'bg-red-100 text-red-700',
    };
    return colors[budget] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border border-gray-100"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
              {provider.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{distance} km away</span>
              {provider.trust_score && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{provider.trust_score.toFixed(1)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={getCategoryColor(provider.category)}>
            {provider.category.replace('_', ' ')}
          </Badge>
          
          {isOpenNow ? (
            <Badge className="bg-green-100 text-green-700 border border-green-200">
              <Clock className="w-3 h-3 mr-1" />
              Open Now
            </Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              Closed
            </Badge>
          )}

          {provider.languages && provider.languages.length > 0 && (
            <Badge variant="outline" className="text-gray-600">
              {provider.languages.slice(0, 2).join(', ')}
              {provider.languages.length > 2 && ` +${provider.languages.length - 2}`}
            </Badge>
          )}

          {provider.budget && (
            <Badge variant="outline" className={getBudgetColor(provider.budget)}>
              {provider.budget}
            </Badge>
          )}

          {provider.verified && (
            <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}

          {provider.accepts_walkins && (
            <Badge variant="outline" className="text-purple-600">
              <Users className="w-3 h-3 mr-1" />
              Walk-ins OK
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${provider.phone}`;
            }}
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `sms:${provider.phone}`;
            }}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.address)}`;
              window.open(url, '_blank');
            }}
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
