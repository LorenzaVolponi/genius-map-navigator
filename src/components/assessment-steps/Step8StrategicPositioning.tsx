import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Target, Lightbulb, TrendingUp, X } from 'lucide-react';
import { StrategicPositioning } from '@/types/assessment';

interface Step8StrategicPositioningProps {
  data: { strategicPositioning?: StrategicPositioning };
  onDataChange: (data: { strategicPositioning: StrategicPositioning }) => void;
}


const Step8StrategicPositioning: React.FC<Step8StrategicPositioningProps> = ({ data, onDataChange }) => {
  const strategicPositioning = data.strategicPositioning || {
    areasOfInterest: [],
    preferredRole: [],
    meaningfulWork: '',
    acceptableProjects: [],
    rejectedProjects: []
  };

  const updateField = (field: keyof StrategicPositioning, value: unknown) => {
    const updatedPositioning = { ...strategicPositioning, [field]: value };
    onDataChange({ strategicPositioning: updatedPositioning });
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
          Descreva as áreas que despertam seu interesse e expertise
        </p>

        <div className="ml-7">
          <Textarea
            value={strategicPositioning.areasOfInterest.join('\n\n')}
            onChange={(e) => updateField('areasOfInterest', e.target.value.split('\n\n').filter(s => s.trim()))}
            placeholder="Ex: Ética e governança de IA... Automação inteligente de processos..."
            rows={5}
          />
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
          Liste os papéis profissionais que mais se alinham com sua forma de trabalhar
        </p>

        <div className="ml-7">
          <Textarea
            value={strategicPositioning.preferredRole.join('\n\n')}
            onChange={(e) => updateField('preferredRole', e.target.value.split('\n\n').filter(s => s.trim()))}
            placeholder="Ex: Estrategista, consultora fractional, facilitadora de transformação..."
            rows={4}
          />
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