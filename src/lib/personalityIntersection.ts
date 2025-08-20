import { BehavioralProfile } from '@/types/assessment';

export interface PersonalityIntersection {
  disc: string;
  enneagram: string;
  mbti: string;
  intelligence: string;
  summary: string;
}

export const getPersonalityIntersection = (
  profile: Pick<BehavioralProfile, 'discType' | 'enneagramType' | 'mbtiType' | 'intelligenceType'>
): PersonalityIntersection => {
  const { discType, enneagramType, mbtiType, intelligenceType } = profile;
  return {
    disc: discType,
    enneagram: enneagramType,
    mbti: mbtiType,
    intelligence: intelligenceType,
    summary: `${discType} | ${enneagramType} | ${mbtiType} | ${intelligenceType}`,
  };
};
