import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const updateField = (field: keyof PersonalInfo, value: unknown) => {
    const updatedInfo = { ...personalInfo, [field]: value };
    onDataChange({ personalInfo: updatedInfo });
  };

  const ListTextarea = ({ field, label, placeholder }: { field: keyof PersonalInfo, label: string, placeholder: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={(personalInfo[field] as string[]).join('\n\n')}
        onChange={(e) => updateField(field, e.target.value.split('\n\n').filter(s => s.trim()))}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );

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

      <ListTextarea field="preferredLocations" label="Locais Preferidos para Atuar" placeholder="Ex: Londres, Nova York" />
      <ListTextarea field="languages" label="Idiomas" placeholder="Ex: Inglês fluente" />
      <ListTextarea field="education" label="Formação Acadêmica" placeholder="Ex: MBA em Gestão" />
      <ListTextarea field="certifications" label="Certificações" placeholder="Ex: PMP, Scrum Master" />
      <ListTextarea field="previousRoles" label="Cargos Anteriores Relevantes" placeholder="Ex: Diretor de Marketing" />
      <ListTextarea field="desiredRoles" label="Cargos Desejados" placeholder="Ex: Chief Innovation Officer" />
      <ListTextarea field="workModels" label="Modelos de Trabalho Preferidos" placeholder="Ex: PJ, Consultoria" />

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