import styled from "styled-components/native";

export const StudyCard = styled.View<{ backgroundColor?: string }>`
  width: 329px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#5087ee"};
  border-radius: 12px;
  padding: 24px 20px;
  margin-right: 12px;
  overflow: hidden;
`;

export const RouteInfo = styled.View`
  margin-bottom: 105px;
`;

export const RouteTextContainer = styled.View`
  position: relative;
`;

export const RouteText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 16px;
  color: #fbfbfb;
`;

export const ArrowIcon = styled.View`
  margin-top: 24px;
  margin-left: 16px;
  width: 16px;
  height: 16px;
  transform: scaleY(-1);
`;

export const BusImage = styled.Image`
  position: absolute;
  right: -60px;
  bottom: 30px;
  width: 235px;
  height: 235px;
`;

export const StudyInfo = styled.View`
  gap: 16px;
  z-index: 1;
`;

export const SubjectTitle = styled.View`
  gap: 8px;
`;

export const SubjectText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 16px;
  color: #dbe7ff;
`;

export const TitleText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 18px;
  color: #fbfbfb;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const DetailsContainer = styled.View`
  justify-content: flex-start;
  align-items: space-between;
  gap:8px;
`;

export const DateTimeContainer = styled.View`
  gap: 4px;
`;

export const DateText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 12px;
  color: #dbe7ff;
`;

export const TimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const TimeText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 12px;
  color: #dbe7ff;
`;

export const StatsContainer = styled.View`
  gap: 8px;
  align-items: flex-end;
`;

export const StatText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 12px;
  color: #dbe7ff;
`;
