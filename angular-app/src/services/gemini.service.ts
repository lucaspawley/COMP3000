import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import {
  createPartFromBase64,
  createUserContent,
  GenerateContentResponse,
  GoogleGenAI,
} from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  history: Array<string> = [];
  googleGenerativeAI = new GoogleGenerativeAI(environment.aiApiURL);
  image: string | undefined;

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

  async sendImage(base64Image: any, prompt: string): Promise<GenerateContentResponse> {
    const ai = new GoogleGenAI({ apiKey: environment.aiApiURL });

      base64Image = base64Image.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          createUserContent([
            prompt,
            createPartFromBase64(base64Image, 'image/png'),
          ]),
        ],
      });

      return response;
  }

  async generateImage(prompt: string): Promise<void> {
    const ai = new GoogleGenAI({ apiKey: environment.aiApiURL });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp-image-generation',
        contents: prompt,
        config: {
          responseModalities: ['Text', 'Image'],
        },
      });

      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No candidates returned from the model.');
      }
      if (response.candidates[0].content?.parts)
        for (const part of response.candidates[0].content.parts) {
          if ('text' in part) {
            console.log(part.text);
          } else if ('inlineData' in part && part.inlineData) {
            if (part.inlineData.data) {
              const imageData: string = part.inlineData.data;
              this.image = imageData;
            }
          }
        }
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }
}
