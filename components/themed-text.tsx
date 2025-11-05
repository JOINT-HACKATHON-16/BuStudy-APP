import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  style?:any,
  lightColor?: string;
  darkColor?: string;
  type?: 'H1' | 'Subtitle1' | 'Subtitle2' | 'Subtitle3' | 'Subtitle4' | 'Body1' | 'Body2' | 'Body3' | 'Body4' | 'Caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'Body1',
  ...rest
}: ThemedTextProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'H1' ? styles.H1 : undefined,
        type === 'Subtitle1' ? styles.Subtitle1 : undefined,
        type === 'Subtitle2' ? styles.Subtitle2 : undefined,
        type === 'Subtitle3' ? styles.Subtitle3 : undefined,
        type === 'Subtitle4' ? styles.Subtitle4 : undefined,
        type === 'Body1' ? styles.Body1 : undefined,
        type === 'Body2' ? styles.Body2 : undefined,
        type === 'Body3' ? styles.Body3 : undefined,
        type === 'Body4' ? styles.Body4 : undefined,
        type === 'Caption' ? styles.Caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
    // Heading
    H1: {
      fontSize: 20,
      fontFamily: 'Suit-SemiBold',
    },
    Subtitle1: {
      fontSize: 20,
      fontFamily: 'Suit-Medium',
    },
    Subtitle2: {
      fontSize: 18,
      fontFamily: 'Suit-Bold',
    },
    Subtitle3: {
      fontSize: 18,
      fontFamily: 'Suit-Medium',
    },
    Subtitle4: {
      fontSize: 16,
      fontFamily: 'Suit-SemiBold',
    },
  
    // Body
    Body1: {
      fontSize: 16,
      fontFamily: 'Suit-Medium'
    },
    Body2: {
      fontSize: 15,
      fontFamily: 'Suit-Medium',
    },
    Body3: {
      fontSize: 14,
      fontFamily: 'Suit-SemiBold'
    },
    Body4: {
      fontSize: 14,
      fontFamily: 'Suit-Medium',
    },

    // Caption
    Caption: {
      fontSize: 12,
      fontFamily: 'Suit-Medium',
    },
});
