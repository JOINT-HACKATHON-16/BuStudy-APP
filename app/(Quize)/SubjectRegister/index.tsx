import { Colors } from '@/constants/theme';
import { usePostSubject } from '@/hooks/learn/useRegisterSub';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style';

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill={Colors.light.gray8}
    />
  </Svg>
);

const CameraIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2M8.9 13.98l2.1 2.53l3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68a.5.5 0 0 1-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02"
      fill={Colors.light.gray8}
    />
  </Svg>
);

const NextIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 12 24" fill="none">
    <Path
      d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"
      fill={Colors.light.white}
      transform="rotate(-180 5.02 9.505)"
      strokeWidth={2}
    />
  </Svg>
);

const GalleryCircleIcon = () => (
  <Svg width="60" height="60" viewBox="0 0 56 56" fill="none">
    <Circle cx="28" cy="28" r="24" fill="#E6E6E6" />
    <Circle cx="28" cy="28" r="21.533" fill="#F6F6F6" />
  </Svg>
);

export default function SubjectRegister() {
  const router = useRouter();
  const [subjectImage, setSubjectImage] = useState<string | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // usePostSubject 훅 사용
  const postSubjectMutation = usePostSubject({
    onSuccess: (data) => {
      console.log('과목 등록 성공:', data);
      Alert.alert('성공', '과목이 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => router.push('/(Quize)/SubjectDetail'),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('과목 등록 실패:', error);
      
      // 413 에러 (Payload Too Large) 처리
      if (error.response?.status === 413) {
        Alert.alert(
          '파일 크기 초과',
          '이미지 파일이 너무 큽니다. 더 작은 이미지를 선택해주세요.'
        );
      } else {
        Alert.alert('오류', '과목 등록에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleBack = () => {
    router.back();
  };

  // 카메라로 사진 찍기
  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.3, // 이미지 품질을 더 낮춤 (30%)
          exif: false, // EXIF 데이터 제거
        });
        if (photo) {
          setSubjectImage(photo.uri);
        }
      } catch (error) {
        console.error('Take picture error:', error);
        Alert.alert('오류', '사진을 찍을 수 없습니다.');
      }
    }
  };

  // 카메라 버튼 클릭 -> 갤러리에서 사진 선택
  const handleCameraButtonClick = async () => {
    try {
      // 갤러리 권한 요청
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
        return;
      }

      // 갤러리에서 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        exif: false, // EXIF 데이터 제거
      });

      if (!result.canceled && result.assets[0]) {
        setSubjectImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('오류', '갤러리를 열 수 없습니다.');
    }
  };

  const handleNextButtonClick = async () => {
    if (!subjectImage) {
      Alert.alert('사진을 선택해주세요', '과목 이미지를 촬영하거나 갤러리에서 선택해주세요.');
      return;
    }

    // API 호출 - 이미지 URI만 전달하면 됩니다
    postSubjectMutation.mutate({
      imageUri: subjectImage,
    });
  };

  // 카메라 권한 요청
  React.useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermission();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '카메라 권한이 필요합니다.');
      }
    })();
  }, [requestCameraPermission]);

  if (!cameraPermission) {
    return null;
  }

  if (!cameraPermission.granted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
        <S.Container>
          <S.Header>
            <S.BackButton onPress={handleBack}>
              <BackIcon />
            </S.BackButton>
            <S.HeaderTitle>과목 등록하기</S.HeaderTitle>
          </S.Header>
          <S.PlaceholderBox>
            <S.HeaderTitle>카메라 권한이 필요합니다</S.HeaderTitle>
          </S.PlaceholderBox>
        </S.Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={handleBack}>
            <BackIcon />
          </S.BackButton>
          <S.HeaderTitle>과목 등록하기</S.HeaderTitle>
        </S.Header>

        <S.ImagePreviewSection>
          {subjectImage ? (
            <S.PreviewImage source={{ uri: subjectImage }} />
          ) : (
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing="back"
            />
          )}
        </S.ImagePreviewSection>

        <S.BottomSheet>
          <S.ImageActionContainer>
            <S.CameraButton onPress={handleCameraButtonClick} disabled={postSubjectMutation.isPending}>
              <S.CameraIconBox>
                <CameraIcon />
              </S.CameraIconBox>
            </S.CameraButton>
            <S.GalleryButton onPress={handleTakePicture} disabled={postSubjectMutation.isPending}>
              <GalleryCircleIcon />
            </S.GalleryButton>
            <S.NextButton 
              onPress={handleNextButtonClick} 
              disabled={!subjectImage || postSubjectMutation.isPending}
            >
              <S.NextIconBox disabled={!subjectImage || postSubjectMutation.isPending}>
                {postSubjectMutation.isPending ? (
                  <ActivityIndicator size="small" color={Colors.light.white} />
                ) : (
                  <NextIcon />
                )}
              </S.NextIconBox>
            </S.NextButton>
          </S.ImageActionContainer>

        </S.BottomSheet>
      </S.Container>
    </SafeAreaView>
  );
}
