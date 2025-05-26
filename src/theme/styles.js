import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.lavenderLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const textStyles = StyleSheet.create({
  normal: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  bold: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});