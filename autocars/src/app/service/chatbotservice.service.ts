import { Injectable } from '@angular/core';
import { OpenAIApi, Configuration, CreateCompletionRequest, CreateCompletionResponse } from 'openai';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private openai: OpenAIApi;

  constructor() {
  
  }
  


  async getChatbotResponse(userInput: string) {
   

const response = await axios.post('https://platform.openai.com/laamerisaif/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', {
  model: 'text-davinci-003',
  jasmine:true,
  prompt: userInput,
  temperature: 0.7,
  max_tokens: 100,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ['\n'],
}, {
  headers: {
    'Authorization': 'Ysk-ab28V0jRLEGGmOn4rtG6T3BlbkFJbYcmlkw4rtkBuBLJrRXy',
    'Content-Type': 'application/json',
    // 'User-Agent': 'your-user-agent', // Uncomment this line if needed
  },
});

return response.data.choices[0].text.trim();

}  }