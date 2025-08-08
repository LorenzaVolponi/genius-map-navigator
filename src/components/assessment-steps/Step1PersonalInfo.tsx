import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { PersonalInfo } from '@/types/assessment';

interface Step1PersonalInfoProps {
  data: { personalInfo?: PersonalInfo };
  onDataChange: (data: { personalInfo: PersonalInfo }) => void;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ data, onDataChange }) => {
  const personalInfo = data.personalInfo || {
    fullName: '',
    birthDate: '',
    gender: '',
    currentLocation: '',
    preferredLocations: [],
    languages: [],
    education: [],
    certifications: [],
    previousRoles: [],
    desiredRoles: [],
    workModels: [],
    workPreference: 'remote',
    salaryExpectation: { currency: 'BRL', amount: '' },
    availability: '',
    currentMotivation: ''
  };

  const updateField = (field: keyof PersonalInfo, value: any) => {
    const updatedInfo = { ...personalInfo, [field]: value };
    onDataChange({ personalInfo: updatedInfo });
  };

  const addToArray = (field: keyof PersonalInfo, value: string) => {
    if (value.trim()) {
      const currentArray = (personalInfo[field] as string[]) || [];
      const updatedArray = [...currentArray, value.trim()];
      updateField(field, updatedArray);
    }
  };

  const removeFromArray = (field: keyof PersonalInfo, index: number) => {
    const currentArray = (personalInfo[field] as string[]) || [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(field, updatedArray);
  };

  const ArrayInput = ({ field, label, placeholder }: { field: keyof PersonalInfo, label: string, placeholder: string }) => {
    const [inputValue, setInputValue] = React.useState('');
    const currentArray = (personalInfo[field] as string[]) || [];

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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento *</Label>
          <Input
            id="birthDate"
            type="date"
            value={personalInfo.birthDate}
            onChange={(e) => updateField('birthDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gênero</Label>
          <Select value={personalInfo.gender} onValueChange={(value) => updateField('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="nao-binario">Não-binário</SelectItem>
              <SelectItem value="prefiro-nao-informar">Prefiro não informar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentLocation">Localização Atual</Label>
          <Input
            id="currentLocation"
            value={personalInfo.currentLocation}
            onChange={(e) => updateField('currentLocation', e.target.value)}
            placeholder="Ex: São Paulo, Brasil"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workPreference">Preferência de Trabalho</Label>
          <Select value={personalInfo.workPreference} onValueChange={(value) => updateField('workPreference', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remoto</SelectItem>
              <SelectItem value="hybrid">Híbrido</SelectItem>
              <SelectItem value="onsite">Presencial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Disponibilidade Ideal</Label>
          <Input
            id="availability"
            value={personalInfo.availability}
            onChange={(e) => updateField('availability', e.target.value)}
            placeholder="Ex: 40h/semana, meio período, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Expectativa Salarial</Label>
          <div className="flex space-x-2">
            <Select 
              value={personalInfo.salaryExpectation.currency} 
              onValueChange={(value) => updateField('salaryExpectation', { ...personalInfo.salaryExpectation, currency: value })}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">BRL</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={personalInfo.salaryExpectation.amount}
              onChange={(e) => updateField('salaryExpectation', { ...personalInfo.salaryExpectation, amount: e.target.value })}
              placeholder="Ex: 10.000"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <ArrayInput field="preferredLocations" label="Locais Preferidos para Atuar" placeholder="Ex: Londres, Nova York" />
      <ArrayInput field="languages" label="Idiomas" placeholder="Ex: Inglês fluente" />
      <ArrayInput field="education" label="Formação Acadêmica" placeholder="Ex: MBA em Gestão" />
      <ArrayInput field="certifications" label="Certificações" placeholder="Ex: PMP, Scrum Master" />
      <ArrayInput field="previousRoles" label="Cargos Anteriores Relevantes" placeholder="Ex: Diretor de Marketing" />
      <ArrayInput field="desiredRoles" label="Cargos Desejados" placeholder="Ex: Chief Innovation Officer" />
      <ArrayInput field="workModels" label="Modelos de Trabalho Preferidos" placeholder="Ex: PJ, Consultoria" />

      <div className="space-y-2">
        <Label htmlFor="currentMotivation">Motivação Profissional Atual</Label>
        <Textarea
          id="currentMotivation"
          value={personalInfo.currentMotivation}
          onChange={(e) => updateField('currentMotivation', e.target.value)}
          placeholder="Descreva o que te motiva profissionalmente no momento atual..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default Step1PersonalInfo;