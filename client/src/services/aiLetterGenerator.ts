/**
 * AI LETTER GENERATOR SERVICE
 * ===========================
 * 
 * Uses OpenAI GPT API to generate professional letter content
 * based on user inputs and template context.
 * 
 * Features:
 * - Smart prompts for different letter types
 * - Bilingual generation (English & Arabic)
 * - Professional tone and formatting
 * - Context-aware content
 * - Error handling and retries
 */

import type { LetterTemplate } from '@/config/letterTemplates';

// ============================================================
// CONFIGURATION
// ============================================================

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini'; // Fast and cost-effective, or use 'gpt-4' for highest quality

// ============================================================
// TYPES
// ============================================================

export interface AIGenerationRequest {
  template: LetterTemplate;
  language: 'en' | 'ar';
  userInputs: {
    recipientName?: string;
    purpose?: string;
    keyPoints?: string[];
    context?: string;
    tone?: 'formal' | 'professional' | 'friendly';
  };
  existingValues: Record<string, string>;
}

export interface AIGenerationResult {
  success: boolean;
  content?: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// ============================================================
// PROMPT TEMPLATES
// ============================================================

/**
 * Generate a smart prompt based on letter type and context
 */
function generatePrompt(request: AIGenerationRequest): string {
  const { template, language, userInputs, existingValues } = request;
  const lang = language === 'ar' ? 'Arabic' : 'English';
  
  const basePrompt = `You are a professional business letter writer for Oman. Generate a ${lang} letter with these requirements:

LETTER TYPE: ${template.name} (${template.nameAr})
CATEGORY: ${template.category}
LANGUAGE: ${lang}
TONE: ${userInputs.tone || 'professional'}

CONTEXT:
- Company: ${existingValues.company_name || '[Company Name]'}
- Recipient: ${userInputs.recipientName || existingValues.recipient_org || '[Recipient]'}
- Purpose: ${userInputs.purpose || template.description}

${userInputs.keyPoints && userInputs.keyPoints.length > 0 ? `
KEY POINTS TO INCLUDE:
${userInputs.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}
` : ''}

${userInputs.context ? `
ADDITIONAL CONTEXT:
${userInputs.context}
` : ''}

REQUIREMENTS:
1. Write ONLY the letter body (main content paragraphs)
2. Use formal, professional ${lang} language
3. Be concise but complete (2-4 paragraphs)
4. Include all relevant details
5. Maintain appropriate formality for ${template.category} letters
6. For Arabic: Use proper formal Arabic (الفصحى)
7. Do NOT include header, date, recipient address, or signature
8. Do NOT include placeholders like [Name] - use the actual provided information

${language === 'ar' ? `
ARABIC WRITING GUIDELINES:
- Use formal Modern Standard Arabic (الفصحى)
- Proper business letter etiquette
- Correct honorifics (سعادة، معالي، السيد/السيدة)
- Professional closing phrases
` : `
ENGLISH WRITING GUIDELINES:
- Use British English spelling
- Proper business letter format
- Appropriate salutations for Omani business context
- Professional tone throughout
`}

Generate the letter body NOW:`;

  return basePrompt;
}

/**
 * Generate letter type-specific prompt
 */
function generateTypeSpecificPrompt(request: AIGenerationRequest): string {
  const { template, language } = request;
  
  // Special prompts for specific letter types
  const specialInstructions: Record<string, string> = {
    'moci_noc': language === 'ar'
      ? 'تأكد من ذكر "لا مانع لدينا" بوضوح والإشارة إلى أن الشركة غير مسؤولة.'
      : 'Clearly state "no objection" and mention that the company bears no liability.',
    
    'rop_verification': language === 'ar'
      ? 'ركز على التحقق من العمل والمعلومات الدقيقة عن الموظف.'
      : 'Focus on employment verification with accurate employee details.',
    
    'mol_labour_clearance': language === 'ar'
      ? 'اذكر تفاصيل تصريح العمل ومؤهلات الموظف بوضوح.'
      : 'Mention work permit details and employee qualifications clearly.',
    
    'general_salary_certificate': language === 'ar'
      ? 'اذكر الراتب والبدلات بوضوح مع تأكيد استمرار العمل.'
      : 'State salary and allowances clearly with employment confirmation.',
    
    'bank_loan_application': language === 'ar'
      ? 'ركز على القدرة المالية والضمانات المقدمة.'
      : 'Focus on financial capability and collateral offered.',
  };

  const specific = specialInstructions[template.id] || '';
  return specific ? `\n\nSPECIAL INSTRUCTIONS FOR THIS LETTER TYPE:\n${specific}` : '';
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Call OpenAI API to generate letter content
 */
async function callOpenAI(prompt: string, language: 'en' | 'ar'): Promise<AIGenerationResult> {
  if (!OPENAI_API_KEY) {
    return {
      success: false,
      error: 'OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.',
    };
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: language === 'ar'
              ? 'أنت كاتب خطابات أعمال محترف في سلطنة عمان. تكتب خطابات رسمية باللغة العربية الفصحى المناسبة للأعمال.'
              : 'You are a professional business letter writer in Oman. You write formal, professional business letters in proper English.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7, // Balanced creativity and consistency
        max_tokens: 1000, // Enough for a full letter body
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      content: data.choices[0]?.message?.content?.trim() || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content',
    };
  }
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Generate letter content using AI
 */
export async function generateLetterContent(
  request: AIGenerationRequest
): Promise<AIGenerationResult> {
  // Build the complete prompt
  const basePrompt = generatePrompt(request);
  const typeSpecific = generateTypeSpecificPrompt(request);
  const fullPrompt = basePrompt + typeSpecific;

  // Call OpenAI API
  const result = await callOpenAI(fullPrompt, request.language);
  
  return result;
}

/**
 * Generate suggestions for specific fields
 */
export async function generateFieldSuggestion(
  fieldName: string,
  fieldType: string,
  context: string,
  language: 'en' | 'ar'
): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;

  const prompt = language === 'ar'
    ? `اقترح محتوى مناسب لحقل "${fieldName}" في خطاب عمل رسمي.

السياق: ${context}

اكتب فقط المحتوى المقترح، بدون شرح أو تعليق.`
    : `Suggest appropriate content for the "${fieldName}" field in a formal business letter.

Context: ${context}

Write only the suggested content, no explanation or commentary.`;

  const result = await callOpenAI(prompt, language);
  return result.success ? result.content || null : null;
}

/**
 * Improve/polish existing letter content
 */
export async function improveLetterContent(
  content: string,
  improvements: string[],
  language: 'en' | 'ar'
): Promise<AIGenerationResult> {
  if (!OPENAI_API_KEY) {
    return {
      success: false,
      error: 'OpenAI API key not configured',
    };
  }

  const prompt = language === 'ar'
    ? `حسّن المحتوى التالي لخطاب العمل:

${content}

التحسينات المطلوبة:
${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

اكتب النسخة المحسنة فقط:`
    : `Improve the following business letter content:

${content}

Requested improvements:
${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Write only the improved version:`;

  return await callOpenAI(prompt, language);
}

/**
 * Translate letter content
 */
export async function translateLetterContent(
  content: string,
  fromLang: 'en' | 'ar',
  toLang: 'en' | 'ar'
): Promise<AIGenerationResult> {
  if (!OPENAI_API_KEY) {
    return {
      success: false,
      error: 'OpenAI API key not configured',
    };
  }

  const targetLangName = toLang === 'ar' ? 'Arabic' : 'English';
  const prompt = `Translate this business letter content to ${targetLangName}, maintaining professional tone and formal language:

${content}

${toLang === 'ar' ? 'استخدم اللغة العربية الفصحى الرسمية.' : 'Use formal business English.'}

Translation:`;

  return await callOpenAI(prompt, toLang);
}

/**
 * Generate subject line suggestions
 */
export async function generateSubjectSuggestions(
  purpose: string,
  language: 'en' | 'ar'
): Promise<string[]> {
  if (!OPENAI_API_KEY) return [];

  const prompt = language === 'ar'
    ? `اقترح 3 عناوين احترافية (موضوع) لخطاب عمل بخصوص: ${purpose}

اكتب فقط العناوين، كل عنوان في سطر منفصل:`
    : `Suggest 3 professional subject lines for a business letter regarding: ${purpose}

Write only the subject lines, one per line:`;

  const result = await callOpenAI(prompt, language);
  
  if (result.success && result.content) {
    return result.content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .slice(0, 3);
  }
  
  return [];
}

// ============================================================
// MOCK/DEMO MODE (for testing without API key)
// ============================================================

/**
 * Generate mock content for demo purposes
 */
export function generateMockContent(request: AIGenerationRequest): AIGenerationResult {
  const { template, language, userInputs } = request;
  
  const mockContent = language === 'ar'
    ? `نود إفادتكم بأن ${userInputs.recipientName || 'الجهة المعنية'} ${userInputs.purpose || template.description}.

نحيطكم علماً بأن هذا الخطاب صادر بناءً على الطلب المقدم، ونؤكد التزامنا الكامل بجميع الأنظمة واللوائح المعمول بها.

نأمل أن تجدوا في هذا ما يفي بالغرض، ونحن على استعداد تام لتقديم أي معلومات إضافية قد تحتاجونها.`
    : `We would like to inform you that ${userInputs.recipientName || 'the concerned party'} ${userInputs.purpose || template.description}.

This letter is issued upon request, and we confirm our full commitment to all applicable regulations and guidelines.

We hope this serves the intended purpose, and we remain at your disposal should you require any additional information.`;

  return {
    success: true,
    content: mockContent,
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  };
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Check if AI generation is available
 */
export function isAIAvailable(): boolean {
  return Boolean(OPENAI_API_KEY);
}

/**
 * Get estimated cost for generation
 */
export function getEstimatedCost(usage: { promptTokens: number; completionTokens: number }): number {
  // GPT-4o-mini pricing (as of 2024)
  const promptCost = (usage.promptTokens / 1000000) * 0.15;  // $0.15 per 1M tokens
  const completionCost = (usage.completionTokens / 1000000) * 0.60;  // $0.60 per 1M tokens
  return promptCost + completionCost;
}

/**
 * Validate AI generation request
 */
export function validateRequest(request: AIGenerationRequest): { valid: boolean; error?: string } {
  if (!request.template) {
    return { valid: false, error: 'Template is required' };
  }
  
  if (!request.language) {
    return { valid: false, error: 'Language is required' };
  }
  
  if (!request.userInputs.purpose && !request.userInputs.context) {
    return { valid: false, error: 'Please provide purpose or context for generation' };
  }
  
  return { valid: true };
}

