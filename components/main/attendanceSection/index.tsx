import React from 'react';
import * as S from './style';

interface DayData {
  id: number;
  label: string;
  type: 'empty' | 'filled' | 'today';
}

interface AttendanceSectionProps {
  days: DayData[];
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({ days }) => {
  return (
    <S.AttendanceSection>
      <S.SectionTitle>출석</S.SectionTitle>
      <S.AttendanceCard>
        <S.DaysContainer>
          {days.map((day) => (
            <S.DayItem key={day.id}>
              <S.DayCircle type={day.type} />
              <S.DayLabel>{day.label}</S.DayLabel>
            </S.DayItem>
          ))}
        </S.DaysContainer>
      </S.AttendanceCard>
    </S.AttendanceSection>
  );
};

export default AttendanceSection;