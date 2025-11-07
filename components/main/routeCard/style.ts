import styled from "styled-components/native";

export const RouteCard = styled.View`
  background-color: #fafafa;
  border-radius: 12px;
  padding: 20px;
  margin-right: 12px;
  align-items: center;
  width:200px;
`;

export const RouteContent = styled.View`
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

export const RouteLocationText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 14px;
  color: #494949;
`;

export const RouteArrowIcon = styled.View`
  width: 16px;
  height: 16px;
  transform: scaleY(-1);
`;

export const TimestampContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self:flex-end;
  gap: 6px;
`;

export const TimestampText = styled.Text`
  font-family: "SUIT";
  font-weight: 500;
  font-size: 12px;
  color: #b0b0b0;
`;
