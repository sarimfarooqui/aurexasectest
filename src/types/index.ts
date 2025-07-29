export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface AppSettings {
  apiKey: string;
  voiceEnabled: boolean;
}

export type RequestType = 'general' | 'email' | 'meeting' | 'notes' | 'summary';

export interface AIRequest {
  message: string;
  type: RequestType;
}

export interface AIResponse {
  message: string;
  type: RequestType;
}