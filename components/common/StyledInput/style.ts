import styled from "styled-components/native";
import { Colors } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";

export const Input = styled.TextInput`
  background-color: ${Colors.light.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.light.gray7};
  border-radius: 8px;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  color: ${Colors.light.black};
`;
export const ErrorText = styled(ThemedText)`
  margin: 10px 0 0 0;
  color: ${Colors.light.error};
`;
