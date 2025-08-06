import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Zap, RefreshCw, Heart, Target } from 'lucide-react';
import { UnconsciousPatterns } from '@/types/assessment';

interface Step7UnconsciousPatternsProps {
  data: { unconsciousPatterns?: UnconsciousPatterns };
  onDataChange: (data: { unconsciousPatterns: UnconsciousPatterns }) => void;
}

const Step7UnconsciousPatterns: React.FC<Step7UnconsciousPatternsProps> = ({ data, onDataChange }) => {
  const unconsciousPatterns = data.unconsciousPatterns || {
    recurringPatterns: [],
    patternsToHeal: [],
    existentialCrises: [],
    spiritualPractices: [],
    higherMission: ''
  };

  const updateField = (field: keyof UnconsciousPatterns, value: unknown) => {
    const updatedPatterns = { ...unconsciousPatterns, [field]: value };
    onDataChange({ unconsciousPatterns: updatedPatterns });
  };

  const ArrayInput = ({
    field,
    label,
    placeholder,
    description,
    icon: Icon,
    variant = 'default'
  }: {
    field: keyof UnconsciousPatterns,
    label: string,
    placeholder: string,
    description?: string,
    icon: React.ElementType,
    variant?: 'default' | 'transformation' | 'wisdom'
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'transformation':
          return 'from-secondary/5 to-primary/5 border-secondary/20';
        case 'wisdom':
          return 'from-accent/5 to-accent/10 border-accent/20';
        default:
          return 'from-muted/50 to-muted/30 border-muted/20';
      }
    };

    const getIconColor = () => {
      switch (variant) {
        case 'transformation':
          return 'text-secondary';
        case 'wisdom':
          return 'text-accent';
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

        <div className="ml-7">
          <Textarea
            value={(unconsciousPatterns[field] as string[]).join('\n\n')}
            onChange={(e) => updateField(field, e.target.value.split('\n\n').filter(s => s.trim()))}
            placeholder={placeholder}
            rows={4}
            className={`bg-gradient-to-r rounded-lg border ${getVariantStyles()}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Padrões Inconscientes e Cármicos</h3>
        <p className="text-muted-foreground">
          Mapeamento energético e psicológico profundo para identificar padrões que influenciam sua trajetória
        </p>
      </div>

      <ArrayInput 
        field="recurringPatterns" 
        label="Padrões recorrentes que você atrai (lideranças, dinâmicas, instituições)"
        placeholder="Ex: Sempre acabo sendo a pessoa que outros procuram para resolver crises... Sou constantemente convidado para liderar transformações em empresas em crise... Atraio líderes visionários mas desorganizados..."
        description="Observe que tipo de situações, pessoas ou desafios aparecem repetidamente na sua vida profissional"
        icon={Zap}
        variant="default"
      />

      <ArrayInput 
        field="patternsToHeal" 
        label="Padrões que precisa curar, transmutar ou romper"
        placeholder="Ex: Tendência a me sobrecarregar assumindo responsabilidades dos outros... Dificuldade de cobrar o valor real do meu trabalho... Atração por projetos que drenam mais energia do que geram realização..."
        description="Dinâmicas recorrentes que limitam seu crescimento ou bem-estar"
        icon={RefreshCw}
        variant="transformation"
      />

      <ArrayInput 
        field="existentialCrises" 
        label="Crises existenciais ou dilemas que se repetem"
        placeholder="Ex: Questionamento constante sobre estar no lugar certo... Tensão entre estabilidade financeira e propósito... Conflito entre ser reconhecido e manter autenticidade..."
        description="Questões profundas que retornam periodicamente, sinalizando áreas de crescimento"
        icon={RefreshCw}
        variant="transformation"
      />

      <ArrayInput 
        field="spiritualPractices" 
        label="O que fortalece sua conexão espiritual (práticas, estados, valores)"
        placeholder="Ex: Meditação em contato com a natureza... Trabalho voluntário com crianças... Momentos de criação artística... Conversas profundas sobre propósito de vida..."
        description="Atividades, valores ou estados que renovam sua energia vital e senso de propósito"
        icon={Heart}
        variant="wisdom"
      />

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-accent" />
          <Label className="text-base font-medium">Existe uma missão maior, legado oculto ou sentido profundo que te move?</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-7">
          Descreva a sensação ou intuição sobre o que você veio fazer neste mundo, mesmo que ainda não esteja totalmente claro
        </p>
        
        <div className="ml-7 space-y-3">
          <Textarea
            value={unconsciousPatterns.higherMission}
            onChange={(e) => updateField('higherMission', e.target.value)}
            placeholder="Ex: Sinto que vim para ajudar organizações a reencontrar sua humanidade... Tenho a sensação de que meu papel é conectar pessoas visionárias que juntas podem transformar sistemas... Acredito que minha missão é facilitar a transição de modelos de negócio para uma economia mais consciente..."
            rows={4}
            className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20"
          />
        </div>
      </div>

      <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
        <h4 className="font-medium mb-3 text-secondary flex items-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          Sobre o Trabalho com Padrões Inconscientes
        </h4>
        <div className="text-sm text-muted-foreground space-y-3">
          <p>
            Esta seção explora camadas mais profundas da sua experiência profissional. 
            Os padrões inconscientes muitas vezes contêm tanto nossos maiores desafios quanto nossos maiores dons.
          </p>
          <p>
            <strong>Seja honesto e compassivo</strong> ao observar esses padrões. Eles existem por uma razão 
            e frequentemente apontam para aspectos importantes da sua missão de vida.
          </p>
          <p>
            <strong>Não há respostas certas ou erradas.</strong> O importante é a observação sincera 
            dos seus padrões recorrentes, sem julgamento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step7UnconsciousPatterns;