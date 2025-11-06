import StyledBtn from '@/components/common/StyledBtn';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style';

interface RouteRecord {
  id: string;
  departure: string;
  arrival: string;
  timeRange: string;
  duration: string;
  date: string;
}

interface StationOption {
  id: string;
  name: string;
  direction: string;
}

interface BusStation {
  id: string;
  name: string;
  time: string;
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

const ArrowDownIcon: React.FC<{ rotated?: boolean }> = ({ rotated = false }) => (
  <Svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
    style={{ transform: [{ rotate: rotated ? '180deg' : '0deg' }] }}
  >
    <Path
      d="M4 6L8 10L12 6"
      stroke="#cacaca"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RouteArrowIcon: React.FC = () => (
  <Svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
  >
    <Path
      d="M8 3L8 13M8 13L4 9M8 13L12 9"
      stroke={Colors.light.primary30}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Learn: React.FC = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArrivalFocused, setIsArrivalFocused] = useState(false);
  const router = useRouter();

  const stationOptions: StationOption[] = [
    {
      id: '1',
      name: '라한 셀렉트, 테디베어박물관',
      direction: '소호캄, 일성콘도 방향',
    },
    {
      id: '2',
      name: '수상공연장입구',
      direction: '켄싱턴리조트, 환화콘도 방향',
    },
  ];

  const busStations: BusStation[] = [
    {
      id: '1',
      name: '경주월드, 캘리포니아비치',
      time: '4분',
    },
    {
      id: '2',
      name: '라한 셀렉트, 테디베어박물관',
      time: '6분',
    },
    {
      id: '3',
      name: '수상공연장입구',
      time: '8분',
    },
    {
      id: '4',
      name: '켄싱턴리조트',
      time: '10분',
    },
    {
      id: '5',
      name: '환화콘도',
      time: '12분',
    },
  ];

  // 검색어로 버스 정류장 필터링
  const filteredBusStations = busStations.filter(station =>
    station.name.toLowerCase().includes(arrival.toLowerCase())
  );

  const handleSelectStation = (station: StationOption) => {
    setDeparture(station.name);
    setIsDropdownOpen(false);
  };

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
            < View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} >
              <S.SwitchIconContainer>
              <SwitchIcon />
            </S.SwitchIconContainer>

            <S.InputWrapper>
              <S.InputField>
                <S.InputLabel>출발</S.InputLabel>
                <S.DropdownButton 
                  onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                  activeOpacity={1}
                >
                  <S.DropdownText selected={!!departure}>
                    {departure || '출발 정류장을 선택해주세요'}
                  </S.DropdownText>
                  <S.ArrowIconWrapper>
                    <ArrowDownIcon rotated={isDropdownOpen} />
                  </S.ArrowIconWrapper>
                </S.DropdownButton>

                {isDropdownOpen && (
                  <S.DropdownList>
                    {stationOptions.map((station) => (
                      <S.DropdownItem 
                        key={station.id}
                        onPress={() => handleSelectStation(station)}
                        activeOpacity={0.7}
                      >
                        <S.StationName>{station.name}</S.StationName>
                        <S.StationDirection>{station.direction}</S.StationDirection>
                      </S.DropdownItem>
                    ))}
                  </S.DropdownList>
                )}
              </S.InputField>

              <S.InputField>
                <S.InputLabel>도착</S.InputLabel>
                <S.TextInput
                  placeholder="도착 정류장을 입력해주세요"
                  placeholderTextColor="#cacaca"
                  value={arrival}
                  onChangeText={setArrival}
                  onFocus={() => setIsArrivalFocused(true)}
                  onBlur={() => {
                    // 텍스트가 비어있을 때만 포커스 해제
                    if (arrival === '') {
                      setIsArrivalFocused(false);
                    }
                  }}
                />
              </S.InputField>
            </S.InputWrapper>
            </View>
            
          </S.RouteInputContainer>

          
        </S.ContentWrapper>

        <S.ScrollContainer 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 120 }}
        >
          {departure !== '' && arrival !== '' && !isArrivalFocused ? (
            <View style={{ flex: 1, alignItems:'flex-end'}}>
              <ThemedText style={{color: Colors.light.primary60}}>예상 소요시간 : 35분 {}</ThemedText>
              <StyledBtn
                label="학습 시작"
                onPress={() => {
                  router.push('/(Quize)/SubjectSelection');
                }}
                style={{ width: '100%', height: 48, position: 'absolute', bottom: -360 }}
                isActive={true}
              />
            </View>
          ) : isArrivalFocused ? (
            <View>
              <S.SectionTitle>버스 정류장</S.SectionTitle>
              <S.BusStationList>
                {filteredBusStations.map((station) => (
                  <S.BusStationCard 
                    key={station.id}
                    onPress={() => {
                      setArrival(station.name);
                      setIsArrivalFocused(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <S.BusStationName>{station.name}</S.BusStationName>
                    <S.BusTimeInfo>
                      <S.ClockIcon>
                        <ClockIcon />
                      </S.ClockIcon>
                      <S.BusTime>{station.time}</S.BusTime>
                    </S.BusTimeInfo>
                  </S.BusStationCard>
                ))}
              </S.BusStationList>
            </View>
          ) : (
            <View>
              <S.SectionTitle>최근 노선</S.SectionTitle>
              <S.RouteList>
              {routeRecords.map((record) => (
                <S.RouteCard key={record.id}>
                  <S.RouteInfo>
                    <S.LocationText>{record.departure}</S.LocationText>
                    <S.ArrowIconContainer>
                      <RouteArrowIcon />
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
            </View>
          )}

        </S.ScrollContainer>
        
      </S.LearnContainer>
    </SafeAreaView>
  );
};

export default Learn;
