import { Colors } from "@/constants/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export const Header = styled.View`
  padding: 12px 32px;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
  justify-content: center;
  margin-top: -50px;
`;

export const Title = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 18px;
  color: ${Colors.light.gray3};
  margin-bottom: 52px;
`;

export const SubjectList = styled.View`
  gap: 12px;
`;

export const SubjectButton = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? Colors.light.primary60 : Colors.light.white};
  border: 1px solid
    ${(props) => (props.selected ? Colors.light.primary30 : "#e6e6e6")};
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
`;

export const SubjectText = styled.Text<{ selected?: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${(props) =>
    props.selected ? Colors.light.white : Colors.light.gray3};
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: ${Colors.light.white};
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
`;

export const RegisterText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${Colors.light.gray3};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

export const BottomContainer = styled.View`
  padding: 12px 32px;
`;

export const NextButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#e6e6e6" : "#b6d0ff")};
  border-radius: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const NextButtonText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${Colors.light.white};
`;
