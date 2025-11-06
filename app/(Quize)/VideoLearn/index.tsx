import StyledBtn from "@/components/common/StyledBtn";
import { Colors } from "@/constants/theme";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as S from "./style";

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="#969696"
    />
  </Svg>
);

const PlayIcon = () => (
  <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <Path d="M20 12L48 32L20 52V12Z" fill="#ffffff" />
  </Svg>
);

const PauseIcon = () => (
  <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <Path d="M18 12H26V52H18V12ZM38 12H46V52H38V12Z" fill="#ffffff" />
  </Svg>
);

export default function VideoLearn() {
  const router = useRouter();
  const { subject } = useLocalSearchParams<{ subject: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<Video>(null);

  const videoContent = {
    title: "신라의 무열왕계와 유교 사상",
    description:
      "신라의 무열왕계 직계 자손들은 삼국 통일 이후 왕권을 공고히 하려는 과정에서 유교의 도덕적·정치적 원리를 강조하였다. 유교는 국가적 통합과 왕권 정당화에 중요한 역할을 했으며, 신라 왕은 유교 도덕을 몸소 실천하며 선정(선한 정치)을 실현하려 했다.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // 샘플 비디오
  };

  const handlePlayPause = async () => {
    try {
      if (videoRef.current) {
        if (isPlaying) {
          await videoRef.current.pauseAsync();
        } else {
          await videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Video playback error:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
    setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleComplete = () => {
    router.push("/(tabBar)/TabBarLayout");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => router.back()}>
            <BackIcon />
          </S.BackButton>
          <S.SubjectText>{subject}</S.SubjectText>
        </S.Header>

        <S.ContentContainer>
          <S.VideoSection>
            <S.VideoTitle>{videoContent.title}</S.VideoTitle>

            <S.VideoPlayerContainer
              onPress={handleVideoPress}
              activeOpacity={1}
            >
              <Video
                ref={videoRef}
                source={{ uri: videoContent.videoUrl }}
                style={{ width: "100%", height: "100%" }}
                resizeMode={ResizeMode.CONTAIN}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                shouldPlay={false}
              />

              {showControls && (
                <S.VideoControlsOverlay>
                  <S.PlayButtonOverlay
                    onPress={handlePlayPause}
                    activeOpacity={0.8}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </S.PlayButtonOverlay>
                </S.VideoControlsOverlay>
              )}

              <S.VideoBottomControls>
                <S.ProgressBar>
                  <S.ProgressFill
                    progress={(currentTime / duration) * 100 || 0}
                  />
                </S.ProgressBar>
                <S.TimeContainer>
                  <S.TimeText>{formatTime(currentTime)}</S.TimeText>
                  <S.TimeText>{formatTime(duration)}</S.TimeText>
                </S.TimeContainer>
              </S.VideoBottomControls>
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
