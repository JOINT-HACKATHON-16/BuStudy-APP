import StyledBtn from '@/components/common/StyledBtn';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="#969696"
    />
  </Svg>
);

const ArrowUpIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 12L8 4M8 4L4 8M8 4L12 8"
      stroke={Colors.light.primary30}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Circle cx="6" cy="6" r="5" stroke="#969696" strokeWidth="1.2" fill="none" />
    <Path
      d="M6 3V6L8 7.5"
      stroke="#969696"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function StudyReport() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // params에서 데이터 파싱
  let parsedQuestions: Question[] = [];
  let parsedUserAnswers: { [key: number]: string } = {};
  
  try {
    if (params.questions) {
      const questionsString = Array.isArray(params.questions) 
        ? params.questions[0] 
        : params.questions;
      parsedQuestions = JSON.parse(questionsString);
    }
    
    if (params.userAnswers) {
      const answersString = Array.isArray(params.userAnswers)
        ? params.userAnswers[0]
        : params.userAnswers;
      parsedUserAnswers = JSON.parse(answersString);
    }
  } catch (error) {
    console.error('Data parsing error:', error);
  }

  const totalQuestions = parseInt(params.totalQuestions as string) || parsedQuestions.length;
  const accuracy = parseFloat(params.accuracy as string) || 0;

  // 현재 시간 기준으로 시작/종료 시간 계산
  const now = new Date();
  const endTime = new Date(now.getTime() + 10 * 60000); // 10분 후

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const routeInfo = {
    departure: '성북3통굿개말길',
    arrival: '방동저수지',
    date: formatDate(now),
    time: `${formatTime(now)} ~ ${formatTime(endTime)} (10분)`,
    problemCount: totalQuestions,
    accuracy: accuracy,
  };

  // 퀴즈 결과 데이터 생성
  const quizResults = parsedQuestions.map((question, index) => {
    const userAnswer = parsedUserAnswers[index];
    
    return {
      id: index + 1,
      question: question.question,
      answers: question.options,
      correctAnswerId: question.correctAnswer, // "0", "1", "2", "3"
      userAnswer: userAnswer, // "0", "1", "2", "3"
      explanation: question.explanation,
    };
  });

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    router.dismissAll();
    router.push('/(tabBar)/TabBarLayout');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={handleBack}>
            <BackIcon />
          </S.BackButton>
          <S.HeaderTitle>공부 리포트</S.HeaderTitle>
        </S.Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <S.ContentWrapper>
            {/* 경로 정보 카드 */}
            <S.RouteInfoCard>
              <S.RouteInfoTop>
                <S.RouteLocation>{routeInfo.departure}</S.RouteLocation>
                <S.ArrowIconContainer>
                  <ArrowUpIcon />
                </S.ArrowIconContainer>
                <S.RouteLocation>{routeInfo.arrival}</S.RouteLocation>
              </S.RouteInfoTop>

              <S.RouteInfoBottom>
                <S.RouteInfoLeft>
                  <S.DateText>{routeInfo.date}</S.DateText>
                  <S.TimeRow>
                    <ClockIcon />
                    <S.TimeText>{routeInfo.time}</S.TimeText>
                  </S.TimeRow>
                </S.RouteInfoLeft>

                <S.RouteInfoRight>
                  <S.StatsText>오늘의 문제 수: {routeInfo.problemCount}개</S.StatsText>
                  <S.StatsRow>
                    <S.StatsLabel>정답률: </S.StatsLabel>
                    <S.AccuracyText>{routeInfo.accuracy}%</S.AccuracyText>
                  </S.StatsRow>
                </S.RouteInfoRight>
              </S.RouteInfoBottom>
            </S.RouteInfoCard>

            {/* 퀴즈 결과 목록 */}
            <S.QuizListContainer>
              {quizResults.map((quiz) => {
                const isCorrect = quiz.userAnswer === quiz.correctAnswerId;

                return (
                  <S.QuizItemContainer key={quiz.id}>
                    <S.QuizNumberText>문제 {quiz.id}번</S.QuizNumberText>

                    <S.QuizCard>
                      <S.QuizQuestionText>{quiz.question}</S.QuizQuestionText>

                      <S.AnswerList>
                        {quiz.answers.map((answer, index) => {
                          const answerId = index.toString(); // "0", "1", "2", "3"
                          const isUserAnswer = answerId === quiz.userAnswer;
                          const isCorrectAnswer = answerId === quiz.correctAnswerId;
                          
                          let answerState = 'default';
                          
                          // 사용자가 선택한 오답을 먼저 체크 (빨간색)
                          if (isUserAnswer && !isCorrect) {
                            answerState = 'incorrect';
                          }
                          // 정답 표시 (초록색) - 사용자가 맞췄든 틀렸든 항상 표시
                          if (isCorrectAnswer) {
                            answerState = 'correct';
                          }

                          return (
                            <S.AnswerItem key={answerId} answerState={answerState}>
                              <S.AnswerItemText answerState={answerState}>
                                {answer}
                              </S.AnswerItemText>
                            </S.AnswerItem>
                          );
                        })}
                      </S.AnswerList>

                      <S.ResultContainer>
                        <S.ResultStatusText>
                          {isCorrect ? '정답입니다' : '오답입니다'}
                        </S.ResultStatusText>
                        <S.ResultExplanationText isCorrect={isCorrect}>
                          {quiz.explanation}
                        </S.ResultExplanationText>
                      </S.ResultContainer>
                    </S.QuizCard>
                  </S.QuizItemContainer>
                );
              })}
            </S.QuizListContainer>
          </S.ContentWrapper>
        </ScrollView>

        <S.GradientOverlay />
        
        <S.BottomButtonContainer>
          <StyledBtn
            label="확인"
            onPress={handleConfirm}
            style={{ width: '100%', height: 48, marginBottom: 20 }}
            isActive={true}
          />
        </S.BottomButtonContainer>
      </S.Container>
    </SafeAreaView>
  );
}
