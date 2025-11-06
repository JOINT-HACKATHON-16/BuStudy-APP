import StyledBtn from "@/components/common/StyledBtn";
import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import YoutubePlayer from "react-native-youtube-iframe";
import * as S from "./style";

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="#969696"
    />
  </Svg>
);

export default function VideoLearn() {
  const router = useRouter();
  const params = useLocalSearchParams<{ 
    subject: string;
    lectureId?: string;
  }>();

  const [playing, setPlaying] = useState(false);

  // lectureId는 YouTube 동영상 ID
  const videoContent = {
    title: params.subject || "신라의 무열왕계와 유교 사상",
    youtubeId: params.lectureId || "dQw4w9WgXcQ", // 기본값 설정
  };

  const onStateChange = (state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  };

  const handleComplete = () => {
    router.push("/(tabBar)/TabBarLayout");
  };  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => router.back()}>
            <BackIcon />
          </S.BackButton>
          <S.SubjectText>{params.subject || "과목"}</S.SubjectText>
        </S.Header>

        <S.ContentContainer>
          <S.VideoSection>
            <S.VideoTitle>{videoContent.title}</S.VideoTitle>

            <S.VideoPlayerContainer
              activeOpacity={1}
            >
              <YoutubePlayer
                height={220}
                play={playing}
                videoId={videoContent.youtubeId}
                onChangeState={onStateChange}
              />
            </S.VideoPlayerContainer>
          </S.VideoSection>

          <S.BottomButtonContainer>
            <StyledBtn
              label="시청 완료"
              onPress={handleComplete}
              isActive={true}
            />
          </S.BottomButtonContainer>
        </S.ContentContainer>
      </S.Container>
    </SafeAreaView>
  );
}
