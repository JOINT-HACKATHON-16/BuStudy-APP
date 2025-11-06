import { Colors } from "@/constants/theme";
import styledComponents from "styled-components/native";

const styled = styledComponents;

export const Container = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  position: relative;
  background-color: #ffffff;
`;

export const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 32px;
`;

export const HeaderTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray3};
`;

export const ImagePreviewSection = styled.View`
  width: 100%;
  height: 665px;
  background-color: #e6e6e6;
`;

export const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const PlaceholderBox = styled.View`
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
`;

export const BottomSheet = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 148px;
  background-color: #f1f1f1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ImageActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

export const CameraButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: ${Colors.light.white};
  border-radius: 90px;
`;

export const CameraIconBox = styled.View`
  border-radius: 26px;
  align-items: center;
  justify-content: center;
`;

export const GalleryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
`;

export const NextButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const NextIconBox = styled.View<{ disabled?: boolean }>`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${({ disabled }) =>
    disabled ? Colors.light.primary30 : Colors.light.primary60};
  align-items: center;
  justify-content: center;
`;
