import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask Margo anything..."
        placeholderTextColor={`${Colors.lunarWhite}60`}
        multiline
        maxLength={500}
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!message.trim() || disabled) && styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!message.trim() || disabled}
      >
        <SendIcon />
      </TouchableOpacity>
    </View>
  );
};

const SendIcon = () => (
  <Text style={styles.sendIcon}>➤</Text>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.cosmicMidnightBlue,
    borderTopWidth: 1,
    borderTopColor: `${Colors.starlightGold}30`,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    color: Colors.lunarWhite,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: `${Colors.starlightGold}40`,
    shadowOpacity: 0.1,
  },
  sendIcon: {
    fontSize: 20,
    color: Colors.cosmicMidnightBlue,
    fontWeight: '600',
  },
});

export default ChatInput;
