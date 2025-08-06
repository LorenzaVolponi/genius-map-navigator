import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FinalSynthesis } from '@/types/assessment';
import { 
  Zap, 
  CloudOff, 
  Gift, 
  Heart, 
  Target, 
  Star,
  Sparkles
} from 'lucide-react';

interface Step10FinalSynthesisProps {
  data: { finalSynthesis?: FinalSynthesis };
  onDataChange: (data: { finalSynthesis: FinalSynthesis }) => void;
}

const Step10FinalSynthesis: React.FC<Step10FinalSynthesisProps> = ({ data, onDataChange }) => {
  const finalSynthesis = data.finalSynthesis || {
    potencyDescription: '',
    disconnectedDescription: '',
    greatestGift: '',
    greatestPain: '',
    mainProfessionalNeed: '',
    desiredVersion: ''
  };

  const updateField = (field: keyof FinalSynthesis, value: string) => {
    const updatedSynthesis = { ...finalSynthesis, [field]: value };
    onDataChange({ finalSynthesis: updatedSynthesis });
  };

  const TextAreaInput = ({ 
    field, 
    label, 
    placeholder, 
    description, 
    icon: Icon,
    variant = 'default'
  }: { 
    field: keyof FinalSynthesis, 
    label: string, 
    placeholder: string,
    description?: string,
    icon: React.ElementType,
    variant?: 'default' | 'power' | 'shadow' | 'gift' | 'pain' | 'need' | 'vision'
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'power':
          return 'from-accent/10 to-accent/5 border-accent/30 focus-within:border-accent/50';
        case 'shadow':
          return 'from-muted/50 to-muted/30 border-muted/40';
        case 'gift':
          return 'from-success/10 to-success/5 border-success/30';
        case 'pain':
          return 'from-destructive/10 to-destructive/5 border-destructive/30';
        case 'need':
          return 'from-warning/10 to-warning/5 border-warning/30';
        case 'vision':
          return 'from-primary/10 to-secondary/5 border-primary/30';
        default:
          return 'from-muted/30 to-background border-border';
      }
    };

    const getIconColor = () => {
      switch (variant) {
        case 'power': return 'text-accent';
        case 'shadow': return 'text-muted-foreground';
        case 'gift': return 'text-success';
        case 'pain': return 'text-destructive';
        case 'need': return 'text-warning';
        case 'vision': return 'text-primary';
        default: return 'text-primary';
      }
    };

    return (
      <Card className={`bg-gradient-to-br ${getVariantStyles()} transition-all duration-200`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <Icon className={`w-5 h-5 mr-2 ${getIconColor()}`} />
            {label}
          </CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <Textarea
            value={finalSynthesis[field]}
            onChange={(e) => updateField(field, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="bg-background/50 border-transparent focus:border-current/30 resize-none"
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
          <Sparkles className="w-6 h-6 mr-2 text-accent" />
          Síntese Final em Primeira Pessoa
        </h3>
        <p className="text-muted-foreground">
          Complete estas frases para finalizar seu mapeamento de genialidade
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextAreaInput
          field="potencyDescription"
          label="Quando estou na minha potência, eu sou..."
          placeholder="Ex: Quando estou na minha potência, eu sou uma facilitadora natural de transformações. Tenho clareza mental, energia abundante e consigo ver conexões que outros não percebem. Sou capaz de simplificar o complexo e inspirar pessoas a acreditarem em possibilidades que antes não viam..."
          description="Descreva como você se manifesta no seu melhor momento"
          icon={Zap}
          variant="power"
        />

        <TextAreaInput
          field="disconnectedDescription"
          label="Quando estou desconectado(a), eu fico..."
          placeholder="Ex: Quando estou desconectado, eu fico disperso, procrastino e perco a confiança nas minhas ideias. Tendo a me isolar, questionar demais cada decisão e sinto como se estivesse remando contra a corrente em tudo que faço..."
          description="Como você se comporta quando não está alinhado"
          icon={CloudOff}
          variant="shadow"
        />

        <TextAreaInput
          field="greatestGift"
          label="Meu maior dom é..."
          placeholder="Ex: Meu maior dom é conseguir ver o potencial das pessoas e organizações mesmo quando elas não conseguem ver. Tenho uma habilidade natural para criar pontes entre mundos aparentemente opostos e facilitar transformações que pareciam impossíveis..."
          description="Sua principal qualidade e talento natural"
          icon={Gift}
          variant="gift"
        />

        <TextAreaInput
          field="greatestPain"
          label="Minha maior dor é..."
          placeholder="Ex: Minha maior dor é ver potencial sendo desperdiçado por falta de coragem ou visão. Me machuca profundamente quando vejo pessoas talentosas se limitando ou organizações destruindo sua própria capacidade de impacto por medo ou ego..."
          description="O que mais te sensibiliza ou mobiliza"
          icon={Heart}
          variant="pain"
        />
      </div>

      <TextAreaInput
        field="mainProfessionalNeed"
        label="Minha principal necessidade profissional atual é..."
        placeholder="Ex: Minha principal necessidade profissional atual é encontrar ou criar um espaço onde eu possa aplicar minha visão sistêmica em projetos de impacto real, trabalhando com pessoas que compartilham valores similares e que me permitam contribuir de forma estratégica e não apenas operacional..."
        description="O que você mais precisa neste momento da sua carreira"
        icon={Target}
        variant="need"
      />

      <TextAreaInput
        field="desiredVersion"
        label="A versão de mim que desejo realizar é aquela que..."
        placeholder="Ex: A versão de mim que desejo realizar é aquela que conseguiu integrar completamente propósito e sustentabilidade financeira, que está contribuindo para transformações sistêmicas significativas, que desenvolveu uma abordagem única de trabalho reconhecida no mercado e que serve como ponte entre mundos diferentes para criar soluções inovadoras..."
        description="Sua visão de realização profissional plena"
        icon={Star}
        variant="vision"
      />

      <div className="bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5 p-6 rounded-lg border border-accent/20">
        <h4 className="font-medium mb-4 text-accent flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          Parabéns! Você Completou Seu Mapeamento de Genialidade
        </h4>
        <div className="text-sm text-muted-foreground space-y-3">
          <p>
            <strong>Esta síntese final</strong> representa a essência do que você descobriu sobre si mesmo 
            ao longo deste processo profundo de autoconhecimento.
          </p>
          <p>
            <strong>Seja autêntico e visceral</strong> nas suas respostas. Esta é a fundação sobre a qual 
            construiremos sua estratégia de posicionamento profissional.
          </p>
          <p>
            <strong>Próximo passo:</strong> Com base em todas essas informações, nosso sistema gerará 
            três tipos de relatório personalizados para orientar sua jornada profissional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step10FinalSynthesis;