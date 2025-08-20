import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function OpeningHours({ openHours }) {
  if (!openHours) return null;

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const today = new Date().getDay();
  const todayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][today];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Opening Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {days.map((day) => {
            const isToday = day.key === todayKey;
            const hours = openHours[day.key] || 'Closed';
            
            return (
              <div
                key={day.key}
                className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                  isToday ? 'bg-blue-50 border border-blue-200' : ''
                }`}
              >
                <span className={`font-medium ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                  {day.label}
                  {isToday && ' (Today)'}
                </span>
                <span className={`text-sm ${
                  hours === 'Closed' 
                    ? 'text-red-600' 
                    : isToday 
                      ? 'text-blue-700 font-medium' 
                      : 'text-gray-600'
                }`}>
                  {hours}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
