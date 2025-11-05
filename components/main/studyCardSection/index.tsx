import React from 'react';
import StudyCard from '../studyCard';
import * as S from './style';

interface StudyCardData {
  id: number;
  backgroundColor: string;
  from: string;
  to: string;
  subject: string;
  title: string;
  date: string;
  time: string;
  problemCount: number;
  accuracy: number;
}

interface StudyCardsSectionProps {
  studyCards: StudyCardData[];
}

const StudyCardsSection= ({ studyCards } : StudyCardsSectionProps) => {
  return (
      <S.StudyCardsScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={341}
      >
        {studyCards.map((card) => (
          <StudyCard key={card.id} {...card} />
        ))}
      </S.StudyCardsScroll>
  );
};

export default StudyCardsSection;