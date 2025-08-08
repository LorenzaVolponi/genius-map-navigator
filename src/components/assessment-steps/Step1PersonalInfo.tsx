import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { PersonalInfo } from '@/types/assessment';

interface Step1PersonalInfoProps {
  data: { personalInfo?: PersonalInfo };
  onDataChange: (data: { personalInfo: PersonalInfo }) => void;
}

const defaultInfo: PersonalInfo = {
  fullName: '',
  birthDate: '',
  gender: '',
  currentLocation: '',
  linkedinUrl: '',
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
  currentMotivation: '',
};

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ data, onDataChange }) => {
  const [info, setInfo] = useState<PersonalInfo>(data.personalInfo || defaultInfo);

  useEffect(() => {
    setInfo(data.personalInfo || defaultInfo);
  }, [data.personalInfo]);

  const updateField = useCallback(<K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    setInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    const id = setTimeout(() => onDataChange({ personalInfo: info }), 300);
    return () => clearTimeout(id);
  }, [info, onDataChange]);

  type ArrayField =
    | 'preferredLocations'
    | 'languages'
    | 'education'
    | 'certifications'
    | 'previousRoles'
    | 'desiredRoles'
    | 'workModels';

  const renderListTextarea = (
    field: ArrayField,
    label: string,
    placeholder: string,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Textarea
        id={field}
        value={(info[field] || []).join('\n')}
        onChange={(e) =>
          updateField(
            field,
            e.target.value
              .split('\n')
              .map((v) => v.trim())
              .filter(Boolean) as PersonalInfo[ArrayField],
          )
        }
        placeholder={placeholder}
        rows={4}
      />
    </div>
  );

  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);

  const handleLinkedInImport = async () => {
    if (!info.linkedinUrl) return;
    try {
      setLoadingLinkedIn(true);

      let profileId = '';
      try {
        const url = new URL(info.linkedinUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        profileId = parts[0] || '';
      } catch {
        /* fall back to regex below */
      }

      if (!profileId) {
        const match = info.linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/i);
        if (match) profileId = match[1];
      }

      if (!profileId) {
        toast({ title: 'URL inválida do LinkedIn' });
        return;
      }

      profileId = encodeURIComponent(profileId.trim());

      const urls = [
        `https://r.jina.ai/https://www.linkedin.com/in/${profileId}`,
        `https://r.jina.ai/http://www.linkedin.com/in/${profileId}`,
        `https://r.jina.ai/https://linkedin.com/in/${profileId}`,
      ];

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const responses = await Promise.all(
        urls.map((url) => fetch(url, { signal: controller.signal }).catch(() => null))
      );
      clearTimeout(timeout);

      let text = '';
      for (const res of responses) {
        if (res && res.ok) {
          text = await res.text();
          if (text) break;
        }
      }

      if (!text) throw new Error('Dados não encontrados');

      let fullName = info.fullName;
      let headline = info.currentMotivation;
      let location = info.currentLocation;

      const ldMatch = text.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (ldMatch) {
        try {
          const data = JSON.parse(ldMatch[1]);
          fullName = fullName || data.name || '';
          headline = headline || data.jobTitle || '';
          location = location || data.address?.addressLocality || '';
        } catch {
          /* ignore json parse errors */
        }
      }

      if (!fullName) {
        const nameMatch = text.match(/<title>([^|<]+)\|/);
        if (nameMatch) fullName = nameMatch[1].trim();
      }
      if (!headline) {
        const headlineMatch = text.match(/"headline":"([^"]+)"/);
        if (headlineMatch) headline = headlineMatch[1];
      }
      if (!location) {
        const locationMatch = text.match(/"location":"([^"]+)"/);
        if (locationMatch) location = locationMatch[1];
      }

      if (fullName) updateField('fullName', fullName);
      if (headline) updateField('currentMotivation', headline);
      if (location) updateField('currentLocation', location);

      toast({ title: 'Dados do LinkedIn importados' });
    } catch (e) {
      console.error('Erro ao importar LinkedIn', e);
      toast({
        title: 'Erro ao importar LinkedIn',
        description: 'Não foi possível obter os dados do perfil informado.'
      });
    } finally {
      setLoadingLinkedIn(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            autoFocus
            required
            autoComplete="name"
            value={info.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            onBlur={(e) => updateField('fullName', e.target.value.trim())}
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento *</Label>
            <Input
              id="birthDate"
              type="date"
              required
              autoComplete="bday"
              value={info.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
            />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gênero</Label>
          <Select value={info.gender} onValueChange={(value) => updateField('gender', value)}>
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
            autoComplete="address-level2"
            value={info.currentLocation}
            onChange={(e) => updateField('currentLocation', e.target.value)}
            onBlur={(e) => updateField('currentLocation', e.target.value.trim())}
            placeholder="Ex: São Paulo, Brasil"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="linkedinUrl">LinkedIn</Label>
          <div className="flex space-x-2">
            <Input
              id="linkedinUrl"
              type="url"
              autoComplete="url"
              value={info.linkedinUrl}
              onChange={(e) => updateField('linkedinUrl', e.target.value)}
              onBlur={(e) => updateField('linkedinUrl', e.target.value.trim())}
              placeholder="https://www.linkedin.com/in/seu-perfil"
            />
            <Button type="button" onClick={handleLinkedInImport} disabled={loadingLinkedIn || !info.linkedinUrl}>
              {loadingLinkedIn ? 'Buscando...' : 'Importar'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workPreference">Preferência de Trabalho</Label>
          <Select value={info.workPreference} onValueChange={(value) => updateField('workPreference', value)}>
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
            value={info.availability}
            onChange={(e) => updateField('availability', e.target.value)}
            onBlur={(e) => updateField('availability', e.target.value.trim())}
            placeholder="Ex: 40h/semana, meio período, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Expectativa Salarial</Label>
          <div className="flex space-x-2">
            <Select 
              value={info.salaryExpectation.currency}
              onValueChange={(value) => updateField('salaryExpectation', { ...info.salaryExpectation, currency: value })}
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
              type="number"
              inputMode="decimal"
              value={info.salaryExpectation.amount}
              onChange={(e) => updateField('salaryExpectation', { ...info.salaryExpectation, amount: e.target.value })}
              onBlur={(e) =>
                updateField('salaryExpectation', {
                  ...info.salaryExpectation,
                  amount: e.target.value.trim(),
                })
              }
              placeholder="Ex: 10.000"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {renderListTextarea('preferredLocations', 'Locais Preferidos para Atuar', 'Ex: Londres, Nova York')}
      {renderListTextarea('languages', 'Idiomas', 'Ex: Inglês fluente')}
      {renderListTextarea('education', 'Formação Acadêmica', 'Ex: MBA em Gestão')}
      {renderListTextarea('certifications', 'Certificações', 'Ex: PMP, Scrum Master')}
      {renderListTextarea('previousRoles', 'Cargos Anteriores Relevantes', 'Ex: Diretor de Marketing')}
      {renderListTextarea('desiredRoles', 'Cargos Desejados', 'Ex: Chief Innovation Officer')}
      {renderListTextarea('workModels', 'Modelos de Trabalho Preferidos', 'Ex: PJ, Consultoria')}

        <div className="space-y-2">
          <Label htmlFor="currentMotivation">Motivação Profissional Atual</Label>
          <Textarea
            id="currentMotivation"
            value={info.currentMotivation}
            onChange={(e) => updateField('currentMotivation', e.target.value)}
            onBlur={(e) => updateField('currentMotivation', e.target.value.trim())}
            placeholder="Descreva o que te motiva profissionalmente no momento atual..."
            rows={4}
          />
        </div>
    </div>
  );
};

export default Step1PersonalInfo;
