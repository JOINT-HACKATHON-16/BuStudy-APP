import React, { useRef } from 'react';
import { Animated } from 'react-native';
import StudyCard from '../studyCard';

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

const CARD_WIDTH = 329;
const CARD_SPACING = -10;
const VISIBLE_NEXT_CARD = 0; 
const SNAP_INTERVAL = CARD_WIDTH - VISIBLE_NEXT_CARD + CARD_SPACING;
const SIDE_CARD_SCALE = 0.9;

const StudyCardsSection= ({ studyCards } : StudyCardsSectionProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      contentContainerStyle={{ paddingLeft: 32, paddingRight: 32 + VISIBLE_NEXT_CARD, paddingTop: 24 }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      {studyCards.map((card, index) => {
        const inputRange = [
          (index - 1) * SNAP_INTERVAL,
          index * SNAP_INTERVAL,
          (index + 1) * SNAP_INTERVAL,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [SIDE_CARD_SCALE, 1, SIDE_CARD_SCALE],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={card.id}
            style={{
              transform: [{ scale }],
              opacity,
              marginRight: index === studyCards.length - 1 ? 0 : CARD_SPACING,
            }}
          >
            <StudyCard {...card} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default StudyCardsSection;