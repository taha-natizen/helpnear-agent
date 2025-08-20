import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Phone, Shield, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FAQ() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is HelpNear Agent?",
      answer: "HelpNear Agent is a mobile app that helps you quickly find nearby medical services, social support, repair shops, and volunteers. It provides AI-powered assistance to help you contact providers effectively."
    },
    {
      question: "How accurate is the location data?",
      answer: "We rely on provider-submitted information and user contributions. While we verify providers when possible, always confirm details directly with the service provider."
    },
    {
      question: "Is the AI Agent reliable for medical advice?",
      answer: "No. The AI Agent only provides communication templates and preparation checklists. It does not provide medical advice or diagnoses. Always consult healthcare professionals for medical concerns."
    },
    {
      question: "How do I report incorrect information?",
      answer: "You can submit corrections through the 'Submit Provider' form or contact us through the app feedback system."
    },
    {
      question: "Is my location data safe?",
      answer: "Yes. Your location is only used locally on your device to calculate distances. We don't store or transmit your precise location data."
    },
    {
      question: "Can I use the app offline?",
      answer: "Limited offline functionality is planned for future updates. Currently, an internet connection is required for full functionality."
    }
  ];

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('Settings'))}
            className="mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">FAQ & Disclaimer</h1>
            <p className="text-gray-600">Important information about using HelpNear</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Emergency Notice */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Emergency Notice</h3>
                <p className="text-red-800 text-sm mb-3">
                  <strong>For life-threatening emergencies, always call 112 immediately.</strong> 
                  HelpNear is not an emergency service and should not be used in critical situations.
                </p>
                <Badge className="bg-red-200 text-red-800 border border-red-300">
                  <Phone className="w-3 h-3 mr-1" />
                  Emergency: 112
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Shield className="w-5 h-5" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-amber-800 text-sm">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                <strong>HelpNear provides navigation and guidance only.</strong> We are not a medical service, emergency response system, or professional advice platform.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Provider information is user-contributed and may not always be current or accurate. Always verify details directly with service providers.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                The AI Agent generates communication templates only. It does not provide medical, legal, or professional advice.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Use of this app is at your own risk. Always exercise proper judgment and seek appropriate professional help when needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              If you have questions not covered here, need to report an issue, or want to provide feedback, please contact us.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Send Feedback
              </Button>
              <p className="text-xs text-center text-gray-500">
                We typically respond within 24-48 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
