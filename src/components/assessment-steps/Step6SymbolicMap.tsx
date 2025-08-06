import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Hash, Calendar } from 'lucide-react';
import { SymbolicMap } from '@/types/assessment';

interface Step6SymbolicMapProps {
  data: { symbolicMap?: SymbolicMap; personalInfo?: { birthDate?: string } };
  onDataChange: (data: { symbolicMap: SymbolicMap }) => void;
}

const zodiacSigns = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
  'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

const lifeCycles = [
  'Preparação e Aprendizado (0-28 anos)',
  'Construção e Expansão (29-56 anos)',
  'Mestria e Legado (57+ anos)',
  'Transição entre ciclos',
  'Renascimento/Reinvenção',
  'Período de colheita',
  'Fase de redefinição'
];

const Step6SymbolicMap: React.FC<Step6SymbolicMapProps> = ({ data, onDataChange }) => {
  const symbolicMap = React.useMemo(() => (
    data.symbolicMap || {
      lifePathNumber: 0,
      soulNumber: 0,
      destinyNumber: 0,
      sunSign: '',
      currentLifeCycle: ''
    }
  ), [data.symbolicMap]);

  const updateField = React.useCallback(
    (field: keyof SymbolicMap, value: unknown) => {
      onDataChange({ symbolicMap: { ...symbolicMap, [field]: value } });
    },
    [symbolicMap, onDataChange]
  );

  // Helper function to calculate numerological numbers
  const calculateFromDate = React.useCallback((birthDate: string) => {
    if (!birthDate) return;
    
    const [year, month, day] = birthDate.split('-').map(Number);
    
    // Life Path Number (sum of all digits in birth date)
    const sumAllDigits = (num: number): number => {
      const digits = num.toString().split('').map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      return sum > 9 && sum !== 11 && sum !== 22 && sum !== 33 ? sumAllDigits(sum) : sum;
    };
    
    const totalSum = sumAllDigits(day + month + year);
    updateField('lifePathNumber', totalSum);
    
    // Soul Number (day of birth)
    updateField('soulNumber', sumAllDigits(day));
    
    // Destiny Number (sum of complete date)
    const destinySum = sumAllDigits(parseInt(`${day}${month}${year}`));
    updateField('destinyNumber', destinySum);
  }, [updateField]);

  // Auto-calculate when there's a birth date in personal info
  const birthDate = data.personalInfo?.birthDate;
  React.useEffect(() => {
    if (birthDate) {
      calculateFromDate(birthDate);
    }
  }, [birthDate, calculateFromDate]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Mapa Simbólico</h3>
        <p className="text-muted-foreground">
          Análise energética e arquetípica através da numerologia e astrologia funcional
        </p>
      </div>

      {/* Numerologia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Hash className="w-5 h-5 mr-2 text-accent" />
            Numerologia
          </CardTitle>
          <CardDescription>
            Números calculados automaticamente a partir da sua data de nascimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Número do Caminho de Vida</Label>
              <Input
                type="number"
                value={symbolicMap.lifePathNumber || ''}
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Soma reduzida da data completa de nascimento
              </p>
            </div>

            <div className="space-y-2">
              <Label>Número da Alma</Label>
              <Input
                type="number"
                value={symbolicMap.soulNumber || ''}
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Dia do nascimento reduzido
              </p>
            </div>

            <div className="space-y-2">
              <Label>Número do Destino</Label>
              <Input
                type="number"
                value={symbolicMap.destinyNumber || ''}
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Soma completa da data de nascimento
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Astrologia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="w-5 h-5 mr-2 text-accent" />
            Astrologia Funcional
          </CardTitle>
          <CardDescription>
            Principais aspectos astrológicos para análise de personalidade profissional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="flex items-center">
              <Sun className="w-4 h-4 mr-1 text-yellow-500" />
              Signo Solar
            </Label>
            <Select value={symbolicMap.sunSign} onValueChange={(value) => updateField('sunSign', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map(sign => (
                  <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Personalidade consciente e propósito
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ciclo de Vida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-secondary" />
            Ciclo de Vida Atual
          </CardTitle>
          <CardDescription>
            Identifique em que fase da jornada de vida você se encontra
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Momento atual da sua jornada</Label>
            <Select value={symbolicMap.currentLifeCycle} onValueChange={(value) => updateField('currentLifeCycle', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ciclo que mais ressoa" />
              </SelectTrigger>
              <SelectContent>
                {lifeCycles.map(cycle => (
                  <SelectItem key={cycle} value={cycle}>{cycle}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
        <h4 className="font-medium mb-3 text-accent flex items-center">
          <Sun className="w-5 h-5 mr-2" />
          Sobre a Análise Simbólica
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            A numerologia e astrologia funcional oferecem insights sobre padrões energéticos e 
            arquetípicos que influenciam sua forma de ser e atuar no mundo.
          </p>
          <p>
            Não se preocupe se não souber todas as informações - o que conseguir preencher 
            já contribuirá para uma análise mais rica e personalizada.
          </p>
          <p>
            <strong>Dica:</strong> Se não conhece seu mapa astral completo, use apenas o signo solar 
            (do seu aniversário). Para descobrir lua e ascendente, pesquise "mapa astral gratuito" online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step6SymbolicMap;