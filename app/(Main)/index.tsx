import AttendanceSection from '@/components/main/attendanceSection';
import FavoriteRoutesSection from '@/components/main/favoriteRoutesSection';
import Header from '@/components/main/header';
import StudyCardsSection from '@/components/main/studyCardSection';
import React from 'react';
import * as S from './style';

const Main = () => {
  const studyCards = [
    {
      id: 1,
      backgroundColor: '#5087ee',
      from: '라한 셀렉트, 테디베어박물관',
      to: '경주월드, 캘리포니아비치',
      subject: '수학',
      title: '틀린문제 다시 보기',
      date: '25.11.05',
      time: '오후 8:12 ~ 오후 8:34 (18분)',
      problemCount: 16,
      accuracy: 85.2,
    },
    {
      id: 2,
      backgroundColor: '#9eb9ea',
      from: '라한 셀렉트, 테디베어박물관',
      to: '경주월드, 캘리포니아비치',
      subject: '수학',
      title: '틀린문제 다시 보기',
      date: '25.11.05',
      time: '오후 8:12 ~ 오후 8:34 (18분)',
      problemCount: 16,
      accuracy: 85.2,
    },
  ];

  const favoriteRoutes = [
    { id: 1, from: '라한 셀렉트, 테디베어박물관', to: '경주월드, 캘리포니아비치', time: '어제' },
    { id: 2, from: '라한 셀렉트, 테디베어박물관', to: '경주월드, 캘리포니아비치', time: '3일전' },
    { id: 3, from: '라한 셀렉트, 테디베어박물관', to: '경주월드, 캘리포니아비치', time: '어제' },
    { id: 4, from: '라한 셀렉트, 테디베어박물관', to: '경주월드, 캘리포니아비치', time: '어제' },
  ];

  const days = [
    { id: 1, label: '일', type: 'empty' as const },
    { id: 2, label: '월', type: 'empty' as const },
    { id: 3, label: '화', type: 'empty' as const },
    { id: 4, label: '수', type: 'today' as const },
    { id: 5, label: '목', type: 'filled' as const },
    { id: 6, label: '금', type: 'filled' as const },
    { id: 7, label: '토', type: 'filled' as const },
  ];

  return (
    <S.MainContainer>
      <S.ScrollContainer showsVerticalScrollIndicator={false}>
        <S.ContentWrapper>
          <Header />
          <StudyCardsSection studyCards={studyCards} />
          <FavoriteRoutesSection routes={favoriteRoutes} />
          <AttendanceSection days={days} />
        </S.ContentWrapper>
      </S.ScrollContainer>
    </S.MainContainer>
  );
};

export default Main;