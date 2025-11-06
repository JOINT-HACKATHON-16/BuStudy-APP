import { Colors } from "@/constants/theme";
import styled from "styled-components/native";

export const LearnContainer = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export const Header = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  padding: 7px 32px 0;
  background-color: #f1f1f1;
  z-index: 10;
`;

export const HeaderTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray2};
`;

export const ContentWrapper = styled.View`
  padding: 0 32px;
  padding-top: 54px;
`;

export const SectionTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray3};
  margin-bottom: 16px;
`;

export const RouteInputContainer = styled.View`
  background-color: ${Colors.light.white};
  padding: 16px;
  border-radius: 12px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
`;

export const SwitchIconContainer = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.View`
  flex: 1;
  gap: 8px;
`;

export const InputField = styled.View`
  gap: 4px;
`;

export const InputLabel = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: #5f5f5f;
`;

export const TextInput = styled.TextInput`
  background-color: #f6f6f6;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: ${Colors.light.gray7};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const RouteList = styled.View`
  gap: 16px;
`;

export const RouteCard = styled.TouchableOpacity`
  background-color: ${Colors.light.white};
  padding: 16px;
  border-radius: 12px;
  gap: 12px;
`;

export const RouteInfo = styled.View`
  gap: 8px;
  align-items: center;
  align-self: flex-start;
`;

export const LocationText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: ${Colors.light.gray3};
`;

export const ArrowIconContainer = styled.View`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 8px;
`;

export const RouteFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const ClockIcon = styled.View`
  width: 12px;
  height: 12px;
`;

export const TimeText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: ${Colors.light.gray7};
`;

export const DateText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: ${Colors.light.gray7};
`;
