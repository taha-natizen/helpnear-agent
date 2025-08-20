import React, { useState } from "react";
import { Request } from "@/entities/Request";
import { InvokeLLM } from "@/integrations/Core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Send, Copy, Share2, Phone, Mail, 
  CheckCircle, MessageCircle, Loader2 
} from "lucide-react";

export default function AIAgentModal({ isOpen, onClose, provider }) {
  const [situation, setSituation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const generateAIResponse = async () => {
    if (!situation.trim()) return;

    setIsGenerating(true);
    try {
      const prompt = `
You are an AI assistant helping someone contact a service provider. 

Provider: ${provider.name}
Category: ${provider.category}
Languages: ${provider.languages?.join(', ') || 'Not specified'}
Budget: ${provider.budget || 'Not specified'}
User situation: ${situation}

Generate helpful content in this JSON format:
{
  "call_script": "A polite, structured call script (max 8 lines). Include greeting, purpose, key details to mention, and polite closing.",
  "message_template": "A concise message template for SMS/email (max 500 characters). Be clear and respectful.",
  "checklist": ["5-8 bullet points of steps or documents the user should prepare/bring"],
  "questions": ["3-5 clarification questions the user should ask the provider"]
}

Make the content appropriate for the provider category and user's specific situation.
`;

      const response = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            call_script: { type: "string" },
            message_template: { type: "string" },
            checklist: { type: "array", items: { type: "string" } },
            questions: { type: "array", items: { type: "string" } }
          }
        }
      });

      setAiResponse(response);

      // Save to history
      await Request.create({
        query_text: situation,
        category: provider.category,
        chosen_provider_id: provider.id,
        agent_script: response.call_script,
        message_template: response.message_template,
        checklist: response.checklist,
        questions: response.questions
      });

    } catch (error) {
      console.error('Error generating AI response:', error);
    }
    setIsGenerating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const shareContent = (content) => {
    if (navigator.share) {
      navigator.share({
        title: `HelpNear - ${provider.name}`,
        text: content
      });
    } else {
      copyToClipboard(content);
    }
  };

  const openInPhone = () => {
    window.location.href = `tel:${provider.phone}`;
  };

  const openInEmail = () => {
    if (provider.email && aiResponse) {
      const subject = encodeURIComponent(`Inquiry - ${provider.name}`);
      const body = encodeURIComponent(aiResponse.message_template);
      window.location.href = `mailto:${provider.email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Agent
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!aiResponse ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your situation briefly:
                </label>
                <Textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="e.g., I need a pharmacy that's open now for pain medication, I speak English..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={generateAIResponse}
                disabled={!situation.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Help
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Call Script */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>📞 Call Script</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(aiResponse.call_script)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={openInPhone}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-line">
                    {aiResponse.call_script}
                  </div>
                </CardContent>
              </Card>

              {/* Message Template */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>💬 Message Template</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(aiResponse.message_template)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={openInEmail}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm bg-gray-50 p-3 rounded-lg">
                    {aiResponse.message_template}
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{aiResponse.message_template.length} characters</span>
                    <Badge variant="outline" className="text-xs">
                      SMS Ready
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Checklist */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>📋 Preparation Checklist</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareContent(aiResponse.checklist.map(item => `• ${item}`).join('\n'))}
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {aiResponse.checklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>❓ Questions to Ask</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareContent(aiResponse.questions.map(q => `• ${q}`).join('\n'))}
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {aiResponse.questions.map((question, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500 font-medium min-w-[1rem]">{index + 1}.</span>
                        <span className="text-gray-700">{question}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAiResponse(null);
                    setSituation("");
                  }}
                  className="flex-1"
                >
                  New Request
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-900"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
