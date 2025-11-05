import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style';

interface StudyRecord {
  id: string;
  subject: string;
  date: string;
  timeRange: string;
  duration: string;
  problemCount: number;
  accuracy: string;
  isActive?: boolean;
  isNew?: boolean;
  isPerfect?: boolean;
}

const ClockIcon: React.FC<{ isActive?: boolean }> = ({ isActive }) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Circle 
      cx="6" 
      cy="6" 
      r="4.5" 
      stroke={isActive ? "#dbe7ff" : "#b0b0b0"} 
      strokeWidth="1"
    />
    <Path 
      d="M6 3.5V6H8" 
      stroke={isActive ? "#dbe7ff" : "#b0b0b0"} 
      strokeWidth="1" 
      strokeLinecap="round"
    />
  </Svg>
);

const Storage: React.FC = () => {
  const studyRecords: StudyRecord[] = [
    {
      id: '1',
      subject: '수학',
      date: '25.11.05',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 16,
      accuracy: '85.2%',
      isActive: true,
    },
    {
      id: '2',
      subject: '영어',
      date: '25.11.04',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 16,
      accuracy: '85.2%',
      isNew: true,
    },
    {
      id: '3',
      subject: '과학',
      date: '25.11.03',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 32,
      accuracy: '100%',
      isNew: true,
      isPerfect: true,
    },
    {
      id: '4',
      subject: '국어',
      date: '25.11.02',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 16,
      accuracy: '85.2%',
    },
    {
      id: '5',
      subject: '영어',
      date: '25.11.02',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 16,
      accuracy: '85.2%',
    },
    {
      id: '6',
      subject: '수학',
      date: '25.11.02',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      problemCount: 16,
      accuracy: '85.2%',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
      <S.StorageContainer>
        <S.Header>
          <S.HeaderTitle>bustudy</S.HeaderTitle>
        </S.Header>

        <S.ScrollContainer 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <S.ContentWrapper>
            <S.StudyCardList>
              {studyRecords.map((record) => (
                <S.StudyCard key={record.id} isActive={record.isActive}>
                  <S.CardHeader>
                    <S.SubjectTitle isActive={record.isActive}>
                      {record.subject}
                    </S.SubjectTitle>
                    {record.isNew && <S.NewBadge />}
                  </S.CardHeader>

                  <S.CardContent>
                    <S.LeftInfo>
                      <S.DateText isActive={record.isActive}>
                        {record.date}
                      </S.DateText>
                      <S.TimeRow>
                        <S.ClockIcon>
                          <ClockIcon isActive={record.isActive} />
                        </S.ClockIcon>
                        <S.TimeText isActive={record.isActive}>
                          {record.timeRange} ({record.duration})
                        </S.TimeText>
                      </S.TimeRow>
                    </S.LeftInfo>

                    <S.RightInfo>
                      <S.InfoText isActive={record.isActive}>
                        오늘의 문제 수: {record.problemCount}개
                      </S.InfoText>
                      <S.InfoText 
                        isActive={record.isActive} 
                        isPerfect={record.isPerfect}
                      >
                        정답률: {record.accuracy}
                      </S.InfoText>
                    </S.RightInfo>
                  </S.CardContent>
                </S.StudyCard>
              ))}
            </S.StudyCardList>
          </S.ContentWrapper>
        </S.ScrollContainer>
      </S.StorageContainer>
    </SafeAreaView>
  );
};

export default Storage;
