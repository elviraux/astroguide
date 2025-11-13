import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { getDeepDiveContent, saveDeepDiveContent } from '../utils/storage';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.7;

interface DeepDiveModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  icon: string;
  itemKey: string;
  generatePrompt: string;
}

const NEWELL_API_URL = 'https://newell.app/api/unified';
const PROJECT_ID = '45895021-642c-41e2-b281-f526e3585804';

const DeepDiveModal: React.FC<DeepDiveModalProps> = ({
  visible,
  onClose,
  title,
  icon,
  itemKey,
  generatePrompt,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeModal();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      openModal();
      loadContent();
    } else {
      Animated.timing(translateY, {
        toValue: MODAL_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const openModal = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: MODAL_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const loadContent = async () => {
    try {
      // Check cache first for instant loading
      const cachedContent = await getDeepDiveContent(itemKey);
      if (cachedContent) {
        setContent(cachedContent);
        setLoading(false);
        return;
      }

      // If not cached, generate on-demand
      setLoading(true);
      const response = await fetch(NEWELL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          action: 'generate_text',
          messages: [
            {
              role: 'user',
              content: generatePrompt,
            },
          ],
          max_tokens: 250,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      const generatedContent = data.content || data.text || '';

      if (generatedContent) {
        setContent(generatedContent);
        // Save to cache for instant future access
        await saveDeepDiveContent(itemKey, generatedContent);
      } else {
        setContent('Unable to generate deep dive content at this time. Please try again later.');
      }
    } catch (error) {
      console.error('Error loading deep dive content:', error);
      setContent('Unable to load content. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeModal}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Swipe indicator */}
          <View style={styles.swipeIndicatorContainer}>
            <View style={styles.swipeIndicator} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={Colors.lunarWhite} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.starlightGold} />
                <Text style={styles.loadingText}>Channeling cosmic wisdom...</Text>
              </View>
            ) : (
              <Text style={styles.content}>{content}</Text>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modal: {
    height: MODAL_HEIGHT,
    backgroundColor: Colors.cosmicMidnightBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 8,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: `${Colors.starlightGold}40`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  swipeIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: `${Colors.starlightGold}40`,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.starlightGold}20`,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.lunarWhite,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.starlightGold,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    color: Colors.lunarWhite,
    lineHeight: 26,
    opacity: 0.95,
  },
});

export default DeepDiveModal;
