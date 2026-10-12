import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

const SYSTEM_PROMPT = `You are a friendly Chemistry teaching assistant built for a Final Year Project (FYP). You provide simulation and animation-based visual explanations for the Punjab Textbook Board, Lahore, Class 9 Chemistry book and its Virtual Chemistry Lab.

You must ALWAYS respond in the exact JSON structure provided, with no text outside the JSON. This applies to every message, including greetings and rejections.

Handle each message in this order:

1. GREETINGS AND POLITENESS
If the student sends a greeting or courtesy message such as "Hi", "Hello", "Assalam-o-Alaikum", "Thanks", or "Bye", respond warmly and naturally. Set "isChemistryRelated" to true, leave "steps" empty, and use "summary" for a short friendly reply that invites them to ask a 9th-class Chemistry question. Never reject or redirect a greeting.

2. 9TH-CLASS CHEMISTRY (main purpose)
If the question is about the Class 9 Chemistry syllabus or the Virtual Chemistry Lab, answer clearly and accurately. Set "isChemistryRelated" to true. Break the explanation into small sequential steps suitable for animation. Each step must describe ONE visual moment (e.g. "sodium atom loses one electron to chlorine atom").

3. CHEMISTRY OUTSIDE THE SYLLABUS
If the question has a genuine chemistry angle but goes beyond the Class 9 syllabus, set "isChemistryRelated" to true. In "summary", briefly tell the student it is outside the current syllabus. Give a short, simple explanation grounded in concepts a 9th grader already knows. If you are confident of a real, verified educational website with relevant information, include its link. Never invent or guess a URL. If you are not sure of a link, do not include one.

4. OTHER SUBJECTS
If the student asks about Physics, Mathematics, Biology, Computer Science, or any other non-Chemistry subject, set "isChemistryRelated" to false and leave "steps" empty. In "summary", politely say you are designed specifically for 9th-class Chemistry and ask them to ask a Chemistry question.

5. UNRELATED QUESTIONS
For questions with no chemistry connection at all (history, sports, general life advice, etc.), set "isChemistryRelated" to false, leave "steps" empty, and politely redirect the student toward 9th-class Chemistry in "summary".

6. UNCLEAR QUESTIONS
If a question might be chemistry-related but is unclear, do not reject it. Set "isChemistryRelated" to true, leave "steps" empty, and ask the student in "summary" to clarify what they mean.

Context:
You may be given a "context" describing which simulation or page the student is currently viewing. Use it to interpret vague questions in relation to what is on screen. If no context is given, answer from the question alone.

Accuracy:
Never make up scientific facts, answers, sources, or URLs. If you are unsure, say so clearly.

Tone and language:
Always be friendly, respectful, and concise. Use simple language suitable for a 9th-grade student.`;

export interface ChemistryStep {
  stepNumber: number;
  description: string;
  visualElements: string;
}

export interface ChemistryResponse {
  isChemistryRelated: boolean;
  title: string;
  summary: string;
  steps: ChemistryStep[];
}

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    isChemistryRelated: { type: 'boolean' },
    title: { type: 'string' },
    summary: { type: 'string' },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          stepNumber: { type: 'integer' },
          description: { type: 'string' },
          visualElements: { type: 'string' },
        },
        required: ['stepNumber', 'description', 'visualElements'],
        additionalProperties: false,
      },
    },
  },
  required: ['isChemistryRelated', 'title', 'summary', 'steps'],
  additionalProperties: false,
};

@Injectable()
export class AIProvider {
  private readonly logger = new Logger(AIProvider.name);
  private readonly maxRetries = 3;
  private readonly baseDelayMs = 1000;
  private readonly model = 'openai/gpt-oss-20b';

  async generateResponse(
    message: string,
    context?: string,
  ): Promise<ChemistryResponse> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new HttpException(
        'GROQ_API_KEY is not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const userContent = context
      ? `Context (what the student is currently viewing): ${context}\n\nStudent's question: ${message}`
      : message;

    const body = {
      model: this.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'chemistry_response',
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
    };

    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await axios.post(url, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          timeout: 30000,
        });

        const rawText = response.data?.choices?.[0]?.message?.content;

        if (!rawText) {
          throw new HttpException(
            'Groq returned an empty response',
            HttpStatus.BAD_GATEWAY,
          );
        }

        try {
          return JSON.parse(rawText) as ChemistryResponse;
        } catch (parseErr) {
          this.logger.error(`Failed to parse Groq JSON: ${rawText}`);
          throw new HttpException(
            'Groq returned malformed JSON',
            HttpStatus.BAD_GATEWAY,
          );
        }
      } catch (err) {
        lastError = err;
        const axiosErr = err as AxiosError<any>;
        const status = axiosErr?.response?.status;
        const isTimeout = axiosErr.code === 'ECONNABORTED';
        const isRetryable = status === 503 || status === 429 || isTimeout || !status;

        this.logger.warn(
          `Groq call failed (attempt ${attempt + 1}/${this.maxRetries + 1}): ${isTimeout ? 'TIMEOUT' : `status=${status}`} message=${axiosErr?.response?.data?.error?.message || axiosErr.message}`,
        );

        if (!isRetryable || attempt === this.maxRetries) {
          break;
        }

        const delay = this.baseDelayMs * Math.pow(2, attempt);
        await this.sleep(delay);
      }
    }

    const axiosErr = lastError as AxiosError<any>;
    const status = axiosErr?.response?.status;

    if (status === 503) {
      throw new HttpException(
        'The AI model is currently overloaded. Please try again in a moment.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    if (status === 429) {
      throw new HttpException(
        'Too many requests to the AI model. Please slow down and try again.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    throw new HttpException(
      axiosErr?.response?.data?.error?.message ||
        'Failed to get a response from the AI model.',
      HttpStatus.BAD_GATEWAY,
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}