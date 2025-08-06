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

      <ArrayInput 
        field="otherTests" 
        label="Outros Testes Comportamentais" 
        placeholder="Ex: CliftonStrengths, VIA Character" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ArrayInput 
            field="energizingSituations" 
            label="Situações que Geram Energia" 
            placeholder="Ex: Liderar equipes, resolver problemas complexos" 
          />
          
          <ArrayInput 
            field="potentiatingEnvironments" 
            label="Ambientes que Potencializam sua Entrega" 
            placeholder="Ex: Startup dinâmica, home office silencioso" 
          />
        </div>

        <div className="space-y-4">
          <ArrayInput 
            field="drainingsituations" 
            label="Situações que Drenam Energia" 
            placeholder="Ex: Reuniões longas sem propósito, microgerenciamento" 
          />
          
          <ArrayInput 
            field="limitingEnvironments" 
            label="Ambientes que Limitam sua Expressão" 
            placeholder="Ex: Hierarquia rígida, open office barulhento" 
          />
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