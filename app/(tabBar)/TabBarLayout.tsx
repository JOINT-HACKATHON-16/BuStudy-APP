import React, { useState } from 'react';
import { View } from 'react-native';
import Main from '../(Main)';
import TabBar from './index';
import * as S from './style';


export default function TabBarLayout() {
  // 1. 현재 활성화된 탭 상태를 저장
  const [activeTab, setActiveTab] = useState<'storage' | 'home' | 'study'>('home');

  // 2. TabBar의 onTabPress에서 호출될 핸들러 함수
  const handleTabPress = (tabName: 'storage' | 'home' | 'study') => {
    // 탭 상태 업데이트
    setActiveTab(tabName);
  };

  // 3. activeTab 상태에 따라 렌더링할 화면을 결정하는 함수
  const renderScreen = () => {
    switch (activeTab) {
      case 'storage':
        return (
          <S.PlaceholderContainer>
            <S.PlaceholderText>보관함 화면</S.PlaceholderText>
            <S.PlaceholderSubText>StorageScreen 컴포넌트를 만들어주세요</S.PlaceholderSubText>
          </S.PlaceholderContainer>
        );

      case 'home':
        return <Main />;
      
      case 'study':
        // TODO: StudyScreen 컴포넌트를 만든 후 주석을 해제하세요
        return (
          <S.PlaceholderContainer>
            <S.PlaceholderText>학습 화면</S.PlaceholderText>
            <S.PlaceholderSubText>StudyScreen 컴포넌트를 만들어주세요</S.PlaceholderSubText>
          </S.PlaceholderContainer>
        );
        // return <StudyScreen />;
      
      default:
        return <Main />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 4. activeTab에 따라 해당 화면 렌더링 */}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      
      {/* TabBar 컴포넌트에 activeTab과 onTabPress 전달 */}
      <TabBar
        activeTab={activeTab} // 현재 활성화된 탭을 TabBar에 전달하여 아이콘 색상 변경
        onTabPress={handleTabPress} // 탭을 눌렀을 때 상태를 변경하는 함수 전달
      />
    </View>
  );
}
