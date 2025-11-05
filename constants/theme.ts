/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: "#0059FF",
    primary90: "#0E62FF",
    primary80: "#1768FF",
    primary70: "#2370FF",
    primary60: "#4486FF",
    primary50: "#699DFF",
    primary40: "#85B0FF",
    primary30: "#B6D0FF",
    primary20: "#DBE7FF",

    gray1: "#141414",
    gray2: "#343434",
    gray3: "#494949",
    gray4: "#5F5F5F",
    gray5: "#737373",
    gray6: "#969696",
    gray7: "#B0B0B0",
    gray8: "#CACACA",
    gray9: "#E6E6E6",
    gray10: "#FBFBFB",

    success: "#27AE60",
    warning: "#E2B93B",
    error: "#EB5757",
    info: "#2F80ED",

    black: "#141414",
    white: "#FFFFFF",
    text: "#141414",
    background: "#F6F6F6",
  },
  dark: {
    text: "#FFFFFF",
    background: "#151718",

    primary: "#0059FF",
    primary90: "#0E62FF",
    primary80: "#1768FF",
    primary70: "#2370FF",
    primary60: "#4486FF",
    primary50: "#699DFF",
    primary40: "#85B0FF",
    primary30: "#B6D0FF",
    primary20: "#DBE7FF",

    gray1: "#FBFBFB",
    gray2: "#E6E6E6",
    gray3: "#CACACA",
    gray4: "#B0B0B0",
    gray5: "#969696",
    gray6: "#737373",
    gray7: "#5F5F5F",
    gray8: "#494949",
    gray9: "#343434",
    gray10: "#141414",

    success: "#27AE60",
    warning: "#E2B93B",
    error: "#EB5757",
    info: "#2F80ED",

    black: "#FFFFFF",
    white: "#141414", // 이거 메인에서 수정
  },
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
