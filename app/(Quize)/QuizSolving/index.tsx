import StyledBtn from '@/components/common/StyledBtn';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import * as S from './style';

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="#969696"
    />
  </Svg>
);

interface Answer {
  id: string;
  text: string;
}

interface Question {
  id: string;
  subject: string;
  question: string;
  answers: Answer[];
  correctAnswerId: string;
}

export default function QuizSolving() {
  const router = useRouter();
  const { subject } = useLocalSearchParams<{ subject: string }>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Mock data - 전달받은 과목 사용
  const currentQuestion: Question = {
    id: '1',
    subject: subject || '과학', // 전달받은 과목 또는 기본값
    question: '한국 통일 이후 신라에서 무열왕계 직계 자손이 왕권을 강화하기 위해 강조한 정치 이념은 무엇인가요?',
    answers: [
      { id: '1', text: '유교' },
      { id: '2', text: '도교' },
      { id: '3', text: '불교' },
      { id: '4', text: '자경' },
    ],
    correctAnswerId: '3',
  };

  const explanation = "신라의 무열왕계 직계 자손들은 삼국 통일 이후 왕권을 공고히 하려는 과정에서 유교의 도덕적·정치적 원리를 강조하였다. 유교는 국가적 통합과 왕권 정당화에 중요한 역할을 했으며, 신라 왕은 유교 도덕을 몸소 실천하며 선정(선한 정치)을 실현하려 했다.";

  const isCorrect = selectedAnswer === currentQuestion.correctAnswerId;

  const handleAnswerPress = (answerId: string) => {
    if (!showResult) {
      setSelectedAnswer(answerId);
    }
  };

  const handleConfirm = () => {
    if (selectedAnswer && !showResult) {
      setShowResult(true);
    } else if (showResult) {
      // Navigate to next question or finish
      router.push('/(Quize)/StudyReport');
      console.log('Next question');
      // TODO: Handle next question or finish
      router.push('/(Quize)/StudyReport');
      router.back();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const getAnswerButtonStyle = (answerId: string) => {
    if (!showResult) {
      return selectedAnswer === answerId ? 'selected' : 'default';
    }
    
    // 정답 표시
    if (answerId === currentQuestion.correctAnswerId) {
      return 'correct';
    }
    
    // 오답 표시 (선택한 답이 틀렸을 경우)
    if (answerId === selectedAnswer && !isCorrect) {
      return 'incorrect';
    }
    
    return 'default';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={handleBack}>
            <BackIcon />
          </S.BackButton>
          <S.SubjectText>{subject}</S.SubjectText>
        </S.Header>

        <S.Content>
          <S.QuestionText>{currentQuestion.question}</S.QuestionText>

          <S.AnswerList>
            {currentQuestion.answers.map((answer) => {
              const buttonStyle = getAnswerButtonStyle(answer.id);
              return (
                <S.AnswerButton
                  key={answer.id}
                  answerState={buttonStyle}
                  onPress={() => handleAnswerPress(answer.id)}
                  disabled={showResult}
                >
                  <S.AnswerText answerState={buttonStyle}>
                    {answer.text}
                  </S.AnswerText>
                </S.AnswerButton>
              );
            })}
          </S.AnswerList>

          {showResult && (
            <S.ResultSection>
              <S.ResultTitle isCorrect={isCorrect}>
                {isCorrect ? '정답입니다' : '오답입니다'}
              </S.ResultTitle>
              <S.ExplanationText isCorrect={isCorrect}>
                {explanation}
              </S.ExplanationText>
            </S.ResultSection>
          )}
        </S.Content>

        <S.BottomContainer>
          <StyledBtn
            label={showResult ? '다음문제' : '확인'}
            onPress={handleConfirm}
            isActive={!!selectedAnswer}
            style={{marginBottom: 40}}
          />
        </S.BottomContainer>
      </S.Container>
    </SafeAreaView>
  );
}
