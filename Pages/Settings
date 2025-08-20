import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, Globe, MapPin, Shield, 
  HelpCircle, ExternalLink, RefreshCw 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Settings() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('EN');
  const [offlineMode, setOfflineMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedLanguage = localStorage.getItem('helpnear_language');
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('helpnear_language', language);
    // Apply settings immediately if needed
  };

  const clearCache = () => {
    localStorage.removeItem('helpnear_onboarding_complete');
    localStorage.removeItem('helpnear_language');
    localStorage.removeItem('helpnear_location');
    navigate(createPageUrl('Onboarding'));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SettingsIcon className="w-8 h-8 text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your HelpNear experience</p>
      </div>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label>Interface Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">🇬🇧 English</SelectItem>
                <SelectItem value="CZ">🇨🇿 Čeština</SelectItem>
                <SelectItem value="RU">🇷🇺 Русский</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={saveSettings} size="sm" className="w-full">
              Save Language Setting
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">High Contrast Mode</Label>
              <p className="text-sm text-gray-500">Improves visibility for low vision</p>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Large Text</Label>
              <p className="text-sm text-gray-500">Increases text size throughout the app</p>
            </div>
            <Switch
              checked={largeText}
              onCheckedChange={setLargeText}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Location & Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Offline Mode</Label>
              <p className="text-sm text-gray-500">Use cached data when offline</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
              <Switch
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
                disabled
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={clearCache}
            className="w-full flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset App & Clear Data
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => navigate(createPageUrl('FAQ'))}
          >
            <span>FAQ & Disclaimer</span>
            <ExternalLink className="w-4 h-4" />
          </Button>

          <div className="pt-3 border-t space-y-2">
            <div className="text-center">
              <Badge variant="outline" className="mb-2">
                Version 1.0.0
              </Badge>
              <p className="text-xs text-gray-500">
                © 2025 HelpNear Agent
              </p>
              <p className="text-xs text-gray-500">
                Built for helping communities connect
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
