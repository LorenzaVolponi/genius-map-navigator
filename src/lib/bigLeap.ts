import { BehavioralProfile } from '@/types/assessment';

export interface BigLeapLayer {
  title: string;
  description: string;
}

export function calculateBigLeapLayers(profile: Pick<BehavioralProfile, 'mbti' | 'disc' | 'enneagram' | 'intelligence'>): BigLeapLayer[] {
  const intersection = [profile.mbti, profile.disc, profile.enneagram, profile.intelligence]
    .filter(Boolean)
    .join(' / ');

  return [
    {
      title: 'Trabalho como Diversão Rentável',
      description: `Alinhe ${intersection} para transformar o trabalho em uma expressão lucrativa da sua natureza.`
    },
    {
      title: 'Integração de Talentos',
      description: 'Combine seus traços predominantes para definir atividades em que você opera no ápice.'
    },
    {
      title: 'Ambiente Potencializador',
      description: 'Identifique contextos que amplifiquem seus pontos fortes e reduzam drenagens de energia.'
    },
    {
      title: 'Impacto Transformador',
      description: 'Use sua interseção de perfis para gerar resultados que criem valor para outras pessoas.'
    },
    {
      title: 'Propósito e Missão',
      description: 'Conecte seu estilo único a uma contribuição significativa para o mundo.'
    },
    {
      title: 'Consciência dos Padrões',
      description: 'Observe gatilhos e crenças que podem limitar sua expressão de genialidade.'
    },
    {
      title: 'Expansão Estratégica',
      description: 'Planeje os próximos passos para crescer mantendo o trabalho como diversão rentável.'
    }
  ];
}
