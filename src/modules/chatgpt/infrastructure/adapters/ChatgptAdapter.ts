import { ChatGPTAPI } from 'chatgpt';

class ChatgptAdapter {
  constructor(private client: ChatGPTAPI) {}
  async sendMessage(message: string) {
    let res = await this.client.sendMessage('What is OpenAI?');
    console.log(res.text);
  }
}

export const chatgptAdapter = new ChatgptAdapter(
  new ChatGPTAPI({
    apiKey: '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',
    completionParams: {
      model: 'gpt-3.5',
      temperature: 0.5,
      top_p: 0.8,
    },
  })
);
