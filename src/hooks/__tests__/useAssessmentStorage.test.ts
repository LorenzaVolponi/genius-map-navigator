import { renderHook, act } from '@testing-library/react';
import { useAssessmentStorage } from '../useAssessmentStorage';
import type { AssessmentData, PersonalInfo } from '@/types/assessment';

describe('useAssessmentStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAssessmentStorage());
    expect(result.current.assessmentData).toEqual({});
    expect(result.current.currentStep).toBe(1);
  });

  it('updates data and step in localStorage', () => {
    const { result } = renderHook(() => useAssessmentStorage());
    act(() => {
      const personalInfo: Partial<PersonalInfo> = {
        fullName: 'John Doe',
        birthDate: '2000-01-01',
      };
      result.current.updateAssessmentData({ personalInfo } as Partial<AssessmentData>);
      result.current.updateCurrentStep(2);
    });

    expect(localStorage.getItem('geniusMapAssessment_step')).toBe('2');
    const stored = localStorage.getItem('geniusMapAssessment');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toMatchObject({
      personalInfo: { fullName: 'John Doe', birthDate: '2000-01-01' },
    });
  });
});
