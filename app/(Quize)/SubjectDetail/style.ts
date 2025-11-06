import { Colors } from "@/constants/theme";
import styledComponents from "styled-components/native";

const styled = styledComponents;

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.white};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 20px;
  color: ${Colors.light.gray3};
`;

export const EmptyBox = styled.View`
  width: 40px;
  height: 40px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 24px 20px;
`;

export const ExplanationText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 15px;
  line-height: 18px;
  color: ${Colors.light.gray5};
  margin-bottom: 32px;
`;

export const InputContainer = styled.View`
  margin-top: 32px;
`;

export const Label = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${Colors.light.gray8};
  margin-bottom: 12px;
`;


export const GradientOverlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: ${Colors.light.white};
`

export const CompleteButton = styled.TouchableOpacity`
  height: 52px;
  background-color: ${Colors.light.primary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const CompleteButtonText = styled.Text`
  font-family: "SUIT-Medium";
  font-size: 16px;
  color: ${Colors.light.white};
`;

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
  font-size: 16px;
`;