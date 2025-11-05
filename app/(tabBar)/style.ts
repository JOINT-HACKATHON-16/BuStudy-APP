import styled from "styled-components/native";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";

export const TabBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: #fafafa;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding-left: 66px;
  padding-right: 66px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const TabBarContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 91px;
`;

export const TabItem = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const TabIconWrapper = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const TabLabel = styled(ThemedText)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? Colors.light.gray3 : Colors.light.gray8)};
`;

export const UnderBar = styled.View`
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -67px;
  width: 134px;
  height: 5px;
  background-color: ${Colors.light.gray8};
  border-radius: 100px;
`;
