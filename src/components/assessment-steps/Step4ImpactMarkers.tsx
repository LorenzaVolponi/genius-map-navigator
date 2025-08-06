import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Award, Lightbulb, TrendingUp, Users, Building } from 'lucide-react';
import { ImpactMarkers } from '@/types/assessment';

interface Step4ImpactMarkersProps {
  data: { impactMarkers?: ImpactMarkers };
  onDataChange: (data: { impactMarkers: ImpactMarkers }) => void;
}

const Step4ImpactMarkers: React.FC<Step4ImpactMarkersProps> = ({ data, onDataChange }) => {
  const impactMarkers = data.impactMarkers || {
    highImpactProjects: [],
    ideasThatBecameReality: [],
    strategicTransformations: [],
    fundingOrProgramsCreated: [],
    peopleYouMentored: []
  };

  const updateField = (field: keyof ImpactMarkers, value: unknown) => {
    const updatedMarkers = { ...impactMarkers, [field]: value };
    onDataChange({ impactMarkers: updatedMarkers });
  };

  const ArrayInput = ({
    field,
    label,
    placeholder,
    description,
    icon: Icon
  }: {
    field: keyof ImpactMarkers,
    label: string,
    placeholder: string,
    description?: string,
    icon: React.ElementType
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-primary" />
        <Label className="text-base font-medium">{label}</Label>
      </div>
      {description && <p className="text-sm text-muted-foreground ml-7">{description}</p>}

      <div className="ml-7">
        <Textarea
          value={(impactMarkers[field] as string[]).join('\n\n')}
          onChange={(e) => updateField(field, e.target.value.split('\n\n').filter(s => s.trim()))}
          placeholder={placeholder}
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Marcos de Impacto Profissional</h3>
        <p className="text-muted-foreground">
          Documente suas principais conquistas, criações e transformações realizadas ao longo da carreira
        </p>
      </div>

      <ArrayInput 
        field="highImpactProjects" 
        label="1. Três projetos de alto impacto que você liderou ou participou"
        placeholder="Descreva o projeto, seu papel, resultados alcançados e impacto gerado. Ex: 'Liderei a transformação digital de uma empresa de 500 funcionários, resultando em 40% de aumento de produtividade e economia de R$ 2M anuais...'"
        description="Foque em projetos que geraram resultados mensuráveis e transformação significativa"
        icon={Award}
      />

      <ArrayInput 
        field="ideasThatBecameReality" 
        label="2. Ideias suas que viraram políticas, produtos, metodologias ou livros"
        placeholder="Descreva ideias que você concebeu e que se tornaram realidade. Ex: 'Criei uma metodologia de onboarding que foi adotada por toda a empresa e depois virou um framework usado por outras organizações...'"
        description="Inclua tanto criações formais quanto informais que ganharam vida própria"
        icon={Lightbulb}
      />

      <ArrayInput 
        field="strategicTransformations" 
        label="3. Transformações estratégicas provocadas em empresas, redes ou sistemas"
        placeholder="Descreva mudanças sistêmicas que você iniciou ou liderou. Ex: 'Transformei a cultura de uma startup de 50 para 200 pessoas, implementando valores e práticas que se mantêm até hoje...'"
        description="Pense em mudanças de cultura, processos, estruturas ou modelos de negócio"
        icon={TrendingUp}
      />

      <ArrayInput 
        field="fundingOrProgramsCreated" 
        label="4. Você já modelou fundos, produtos, programas, aceleradoras ou ecossistemas?"
        placeholder="Descreva iniciativas que você criou do zero ou ajudou a estruturar. Ex: 'Co-fundei uma aceleradora de startups de impacto que já investiu em 30+ empresas...'"
        description="Inclua tanto iniciativas próprias quanto colaborativas"
        icon={Building}
      />

      <ArrayInput 
        field="peopleYouMentored" 
        label="5. Já formou alguém que brilhou com sua mentoria ou apoio?"
        placeholder="Descreva pessoas que você mentorou, desenvolveu ou apoiou e que alcançaram sucesso significativo. Ex: 'Mentorei um analista júnior que se tornou diretor em 3 anos, aplicando frameworks que desenvolvi...'"
        description="Foque no impacto que seu desenvolvimento de pessoas gerou na carreira delas"
        icon={Users}
      />

      <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
        <h4 className="font-medium mb-3 text-secondary flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Dicas para Potencializar suas Respostas
        </h4>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• <strong>Seja específico com números:</strong> pessoas impactadas, valores gerados, percentuais de melhoria</li>
          <li>• <strong>Inclua o contexto:</strong> qual era a situação antes e depois da sua atuação</li>
          <li>• <strong>Destaque sua contribuição única:</strong> o que você fez que outros não fizeram</li>
          <li>• <strong>Pense além do óbvio:</strong> pequenas iniciativas que geraram grandes impactos</li>
          <li>• <strong>Considere impactos indiretos:</strong> mudanças que continuaram após sua saída</li>
        </ul>
      </div>
    </div>
  );
};

export default Step4ImpactMarkers;