import StyledBtn from "@/components/common/StyledBtn";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as S from "./style";

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill={Colors.light.gray8}
    />
  </Svg>
);

export default function SubjectDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ subject?: string }>();

  // API 응답에서 받은 과목 이름
  const subjectName = params.subject || "과목";

  const handleBack = () => {
    router.back();
  };

  const handleComplete = () => {
    // 과목 등록 완료 후 SubjectSelection으로 이동
    router.push("/(Quize)/SubjectSelection");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={handleBack} activeOpacity={0.7}>
            <BackIcon />
          </S.BackButton>
          <S.HeaderTitle>과목 등록하기</S.HeaderTitle>
          <S.EmptyBox />
        </S.Header>

        <S.ContentContainer>
          <ThemedText type="Subtitle1">과목 이름을 입력해주세요</ThemedText>
          <S.InputContainer>
            <View style={{ gap: 8 }}>
              <ThemedText>과목 이름</ThemedText>
              <S.Input editable={false} pointerEvents="none" >
                {subjectName}
              </S.Input>
            </View>
          </S.InputContainer>

          <S.GradientOverlay>
            <StyledBtn onPress={handleComplete} label="다음" isActive={true} />
          </S.GradientOverlay>
        </S.ContentContainer>
      </S.Container>
    </SafeAreaView>
  );
}
