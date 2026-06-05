import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { buttonStyles } from '../../styles/appStyle';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}: ButtonProps): React.ReactElement => {
  const getBackgroundColor = (): string => {
    if (disabled || loading) return '#A0AEC0';
    switch (variant) {
      case 'secondary':
        return '#E2E8F0';
      case 'danger':
        return '#E53E3E';
      default:
        return '#4F46E5';
    }
  };

  const getTextColor = (): string => {
    if (variant === 'secondary') return '#4A5568';
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={[buttonStyles.button, { backgroundColor: getBackgroundColor() }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={[buttonStyles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
