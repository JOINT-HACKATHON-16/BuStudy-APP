import StyledBtn from '@/components/common/StyledBtn';
import getSub, { Subject } from '@/hooks/learn/useGetSub';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 과목 목록 가져오기
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const response = await getSub();
        setSubjects(response.subjects);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectPress = (subjectId: number, subjectName: string) => {
    setSelectedSubject(subjectName);
  };

  const handleNext = async () => {
    if (selectedSubject) {
      // TODO: 실제 서버 API 호출로 교체 필요
      // 예시: const response = await fetch(`/api/learning-type?subject=${selectedSubject}`);
      // const { learningType } = await response.json();
      
      // 임시로 랜덤하게 학습 타입 결정 (테스트용)
      const learningTypes: ('quiz' | 'audio' | 'video')[] = ['quiz', 'audio', 'video'];
      // 
      const learningType = learningTypes[1];
      
      console.log('Selected subject:', selectedSubject, 'Learning type:', learningType);
      
      // 학습 타입에 따라 다른 페이지로 이동
      if (learningType === 'quiz') {
        router.push({
          pathname: '/(Quize)/QuizSolving',
          params: { subject: selectedSubject }
        });
      } else if (learningType === 'audio') {
        router.push({
          pathname: '/(Quize)/AudioLearn',
          params: { subject: selectedSubject }
        });
      } else if (learningType === 'video') {
        router.push({
          pathname: '/(Quize)/VideoLearn',
          params: { subject: selectedSubject }
        });
      }
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

          {isLoading ? (
            <S.LoadingContainer>
              <ActivityIndicator size="large" color="#4486ff" />
            </S.LoadingContainer>
          ) : (
            <S.SubjectList>
              {subjects.map((subject) => (
                <S.SubjectButton
                  key={subject.subjectId}
                  onPress={() => handleSubjectPress(subject.subjectId, subject.subject)}
                  selected={selectedSubject === subject.subject}
                  activeOpacity={0.7}
                >
                  <S.SubjectText selected={selectedSubject === subject.subject}>
                    {subject.subject}
                  </S.SubjectText>
                </S.SubjectButton>
              ))}
              
              <S.RegisterButton onPress={handleRegisterSubject} activeOpacity={0.7}>
                <S.RegisterText>과목 등록하기</S.RegisterText>
              </S.RegisterButton>
            </S.SubjectList>
          )}
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
