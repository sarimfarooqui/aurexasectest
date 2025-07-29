import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import { AIRequest, AIResponse, RequestType } from '../types';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export const getSystemPrompt = (type: RequestType): string => {
  switch (type) {
    case 'email':
      return 'You are an AI assistant that drafts professional emails. Format the response with Subject, To, From, and Body sections.';
    case 'meeting':
      return 'You are an AI assistant that helps schedule meetings. Suggest available times and create a meeting agenda.';
    case 'notes':
      return 'You are an AI assistant that takes detailed notes. Format the response in a clear, organized manner.';
    case 'summary':
      return 'You are an AI assistant that creates concise summaries. Highlight the key points and action items.';
    default:
      return 'You are a helpful AI assistant for Aurexa Health, a healthcare company. Provide concise, professional responses.';
  }
};

export const sendToOpenAI = async (
  request: AIRequest,
  apiKey: string = OPENAI_API_KEY
): Promise<AIResponse> => {
  try {
    if (!apiKey) {
      throw new Error('OpenAI API key is missing');
    }

    const systemPrompt = getSystemPrompt(request.type);

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: request.message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return {
      message: response.data.choices[0].message.content,
      type: request.type,
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'}`);
    }
    throw error;
  }
};