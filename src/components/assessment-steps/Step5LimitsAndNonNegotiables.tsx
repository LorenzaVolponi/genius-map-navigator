import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { LimitsAndNonNegotiables } from '@/types/assessment';

interface Step5LimitsAndNonNegotiablesProps {
  data: { limitsAndNonNegotiables?: LimitsAndNonNegotiables };
  onDataChange: (data: { limitsAndNonNegotiables: LimitsAndNonNegotiables }) => void;
}

const Step5LimitsAndNonNegotiables: React.FC<Step5LimitsAndNonNegotiablesProps> = ({ data, onDataChange }) => {
  const limitsAndNonNegotiables = data.limitsAndNonNegotiables || {
    willNotDoAnymore: [],
    toxicRoutinesOrEnvironments: [],
    problematicLeadershipStyles: [],
    minimumConditions: [],
    idealWorkFormat: [],
    idealProjects: []
  };

  const updateField = (field: keyof LimitsAndNonNegotiables, value: any) => {
    const updatedLimits = { ...limitsAndNonNegotiables, [field]: value };
    onDataChange({ limitsAndNonNegotiables: updatedLimits });
  };

  const addToArray = (field: keyof LimitsAndNonNegotiables, value: string) => {
    if (value.trim()) {
      const currentArray = (limitsAndNonNegotiables[field] as string[]) || [];
      const updatedArray = [...currentArray, value.trim()];
      updateField(field, updatedArray);
    }
  };

  const removeFromArray = (field: keyof LimitsAndNonNegotiables, index: number) => {
    const currentArray = (limitsAndNonNegotiables[field] as string[]) || [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(field, updatedArray);
  };

  const ArrayInput = ({ 
    field, 
    label, 
    placeholder, 
    description, 
    icon: Icon,
    variant = 'default'
  }: { 
    field: keyof LimitsAndNonNegotiables, 
    label: string, 
    placeholder: string,
    description?: string,
    icon: React.ElementType,
    variant?: 'default' | 'warning' | 'success'
  }) => {
    const [inputValue, setInputValue] = React.useState('');
    const currentArray = (limitsAndNonNegotiables[field] as string[]) || [];

    const handleAdd = () => {
      addToArray(field, inputValue);
      setInputValue('');
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'warning':
          return 'from-destructive/5 to-warning/5 border-destructive/20';
        case 'success':
          return 'from-success/5 to-primary/5 border-success/20';
        default:
          return 'from-muted/50 to-muted/30 border-muted/20';
      }
    };

    const getIconColor = () => {
      switch (variant) {
        case 'warning':
          return 'text-destructive';
        case 'success':
          return 'text-success';
        default:
          return 'text-primary';
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${getIconColor()}`} />
          <Label className="text-base font-medium">{label}</Label>
        </div>
        {description && <p className="text-sm text-muted-foreground ml-7">{description}</p>}
        
        <div className="ml-7 space-y-3">
          <div className="flex space-x-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              rows={2}
              className="flex-1"
            />
            <Button type="button" onClick={handleAdd} size="sm" className="self-start">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {currentArray.map((item, index) => (
              <div key={index} className={`flex items-start space-x-2 p-3 bg-gradient-to-r rounded-lg border ${getVariantStyles()}`}>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromArray(field, index)}
                  className="h-auto p-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Limites e Não-Negociáveis</h3>
        <p className="text-muted-foreground">
          Defina suas fronteiras profissionais para manter sua saúde psíquica e coerência existencial
        </p>
      </div>

      <ArrayInput 
        field="willNotDoAnymore" 
        label="1. O que você não aceita mais fazer profissionalmente?"
        placeholder="Ex: Trabalhar em projetos sem propósito claro, aceitar microgerenciamento excessivo, participar de culturas tóxicas..."
        description="Atividades, responsabilidades ou situações que você decidiu eliminar da sua carreira"
        icon={AlertTriangle}
        variant="warning"
      />

      <ArrayInput 
        field="toxicRoutinesOrEnvironments" 
        label="2. Que tipo de rotina ou ambiente te adoece ou drena?"
        placeholder="Ex: Reuniões excessivas sem propósito, ambientes competitivos destrutivos, pressão por resultados a qualquer custo..."
        description="Padrões organizacionais que impactam negativamente sua energia e bem-estar"
        icon={AlertTriangle}
        variant="warning"
      />

      <ArrayInput 
        field="problematicLeadershipStyles" 
        label="3. Estilos de liderança ou cultura que te silenciam ou contradizem?"
        placeholder="Ex: Liderança autoritária sem espaço para contribuição, culturas que não valorizam diversidade de pensamento..."
        description="Tipos de gestão ou cultura organizacional incompatíveis com sua forma de trabalhar"
        icon={AlertTriangle}
        variant="warning"
      />

      <ArrayInput 
        field="minimumConditions" 
        label="4. Condições mínimas para aceitar uma nova proposta"
        placeholder="Ex: Flexibilidade de horário, autonomia para decisões, alinhamento com meus valores, salário mínimo de X..."
        description="Requisitos essenciais que qualquer oportunidade precisa atender"
        icon={Shield}
        variant="success"
      />

      <ArrayInput 
        field="idealWorkFormat" 
        label="5. Formato ideal de atuação"
        placeholder="Ex: PJ com contratos de longo prazo, consultoria especializada, advisory com equity, freelancer premium..."
        description="Modelos de contratação e relacionamento profissional que funcionam melhor para você"
        icon={CheckCircle}
        variant="success"
      />

      <ArrayInput 
        field="idealProjects" 
        label="6. Projetos em que você entregaria seu máximo com mínimo desgaste"
        placeholder="Ex: Transformação cultural de startups, desenvolvimento de estratégias de inovação, mentoria de líderes emergentes..."
        description="Tipos de projeto onde você consegue alta performance com fluidez natural"
        icon={CheckCircle}
        variant="success"
      />

      <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-3 text-primary flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          A Importância dos Limites Profissionais
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Definir limites claros não é limitação, é sabedoria.</strong> Conhecer seus não-negociáveis 
            permite que você tome decisões mais alinhadas e evite situações que drenam sua energia.
          </p>
          <p>
            Seja honesto sobre o que realmente não funciona para você. Essa clareza ajudará a identificar 
            oportunidades que potencializam sua genialidade natural.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step5LimitsAndNonNegotiables;