import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Save, Home } from 'lucide-react';
import { useAssessmentStorage } from '@/hooks/useAssessmentStorage';
import { AssessmentData } from '@/types/assessment';

// Import step components
import Step1PersonalInfo from '@/components/assessment-steps/Step1PersonalInfo';
import Step2BehavioralProfile from '@/components/assessment-steps/Step2BehavioralProfile';
import Step3TalentsAndFlow from '@/components/assessment-steps/Step3TalentsAndFlow';
import Step4ImpactMarkers from '@/components/assessment-steps/Step4ImpactMarkers';
import Step5LimitsAndNonNegotiables from '@/components/assessment-steps/Step5LimitsAndNonNegotiables';
import Step6SymbolicMap from '@/components/assessment-steps/Step6SymbolicMap';
import Step7UnconsciousPatterns from '@/components/assessment-steps/Step7UnconsciousPatterns';
import Step8StrategicPositioning from '@/components/assessment-steps/Step8StrategicPositioning';
import Step9IdealConditions from '@/components/assessment-steps/Step9IdealConditions';
import Step10FinalSynthesis from '@/components/assessment-steps/Step10FinalSynthesis';

interface AssessmentFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const steps = [
  { number: 1, title: 'Identidade Estrutural', component: Step1PersonalInfo },
  { number: 2, title: 'Perfil Comportamental', component: Step2BehavioralProfile },
  { number: 3, title: 'Talentos e Flow', component: Step3TalentsAndFlow },
  { number: 4, title: 'Marcos de Impacto', component: Step4ImpactMarkers },
  { number: 5, title: 'Limites e Não-Negociáveis', component: Step5LimitsAndNonNegotiables },
  { number: 6, title: 'Mapa Simbólico', component: Step6SymbolicMap },
  { number: 7, title: 'Padrões Inconscientes', component: Step7UnconsciousPatterns },
  { number: 8, title: 'Posicionamento Estratégico', component: Step8StrategicPositioning },
  { number: 9, title: 'Condições Ideais', component: Step9IdealConditions },
  { number: 10, title: 'Síntese Final', component: Step10FinalSynthesis },
];

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onBack, onComplete }) => {
  const { 
    assessmentData, 
    currentStep, 
    updateAssessmentData, 
    updateCurrentStep, 
    isStepComplete,
    getCompletionPercentage 
  } = useAssessmentStorage();

  const [localData, setLocalData] = useState<Partial<AssessmentData>>(assessmentData);

  const progress = ((currentStep - 1) / steps.length) * 100;
  const completionPercentage = getCompletionPercentage();

  const handleStepDataChange = (stepData: Partial<AssessmentData>) => {
    const updatedData = { ...localData, ...stepData };
    setLocalData(updatedData);
    updateAssessmentData(stepData);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      updateCurrentStep(currentStep + 1);
    } else {
      // Ir para geração de relatórios
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      updateCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    updateCurrentStep(stepNumber);
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Mapa de Genialidade</h1>
            <p className="text-muted-foreground">Etapa {currentStep} de {steps.length}</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            {completionPercentage}% completo
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
          {steps.map((step) => (
            <Button
              key={step.number}
              variant={currentStep === step.number ? "default" : isStepComplete(step.number) ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleStepClick(step.number)}
              className="h-auto p-2 flex flex-col items-center text-xs"
            >
              <span className="font-bold">{step.number}</span>
              <span className="text-[10px] mt-1 leading-tight text-center">
                {step.title}
              </span>
              {isStepComplete(step.number) && (
                <span className="text-[8px] text-success">✓</span>
              )}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                {currentStep}
              </span>
              {steps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription>
              Complete as informações abaixo para continuar sua análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={localData}
                onDataChange={handleStepDataChange}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Auto-save ativo
            </Button>
            
            <Button
              variant={currentStep === steps.length ? "hero" : "default"}
              onClick={handleNextStep}
              disabled={!isStepComplete(currentStep)}
              className="flex items-center"
            >
              {currentStep === steps.length ? (
                <>
                  Finalizar Análise
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Próxima
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;