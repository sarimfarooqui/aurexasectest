import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, clearMessages } = useAppContext();
  const [apiKey, setApiKey] = useState(settings.apiKey);

  const handleSaveSettings = () => {
    updateSettings({ apiKey });
    Alert.alert('Success', 'Settings saved successfully');
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to clear all chat history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearMessages },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Configuration</Text>
          <Text style={styles.label}>OpenAI API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your OpenAI API key"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.helperText}>
            You can get your API key from the OpenAI dashboard at{' '}
            <Text style={styles.link}>https://platform.openai.com/api-keys</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Settings</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Enable Voice Output</Text>
            <Switch
              value={settings.voiceEnabled}
              onValueChange={(value) => updateSettings({ voiceEnabled: value })}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={settings.voiceEnabled ? '#4F46E5' : '#F9FAFB'}
            />
          </View>
          <Text style={styles.helperText}>
            When enabled, the assistant will speak its responses out loud.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearHistory}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={styles.dangerButtonText}>Clear Chat History</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Aurexa Health Assistant</Text>
          <Text style={styles.aboutText}>
            Version 1.0.0
          </Text>
          <Text style={styles.aboutText}>
            This app uses OpenAI's GPT-4 to provide AI assistant capabilities for Aurexa Health.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4B5563',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  link: {
    color: '#4F46E5',
    textDecorationLine: 'underline',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1F2937',
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default SettingsScreen;