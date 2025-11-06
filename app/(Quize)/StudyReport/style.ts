import styledComponents from "styled-components/native";

const styled = styledComponents;

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
  background-color: #f1f1f1
  ;
`;

export const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 32px;
`;

export const HeaderTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: #494949;
`;

export const ContentWrapper = styled.View`
  padding: 32px;
  gap: 24px;
`;

export const RouteInfoCard = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
`;

export const RouteInfoTop = styled.View`
  gap: 2px;
  align-items: center;
  align-self: flex-start;
`;

export const RouteLocation = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: #494949;
  text-align: center;
`;

export const ArrowIconContainer = styled.View`
  transform: scaleY(-1);
`;

export const RouteInfoBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const RouteInfoLeft = styled.View`
  gap: 4px;
`;

export const DateText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #b0b0b0;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const TimeText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #b0b0b0;
`;

export const RouteInfoRight = styled.View`
  gap: 4px;
  align-items: flex-end;
`;

export const StatsText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #b0b0b0;
`;

export const StatsRow = styled.View`
  flex-direction: row;
`;

export const StatsLabel = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #b0b0b0;
`;

export const AccuracyText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 12px;
  color: #4486ff;
`;

export const QuizListContainer = styled.View`
  gap: 24px;
`;

export const QuizItemContainer = styled.View`
  gap: 16px;
`;

export const QuizNumberText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: #494949;
`;

export const QuizCard = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
`;

export const QuizQuestionText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: #494949;
  line-height: 22px;
`;

export const AnswerList = styled.View`
  gap: 4px;
`;

export const AnswerItem = styled.View<{ answerState?: string }>`
  background-color: ${({ answerState }) => {
    if (answerState === "correct") return "#699dff";
    if (answerState === "incorrect") return "#f15c62";
    return "#ffffff";
  }};
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 8px 16px;
`;

export const AnswerItemText = styled.Text<{ answerState?: string }>`
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: ${({ answerState }) => {
    if (answerState === "correct" || answerState === "incorrect")
      return "#ffffff";
    return "#494949";
  }};
`;

export const ResultContainer = styled.View`
  gap: 8px;
`;

export const ResultStatusText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 15px;
  color: #494949;
`;

export const ResultExplanationText = styled.Text<{ isCorrect: boolean }>`
  font-family: "SUIT-Medium";
  font-size: 14px;
  color: ${({ isCorrect }) => (isCorrect ? "#737373" : "#f15c62")};
  line-height: 20px;
`;

export const GradientOverlay = styled.View`
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  height: 55px;
  background-color: rgba(240, 240, 240, 0.3);
`;

export const BottomButtonContainer = styled.View`
  padding: 0 32px 12px;
  background-color: #f1f1f1;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #4486ff;
  border-radius: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: #ffffff;
`;
