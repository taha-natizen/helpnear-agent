import React, { useState, useEffect } from "react";
import { Provider } from "@/entities/Provider";
import { Request } from "@/entities/Request";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, Phone, MessageCircle, Navigation, Bot,
  MapPin, Clock, Shield, Star, Globe, Euro, Users,
  Copy, Share2, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import AIAgentModal from "../components/detail/AIAgentModal";
import OpeningHours from "../components/detail/OpeningHours";

export default function ProviderDetail() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAgent, setShowAIAgent] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const providerId = urlParams.get('id');
    
    if (providerId) {
      loadProvider(providerId);
    }
  }, []);

  const loadProvider = async (id) => {
    setIsLoading(true);
    try {
      const data = await Provider.list();
      const foundProvider = data.find(p => p.id === id);
      if (foundProvider) {
        setProvider(foundProvider);
      }
    } catch (error) {
      console.error('Error loading provider:', error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-900">Provider not found</h2>
        <Button onClick={() => navigate(createPageUrl('Home'))} className="mt-4">
          Back to Search
        </Button>
      </div>
    );
  }

  const distance = (Math.random() * 3 + 0.1).toFixed(1);
  const isOpenNow = Math.random() > 0.3;

  const getCategoryColor = (category) => {
    const colors = {
      medical: 'bg-red-100 text-red-700 border-red-200',
      social_support: 'bg-blue-100 text-blue-700 border-blue-200',
      repair: 'bg-orange-100 text-orange-700 border-orange-200',
      volunteers: 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('Home'))}
            className="mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{distance} km away</span>
              </div>
              {provider.trust_score && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{provider.trust_score.toFixed(1)}/10</span>
                </div>
              )}
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
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

              {provider.verified && (
                <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = `tel:${provider.phone}`}
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => window.location.href = `sms:${provider.phone}`}
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.address)}`;
                  window.open(url, '_blank');
                }}
              >
                <Navigation className="w-4 h-4" />
                Route
              </Button>
              <Button
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAIAgent(true)}
              >
                <Bot className="w-4 h-4" />
                AI Agent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <OpeningHours openHours={provider.open_hours} />

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {provider.languages && provider.languages.length > 0 && (
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Languages</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {provider.languages.map(lang => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {provider.budget && (
              <div className="flex items-start gap-3">
                <Euro className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Budget</p>
                  <Badge variant="outline" className="mt-1">
                    {provider.budget}
                  </Badge>
                </div>
              </div>
            )}

            {provider.accepts_walkins && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Walk-ins</p>
                  <p className="text-sm text-gray-600">Accepts walk-in appointments</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Phone</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{provider.phone}</span>
                <Button size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {provider.email && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{provider.email}</span>
                  <Button size="sm" variant="ghost">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between">
              <span className="text-gray-600">Address</span>
              <div className="flex items-center gap-2 max-w-48">
                <span className="font-medium text-right text-sm">{provider.address}</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {provider.description && (
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{provider.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {provider.tags && provider.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {provider.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Agent Modal */}
      <AIAgentModal
        isOpen={showAIAgent}
        onClose={() => setShowAIAgent(false)}
        provider={provider}
      />
    </div>
  );
}
