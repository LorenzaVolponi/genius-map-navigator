import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IdealConditions } from '@/types/assessment';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Heart,
  Building,
  Home,
  Users,
  Target
} from 'lucide-react';

interface Step9IdealConditionsProps {
  data: { idealConditions?: IdealConditions };
  onDataChange: (data: { idealConditions: IdealConditions }) => void;
}

const workModels = [
  'PJ (Pessoa Jurídica)',
  'CLT (Tempo integral)',
  'Fractional (Advisory)',
  'Equity (Participação societária)',
  'Consultoria com escopo definido',
  'Freelancer premium',
  'Sociedade/Partnership'
];

const workFormats = [
  'Remoto total',
  'Híbrido com presenciais simbólicos',
  'Presencial esporádico',
  'Coworking/Escritório compartilhado',
  'Home office estruturado',
  'Flexibilidade total de local'
];

const compensationTypes = [
  'USD (Dólar)',
  'EUR (Euro)',
  'BRL (Real) - com contrapartida simbólica relevante',
  'Equity + Salário fixo',
  'Por projeto/Valor fechado',
  'Retainer mensal',
  'Comissão por resultados'
];

const workloadPreferences = [
  'Projetos com entrega específica',
  'Consultoria recorrente',
  'Liderança de equipe',
  'Conselho com baixa carga',
  'Intensivo por períodos',
  'Acompanhamento contínuo',
  'Só projetos estratégicos'
];

const priorities = [
  'Aprendizado contínuo',
  'Renda em moeda forte',
  'Impacto sistêmico',
  'Liberdade de negar projetos',
  'Colaboração com propósito',
  'Reconhecimento simbólico',
  'Flexibilidade de agenda',
  'Desenvolvimento de pessoas',
  'Criação de legado',
  'Conexão com inovação'
];

const Step9IdealConditions: React.FC<Step9IdealConditionsProps> = ({ data, onDataChange }) => {
  const idealConditions = data.idealConditions || {
    workModel: [],
    workFormat: [],
    compensation: {
      currency: '',
      type: ''
    },
    workload: [],
    priorities: []
  };

  const updateField = (
    field: keyof IdealConditions,
    value: IdealConditions[keyof IdealConditions]
  ) => {
    const updatedConditions = { ...idealConditions, [field]: value };
    onDataChange({ idealConditions: updatedConditions });
  };

  const toggleArrayItem = (field: keyof IdealConditions, item: string) => {
    if (field === 'compensation') return; // Handle compensation separately
    
    const currentArray = (idealConditions[field] as string[]) || [];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateField(field, updatedArray);
  };

  const updateCompensation = (type: 'currency' | 'type', value: string) => {
    const updatedCompensation = { ...idealConditions.compensation, [type]: value };
    updateField('compensation', updatedCompensation);
  };

  const CheckboxGroup = ({ 
    title, 
    items, 
    field, 
    icon: Icon,
    description,
    variant = 'default'
  }: {
    title: string;
    items: string[];
    field: keyof IdealConditions;
    icon: React.ElementType;
    description?: string;
    variant?: 'default' | 'accent' | 'secondary';
  }) => {
    const getIconColor = () => {
      switch (variant) {
        case 'accent': return 'text-accent';
        case 'secondary': return 'text-secondary';
        default: return 'text-primary';
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Icon className={`w-5 h-5 mr-2 ${getIconColor()}`} />
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item) => (
              <div key={item} className="flex items-start space-x-2">
                <Checkbox
                  checked={(idealConditions[field] as string[])?.includes(item) || false}
                  onCheckedChange={() => toggleArrayItem(field, item)}
                  className="mt-1"
                />
                <Label className="text-sm cursor-pointer leading-relaxed">{item}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Condições Ideais de Atuação</h3>
        <p className="text-muted-foreground">
          Mapeamento pragmático do seu encaixe profissional perfeito
        </p>
      </div>

      <CheckboxGroup
        title="Modelo Preferido"
        items={workModels}
        field="workModel"
        icon={Briefcase}
        description="Formatos de contratação que funcionam melhor para você"
      />

      <CheckboxGroup
        title="Formato Ideal"
        items={workFormats}
        field="workFormat"
        icon={MapPin}
        description="Preferências de localização e modalidade de trabalho"
        variant="secondary"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <DollarSign className="w-5 h-5 mr-2 text-accent" />
            Compensação Preferida
          </CardTitle>
          <CardDescription>
            Moeda e modelo de compensação ideais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Moeda/Formato:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {compensationTypes.map((type) => (
                  <div key={type} className="flex items-start space-x-2">
                    <Checkbox
                      checked={idealConditions.compensation.type === type}
                      onCheckedChange={() => updateCompensation('type', type)}
                      className="mt-1"
                    />
                    <Label className="text-sm cursor-pointer leading-relaxed">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CheckboxGroup
        title="Carga Preferida"
        items={workloadPreferences}
        field="workload"
        icon={Clock}
        description="Tipos de envolvimento e intensidade de trabalho"
      />

      <CheckboxGroup
        title="Você deseja mais:"
        items={priorities}
        field="priorities"
        icon={Heart}
        description="Principais motivadores e valores profissionais"
        variant="accent"
      />

      <div className="bg-gradient-to-r from-success/5 to-primary/5 p-6 rounded-lg border border-success/20">
        <h4 className="font-medium mb-3 text-success flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Clareza sobre Condições Ideais
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Conhecer suas condições ideais</strong> permite que você tome decisões mais estratégicas 
            e negocie de forma mais assertiva.
          </p>
          <p>
            Não significa que você só aceitará o "perfeito", mas ter clareza sobre o que funciona 
            melhor para você ajuda a identificar oportunidades mais alinhadas.
          </p>
          <p>
            <strong>Seja honesto</strong> sobre suas preferências. Cada pessoa tem um formato único 
            que potencializa sua entrega.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step9IdealConditions;