import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { PersonalInfo } from '@/types/assessment';
import { Loader2 } from 'lucide-react';

interface Step1PersonalInfoProps {
  data: { personalInfo?: PersonalInfo };
  onDataChange: (data: { personalInfo: PersonalInfo }) => void;
}

const createDefaultInfo = (): PersonalInfo => ({
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
});

const defaultInfo = createDefaultInfo();

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ data, onDataChange }) => {
  const [info, setInfo] = useState<PersonalInfo>(data.personalInfo || defaultInfo);
  const infoRef = useRef(info);
  const maxBirthDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    infoRef.current = info;
  }, [info]);

  // hydrate local state when persisted data loads for the first time
  useEffect(() => {
    if (data.personalInfo && data.personalInfo !== infoRef.current) {
      setInfo(data.personalInfo);
    }
  }, [data.personalInfo]);

  const updateField = useCallback(<K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    setInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    let handle: number | null = null;
    const schedule = () => onDataChange({ personalInfo: infoRef.current });

    if (typeof window !== 'undefined') {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (w.requestIdleCallback) {
        handle = w.requestIdleCallback(schedule);
      } else {
        handle = window.setTimeout(schedule, 300);
      }

      return () => {
        if (handle !== null) {
          if (w.cancelIdleCallback) {
            w.cancelIdleCallback(handle);
          } else {
            clearTimeout(handle);
          }
        }
      };
    }

    // non-browser environment fallback
    const timeout = setTimeout(schedule, 300);
    return () => clearTimeout(timeout);
  }, [info, onDataChange]);

  type ArrayField =
    | 'preferredLocations'
    | 'languages'
    | 'education'
    | 'certifications'
    | 'previousRoles'
    | 'desiredRoles'
    | 'workModels';

  const [lists, setLists] = useState<Record<ArrayField, string>>({
    preferredLocations: '',
    languages: '',
    education: '',
    certifications: '',
    previousRoles: '',
    desiredRoles: '',
    workModels: '',
  });

  useEffect(() => {
    setLists({
      preferredLocations: (info.preferredLocations || []).join('\n'),
      languages: (info.languages || []).join('\n'),
      education: (info.education || []).join('\n'),
      certifications: (info.certifications || []).join('\n'),
      previousRoles: (info.previousRoles || []).join('\n'),
      desiredRoles: (info.desiredRoles || []).join('\n'),
      workModels: (info.workModels || []).join('\n'),
    });
  }, [
    info.preferredLocations,
    info.languages,
    info.education,
    info.certifications,
    info.previousRoles,
    info.desiredRoles,
    info.workModels,
  ]);

  const handleListChange = useCallback(
    (field: ArrayField, value: string) => {
      setLists(prev => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleListBlur = useCallback(
    (field: ArrayField) => {
      const normalized = Array.from(
        new Set(
          lists[field]
            .split('\n')
            .map(v => v.trim())
            .filter(Boolean),
        ),
      ) as PersonalInfo[ArrayField];

      updateField(field, normalized);
      setLists(prev => ({ ...prev, [field]: normalized.join('\n') }));
    },
    [lists, updateField],
  );

  const renderListTextarea = useCallback(
    (
      field: ArrayField,
      label: string,
      placeholder: string,
      description?: string,
    ) => (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <Textarea
          id={field}
          value={lists[field]}
          onChange={(e) => handleListChange(field, e.target.value)}
          onBlur={() => handleListBlur(field)}
          placeholder={placeholder}
          rows={4}
        />
      </div>
    ),
    [lists, handleListChange, handleListBlur],
  );

  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);
  const linkedinDebounce = useRef<number>();

  const handleLinkedInImport = async (providedUrl?: string) => {
    const linkedinUrl = providedUrl || info.linkedinUrl;
    if (!linkedinUrl) return;
    setLoadingLinkedIn(true);
    try {
      const apiKey = import.meta.env.VITE_PROXYCURL_API_KEY;
      if (apiKey) {
        try {
          const res = await fetch(
            `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(linkedinUrl)}&use_cache=if-present`,
            { headers: { Authorization: `Bearer ${apiKey}` } },
          );
          if (res.ok) {
            const data = await res.json();
            if (data.full_name) updateField('fullName', data.full_name);
            if (data.occupation) updateField('currentMotivation', data.occupation);
            const loc = [data.city, data.country].filter(Boolean).join(', ');
            if (loc) updateField('currentLocation', loc);
            toast({ title: 'Dados do LinkedIn importados' });
            return;
          }
        } catch (err) {
          console.error('Proxycurl import failed', err);
        }
      }

      let profileId = '';
      try {
        const url = new URL(linkedinUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        profileId = parts[0] || '';
      } catch {
        /* fall back to regex below */
      }

      if (!profileId) {
        const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/i);
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
      let text = '';
      try {
        const res = await Promise.any(
          urls.map(url => fetch(url, { signal: controller.signal })),
        );
        if (!res.ok) throw new Error('Dados não encontrados');
        text = await res.text();
      } finally {
        clearTimeout(timeout);
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

  useEffect(() => {
    if (!info.linkedinUrl) return;
    if (linkedinDebounce.current) clearTimeout(linkedinDebounce.current);
    linkedinDebounce.current = window.setTimeout(() => {
      handleLinkedInImport(info.linkedinUrl);
    }, 800);
    return () => {
      if (linkedinDebounce.current) clearTimeout(linkedinDebounce.current);
    };
  }, [info.linkedinUrl]);

  const handleReset = useCallback(() => {
    const empty = createDefaultInfo();
    setInfo(empty);
    setLists({
      preferredLocations: '',
      languages: '',
      education: '',
      certifications: '',
      previousRoles: '',
      desiredRoles: '',
      workModels: '',
    });
    onDataChange({ personalInfo: empty });
    toast({ title: 'Dados limpos' });
  }, [onDataChange]);

  return (
    <div className="space-y-8">
      {/* Informações Básicas */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Informações Básicas</h2>
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
            max={maxBirthDate}
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

          <div className="space-y-2 md:col-span-2 relative">
            <Label htmlFor="linkedinUrl">LinkedIn</Label>
            <Input
              id="linkedinUrl"
              type="url"
              autoComplete="url"
              value={info.linkedinUrl}
              onChange={(e) => updateField('linkedinUrl', e.target.value)}
              onBlur={(e) => updateField('linkedinUrl', e.target.value.trim())}
              placeholder="https://www.linkedin.com/in/seu-perfil"
            />
            {loadingLinkedIn && (
              <Loader2 className="animate-spin h-4 w-4 absolute right-3 top-9 text-muted-foreground" />
            )}
          </div>
        </div>
      </section>

      <Separator />

      {/* Preferências de Trabalho */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Preferências de Trabalho</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="space-y-2 md:col-span-2">
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
                step="0.01"
                min={0}
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
      </section>

      <Separator />

      {/* Formação e Experiências */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Formação e Experiências</h2>
        {renderListTextarea('preferredLocations', 'Locais Preferidos para Atuar', 'Ex: Londres, Nova York', 'Use uma linha por local')}
        {renderListTextarea('languages', 'Idiomas', 'Ex: Inglês fluente', 'Use uma linha por idioma')}
        {renderListTextarea('education', 'Formação Acadêmica', 'Ex: MBA em Gestão', 'Use uma linha por formação')}
        {renderListTextarea('certifications', 'Certificações', 'Ex: PMP, Scrum Master', 'Use uma linha por certificação')}
        {renderListTextarea('previousRoles', 'Cargos Anteriores Relevantes', 'Ex: Diretor de Marketing', 'Use uma linha por cargo')}
        {renderListTextarea('desiredRoles', 'Cargos Desejados', 'Ex: Chief Innovation Officer', 'Use uma linha por cargo')}
        {renderListTextarea('workModels', 'Modelos de Trabalho Preferidos', 'Ex: PJ, Consultoria', 'Use uma linha por modelo')}
      </section>

      <Separator />

      {/* Motivação Atual */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Motivação Atual</h2>
        <Label htmlFor="currentMotivation">Motivação Profissional Atual</Label>
        <Textarea
          id="currentMotivation"
          value={info.currentMotivation}
          onChange={(e) => updateField('currentMotivation', e.target.value)}
          onBlur={(e) => updateField('currentMotivation', e.target.value.trim())}
          placeholder="Descreva o que te motiva profissionalmente no momento atual..."
          rows={4}
        />
      </section>

      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={handleReset}>
          Limpar campos
        </Button>
      </div>
    </div>
  );
};

export default React.memo(
  Step1PersonalInfo,
  (prev, next) =>
    prev.data.personalInfo === next.data.personalInfo &&
    prev.onDataChange === next.onDataChange,
);
