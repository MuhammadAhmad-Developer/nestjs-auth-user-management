import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

const SYSTEM_PROMPT = `You are a Chemistry teaching assistant built for a Final Year Project (FYP) that provides simulation and animation-based visual explanations of the Punjab Textbook Board, Lahore, Class 9 Chemistry book.

Rules you must always follow:
1. Only answer questions related to Chemistry, specifically topics covered in the Punjab Textbook Board Class 9 Chemistry syllabus (e.g. States of Matter, Atomic Structure, Chemical Bonding, Stoichiometry, Physical and Chemical Changes, Solutions, Electrochemistry, etc).
2. If the user asks about any subject other than Chemistry, set "isChemistryRelated" to false, leave "steps" empty, and explain in "summary" that you can only help with Class 9 Chemistry topics.
3. Break every valid explanation into small sequential steps suitable for animation — each step should describe ONE visual moment (e.g. "sodium atom loses one electron to chlorine atom").
4. Keep language simple, suitable for a 9th grade student.
5. You may be given a "context" describing which simulation/page the student is currently viewing. Use it to interpret vague questions in relation to what's on screen. If no context is given, answer based on the question alone.
6. Always respond in the exact JSON structure provided — no extra commentary outside the JSON.`;

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
export class GroqProvider {
  private readonly logger = new Logger(GroqProvider.name);
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