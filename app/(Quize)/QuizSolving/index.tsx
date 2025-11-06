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

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizSolving() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({}); // 사용자 답변 저장

  // API에서 받은 questions 파싱
  let parsedQuestions: Question[] = [];
  try {
    if (params.questions) {
      const questionsString = Array.isArray(params.questions) 
        ? params.questions[0] 
        : params.questions;
      parsedQuestions = JSON.parse(questionsString);
      console.log('Parsed questions:', parsedQuestions);
    }
  } catch (error) {
    console.error('Questions parsing error:', error);
  }

  // 현재 문제 가져오기
  const currentApiQuestion = parsedQuestions[currentQuestionIndex];
  
  if (!currentApiQuestion) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
        <S.Container>
          <S.Header>
            <S.BackButton onPress={() => router.back()}>
              <BackIcon />
            </S.BackButton>
            <S.SubjectText>{params.subject || "과목"}</S.SubjectText>
          </S.Header>
          <S.Content>
            <S.QuestionText>문제 데이터를 불러올 수 없습니다.</S.QuestionText>
          </S.Content>
        </S.Container>
      </SafeAreaView>
    );
  }

  // API 데이터를 내부 형식으로 변환
  // correctAnswer는 인덱스 문자열 ("0", "1", "2", "3")
  const currentQuestion = {
    id: (currentQuestionIndex + 1).toString(),
    subject: params.subject || '과목',
    question: currentApiQuestion.question,
    answers: currentApiQuestion.options.map((opt: string, idx: number) => ({
      id: idx.toString(), // "0", "1", "2", "3"
      text: opt,
    })),
    correctAnswerId: currentApiQuestion.correctAnswer, // "0", "1", "2", "3"
  };

  const explanation = currentApiQuestion.explanation;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswerId;

  const handleAnswerPress = (answerId: string) => {
    if (!showResult) {
      setSelectedAnswer(answerId);
    }
  };

  const handleConfirm = () => {
    if (selectedAnswer && !showResult) {
      // 사용자 답변 저장
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer,
      }));
      setShowResult(true);
    } else if (showResult) {
      // 다음 문제로 이동
      const totalQuestions = parsedQuestions.length;
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      if (nextQuestionIndex < totalQuestions) {
        // 다음 문제가 있으면 상태 리셋하고 다음 문제로
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // 마지막 문제였으면 학습 리포트로 이동
        console.log('퀴즈 완료. 학습 리포트로 이동');
        
        // 마지막 문제 답변 포함한 최종 답변 객체
        const finalUserAnswers = { ...userAnswers, [currentQuestionIndex]: selectedAnswer };
        
        // 정답률 계산
        const finalCorrectCount = Object.keys(finalUserAnswers).filter((key) => {
          const index = parseInt(key);
          return finalUserAnswers[index] === parsedQuestions[index].correctAnswer;
        }).length;
        
        const accuracy = ((finalCorrectCount / totalQuestions) * 100).toFixed(1);
        
        router.push({
          pathname: '/(Quize)/StudyReport',
          params: {
            subject: params.subject as string,
            uploadId: params.uploadId as string,
            totalQuestions: params.totalQuestions as string,
            questions: params.questions as string,
            userAnswers: JSON.stringify(finalUserAnswers),
            accuracy: accuracy,
          },
        });
      }
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
          <S.SubjectText>
            {params.subject || "과목"} ({currentQuestionIndex + 1}/{parsedQuestions.length})
          </S.SubjectText>
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
