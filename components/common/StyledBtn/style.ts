import styled from "styled-components/native";
import { Colors } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";

export const Btn = styled.TouchableOpacity`
  background-color: ${Colors.light.primary};
  height: 60px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled(ThemedText)`
  color: ${Colors.light.white};
`;
