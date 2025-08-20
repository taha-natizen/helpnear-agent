import React, { useState } from "react";
import { Provider } from "@/entities/Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, MapPin } from "lucide-react";

const categories = [
  { value: "medical", label: "Medical" },
  { value: "social_support", label: "Social Support" },
  { value: "repair", label: "Repair" },
  { value: "volunteers", label: "Volunteers" },
];

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'CZ', name: 'Čeština' },
  { code: 'RU', name: 'Русский' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'SK', name: 'Slovenčina' },
];

const budgetOptions = [
  { value: "€", label: "€ (Low cost)" },
  { value: "€€", label: "€€ (Medium cost)" },
  { value: "€€€", label: "€€€ (High cost)" },
];

export default function Submit() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    languages: [],
    budget: "€€",
    accepts_walkins: false,
    open_hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    tags: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day, value) => {
    setFormData(prev => ({
      ...prev,
      open_hours: { ...prev.open_hours, [day]: value }
    }));
  };

  const toggleLanguage = (langCode) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(langCode)
        ? prev.languages.filter(l => l !== langCode)
        : [...prev.languages, langCode]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert tags string to array
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Create provider
      await Provider.create({
        ...formData,
        tags,
        verified: false,
        trust_score: 5.0,
        latitude: 50.0755 + (Math.random() - 0.5) * 0.1, // Mock Prague coordinates
        longitude: 14.4378 + (Math.random() - 0.5) * 0.1,
      });

      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          category: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          description: "",
          languages: [],
          budget: "€€",
          accepts_walkins: false,
          open_hours: {
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: "",
          },
          tags: ""
        });
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting provider:', error);
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="p-4 flex items-center justify-center min-h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Submitted Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for contributing to the HelpNear community. Your submission will be reviewed and verified.
            </p>
            <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
              Under Review
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit a Provider</h1>
        <p className="text-gray-600">Help others by adding a new service provider</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Provider Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., City Hospital, John's Repair Shop"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Full address including city and postal code"
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the services provided..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+420 XXX XXX XXX"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@provider.com"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.provider.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Languages Supported</Label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => toggleLanguage(lang.code)}
                    className={`px-3 py-2 rounded-full text-sm border transition-all ${
                      formData.languages.includes(lang.code)
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange('budget', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="walkins"
                checked={formData.accepts_walkins}
                onCheckedChange={(checked) => handleInputChange('accepts_walkins', checked)}
              />
              <Label htmlFor="walkins">Accepts walk-in appointments</Label>
            </div>

            <div>
              <Label htmlFor="tags">Services/Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="e.g., emergency care, dental, X-ray, surgery"
              />
            </div>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Opening Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.keys(formData.open_hours).map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <Label className="w-20 capitalize">{day}</Label>
                  <Input
                    value={formData.open_hours[day]}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    placeholder="e.g., 09:00-17:00 or Closed"
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.category || !formData.address || !formData.phone}
          className="w-full py-3 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Provider'}
        </Button>
      </form>
    </div>
  );
}
