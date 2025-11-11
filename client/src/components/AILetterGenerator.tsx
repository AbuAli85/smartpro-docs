import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, Loader2, Wand2, RefreshCw, Copy, CheckCircle, 
  AlertCircle, Info, Plus, Trash2, Zap 
} from 'lucide-react';
import {
  generateLetterContent,
  generateSubjectSuggestions,
  improveLetterContent,
  translateLetterContent,
  isAIAvailable,
  generateMockContent,
  type AIGenerationRequest,
} from '@/services/aiLetterGenerator';
import type { LetterTemplate } from '@/config/letterTemplates';

interface AILetterGeneratorProps {
  template: LetterTemplate;
  language: 'en' | 'ar';
  existingValues: Record<string, string>;
  onContentGenerated: (content: string) => void;
  onSubjectGenerated?: (subject: string) => void;
}

export function AILetterGenerator({
  template,
  language,
  existingValues,
  onContentGenerated,
  onSubjectGenerated,
}: AILetterGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [context, setContext] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>(['']);
  const [tone, setTone] = useState<'formal' | 'professional' | 'friendly'>('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const aiAvailable = isAIAvailable();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setSuccess(false);

    try {
      const request: AIGenerationRequest = {
        template,
        language,
        userInputs: {
          recipientName,
          purpose,
          keyPoints: keyPoints.filter(p => p.trim().length > 0),
          context,
          tone,
        },
        existingValues,
      };

      // Use mock generation if API key is not available
      const result = aiAvailable 
        ? await generateLetterContent(request)
        : generateMockContent(request);

      if (result.success && result.content) {
        setGeneratedContent(result.content);
        onContentGenerated(result.content);
        setSuccess(true);
        
        // Show cost estimate if available
        if (result.usage) {
          console.log('AI Usage:', result.usage);
        }
      } else {
        setError(result.error || 'Failed to generate content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSubject = async () => {
    if (!purpose) return;
    
    setIsGenerating(true);
    try {
      const suggestions = await generateSubjectSuggestions(purpose, language);
      if (suggestions.length > 0 && onSubjectGenerated) {
        onSubjectGenerated(suggestions[0]);
      }
    } catch (err) {
      console.error('Failed to generate subject:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddKeyPoint = () => {
    setKeyPoints([...keyPoints, '']);
  };

  const handleUpdateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const handleRemoveKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  const canGenerate = purpose.trim().length > 0 || context.trim().length > 0;

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="border-b bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Letter Generator
            <Badge variant="secondary" className="ml-2 gap-1">
              <Zap className="w-3 h-3" />
              {aiAvailable ? 'GPT-4' : 'Demo Mode'}
            </Badge>
          </CardTitle>
          {!aiAvailable && (
            <Badge variant="outline" className="text-xs">
              <Info className="w-3 h-3 mr-1" />
              Add API key to enable
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Info Banner */}
        <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-purple-900 font-medium mb-1">
                How it works
              </p>
              <p className="text-xs text-purple-700">
                Provide basic details below, and AI will generate a professional letter body
                tailored to your needs. The content will be professionally formatted in {language === 'ar' ? 'Arabic' : 'English'}.
              </p>
            </div>
          </div>
        </div>

        {/* Recipient Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <span>Recipient Name</span>
            <span className="text-xs text-gray-500 font-normal">(Optional)</span>
          </Label>
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder={language === 'ar' ? 'السيد محمد' : 'Mr. Mohammed Al-Harthi'}
            className="border-2 focus:border-purple-500"
          />
        </div>

        {/* Purpose */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <span>Purpose / Main Topic</span>
            <span className="text-xs text-red-500">*</span>
          </Label>
          <Textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder={language === 'ar' 
              ? 'مثال: طلب قرض بنكي لتوسعة الأعمال'
              : 'e.g., Request for bank loan to expand business operations'
            }
            rows={2}
            className="border-2 focus:border-purple-500"
          />
          {onSubjectGenerated && purpose.trim() && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateSubject}
              disabled={isGenerating}
              className="gap-2"
            >
              <Wand2 className="w-3 h-3" />
              Generate Subject Line
            </Button>
          )}
        </div>

        {/* Key Points */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Key Points to Include</Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddKeyPoint}
              className="h-7 px-2 text-xs gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Point
            </Button>
          </div>
          <div className="space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => handleUpdateKeyPoint(index, e.target.value)}
                  placeholder={`Point ${index + 1}...`}
                  className="flex-1 border-2 focus:border-purple-500"
                />
                {keyPoints.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveKeyPoint(index)}
                    className="px-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs gap-2 h-7"
          >
            <Wand2 className="w-3 h-3" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="space-y-3 p-4 bg-white/50 rounded-lg border border-purple-200">
              {/* Tone */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Tone</Label>
                <Select value={tone} onValueChange={(v: any) => setTone(v)}>
                  <SelectTrigger className="border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal (Very official)</SelectItem>
                    <SelectItem value="professional">Professional (Standard)</SelectItem>
                    <SelectItem value="friendly">Friendly (Approachable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Additional Context</Label>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Any additional details or background information..."
                  rows={3}
                  className="border-2 focus:border-purple-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2 py-6"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Professional Letter
            </>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">Generation Failed</p>
              <p className="text-xs text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && generatedContent && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">Content Generated Successfully!</p>
                <p className="text-xs text-green-700 mt-1">
                  The AI-generated content has been inserted into your letter.
                </p>
              </div>
            </div>

            {/* Generated Content Preview */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold">Generated Content</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyContent}
                    className="h-7 px-2 gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="h-7 px-2 gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </Button>
                </div>
              </div>
              <div 
                className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  language === 'ar' ? 'text-right [direction:rtl]' : 'text-left'
                }`}
              >
                {generatedContent}
              </div>
            </div>
          </div>
        )}

        {/* Setup Instructions (if API not available) */}
        {!aiAvailable && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 mb-2">
                  Enable AI Generation
                </p>
                <p className="text-xs text-amber-700 mb-3">
                  To use AI-powered letter generation, add your OpenAI API key:
                </p>
                <ol className="text-xs text-amber-700 space-y-1 ml-4 list-decimal">
                  <li>Get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a></li>
                  <li>Add <code className="bg-amber-100 px-1 rounded">VITE_OPENAI_API_KEY=your_key</code> to <code className="bg-amber-100 px-1 rounded">.env</code> file</li>
                  <li>Restart the development server</li>
                </ol>
                <p className="text-xs text-amber-600 mt-3 italic">
                  Note: Currently using demo mode with sample content.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

