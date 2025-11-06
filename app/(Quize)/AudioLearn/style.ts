import { Colors } from "@/constants/theme";
import styledComponents from "styled-components/native";
const styled = styledComponents;

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

export const AudioSection = styled.View`
  flex: 1;
  padding-top: 32px;
`;

export const AudioTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: #494949;
  margin-bottom: 32px;
  line-height: 28px;
`;

export const AudioPlayerContainer = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

export const PlayButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #f0f7ff;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 32px;
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 4px;
  background-color: #e6e6e6;
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
  color: #969696;
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

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 300px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px 24px 24px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 18px;
  color: #494949;
  margin-bottom: 24px;
  text-align: center;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

export const ModalButton = styled.TouchableOpacity<{ isExit: boolean }>`
  flex: 1;
  padding: 14px 0;
  border-radius: 8px;
  background-color: ${(props) => (props.isExit ? "#f1f1f1" : "#4486ff")};
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text<{ isExit: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: ${(props) => (props.isExit ? "#737373" : "#ffffff")};
`;
