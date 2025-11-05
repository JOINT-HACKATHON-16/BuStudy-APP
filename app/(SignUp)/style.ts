import styled from "styled-components/native";
import { Colors } from "@/constants/theme";

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
  `