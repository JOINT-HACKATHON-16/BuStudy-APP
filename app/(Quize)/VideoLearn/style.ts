import styledComponents from "styled-components/native";
const styled = styledComponents;
import { Colors } from "@/constants/theme";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 32px;
`;

export const SubjectBadge = styled.View`
  padding: 6px 16px;
  background-color: #4486ff;
  border-radius: 20px;
`;

export const SubjectText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray3};
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 32px;
`;

export const VideoSection = styled.View`
  flex: 1;
  padding-top: 20px;
`;

export const VideoTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: #494949;
  margin-bottom: 24px;
  line-height: 28px;
`;

export const VideoPlayerContainer = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  position: relative;
`;

export const VideoControlsOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const PlayButtonOverlay = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const VideoBottomControls = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProgressFill = styled.View<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #4486ff;
`;

export const TimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 4px;
`;

export const TimeText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #ffffff;
`;

export const DescriptionContainer = styled.View`
  padding: 24px 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
`;

export const DescriptionText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: #737373;
  line-height: 22px;
`;

export const BottomButtonContainer = styled.View`
  padding: 20px 0;
  padding-bottom: 40px;
`;
