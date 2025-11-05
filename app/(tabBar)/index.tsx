import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { Colors } from '@/constants/theme';
import * as S from './style';

interface TabBarProps {
  activeTab?: 'storage' | 'home' | 'study';
  onTabPress?: (tab: 'storage' | 'home' | 'study') => void;
}

export default function TabBar({ activeTab = 'home', onTabPress }: TabBarProps) {
  return (
    <>
      <S.TabBarContainer>
        <S.TabBarContent>
          {/* 보관함 탭 */}
          <S.TabItem onPress={() => onTabPress?.('storage')}>
            <S.TabIconWrapper>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M 9.35714 14.5 H 14.5 M 4.81511 7 H 18.958 M 7.49999 4 H 16.5 M 20.714 11.4191 L 19.1462 18.857 C 19.0365 19.3775 18.5773 19.75 18.0454 19.75 H 5.74891 C 5.20748 19.75 4.74286 19.3643 4.64315 18.8322 L 3.24959 11.3943 C 3.11989 10.702 3.65101 10.0621 4.35535 10.0621 H 19.6132 C 20.3278 10.0621 20.8614 10.7198 20.714 11.4191 Z"
                  stroke={activeTab === 'storage' ? Colors.light.gray3 : Colors.light.gray8}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </S.TabIconWrapper>
            <S.TabLabel type="Body4" isActive={activeTab === 'storage'}>보관함</S.TabLabel>
          </S.TabItem>

          {/* 홈 탭 */}
          <S.TabItem onPress={() => onTabPress?.('home')}>
            <S.TabIconWrapper>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke={activeTab === 'home' ? Colors.light.gray3 : Colors.light.gray8}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M9 22V12H15V22"
                  stroke={activeTab === 'home' ? Colors.light.gray3 : Colors.light.gray8}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </S.TabIconWrapper>
            <S.TabLabel type='Body4' isActive={activeTab === 'home'}>홈</S.TabLabel>
          </S.TabItem>

          {/* 학습 탭 */}
          <S.TabItem onPress={() => onTabPress?.('study')}>
            <S.TabIconWrapper>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13m9-13v13m9-13v13"
                  stroke={activeTab === 'study' ? Colors.light.gray3 : Colors.light.gray8}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </S.TabIconWrapper>
            <S.TabLabel type="Body4" isActive={activeTab === 'study'}>학습</S.TabLabel>
          </S.TabItem>
        </S.TabBarContent>
      </S.TabBarContainer>
      <S.UnderBar />
    </>
  );
}
