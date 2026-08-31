import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiProvider {
  async generateResponse(message: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      },
    );

    return response.data.candidates[0].content.parts[0].text;
  }
}