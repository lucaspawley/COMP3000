import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  history: Array<string> = [];

  initializeModel() {
    const googleGenerativeAI = new GoogleGenerativeAI(environment.aiApiURL);
    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      temperature: 0.9,
      top_p: 1,
      top_k: 32,
      maxOutputTokens: 100,
    };

    return googleGenerativeAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      ...generationConfig,
    });
  }
}
