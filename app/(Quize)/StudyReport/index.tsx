import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import * as S from './style';
import StyledBtn from '@/components/common/StyledBtn';
import { Colors } from '@/constants/theme';

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

  const routeInfo = {
    departure: '라한 셀렉트, 테디베어박물관',
    arrival: '경주월드, 캘리포니아비치',
    date: '25.11.06',
    time: '오후 8:12 ~ 오후 8:34 (18분)',
    problemCount: 16,
    accuracy: 85.2,
  };

  const quizResults = [
    {
      id: 1,
      question: '한국 통일 이후 신라에서 무열왕계 직계 자손이 왕권을 강화하기 위해 강조한 정치 이념은 무엇인가요?',
      answers: ['유교', '도교', '불교', '자경'],
      correctAnswerId: 'a',
      userAnswer: 'a',
      explanation: '신라의 무열왕계 직계 자손들은 삼국 통일 이후 왕권을 공고히 하려는 과정에서 유교의 도덕적·정치적 원리를 강조하였다. 유교는 국가적 통합과 왕권 정당화에 중요한 역할을 했으며, 신라 왕은 유교 도덕을 몸소 실천하며 \'선정(선한 정치)\'을 실현하려 했다.',
    },
    {
      id: 2,
      question: '한국 통일 이후 신라에서 무열왕계 직계 자손이 왕권을 강화하기 위해 강조한 정치 이념은 무엇인가요?',
      answers: ['유교', '도교', '불교', '자경'],
      correctAnswerId: 'a',
      userAnswer: 'b',
      explanation: '신라의 무열왕계 직계 자손들은 삼국 통일 이후 왕권을 공고히 하려는 과정에서 유교의 도덕적·정치적 원리를 강조하였다. 유교는 국가적 통합과 왕권 정당화에 중요한 역할을 했으며, 신라 왕은 유교 도덕을 몸소 실천하며 \'선정(선한 정치)\'을 실현하려 했다.',
    },
  ];

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
                const answerLabels = ['a', 'b', 'c', 'd'];

                return (
                  <S.QuizItemContainer key={quiz.id}>
                    <S.QuizNumberText>문제 {quiz.id}번</S.QuizNumberText>

                    <S.QuizCard>
                      <S.QuizQuestionText>{quiz.question}</S.QuizQuestionText>

                      <S.AnswerList>
                        {quiz.answers.map((answer, index) => {
                          const answerId = answerLabels[index];
                          const isUserAnswer = answerId === quiz.userAnswer;
                          const isCorrectAnswer = answerId === quiz.correctAnswerId;
                          
                          let answerState = 'default';
                          if (isCorrectAnswer) {
                            answerState = 'correct';
                          } else if (isUserAnswer && !isCorrect) {
                            answerState = 'incorrect';
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
