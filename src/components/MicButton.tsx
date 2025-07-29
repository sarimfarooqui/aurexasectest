import React from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MicButtonProps {
  isListening: boolean;
  isProcessing: boolean;
  onPress: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ isListening, isProcessing, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isProcessing}
      style={[styles.button, isListening ? styles.listening : null]}
    >
      {isProcessing ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons
            name={isListening ? 'mic' : 'mic-outline'}
            size={32}
            color="#fff"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listening: {
    backgroundColor: '#EF4444',
    transform: [{ scale: 1.1 }],
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MicButton;