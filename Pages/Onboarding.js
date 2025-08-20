import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Shield, Heart, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [geolocationGranted, setGeolocationGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'CZ', name: 'Čeština', flag: '🇨🇿' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  ];

  const steps = [
    {
      title: "Welcome to HelpNear",
      subtitle: "Your personal assistant for finding nearby help",
      component: WelcomeStep
    },
    {
      title: "Choose Your Language",
      subtitle: "Select your preferred language",
      component: LanguageStep
    },
    {
      title: "Enable Location",
      subtitle: "Help us find services near you",
      component: LocationStep
    },
    {
      title: "Important Disclaimer",
      subtitle: "Please read before continuing",
      component: DisclaimerStep
    }
  ];

  function WelcomeStep() {
    return (
      <div className="text-center space-y-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
          <Heart className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Find Help Nearby</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Quickly locate medical services, social support, repair shops, and volunteers in your area
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Card className="border-blue-100">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Verified Providers</p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Real-time Location</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function LanguageStep() {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Choose your preferred language for the best experience</p>
        </div>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                selectedLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-gray-900">{lang.name}</span>
              </div>
              {selectedLanguage === lang.code && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function LocationStep() {
    const requestLocation = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              localStorage.setItem('helpnear_location', JSON.stringify({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }));
              setGeolocationGranted(true);
              resolve();
            },
            (error) => {
              console.log('Location access denied');
              // Даже если отказались от геолокации, можно продолжить
              setGeolocationGranted(true);
              resolve();
            }
          );
        });
      } catch (error) {
        console.error('Location error:', error);
        setGeolocationGranted(true);
      }
      setIsLoading(false);
    };

    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <div className="space-y-2">
          <p className="text-gray-700">
            We need your location to show you the nearest help available
          </p>
          <p className="text-sm text-gray-500">
            Your location data stays private and secure
          </p>
        </div>
        {!geolocationGranted && (
          <Button 
            onClick={requestLocation}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Requesting Location...' : 'Enable Location Access'}
          </Button>
        )}
        {geolocationGranted && (
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="font-medium">Ready to continue</span>
          </div>
        )}
      </div>
    );
  }

  function DisclaimerStep() {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
        </div>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                <strong>HelpNear provides navigation and guidance only.</strong>
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                We do not provide medical advice or emergency services.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                <strong>For emergencies, always call 112 immediately.</strong>
              </p>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-gray-500 text-center">
          By continuing, you acknowledge that you understand this disclaimer
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('helpnear_onboarding_complete', 'true');
      localStorage.setItem('helpnear_language', selectedLanguage);
      navigate(createPageUrl('Home'));
    }
  };

  const handleSkip = () => {
    // Для шага с геолокацией - просто переходим на следующий шаг
    setGeolocationGranted(true);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedLanguage;
    if (currentStep === 2) return geolocationGranted;
    return true;
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-md mx-auto w-full">
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Step title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>

          {/* Step content */}
          <div className="mb-8">
            <CurrentStepComponent />
          </div>

          {/* Navigation buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            
            {currentStep === 2 && !geolocationGranted && (
              <Button
                variant="outline"
                onClick={handleSkip}
                className="w-full py-2"
              >
                Skip for now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
