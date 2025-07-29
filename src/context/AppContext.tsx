import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message, AppSettings } from '../types';

interface AppContextType {
  messages: Message[];
  settings: AppSettings;
  isListening: boolean;
  isProcessing: boolean;
  addMessage: (text: string, isUser: boolean) => void;
  clearMessages: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setIsListening: (isListening: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

const defaultSettings: AppSettings = {
  apiKey: '',
  voiceEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load settings from AsyncStorage on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('settings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }

        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          // Convert string timestamps back to Date objects
          const parsedMessages = JSON.parse(storedMessages);
          const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(messagesWithDateObjects);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings to AsyncStorage:', error);
      }
    };

    saveSettings();
  }, [settings]);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to AsyncStorage:', error);
      }
    };

    saveMessages();
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        settings,
        isListening,
        isProcessing,
        addMessage,
        clearMessages,
        updateSettings,
        setIsListening,
        setIsProcessing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};