import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { TalentsAndFlow } from '@/types/assessment';

interface Step3TalentsAndFlowProps {
  data: { talentsAndFlow?: TalentsAndFlow };
  onDataChange: (data: { talentsAndFlow: TalentsAndFlow }) => void;
}

const Step3TalentsAndFlow: React.FC<Step3TalentsAndFlowProps> = ({ data, onDataChange }) => {
  const talentsAndFlow = data.talentsAndFlow || {
    flowMoments: [],
    challengesYouLove: [],
    recurringCompliments: [],
    impactOnOthers: '',
    naturalTalent: '',
    miracleMoments: [],
    energizingActivities: [],
    relationshipWithGoals: '',
    preferredAction: 'create'
  };

  const updateField = (field: keyof TalentsAndFlow, value: any) => {
    const updatedFlow = { ...talentsAndFlow, [field]: value };
    onDataChange({ talentsAndFlow: updatedFlow });
  };

  const addToArray = (field: keyof TalentsAndFlow, value: string) => {
    if (value.trim()) {
      const currentArray = (talentsAndFlow[field] as string[]) || [];
      const updatedArray = [...currentArray, value.trim()];
      updateField(field, updatedArray);
    }
  };

  const removeFromArray = (field: keyof TalentsAndFlow, index: number) => {
    const currentArray = (talentsAndFlow[field] as string[]) || [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(field, updatedArray);
  };

  const ArrayInput = ({ field, label, placeholder, description }: { 
    field: keyof TalentsAndFlow, 
    label: string, 
    placeholder: string,
    description?: string 
  }) => {
    const [inputValue, setInputValue] = React.useState('');
    const currentArray = (talentsAndFlow[field] as string[]) || [];

    const handleAdd = () => {
      addToArray(field, inputValue);
      setInputValue('');
    };

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
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
            <div key={index} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
              <span className="flex-1 text-sm">{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromArray(field, index)}
                className="h-auto p-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ArrayInput 
        field="flowMoments" 
        label="1. Três momentos em que experimentou flow absoluto na carreira ou vida" 
        placeholder="Descreva uma situação específica onde perdeu a noção do tempo, se sentiu completamente absorvido e teve alta performance..."
        description="Flow é o estado de total imersão e satisfação em uma atividade"
      />

      <ArrayInput 
        field="challengesYouLove" 
        label="2. Desafios que você ama resolver (mesmo quando evitados por outros)" 
        placeholder="Ex: Transformar equipes desmotivadas, criar soluções para problemas complexos, mediar conflitos..."
      />

      <ArrayInput 
        field="recurringCompliments" 
        label="3. Tipo de elogio recorrente que recebe em sua potência máxima" 
        placeholder="Ex: 'Você sempre vê soluções onde outros veem problemas', 'Sua capacidade de simplificar o complexo é incrível'..."
      />

      <div className="space-y-2">
        <Label htmlFor="impactOnOthers">4. Como você impacta os outros quando está em alta performance?</Label>
        <Textarea
          id="impactOnOthers"
          value={talentsAndFlow.impactOnOthers}
          onChange={(e) => updateField('impactOnOthers', e.target.value)}
          placeholder="Descreva como as pessoas se sentem, reagem ou se transformam quando você está no seu melhor..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="naturalTalent">5. Talento tão natural que você esquece que é um diferencial</Label>
        <Textarea
          id="naturalTalent"
          value={talentsAndFlow.naturalTalent}
          onChange={(e) => updateField('naturalTalent', e.target.value)}
          placeholder="Algo que faz sem esforço mas que outros consideram difícil ou impressionante..."
          rows={3}
        />
      </div>

      <ArrayInput 
        field="miracleMoments" 
        label="6. Três momentos em que fez 'milagre acontecer' com poucos recursos" 
        placeholder="Situações onde conseguiu resultados extraordinários mesmo com limitações de tempo, budget ou recursos..."
      />

      <ArrayInput 
        field="energizingActivities" 
        label="7. Atividades que te animam mesmo quando está cansado(a)" 
        placeholder="Ex: Brainstormings criativos, mentoria de pessoas, análise de dados, apresentações..."
      />

      <div className="space-y-2">
        <Label htmlFor="relationshipWithGoals">8. Sua relação com metas, performance e cobrança</Label>
        <Textarea
          id="relationshipWithGoals"
          value={talentsAndFlow.relationshipWithGoals}
          onChange={(e) => updateField('relationshipWithGoals', e.target.value)}
          placeholder="Como você funciona melhor: com metas claras ou flexibilidade? Pressão externa ou motivação interna? Descreva..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>9. Você se realiza mais quando:</Label>
        <Select value={talentsAndFlow.preferredAction} onValueChange={(value) => updateField('preferredAction', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua preferência" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="create">Cria (novos projetos, produtos, ideias)</SelectItem>
            <SelectItem value="teach">Ensina (desenvolve pessoas, compartilha conhecimento)</SelectItem>
            <SelectItem value="organize">Organiza (estrutura, processos, sistemas)</SelectItem>
            <SelectItem value="solve">Soluciona (problemas, crises, desafios)</SelectItem>
            <SelectItem value="connect">Conecta (pessoas, ideias, oportunidades)</SelectItem>
            <SelectItem value="transform">Transforma (culturas, mercados, realidades)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-2 text-primary">Reflexão Importante</h4>
        <p className="text-sm text-muted-foreground">
          Esta seção é fundamental para identificar sua zona de genialidade. Seja específico e honesto. 
          Pense em situações reais, não no que acha que deveria responder. Seus talentos naturais são pistas 
          valiosas sobre onde você pode gerar mais valor com menos esforço.
        </p>
      </div>
    </div>
  );
};

export default Step3TalentsAndFlow;