import styled from "styled-components/native";

export const AttendanceSection = styled.View`
  margin-top: 31px;
  padding-left: 32px;
  padding-right: 32px;
`;

export const SectionTitle = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 16px;
  color: #494949;
  margin-bottom: 16px;
`;

export const AttendanceCard = styled.View`
  background-color: #fafafa;
  border-radius: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DayItem = styled.View`
  align-items: center;
  gap: 8px;
  width: 24px;
`;

export const DayCircle = styled.View<{ type: "empty" | "filled" | "today" }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ type }) =>
    type === "empty" ? "#e6e6e6" : type === "filled" ? "#4486ff" : "#9eb9ea"};
`;

export const DayLabel = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 16px;
  color: #494949;
  text-align: center;
`;
