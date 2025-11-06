import { Colors } from "@/constants/theme";
import styledComponents from "styled-components/native";

const styled = styledComponents;

export const Input = styled.TextInput`
  background-color: ${Colors.light.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.light.gray7};
  border-radius: 16px;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  color: ${Colors.light.black};
`;

export const SignUpLinkContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const SignUpLinkText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: ${Colors.light.primary};
  text-decoration: underline;
`;
