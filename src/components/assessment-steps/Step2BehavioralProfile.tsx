import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BehavioralProfile } from '@/types/assessment';

interface Step2BehavioralProfileProps {
  data: { behavioralProfile?: BehavioralProfile };
  onDataChange: (data: { behavioralProfile: BehavioralProfile }) => void;
}

const Step2BehavioralProfile: React.FC<Step2BehavioralProfileProps> = ({ data, onDataChange }) => {
  const behavioralProfile = data.behavioralProfile || {
    traitKeywords: [],
    otherTests: [],
    energizingSituations: [],
    drainingsituations: [],
    potentiatingEnvironments: [],
    limitingEnvironments: [],
  };

  const updateField = (field: keyof BehavioralProfile, value: unknown) => {
    const updatedProfile = { ...behavioralProfile, [field]: value };
    onDataChange({ behavioralProfile: updatedProfile });
  };

  const traitOptions = [
    'Analítico',
    'Criativo',
    'Empático',
    'Estratégico',
    'Adaptável',
    'Organizado',
    'Visionário',
    'Colaborador',
    'Resiliente',
    'Comunicativo',
    'Decisivo',
    'Detalhista',
    'Inovador',
    'Inspirador',
    'Observador',
    'Pragmático',
    'Intuitivo',
    'Persistente',
    'Diplomático',
    'Proativo',
    'Assertivo',
    'Generoso',
    'Cuidadoso',
    'Motivador',
    'Independente',
    'Flexível',
    'Ambicioso',
    'Curioso',
    'Focado',
    'Leal',
    'Empreendedor',
    'Paciente',
    'Determinado',
    'Carismático',
    'Minucioso',
    'Racional',
    'Sociável',
    'Calmo',
    'Versátil',
    'Pontual',
    'Entusiasta',
    'Humilde',
    'Responsável',
    'Altruísta',
    'Criador',
    'Enérgico',
    'Meticuloso',
    'Líder',
    'Ousado',
    'Sereno'
  ];

  const toggleTrait = (trait: string) => {
    const current = behavioralProfile.traitKeywords;
    const updated = current.includes(trait)
      ? current.filter(t => t !== trait)
      : [...current, trait];
    updateField('traitKeywords', updated);
  };


  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-medium">Palavras que te descrevem *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {traitOptions.map(option => (
            <label key={option} className="flex items-center space-x-2 text-sm">
              <Checkbox
                checked={behavioralProfile.traitKeywords.includes(option)}
                onCheckedChange={() => toggleTrait(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Outros Testes Comportamentais</Label>
        <Textarea
          value={behavioralProfile.otherTests.join('\n')}
          onChange={(e) => updateField('otherTests', e.target.value.split('\n').filter(s => s.trim()))}
          placeholder="Liste outros testes de personalidade que você fez. Ex: CliftonStrengths: Estratégico, Ideação; VIA Character: Criatividade, Prudência..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Situações que Geram Energia</Label>
            </div>
            <Textarea
              value={behavioralProfile.energizingSituations.join('\n')}
              onChange={(e) => updateField('energizingSituations', e.target.value.split('\n').filter(s => s.trim()))}
              placeholder="Descreva as situações profissionais que te energizam e motivam. Ex: Liderar projetos de transformação, resolver problemas complexos, trabalhar com equipes diversas..."
              rows={4}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Ambientes que Potencializam sua Entrega</Label>
            </div>
            <Textarea
              value={behavioralProfile.potentiatingEnvironments.join('\n')}
              onChange={(e) => updateField('potentiatingEnvironments', e.target.value.split('\n').filter(s => s.trim()))}
              placeholder="Descreva os ambientes onde você se sente mais produtivo e criativo. Ex: Startup dinâmica com autonomia, home office silencioso com flexibilidade..."
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Situações que Drenam Energia</Label>
            </div>
            <Textarea
              value={behavioralProfile.drainingsituations.join('\n')}
              onChange={(e) => updateField('drainingsituations', e.target.value.split('\n').filter(s => s.trim()))}
              placeholder="Descreva as situações que te drenam e desmotivam. Ex: Reuniões longas sem propósito, microgerenciamento excessivo, ambientes competitivos destrutivos..."
              rows={4}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Ambientes que Limitam sua Expressão</Label>
            </div>
            <Textarea
              value={behavioralProfile.limitingEnvironments.join('\n')}
              onChange={(e) => updateField('limitingEnvironments', e.target.value.split('\n').filter(s => s.trim()))}
              placeholder="Descreva os ambientes onde você se sente limitado ou contraído. Ex: Hierarquia rígida sem autonomia, open office barulhento, culturas de controle excessivo..."
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Dicas para Preenchimento</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Selecione as palavras que mais te representam</li>
          <li>• Seja específico nas situações e ambientes</li>
          <li>• Pense em momentos reais da sua carreira</li>
          <li>• Considere tanto aspectos físicos quanto culturais do ambiente</li>
        </ul>
      </div>
    </div>
  );
};

export default Step2BehavioralProfile;