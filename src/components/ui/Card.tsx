import React, { ReactNode } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { cardStyles } from '../../styles/appStyle';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card = ({
  children,
  onPress,
  style,
}: CardProps): React.ReactElement => {
  const cardStyle = [cardStyles.card, style];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};
