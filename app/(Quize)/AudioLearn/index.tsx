import StyledBtn from "@/components/common/StyledBtn";
import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import React, { useState } from "react";
import { Modal, Platform, Alert } from "react-native";
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

export default function AudioLearn() {
  const router = useRouter();
  const { subject } = useLocalSearchParams<{ subject: string }>();
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const audioContent = {
    title: "신라의 무열왕계와 유교 사상",
    description:
      "신라의 무열왕계 직계 자손들은 삼국 통일 이후 왕권을 공고히 하려는 과정에서 유교의 도덕적·정치적 원리를 강조하였다. 유교는 국가적 통합과 왕권 정당화에 중요한 역할을 했으며, 신라 왕은 유교 도덕을 몸소 실천하며 선정(선한 정치)을 실현하려 했다.",
  };

  const handleStartAudio = async () => {
    setIsAudioStarted(true);
    
    try {
      // 오디오 모드 설정 (Expo Go 호환성을 위해)
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // 사용 가능한 음성 확인
      const voices = await Speech.getAvailableVoicesAsync();
      console.log('Available voices:', voices);

      // 텍스트를 음성으로 변환
      Speech.speak(audioContent.description, {
        language: 'ko-KR',
        pitch: 1.0,
        rate: 0.9,
        onStart: () => {
          console.log('Speech started');
        },
        onDone: () => {
          console.log('Speech done');
        },
        onStopped: () => {
          console.log('Speech stopped');
        },
        onError: (error) => {
          console.error('Speech error:', error);
          Alert.alert('오류', '음성 재생 중 오류가 발생했습니다.');
        },
      });
    } catch (error) {
      console.error('Audio setup error:', error);
      Alert.alert('오류', '오디오 설정 중 오류가 발생했습니다.');
    }
  };

  const handleComplete = () => {
    // 종료 확인 모달 표시
    setShowExitModal(true);
  };

  const handleExitStudy = () => {
    // 음성 중지
    Speech.stop();
    setShowExitModal(false);
    // 홈 화면으로 이동
    router.push("/(tabBar)/TabBarLayout");
  };

  const handleContinueStudy = () => {
    // 모달만 닫기
    setShowExitModal(false);
  };

  React.useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 음성 중지
      Speech.stop();
    };
  }, []);

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
          <S.AudioSection>
            <S.AudioTitle>{audioContent.title}</S.AudioTitle>

            <S.DescriptionContainer>
              <S.DescriptionText>{audioContent.description}</S.DescriptionText>
            </S.DescriptionContainer>
          </S.AudioSection>

          <S.BottomButtonContainer>
            <StyledBtn 
              label={isAudioStarted ? "완료" : "오디오 실행하기"} 
              onPress={isAudioStarted ? handleComplete : handleStartAudio} 
              isActive={true} 
            />
          </S.BottomButtonContainer>
        </S.ContentContainer>

        <Modal
          visible={showExitModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowExitModal(false)}
        >
          <S.ModalOverlay>
            <S.ModalContainer>
              <S.ModalTitle>학습을 종료하시겠습니까?</S.ModalTitle>
              <S.ModalButtonContainer>
                <S.ModalButton onPress={handleExitStudy} activeOpacity={0.7} isExit>
                  <S.ModalButtonText isExit>종료하기</S.ModalButtonText>
                </S.ModalButton>
                <S.ModalButton onPress={handleContinueStudy} activeOpacity={0.7} isExit={false}>
                  <S.ModalButtonText isExit={false}>계속하기</S.ModalButtonText>
                </S.ModalButton>
              </S.ModalButtonContainer>
            </S.ModalContainer>
          </S.ModalOverlay>
        </Modal>
      </S.Container>
    </SafeAreaView>
  );
}
