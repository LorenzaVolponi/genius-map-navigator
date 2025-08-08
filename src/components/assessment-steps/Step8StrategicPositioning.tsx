import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, Plus, Brain, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { StrategicPositioning } from '@/types/assessment';

interface Step8StrategicPositioningProps {
  data: { strategicPositioning?: StrategicPositioning };
  onDataChange: (data: { strategicPositioning: StrategicPositioning }) => void;
}

const aiImpactAreas = [
  'Estratégia de implementação de IA em organizações',
  'Ética e governança de IA',
  'IA aplicada à sustentabilidade e impacto social',
  'Venture capital e investimentos em IA',
  'Educação e capacitação em IA',
  'IA para saúde e bem-estar',
  'IA conversacional e experiência do usuário',
  'IA para análise de dados e business intelligence',
  'Automação inteligente de processos',
  'IA para criação de conteúdo e marketing',
  'Segurança e privacidade em IA',
  'IA para recursos humanos e gestão de talentos'
];

const preferredRoles = [
  'Estrategista',
  'Executora',
  'Curadora',
  'Conselheira',
  'Educadora',
  'Consultora fractional',
  'Venture Partner',
  'Designer de produtos/protocolos de impacto',
  'Innovation Manager',
  'Chief AI Officer',
  'Facilitadora de transformação',
  'Pesquisadora aplicada'
];

const Step8StrategicPositioning: React.FC<Step8StrategicPositioningProps> = ({ data, onDataChange }) => {
  const strategicPositioning = data.strategicPositioning || {
    areasOfInterest: [],
    preferredRole: [],
    meaningfulWork: '',
    acceptableProjects: [],
    rejectedProjects: []
  };

  const updateField = (
    field: keyof StrategicPositioning,
    value: StrategicPositioning[keyof StrategicPositioning]
  ) => {
    const updatedPositioning = { ...strategicPositioning, [field]: value };
    onDataChange({ strategicPositioning: updatedPositioning });
  };

  const toggleArrayItem = (field: keyof StrategicPositioning, item: string) => {
    const currentArray = (strategicPositioning[field] as string[]) || [];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateField(field, updatedArray);
  };

  const addToArray = (field: keyof StrategicPositioning, value: string) => {
    if (value.trim()) {
      const currentArray = (strategicPositioning[field] as string[]) || [];
      const updatedArray = [...currentArray, value.trim()];
      updateField(field, updatedArray);
    }
  };

  const removeFromArray = (field: keyof StrategicPositioning, index: number) => {
    const currentArray = (strategicPositioning[field] as string[]) || [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(field, updatedArray);
  };

  const CustomArrayInput = ({ 
    field, 
    label, 
    placeholder, 
    description, 
    icon: Icon
  }: { 
    field: keyof StrategicPositioning, 
    label: string, 
    placeholder: string,
    description?: string,
    icon: React.ElementType
  }) => {
    const [inputValue, setInputValue] = React.useState('');
    const currentArray = (strategicPositioning[field] as string[]) || [];

    const handleAdd = () => {
      addToArray(field, inputValue);
      setInputValue('');
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-primary" />
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
              <div key={index} className="flex items-start space-x-2 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
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
        <h3 className="text-lg font-semibold mb-2">Posicionamento Estratégico</h3>
        <p className="text-muted-foreground">
          Foco em IA, inovação, capital e impacto - defina sua atuação no mercado atual
        </p>
      </div>

      {/* Áreas de Interesse */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <Label className="text-base font-medium">
            1. Quais áreas mais te interessam na interseção entre IA, impacto, tecnologia e capital?
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">
          Selecione todas as áreas que despertam seu interesse e expertise
        </p>
        <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiImpactAreas.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                checked={strategicPositioning.areasOfInterest.includes(area)}
                onCheckedChange={() => toggleArrayItem('areasOfInterest', area)}
              />
              <Label className="text-sm cursor-pointer">{area}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Papéis Preferidos */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-secondary" />
          <Label className="text-base font-medium">
            2. Você prefere atuar como:
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">
          Selecione os papéis profissionais que mais se alinham com sua forma de trabalhar
        </p>
        <div className="ml-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {preferredRoles.map((role) => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                checked={strategicPositioning.preferredRole.includes(role)}
                onCheckedChange={() => toggleArrayItem('preferredRole', role)}
              />
              <Label className="text-sm cursor-pointer">{role}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Trabalho Significativo */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <Label className="text-base font-medium">
            3. O que te faria sentir útil e em missão num projeto?
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">
          Descreva que tipo de impacto ou contribuição te daria sensação de propósito
        </p>
        
        <div className="ml-7">
          <Textarea
            value={strategicPositioning.meaningfulWork}
            onChange={(e) => updateField('meaningfulWork', e.target.value)}
            placeholder="Ex: Saber que estou ajudando organizações a usar IA de forma ética e responsável... Contribuir para que mais pessoas tenham acesso a oportunidades através da tecnologia... Facilitar a transição de empresas tradicionais para modelos mais sustentáveis..."
            rows={4}
            className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <Label className="text-base font-medium">4. Três projetos que aceitaria imediatamente</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">Descreva projetos específicos que te animariam a começar amanhã</p>
        
        <div className="ml-7">
          <Textarea
            value={strategicPositioning.acceptableProjects.join('\n\n')}
            onChange={(e) => updateField('acceptableProjects', e.target.value.split('\n\n').filter(s => s.trim()))}
            placeholder="Ex: Liderar a estratégia de IA de uma startup de impacto social... Criar um programa de educação em IA para comunidades underserved... Desenvolver protocolos éticos para uso de IA em saúde mental..."
            rows={5}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <X className="w-5 h-5 text-destructive" />
          <Label className="text-base font-medium">5. Três tipos de projetos que recusaria com convicção</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">Projetos que vão contra seus valores ou não se alinham com seu propósito</p>
        
        <div className="ml-7">
          <Textarea
            value={strategicPositioning.rejectedProjects.join('\n\n')}
            onChange={(e) => updateField('rejectedProjects', e.target.value.split('\n\n').filter(s => s.trim()))}
            placeholder="Ex: Implementação de IA para vigilância sem transparência... Projetos que priorizam lucro sobre impacto social... Desenvolvimento de IA para manipulação de comportamento do consumidor..."
            rows={5}
            className="bg-gradient-to-r from-destructive/5 to-warning/5 border-destructive/10"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-3 text-primary flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          O Momento da IA e Inovação
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Estamos em um momento único da história onde IA, capital e impacto social se convergem. 
            Sua experiência e valores podem contribuir para que essa transformação aconteça de forma consciente.
          </p>
          <p>
            <strong>Seja específico</strong> sobre onde você quer atuar. O mercado precisa de especialistas 
            que combinem competência técnica com visão humanizada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step8StrategicPositioning;