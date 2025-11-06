import React from 'react';
import RouteCard from '../routeCard';
import * as S from './style';

interface RouteData {
  id: number;
  from: string;
  to: string;
  time: string;
}

interface FavoriteRoutesSectionProps {
  routes: RouteData[];
}

const FavoriteRoutesSection: React.FC<FavoriteRoutesSectionProps> = ({ routes }) => {
  return (
    <S.FavoriteRoutesSection>
      <S.SectionTitle>자주가는 노선</S.SectionTitle>
      <S.RouteCardsScroll 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 32 }}
      >
        {routes.map((route) => (
          <RouteCard key={route.id} from={route.from} to={route.to} time={route.time} />
        ))}
      </S.RouteCardsScroll>
    </S.FavoriteRoutesSection>
  );
};

export default FavoriteRoutesSection;