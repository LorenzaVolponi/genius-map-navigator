import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { BehavioralProfile } from '@/types/assessment';

interface Step2BehavioralProfileProps {
  data: { behavioralProfile?: BehavioralProfile };
  onDataChange: (data: { behavioralProfile: BehavioralProfile }) => void;
}

const Step2BehavioralProfile: React.FC<Step2BehavioralProfileProps> = ({ data, onDataChange }) => {
  const behavioralProfile = data.behavioralProfile || {
    mbti: '',
    disc: '',
    enneagram: '',
    otherTests: [],
    energizingSituations: [],
    drainingsituations: [],
    potentiatingEnvironments: [],
    limitingEnvironments: []
  };

  const updateField = (field: keyof BehavioralProfile, value: any) => {
    const updatedProfile = { ...behavioralProfile, [field]: value };
    onDataChange({ behavioralProfile: updatedProfile });
  };

  const addToArray = (field: keyof BehavioralProfile, value: string) => {
    if (value.trim()) {
      const currentArray = (behavioralProfile[field] as string[]) || [];
      const updatedArray = [...currentArray, value.trim()];
      updateField(field, updatedArray);
    }
  };

  const removeFromArray = (field: keyof BehavioralProfile, index: number) => {
    const currentArray = (behavioralProfile[field] as string[]) || [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(field, updatedArray);
  };

  const ArrayInput = ({ field, label, placeholder }: { field: keyof BehavioralProfile, label: string, placeholder: string }) => {
    const [inputValue, setInputValue] = React.useState('');
    const currentArray = (behavioralProfile[field] as string[]) || [];

    const handleAdd = () => {
      addToArray(field, inputValue);
      setInputValue('');
    };

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button type="button" onClick={handleAdd} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentArray.map((item, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromArray(field, index)}
                className="h-auto p-0 w-4 h-4"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="mbti">MBTI *</Label>
          <Input
            id="mbti"
            value={behavioralProfile.mbti}
            onChange={(e) => updateField('mbti', e.target.value)}
            placeholder="Ex: INFJ, ENTP"
          />
          <p className="text-xs text-muted-foreground">
            16 tipos de personalidade Myers-Briggs
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disc">DISC *</Label>
          <Input
            id="disc"
            value={behavioralProfile.disc}
            onChange={(e) => updateField('disc', e.target.value)}
            placeholder="Ex: D/I, S/C"
          />
          <p className="text-xs text-muted-foreground">
            Dominância, Influência, Estabilidade, Conscienciosidade
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="enneagram">Eneagrama</Label>
          <Input
            id="enneagram"
            value={behavioralProfile.enneagram}
            onChange={(e) => updateField('enneagram', e.target.value)}
            placeholder="Ex: Tipo 8, 3w4"
          />
          <p className="text-xs text-muted-foreground">
            9 tipos com asas ou tríades
          </p>
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
              value={behavioralProfile.energizingSituations.join('\n\n')}
              onChange={(e) => updateField('energizingSituations', e.target.value.split('\n\n').filter(s => s.trim()))}
              placeholder="Descreva as situações profissionais que te energizam e motivam. Ex: Liderar projetos de transformação, resolver problemas complexos, trabalhar com equipes diversas..."
              rows={4}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Ambientes que Potencializam sua Entrega</Label>
            </div>
            <Textarea
              value={behavioralProfile.potentiatingEnvironments.join('\n\n')}
              onChange={(e) => updateField('potentiatingEnvironments', e.target.value.split('\n\n').filter(s => s.trim()))}
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
              value={behavioralProfile.drainingsituations.join('\n\n')}
              onChange={(e) => updateField('drainingsituations', e.target.value.split('\n\n').filter(s => s.trim()))}
              placeholder="Descreva as situações que te drenam e desmotivam. Ex: Reuniões longas sem propósito, microgerenciamento excessivo, ambientes competitivos destrutivos..."
              rows={4}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Ambientes que Limitam sua Expressão</Label>
            </div>
            <Textarea
              value={behavioralProfile.limitingEnvironments.join('\n\n')}
              onChange={(e) => updateField('limitingEnvironments', e.target.value.split('\n\n').filter(s => s.trim()))}
              placeholder="Descreva os ambientes onde você se sente limitado ou contraído. Ex: Hierarquia rígida sem autonomia, open office barulhento, culturas de controle excessivo..."
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Dicas para Preenchimento</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Se não souber seu MBTI ou DISC, faça um teste online gratuito</li>
          <li>• Seja específico nas situações e ambientes</li>
          <li>• Pense em momentos reais da sua carreira</li>
          <li>• Considere tanto aspectos físicos quanto culturais do ambiente</li>
        </ul>
      </div>
    </div>
  );
};

export default Step2BehavioralProfile;