import StyledBtn from '@/components/common/StyledBtn';
import getSub, { Subject } from '@/hooks/learn/useGetSub';
import { useLearningStartMutation } from '@/hooks/study/useLearningStart';
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
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 학습 시작 API 호출 훅
  const learningStartMutation = useLearningStartMutation({
    onSuccess: (data) => {
      console.log('학습 시작 성공:', data);
      
      // contentType에 따라 다른 페이지로 이동
      if (data.contentType === 'QUIZ') {
        router.push({
          pathname: '/(Quize)/QuizSolving',
          params: { 
            subject: selectedSubject,
            uploadId: data.uploadId,
            questions: JSON.stringify(data.questions),
            totalQuestions: data.totalQuestions.toString(),
          }
        });
      } else if (data.contentType === 'AUDIO') {
        router.push({
          pathname: '/(Quize)/AudioLearn',
          params: { 
            subject: selectedSubject,
            uploadId: data.uploadId,
            content: data.content,
            duration: data.duration.toString(),
          }
        });
      } else if (data.contentType === 'LECTURE') {
        router.push({
          pathname: '/(Quize)/VideoLearn',
          params: { 
            subject: selectedSubject,
            lectureId: data.lectureId,
          }
        });
      }
    },
    onError: (error: any) => {
      console.error('학습 시작 실패:', error);
      console.error('에러 상세:', error.response?.data);
      console.error('에러 상태:', error.response?.status);
      alert(`학습을 시작할 수 없습니다.\n${error.response?.data?.message || '다시 시도해주세요.'}`);
    },
  });

  // 컴포넌트 마운트 시 과목 목록 가져오기
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const response = await getSub();
        console.log('과목 목록 조회 성공:', response.subjects);
        setSubjects(response.subjects);
      } catch (error: any) {
        console.error('과목 목록 조회 실패:', error);
        console.error('에러 상세:', error.message);
        setSubjects([]);
        // 타임아웃 에러인 경우 특별 처리
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          console.warn('서버 응답 시간 초과. 과목이 없는 것으로 처리합니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectPress = (subjectId: number, subjectName: string) => {
    setSelectedSubject(subjectName);
    setSelectedSubjectId(subjectId);
  };

  const handleNext = async () => {
    if (selectedSubject && selectedSubjectId) {
      console.log('학습 시작 요청:', { subjectId: selectedSubjectId });
      
      // 학습 시작 API 호출 - subjectId만 전달
      learningStartMutation.mutate({
        subjectId: selectedSubjectId,
      });
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
            isActive={!!selectedSubject && !learningStartMutation.isPending}
            style={{marginBottom: 40}}
          />
        </S.BottomContainer>
      </S.Container>
    </SafeAreaView>
  );
};

export default SubjectSelection;
