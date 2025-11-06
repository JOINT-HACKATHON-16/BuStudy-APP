import { Colors } from "@/constants/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f1f1f1;
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

export const SubjectText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray3};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
  justify-content: center;
  margin-top: -31px;
`;

export const QuestionText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 18px;
  color: ${Colors.light.gray3};
  line-height: 27px;
  margin-bottom: 52px;
`;

export const AnswerList = styled.View`
  gap: 12px;
`;

export const AnswerButton = styled.TouchableOpacity<{ answerState?: string }>`
  background-color: ${(props) => {
    if (props.answerState === "correct") return "#699dff";
    if (props.answerState === "incorrect") return "#f15c62";
    if (props.answerState === "selected") return Colors.light.primary30;
    return "#ffffff";
  }};
  border: 1px solid
    ${(props) => {
      if (props.answerState === "correct") return "#699dff";
      if (props.answerState === "incorrect") return "#f15c62";
      if (props.answerState === "selected") return Colors.light.primary30;
      return "#e6e6e6";
    }};
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
`;

export const AnswerText = styled.Text<{ answerState?: string }>`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${(props) => {
    if (
      props.answerState === "correct" ||
      props.answerState === "incorrect" ||
      props.answerState === "selected"
    ) {
      return "#ffffff";
    }
    return Colors.light.gray3;
  }};
`;

export const ResultSection = styled.View`
  margin-top: 16px;
  gap: 16px;
`;

export const ResultTitle = styled.Text<{ isCorrect: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${Colors.light.gray3};
`;

export const ExplanationText = styled.Text<{ isCorrect: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: ${(props) => (props.isCorrect ? Colors.light.gray5 : "#ea3b42")};
  line-height: 18px;
`;

export const BottomContainer = styled.View`
  padding: 12px 32px;
`;

export const ConfirmButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled ? "#e6e6e6" : Colors.light.primary30};
  border-radius: 8px;
  padding: 12px 33.5px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: #ffffff;
`;
