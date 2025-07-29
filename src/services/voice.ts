import Voice, { SpeechResultsEvent, SpeechErrorEvent } from 'react-native-voice';
import * as Speech from 'expo-speech';

export const startSpeechRecognition = async (
  onSpeechStart: () => void,
  onSpeechResults: (results: string[]) => void,
  onSpeechError: (error: string) => void
): Promise<void> => {
  try {
    // Set up event listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
      if (event.value && event.value.length > 0) {
        onSpeechResults(event.value);
      }
    };
    Voice.onSpeechError = (event: SpeechErrorEvent) => {
      onSpeechError(event.error?.message || 'Unknown error');
    };

    // Start listening
    await Voice.start('en-US');
  } catch (error) {
    console.error('Error starting speech recognition:', error);
    onSpeechError('Failed to start speech recognition');
  }
};

export const stopSpeechRecognition = async (): Promise<void> => {
  try {
    await Voice.stop();
    // Remove event listeners
    Voice.onSpeechStart = null;
    Voice.onSpeechResults = null;
    Voice.onSpeechError = null;
  } catch (error) {
    console.error('Error stopping speech recognition:', error);
  }
};

export const speakText = async (text: string): Promise<void> => {
  try {
    // Stop any ongoing speech
    Speech.stop();
    
    // Start speaking the new text
    await Speech.speak(text, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.9,
    });
  } catch (error) {
    console.error('Error speaking text:', error);
  }
};

export const isSpeaking = async (): Promise<boolean> => {
  try {
    return await Speech.isSpeakingAsync();
  } catch (error) {
    console.error('Error checking if speaking:', error);
    return false;
  }
};

export const stopSpeaking = (): void => {
  Speech.stop();
};