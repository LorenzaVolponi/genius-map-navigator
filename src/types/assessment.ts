export interface PersonalInfo {
  fullName: string;
  birthDate: string;
  gender: string;
  currentLocation: string;
  preferredLocations: string[];
  languages: string[];
  education: string[];
  certifications: string[];
  previousRoles: string[];
  desiredRoles: string[];
  workModels: string[];
  workPreference: 'remote' | 'hybrid' | 'onsite';
  salaryExpectation: {
    currency: 'USD' | 'EUR' | 'BRL';
    amount: string;
  };
  availability: string;
  currentMotivation: string;
}

export interface BehavioralProfile {
  mbti: string;
  disc: string;
  enneagram: string;
  otherTests: string[];
  energizingSituations: string[];
  drainingsituations: string[];
  potentiatingEnvironments: string[];
  limitingEnvironments: string[];
}

export interface TalentsAndFlow {
  flowMoments: string[];
  challengesYouLove: string[];
  recurringCompliments: string[];
  impactOnOthers: string;
  naturalTalent: string;
  miracleMoments: string[];
  energizingActivities: string[];
  relationshipWithGoals: string;
  preferredAction: 'create' | 'teach' | 'organize' | 'solve' | 'connect' | 'transform';
}

export interface ImpactMarkers {
  highImpactProjects: string[];
  ideasThatBecameReality: string[];
  strategicTransformations: string[];
  fundingOrProgramsCreated: string[];
  peopleYouMentored: string[];
}

export interface LimitsAndNonNegotiables {
  willNotDoAnymore: string[];
  toxicRoutinesOrEnvironments: string[];
  problematicLeadershipStyles: string[];
  minimumConditions: string[];
  idealWorkFormat: string[];
  idealProjects: string[];
}

export interface SymbolicMap {
  lifePathNumber: number;
  soulNumber: number;
  destinyNumber: number;
  sunSign: string;
  currentLifeCycle: string;
}

export interface UnconsciousPatterns {
  recurringPatterns: string[];
  patternsToHeal: string[];
  existentialCrises: string[];
  spiritualPractices: string[];
  higherMission: string;
}

export interface StrategicPositioning {
  areasOfInterest: string[];
  preferredRole: string[];
  meaningfulWork: string;
  acceptableProjects: string[];
  rejectedProjects: string[];
}

export interface IdealConditions {
  workModel: string[];
  workFormat: string[];
  compensation: {
    currency: string;
    type: string;
  };
  workload: string[];
  priorities: string[];
}

export interface FinalSynthesis {
  potencyDescription: string;
  disconnectedDescription: string;
  greatestGift: string;
  greatestPain: string;
  mainProfessionalNeed: string;
  desiredVersion: string;
}

export interface AssessmentData {
  personalInfo: PersonalInfo;
  behavioralProfile: BehavioralProfile;
  talentsAndFlow: TalentsAndFlow;
  impactMarkers: ImpactMarkers;
  limitsAndNonNegotiables: LimitsAndNonNegotiables;
  symbolicMap: SymbolicMap;
  unconsciousPatterns: UnconsciousPatterns;
  strategicPositioning: StrategicPositioning;
  idealConditions: IdealConditions;
  finalSynthesis: FinalSynthesis;
}

export interface AnalysisResult {
  geniusZone: {
    core: string;
    strengths: string[];
    opportunities: string[];
  };
  recommendations: {
    immediate: string[];
    strategic: string[];
    development: string[];
  };
  idealProfile: {
    role: string;
    environment: string;
    conditions: string[];
  };
  riskFactors: string[];
  nextSteps: string[];
  careerRoadmap: string[];
  positioningStrategies: string[];
  developmentPlan: string[];
}

export type ReportType = 'executive' | 'detailed' | 'strategic';