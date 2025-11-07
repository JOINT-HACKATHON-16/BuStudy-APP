import React from "react";
import { Circle, Path, Svg } from "react-native-svg";
import * as S from "./style";
import { View } from "react-native";

interface StudyCardProps {
  id: number;
  backgroundColor: string;
  from: string;
  to: string;
  subject: string;
  title: string;
  date: string;
  time: string;
  problemCount: number;
  accuracy: number;
}

const StudyCard: React.FC<StudyCardProps> = ({
  backgroundColor,
  from,
  to,
  subject,
  title,
  date,
  time,
  problemCount,
  accuracy,
}) => {
  return (
    <S.StudyCard backgroundColor={backgroundColor}>
      <S.BusImage
        source={{
          uri: "https://cdn.discordapp.com/attachments/1435459558939037908/1435788809420673034/kpass_bus.png?ex=690d3e07&is=690bec87&hm=0d89ef63a4b3f31f0d1d0b4a64e2870a2f3c3a588c7053b31b26333d30d3349b&",
        }}
      />
      <S.RouteInfo>
        <S.RouteTextContainer>
          <S.RouteText>{from}</S.RouteText>
          <S.ArrowIcon>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M8 3L8 13M8 3L12 7M8 3L4 7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </S.ArrowIcon>
          <S.RouteText style={{ marginTop: 20 }}>{to}</S.RouteText>
        </S.RouteTextContainer>
      </S.RouteInfo>

      <S.BusImage
        source={{
          uri: "https://ik.imagekit.io/yoonha2017/kpass_bus.png?updatedAt=1762475744895",
        }}
        resizeMode="cover"
      />

      <S.StudyInfo>
        <S.SubjectTitle>
          <S.SubjectText>{subject}</S.SubjectText>
          <S.TitleText>{title}</S.TitleText>
        </S.SubjectTitle>

        <S.Divider />

        <S.DetailsContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <S.DateText>{date}</S.DateText>
            <S.StatText>오늘의 문제 수: {problemCount}개</S.StatText>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <Circle cx="6" cy="6" r="5" stroke="#dbe7ff" strokeWidth="1" />
                <Path
                  d="M6 3V6L8 8"
                  stroke="#dbe7ff"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </Svg>
              <S.TimeText>{time}</S.TimeText>
            </View>

            <S.StatText>정답률: {accuracy}%</S.StatText>
          </View>
        </S.DetailsContainer>
      </S.StudyInfo>
    </S.StudyCard>
  );
};

export default StudyCard;
