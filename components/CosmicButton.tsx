import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';

interface CosmicButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const CosmicButton: React.FC<CosmicButtonProps> = ({ onPress, title, disabled, loading }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.cosmicMidnightBlue} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.starlightGold,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#888',
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: Colors.cosmicMidnightBlue,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CosmicButton;
