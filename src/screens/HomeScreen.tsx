import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAppContext } from '../context/AppContext';
import { sendToOpenAI } from '../services/openai';
import {
  startSpeechRecognition,
  stopSpeechRecognition,
  speakText,
} from '../services/voice';
import { RequestType } from '../types';
import MicButton from '../components/MicButton';
import MessageBubble from '../components/MessageBubble';
import SpeakerToggle from '../components/SpeakerToggle';
import RequestTypeSelector from '../components/RequestTypeSelector';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {
    messages,
    settings,
    isListening,
    isProcessing,
    addMessage,
    updateSettings,
    setIsListening,
    setIsProcessing,
  } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('general');
  const flatListRef = useRef<FlatList>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleMicPress = async () => {
    if (isListening) {
      // Stop listening
      await stopSpeechRecognition();
      setIsListening(false);
    } else {
      // Check if API key is set
      if (!settings.apiKey) {
        Alert.alert(
          'API Key Missing',
          'Please set your OpenAI API key in the settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Go to Settings', onPress: () => navigation.navigate('Settings') },
          ]
        );
        return;
      }

      // Start listening
      setIsListening(true);
      await startSpeechRecognition(
        () => console.log('Speech recognition started'),
        async (results) => {
          // Get the recognized text
          const recognizedText = results[0];
          
          // Stop listening
          await stopSpeechRecognition();
          setIsListening(false);
          
          // Process the recognized text
          await processUserInput(recognizedText);
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setIsListening(false);
          Alert.alert('Speech Recognition Error', error);
        }
      );
    }
  };

  const processUserInput = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    addMessage(text, true);
    setInputText('');

    // Set processing state
    setIsProcessing(true);

    try {
      // Send to OpenAI
      const response = await sendToOpenAI(
        { message: text, type: requestType },
        settings.apiKey
      );

      // Add AI response to chat
      addMessage(response.message, false);

      // Speak the response if voice is enabled
      if (settings.voiceEnabled) {
        await speakText(response.message);
      }
    } catch (error) {
      console.error('Error processing input:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendPress = () => {
    processUserInput(inputText);
  };

  const toggleVoiceOutput = () => {
    updateSettings({ voiceEnabled: !settings.voiceEnabled });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <RequestTypeSelector
          selectedType={requestType}
          onSelectType={setRequestType}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Welcome to Aurexa Health Assistant. Tap the microphone button to start speaking or type your message below.
            </Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline
          maxLength={1000}
          editable={!isProcessing}
        />
        
        {inputText.trim() ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendPress}
            disabled={isProcessing || !inputText.trim()}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <MicButton
            isListening={isListening}
            isProcessing={isProcessing}
            onPress={handleMicPress}
          />
        )}

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>

        <SpeakerToggle
          voiceEnabled={settings.voiceEnabled}
          onToggle={toggleVoiceOutput}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default HomeScreen;