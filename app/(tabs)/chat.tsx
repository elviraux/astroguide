import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import StarryBackground from '../../components/StarryBackground';
import ChatMessage from '../../components/ChatMessage';
import ChatInput from '../../components/ChatInput';
import TypingIndicator from '../../components/TypingIndicator';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { getUserData, getAstroProfile } from '../../utils/storage';
import { buildMargoContext, buildMargoPrompt } from '../../utils/aiContext';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

const INITIAL_MESSAGE: ChatMessageType = {
  id: 'initial',
  role: 'assistant',
  content: "Hello, I'm Margo. I've read your chart. What cosmic questions are on your mind today?",
  timestamp: new Date(),
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadUserContext();
  }, []);

  const loadUserContext = async () => {
    const userData = await getUserData();
    const astroProfile = await getAstroProfile();
    const margoContext = buildMargoContext(userData, astroProfile);
    setContext(margoContext);
  };

  const handleSend = async (messageText: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Call Newell AI
      const prompt = buildMargoPrompt(messageText, context);
      const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Project validation failed');
        }
        throw new Error(`API error: ${response.status}`);
      }

      const aiResponse = await response.text();

      // Add AI message
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Scroll to bottom after AI response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error getting AI response:', error);
      Alert.alert(
        'Connection Error',
        'Unable to reach Margo right now. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsTyping(false);
    }
  };

  const renderItem = ({ item }: { item: ChatMessageType }) => <ChatMessage message={item} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StarryBackground>
        <View style={styles.content}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={isTyping ? <TypingIndicator /> : null}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </View>
      </StarryBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingTop: 80,
    paddingBottom: 16,
  },
});
