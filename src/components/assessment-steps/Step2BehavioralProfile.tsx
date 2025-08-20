import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { BehavioralProfile } from '@/types/assessment';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface Step2BehavioralProfileProps {
  data: { behavioralProfile?: BehavioralProfile };
  onDataChange: (data: { behavioralProfile: BehavioralProfile }) => void;
}

const traitGroups: Record<string, string[]> = {
    'Criatividade e Visão': [
      'Criativo',
      'Inovador',
      'Visionário',
      'Imaginativo',
      'Criador',
      'Curioso',
      'Ousado',
      'Intuitivo',
      'Inspirador',
    ],
    'Análise e Estratégia': [
      'Analítico',
      'Estratégico',
      'Observador',
      'Detalhista',
      'Pragmático',
      'Racional',
      'Objetivo',
      'Perspicaz',
      'Prático',
      'Rigoroso',
      'Sensato',
      'Minucioso',
      'Meticuloso',
    ],
    'Relacionamento e Comunicação': [
      'Empático',
      'Colaborador',
      'Comunicativo',
      'Diplomático',
      'Generoso',
      'Cuidadoso',
      'Motivador',
      'Sociável',
      'Carismático',
      'Atencioso',
      'Honesto',
      'Leal',
      'Altruísta',
      'Humilde',
      'Responsável',
    ],
    'Liderança e Execução': [
      'Resiliente',
      'Decisivo',
      'Proativo',
      'Assertivo',
      'Independente',
      'Focado',
      'Empreendedor',
      'Determinado',
      'Líder',
      'Confiante',
      'Disciplinado',
      'Eficiente',
      'Engajado',
      'Trabalhador',
      'Persistente',
      'Perseverante',
      'Ambicioso',
    ],
    'Estilo Pessoal': [
      'Adaptável',
      'Organizado',
      'Paciente',
      'Calmo',
      'Versátil',
      'Pontual',
      'Entusiasta',
      'Enérgico',
      'Sereno',
      'Otimista',
      'Flexível',
    ],
  };

const Step2BehavioralProfile: React.FC<Step2BehavioralProfileProps> = ({ data, onDataChange }) => {
  const behavioralProfile: BehavioralProfile = {
    discType: '',
    enneagramType: '',
    mbtiType: '',
    intelligenceType: '',
    traitKeywords: [],
    otherTests: [],
    energizingSituations: [],
    drainingSituations: [],
    potentiatingEnvironments: [],
    limitingEnvironments: [],
    ...(data.behavioralProfile || {}),
  };

  const updateField = (field: keyof BehavioralProfile, value: unknown) => {
    const updatedProfile = { ...behavioralProfile, [field]: value };
    onDataChange({ behavioralProfile: updatedProfile });
  };

  const toggleTrait = (trait: string) => {
    const current = behavioralProfile.traitKeywords;
    const updated = current.includes(trait)
      ? current.filter(t => t !== trait)
      : [...current, trait];
    updateField('traitKeywords', updated);
  };

  const [search, setSearch] = React.useState('');

  const items = React.useMemo(() => {
    const query = search.toLowerCase();
    return Object.entries(traitGroups).flatMap(([category, traits]) => {
      const filtered = traits.filter(trait =>
        trait.toLowerCase().includes(query),
      );
      if (filtered.length === 0) return [];
      return [
        { type: 'header' as const, category },
        ...filtered.map(trait => ({ type: 'trait' as const, trait })),
      ];
    });
  }, [search]);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = items[index];
    if (item.type === 'header') {
      return (
        <div style={style} className="px-2 py-1 text-sm font-medium bg-muted">
          {item.category}
        </div>
      );
    }
    const trait = item.trait;
    return (
      <label
        style={style}
        className="flex items-center space-x-2 text-sm px-2">
        <Checkbox
          checked={behavioralProfile.traitKeywords.includes(trait)}
          onCheckedChange={() => toggleTrait(trait)}
        />
        <span>{trait}</span>
      </label>
    );
  };

  const [listHeight, setListHeight] = React.useState(240);
  React.useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) setListHeight(200);
      else if (window.innerWidth < 768) setListHeight(300);
      else setListHeight(360);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="discType" className="text-base font-medium">Tipo DISC *</Label>
          <Input
            id="discType"
            value={behavioralProfile.discType}
            onChange={(e) => updateField('discType', e.target.value)}
            placeholder="Ex: D"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enneagramType" className="text-base font-medium">Tipo Eneagrama *</Label>
          <Input
            id="enneagramType"
            value={behavioralProfile.enneagramType}
            onChange={(e) => updateField('enneagramType', e.target.value)}
            placeholder="Ex: 5w4"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mbtiType" className="text-base font-medium">Tipo MBTI *</Label>
          <Input
            id="mbtiType"
            value={behavioralProfile.mbtiType}
            onChange={(e) => updateField('mbtiType', e.target.value)}
            placeholder="Ex: INTJ"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intelligenceType" className="text-base font-medium">Tipo de Inteligência *</Label>
          <Input
            id="intelligenceType"
            value={behavioralProfile.intelligenceType}
            onChange={(e) => updateField('intelligenceType', e.target.value)}
            placeholder="Ex: Lógico-Matemática"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Palavras que te descrevem *</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar traço"
          className="mb-2"
        />
        <List
          height={listHeight}
          itemCount={items.length}
          itemSize={32}
          width="100%"
        >
          {Row}
        </List>
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
              value={behavioralProfile.drainingSituations.join('\n')}
              onChange={(e) => updateField('drainingSituations', e.target.value.split('\n').filter(s => s.trim()))}
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