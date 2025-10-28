import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../constants/colors';

interface CosmicInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CosmicInput: React.FC<CosmicInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  autoCapitalize = 'words',
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={`${Colors.lunarWhite}88`}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: Colors.lunarWhite,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: Colors.lunarWhite,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CosmicInput;
