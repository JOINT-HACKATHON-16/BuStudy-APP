import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { ReactNode } from "react";
import CustomHeader from "../CustomHeader";
import * as S from "./style";

interface CustomViewType {
  title?: string;
  onPressLeftIcon: () => void;
  onPressRightIcon?: () => void;
  children?: ReactNode;
  themeType?: "Normal" | "Bright" | undefined;
}

const CustomView = (props: CustomViewType) => {
  const color = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const grayscale = useThemeColor(
    { light: Colors.light.white, dark: Colors.dark.white },
    "text"
  );
  const { title, onPressLeftIcon, children, themeType } =
    props;
  return (
    <S.SafeView
      style={{ backgroundColor: themeType === "Bright" ? grayscale : color }}
    >
      <S.Container type={themeType}>
        <CustomHeader
          title={title}
          onPressLeftIcon={onPressLeftIcon}
        />

        {children}
      </S.Container>
    </S.SafeView>
  );
};

export default CustomView;
