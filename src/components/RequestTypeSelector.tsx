import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RequestType } from '../types';

interface RequestTypeSelectorProps {
  selectedType: RequestType;
  onSelectType: (type: RequestType) => void;
}

interface TypeOption {
  type: RequestType;
  label: string;
  icon: string;
}

const typeOptions: TypeOption[] = [
  { type: 'general', label: 'General', icon: 'chatbubble-outline' },
  { type: 'email', label: 'Email', icon: 'mail-outline' },
  { type: 'meeting', label: 'Meeting', icon: 'calendar-outline' },
  { type: 'notes', label: 'Notes', icon: 'document-text-outline' },
  { type: 'summary', label: 'Summary', icon: 'list-outline' },
];

const RequestTypeSelector: React.FC<RequestTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Request Type:</Text>
      <View style={styles.optionsContainer}>
        {typeOptions.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.option,
              selectedType === option.type && styles.selectedOption,
            ]}
            onPress={() => onSelectType(option.type)}
          >
            <Ionicons
              name={option.icon as any}
              size={18}
              color={selectedType === option.type ? '#fff' : '#4F46E5'}
            />
            <Text
              style={[
                styles.optionText,
                selectedType === option.type && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1F2937',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4F46E5',
    backgroundColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#4F46E5',
  },
  optionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4F46E5',
  },
  selectedOptionText: {
    color: '#fff',
  },
});

export default RequestTypeSelector;