import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      {!isUser && (
        <Image source={require('../assets/images/margo-avatar.png')} style={styles.avatar} />
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        {!isUser && <Text style={styles.name}>Margo</Text>}
        <Text style={[styles.message, isUser ? styles.userMessage : styles.assistantMessage]}>
          {message.content}
        </Text>
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.assistantTimestamp]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
      {isUser && <View style={styles.userAvatarPlaceholder} />}
    </View>
  );
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 2,
    borderColor: Colors.starlightGold,
  },
  userAvatarPlaceholder: {
    width: 36,
    marginLeft: 8,
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: Colors.starlightGold,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: `${Colors.mysticPurple}60`,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.starlightGold,
    marginBottom: 4,
  },
  message: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessage: {
    color: Colors.cosmicMidnightBlue,
  },
  assistantMessage: {
    color: Colors.lunarWhite,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: `${Colors.cosmicMidnightBlue}80`,
    textAlign: 'right',
  },
  assistantTimestamp: {
    color: `${Colors.lunarWhite}60`,
  },
});

export default ChatMessage;
