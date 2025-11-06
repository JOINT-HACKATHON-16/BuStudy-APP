import StyledBtn from '@/components/common/StyledBtn';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import * as S from './style';

const BackIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#969696"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SubjectSelection: React.FC = () => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    { id: '1', name: '영어' },
    { id: '2', name: '수학' },
    { id: '3', name: '과학' },
  ];

  const handleSubjectPress = (subjectName: string) => {
    setSelectedSubject(subjectName);
  };

  const handleNext = () => {
    if (selectedSubject) {
      router.push({
        pathname: '/(Quize)/QuizSolving',
        params: { subject: selectedSubject }
      });
      console.log('Selected subject:', selectedSubject);
    }
  };

  const handleRegisterSubject = () => {
    // 과목 등록 페이지로 이동
    router.push('/(Quize)/SubjectRegister');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => router.back()} activeOpacity={0.7}>
            <BackIcon />
          </S.BackButton>
        </S.Header>

        <S.Content>
          <S.Title>오늘 공부할 과목은 무엇인가요?</S.Title>

          <S.SubjectList>
            {subjects.map((subject) => (
              <S.SubjectButton
                key={subject.id}
                onPress={() => handleSubjectPress(subject.name)}
                selected={selectedSubject === subject.name}
                activeOpacity={0.7}
              >
                <S.SubjectText selected={selectedSubject === subject.name}>
                  {subject.name}
                </S.SubjectText>
              </S.SubjectButton>
            ))}
            
            <S.RegisterButton onPress={handleRegisterSubject} activeOpacity={0.7}>
              <S.RegisterText>과목 등록하기</S.RegisterText>
            </S.RegisterButton>
          </S.SubjectList>
        </S.Content>

        <S.BottomContainer>
          <StyledBtn
            label="다음"
            onPress={handleNext}
            isActive={!!selectedSubject}
            style={{marginBottom: 40}}
          />
        </S.BottomContainer>
      </S.Container>
    </SafeAreaView>
  );
};

export default SubjectSelection;
