import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import * as S from './style';
import { Colors } from '@/constants/theme';

interface RouteCardProps {
  from: string;
  to: string;
  time: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, time }) => {
  return (
    <S.RouteCard>
      <S.RouteContent>
        <S.RouteLocationText>{from}</S.RouteLocationText>
        <S.RouteArrowIcon>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M8 3L8 13M8 3L12 7M8 3L4 7"
              stroke={Colors.light.primary60}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </S.RouteArrowIcon>
        <S.RouteLocationText style={{ width: 158 }}>{to}</S.RouteLocationText>
      </S.RouteContent>

      <S.TimestampContainer>
        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <Circle cx="6" cy="6" r="5" stroke="#b0b0b0" strokeWidth="1" />
          <Path d="M6 3V6L8 8" stroke="#b0b0b0" strokeWidth="1" strokeLinecap="round" />
        </Svg>
        <S.TimestampText>{time}</S.TimestampText>
      </S.TimestampContainer>
    </S.RouteCard>
  );
};

export default RouteCard;