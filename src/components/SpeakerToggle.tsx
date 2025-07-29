import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SpeakerToggleProps {
  voiceEnabled: boolean;
  onToggle: () => void;
}

const SpeakerToggle: React.FC<SpeakerToggleProps> = ({ voiceEnabled, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, voiceEnabled ? styles.enabled : styles.disabled]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Ionicons
        name={voiceEnabled ? 'volume-high' : 'volume-mute'}
        size={24}
        color={voiceEnabled ? '#fff' : '#6B7280'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  enabled: {
    backgroundColor: '#4F46E5',
  },
  disabled: {
    backgroundColor: '#E5E7EB',
  },
});

export default SpeakerToggle;