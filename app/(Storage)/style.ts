import { Colors } from "@/constants/theme";
import styled from "styled-components/native";

export const StorageContainer = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  padding: 0 32px;
  padding-top: 60px;
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

export const StudyCardList = styled.View`
  gap: 16px;
`;

export const StudyCard = styled.View<{ isActive?: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? "#4486ff" : Colors.light.white};
  padding: 16px;
  border-radius: 12px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 2px;
`;

export const SubjectTitle = styled.Text<{ isActive?: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 18px;
  color: ${({ isActive }) => (isActive ? "#ffffff" : Colors.light.black)};
`;

export const NewBadge = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #ff4444;
`;

export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const LeftInfo = styled.View`
  flex-direction: column;
  gap: 4px;
`;

export const DateText = styled.Text<{ isActive?: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? "#dbe7ff" : Colors.light.gray8)};
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

export const TimeText = styled.Text<{ isActive?: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? "#dbe7ff" : Colors.light.gray8)};
`;

export const RightInfo = styled.View`
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
`;

export const InfoText = styled.Text<{
  isActive?: boolean;
  isPerfect?: boolean;
}>`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: ${({ isActive, isPerfect }) =>
    isPerfect ? "#5087ee" : isActive ? "#dbe7ff" : Colors.light.gray8};
`;
