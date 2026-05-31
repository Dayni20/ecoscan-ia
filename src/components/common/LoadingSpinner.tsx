import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingStyles } from '../../styles/appStyle';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Cargando...' }: LoadingSpinnerProps) => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={loadingStyles.text}>{message}</Text>
    </View>
  );
};
