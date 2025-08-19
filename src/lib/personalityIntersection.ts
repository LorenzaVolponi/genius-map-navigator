export interface PersonalityInputs {
  disc?: string;
  enneagram?: string;
  mbti?: string;
  intelligence?: string;
}

export const getPersonalityIntersection = ({ disc, enneagram, mbti, intelligence }: PersonalityInputs): string => {
  const parts = [disc, enneagram, mbti, intelligence].filter(Boolean);
  if (parts.length === 0) return '';
  return `Interseção identificada: ${parts.join(' / ')}`;
};
