import { useState, useEffect, useRef } from 'react';
import { AssessmentData } from '@/types/assessment';

interface SavedAssessment {
  id: number;
  name: string;
  date: string;
  data: Partial<AssessmentData>;
}

const STORAGE_KEY = 'geniusMapAssessment';
const HISTORY_KEY = 'geniusMapAnalyses';

export const useAssessmentStorage = () => {
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(`${STORAGE_KEY}_step`);

    if (savedData) {
      try {
        setAssessmentData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved assessment data:', error);
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  // Save data to localStorage with debounce to avoid UI lag
  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assessmentData));
    }, 300);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [assessmentData]);

  const updateAssessmentData = (newData: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...newData }));
  };

  // Save current step
  const updateCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem(`${STORAGE_KEY}_step`, step.toString());
  };

  // Clear all data
  const clearAssessmentData = () => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    setAssessmentData({});
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_step`);
  };

  // Check if data is complete
  const isStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(assessmentData.personalInfo?.fullName && assessmentData.personalInfo?.birthDate);
      case 2:
        return !!(
          assessmentData.behavioralProfile?.traitKeywords?.length
        );
      case 3:
        return !!(assessmentData.talentsAndFlow?.flowMoments?.length);
      case 4:
        return !!(assessmentData.impactMarkers?.highImpactProjects?.length);
      case 5:
        return !!(assessmentData.limitsAndNonNegotiables?.willNotDoAnymore?.length);
      case 6:
        return !!(assessmentData.symbolicMap?.lifePathNumber);
      case 7:
        return !!(assessmentData.unconsciousPatterns?.recurringPatterns?.length);
      case 8:
        return !!(assessmentData.strategicPositioning?.areasOfInterest?.length);
      case 9:
        return !!(assessmentData.idealConditions?.workModel?.length);
      case 10:
        return !!(assessmentData.finalSynthesis?.potencyDescription);
      default:
        return false;
    }
  };

  const getCompletionPercentage = (): number => {
    const completedSteps = Array.from({ length: 10 }, (_, i) => i + 1)
      .filter(step => isStepComplete(step)).length;
    return Math.round((completedSteps / 10) * 100);
  };

  const getAssessmentsHistory = (): SavedAssessment[] => {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  };

  const saveAssessmentToHistory = () => {
    if (!assessmentData.personalInfo?.fullName) return;
    const history = getAssessmentsHistory();
    history.push({
      id: Date.now(),
      name: assessmentData.personalInfo.fullName,
      date: new Date().toISOString(),
      data: assessmentData,
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  };

  const clearAssessmentsHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
  };

  const startNewAssessment = () => {
    clearAssessmentData();
  };

  return {
    assessmentData,
    currentStep,
    updateAssessmentData,
    updateCurrentStep,
    clearAssessmentData,
    isStepComplete,
    getCompletionPercentage,
    getAssessmentsHistory,
    saveAssessmentToHistory,
    clearAssessmentsHistory,
    startNewAssessment,
  };
};