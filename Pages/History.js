import React, { useState, useEffect } from "react";
import { Request } from "@/entities/Request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Bot, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await Request.list('-created_date');
      setRequests(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
    setIsLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      medical: 'bg-red-100 text-red-700 border-red-200',
      social_support: 'bg-blue-100 text-blue-700 border-blue-200',
      repair: 'bg-orange-100 text-orange-700 border-orange-200',
      volunteers: 'bg-green-100 text-green-700 border-green-200',
      general: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {Array(3).fill(0).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HistoryIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Request History</h1>
        <p className="text-gray-600">Your previous help requests and AI assistance</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No history yet</h3>
          <p className="text-gray-400">Your help requests will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={getCategoryColor(request.category)}
                      >
                        {request.category?.replace('_', ' ') || 'General'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(request.created_date), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {request.query_text}
                    </p>
                  </div>
                  <Bot className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />
                </div>
              </CardHeader>
              
              {(request.agent_script || request.message_template || request.checklist?.length > 0) && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {request.agent_script && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">📞 Call Script</h4>
                        <p className="text-xs text-blue-800 line-clamp-3 whitespace-pre-line">
                          {request.agent_script}
                        </p>
                      </div>
                    )}
                    
                    {request.message_template && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-green-900 mb-1">💬 Message Template</h4>
                        <p className="text-xs text-green-800 line-clamp-2">
                          {request.message_template}
                        </p>
                      </div>
                    )}
                    
                    {request.checklist && request.checklist.length > 0 && (
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-amber-900 mb-1">📋 Checklist</h4>
                        <div className="text-xs text-amber-800">
                          {request.checklist.slice(0, 2).map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span>•</span>
                              <span className="line-clamp-1">{item}</span>
                            </div>
                          ))}
                          {request.checklist.length > 2 && (
                            <span className="text-amber-600">
                              +{request.checklist.length - 2} more items
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
