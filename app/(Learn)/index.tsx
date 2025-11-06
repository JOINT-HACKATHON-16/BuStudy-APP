import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style';
import { Colors } from '@/constants/theme';

interface RouteRecord {
  id: string;
  departure: string;
  arrival: string;
  timeRange: string;
  duration: string;
  date: string;
}

const ClockIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Circle cx="6" cy="6" r="4.5" stroke="#b0b0b0" strokeWidth="1" />
    <Path d="M6 3.5V6H8" stroke="#b0b0b0" strokeWidth="1" strokeLinecap="round" />
  </Svg>
);

const SwitchIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
      stroke={Colors.light.primary30}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowDownIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 3V13M8 13L12 9M8 13L4 9"
      stroke="#5087ee"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Learn: React.FC = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const routeRecords: RouteRecord[] = [
    {
      id: '1',
      departure: '라한 셀렉트, 테디베어박물관',
      arrival: '경주월드, 캘리포니아비치',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      date: '어제',
    },
    {
      id: '2',
      departure: '라한 셀렉트, 테디베어박물관',
      arrival: '경주월드, 캘리포니아비치',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      date: '3일전',
    },
    {
      id: '3',
      departure: '라한 셀렉트, 테디베어박물관',
      arrival: '경주월드, 캘리포니아비치',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      date: '3일전',
    },
    {
      id: '4',
      departure: '라한 셀렉트, 테디베어박물관',
      arrival: '경주월드, 캘리포니아비치',
      timeRange: '오후 8:12 ~ 오후 8:34',
      duration: '18분',
      date: '3일전',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }} edges={['top']}>
      <S.LearnContainer>
        <S.Header>
          <S.HeaderTitle>bustudy</S.HeaderTitle>
        </S.Header>

        <S.ContentWrapper> 
          <S.SectionTitle>오늘의 학습 시작하기</S.SectionTitle>

          <S.RouteInputContainer>
            <S.SwitchIconContainer>
              <SwitchIcon />
            </S.SwitchIconContainer>

            <S.InputWrapper>
              <S.InputField>
                <S.InputLabel>출발</S.InputLabel>
                <S.TextInput
                  placeholder="출발 정류장을 입력해주세요"
                  placeholderTextColor="#cacaca"
                  value={departure}
                  onChangeText={setDeparture}
                />
              </S.InputField>

              <S.InputField>
                <S.InputLabel>도착</S.InputLabel>
                <S.TextInput
                  placeholder="도착 정류장을 입력해주세요"
                  placeholderTextColor="#cacaca"
                  value={arrival}
                  onChangeText={setArrival}
                />
              </S.InputField>
            </S.InputWrapper>
          </S.RouteInputContainer>
        </S.ContentWrapper>

        <S.ScrollContainer 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 120 }}
        >
          <S.RouteList>
            {routeRecords.map((record) => (
              <S.RouteCard key={record.id}>
                <S.RouteInfo>
                  <S.LocationText>{record.departure}</S.LocationText>
                  <S.ArrowIconContainer>
                    <ArrowDownIcon />
                  </S.ArrowIconContainer>
                  <S.LocationText>{record.arrival}</S.LocationText>
                </S.RouteInfo>

                <S.RouteFooter>
                  <S.TimeRow>
                    <S.ClockIcon>
                      <ClockIcon />
                    </S.ClockIcon>
                    <S.TimeText>
                      {record.timeRange} ({record.duration})
                    </S.TimeText>
                  </S.TimeRow>
                  <S.DateText>{record.date}</S.DateText>
                </S.RouteFooter>
              </S.RouteCard>
            ))}
          </S.RouteList>
        </S.ScrollContainer>
      </S.LearnContainer>
    </SafeAreaView>
  );
};

export default Learn;
