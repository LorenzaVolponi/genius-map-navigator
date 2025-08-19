import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AssessmentData, AnalysisResult, ReportType } from '@/types/assessment';
import {
  FileText,
  Download,
  Sparkles,
  Target,
  BookOpen,
  TrendingUp,
  Brain,
  Lightbulb,
  Shield
} from 'lucide-react';
import { useAssessmentStorage } from '@/hooks/useAssessmentStorage';

const BIG_LEAP_LAYERS: { title: string; icon: React.ElementType }[] = [
  { title: 'Camada 1: Trabalho como diversão rentável', icon: Lightbulb },
  { title: 'Camada 2: Talentos em ação', icon: Target },
  { title: 'Camada 3: Propósito e paixão', icon: BookOpen },
  { title: 'Camada 4: Impacto expandido', icon: TrendingUp },
  { title: 'Camada 5: Sustentabilidade e equilíbrio', icon: Shield },
  { title: 'Camada 6: Liberdade criativa', icon: Brain },
  { title: 'Camada 7: Legado transformador', icon: Sparkles }
];

// Utility: check recursively if a value is filled
const hasValue = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(v => hasValue(v));
  }
  if (value && typeof value === 'object') {
    return Object.values(value).every(v => hasValue(v));
  }
  return value !== undefined && value !== null && value !== '';
};

// Verify if all assessment sections and fields are completed
const isAssessmentComplete = (data: Partial<AssessmentData>): data is AssessmentData => {
  const sections: (keyof AssessmentData)[] = [
    'personalInfo',
    'behavioralProfile',
    'talentsAndFlow',
    'impactMarkers',
    'limitsAndNonNegotiables',
    'symbolicMap',
    'unconsciousPatterns',
    'strategicPositioning',
    'idealConditions',
    'finalSynthesis'
  ];

  return sections.every(section => {
    const sectionData = data[section];
    return sectionData && hasValue(sectionData);
  });
};

const UNIVERSAL_PROMPT = `🔷 PROMPT UNIVERSAL PARA DIAGNÓSTICO PROFUNDO DA ZONA DE GENIALIDADE\n\nInstrução: Desenvolva um diagnóstico sistêmico, altamente completo e integrado da Zona de Genialidade Profissional de uma pessoa, considerando as múltiplas camadas de identidade, comportamento, energia, vocação e propósito. A análise deve ser simbólica, estratégica e aplicada, cruzando dados comportamentais, espirituais, biográficos e profissionais com alta precisão. Evite qualquer tipo de delírio ou exagero místico — tudo deve ter aplicabilidade prática, simbologia lúcida e conexão com o mercado atual.\n\n🎯 Objetivo da análise:\nGerar clareza total sobre o ponto de maior potência, verdade e impacto de uma pessoa no mundo — para que ela atue com fluidez, seja bem remunerada, evite exaustão e realize sua missão com lucidez.\n\n📌 Estrutura esperada do resultado:\n\nIDENTIDADE PROFUNDA\nNome completo\nData de nascimento\nLocal de atuação (Brasil/global)\nIdiomas fluentes\nFormações acadêmicas\nCargos e atuações anteriores\nDesejos de atuação atual (áreas, moedas, modelo de contrato, formatos)\nDiagnóstico de trajetória (linha do tempo, marcos de virada, conquistas)\n\nPERFIL COMPORTAMENTAL INTEGRADO\nMBTI com análise aprofundada dos traços dominantes e desafios\nDISC com leitura dos eixos primários e ambiente ideal\nEneagrama com asas, subtipos e padrões de atuação\nIntersecção entre as três tipologias: como se combinam? onde convergem?\nAmbientes que alimentam sua energia\nAmbientes que drenam e te desestabilizam\nEstilo de liderança, expressão e influência\n\nZONA DE GENIALIDADE REAL\nDiagnóstico do seu talento singular: o que só você entrega daquele jeito\nFronteiras energéticas (o que é mínimo, o que é máximo, onde é tóxico)\nTipos de desafio onde você performa com naturalidade\nQuando está em flow: como age, o que produz, que impacto gera\nComo traduz complexidade em solução\nEstilo de criação (frameworks, modelos, ecossistemas, estratégias)\nTradução simbólica e estratégica da sua contribuição única no mundo\n\nCOMPONENTE SIMBÓLICO E ESPIRITUAL\nNumerologia: Caminho de vida, número da alma, número do destino\nAstrologia funcional: Sol, Lua, Ascendente (com arquétipo aplicado)\nCiclo existencial atual: colheita, transição, fertilidade ou encerramento\nMissão simbólica: verbos de alma, arquétipos dominantes\nPadrões de atração energética (lideranças, desafios, clientes)\nPadrões cármicos a serem transmutados (comportamentos, crenças, vícios de vínculo)\nRituais ou condições que restauram sua potência\n\nPOSICIONAMENTO ESTRATÉGICO NO MERCADO\nÁreas onde sua genialidade é mais necessária hoje\nCargos e papéis possíveis no atual mercado (ênfase em IA, inovação, capital, educação)\nTipos de empresa ou organização que melhor se beneficiam de você\nO que você precisa receber para entregar o seu melhor (modelo, contrato, valores)\nCondições ideais de atuação: autonomia, ética, confiança, encontros simbólicos\nTipos de cliente, líder ou equipe que ativam sua potência (e os que te drenam)\n\nRISCOS E ALERTAS\nO que causa burnout\nOnde você se sabota (padrões repetitivos)\nTendências inconscientes a serem curadas\nCiclos que você precisa fechar ou não repetir\nLimites que não podem mais ser cruzados\nComo você some de si mesma — e como se reconecta\n\nPROJEÇÃO FUTURA — OS PRÓXIMOS 6 MESES\nSe começar hoje, o que pode alcançar até [data + 6 meses]\nEstratégia: foco, canais, produtos, relações\nSequência de movimento: o que vem primeiro?\nOnde e como captar valor com menos esforço\nO que deve dizer não com firmeza para abrir espaço\nComo alinhar remuneração em moeda forte, propósito e ritmo\n\nSÍNTESE FINAL\nZona de genialidade em uma frase\nPalavra-chave da sua missão\nPalavra-chave da sua sombra\nPrática de regeneração simbólica\nLembrete essencial em momentos de desânimo\nQual é o maior risco? Qual é o maior dom?\n\n📌 Especificação Técnica:\nO texto deve ser estruturado com subtítulos, linguagem direta porém sensível, metáforas sóbrias quando necessário, e 100% aplicável. Deve traduzir o mais alto nível de inteligência humana, espiritual e estratégica possível. Evitar astrologia genérica. Personalizar a leitura de cada dado. Analisar com base em contexto de vida e impacto.\n\n🟢 Use o tom de um analista sênior + filósofo contemporâneo + estrategista de legado.\n🛑 Nunca delire ou espiritualize o que não se sustenta na realidade.\n✅ Combine análise simbólica com clareza de mercado.`;

// Compose AI prompt using all assessment data for precision
const buildAnalysisPrompt = (data: AssessmentData, type: ReportType): string => {
  const reportFocus: Record<ReportType, string> = {
    executive: 'Produza um relatório executivo com seções de Zona de Genialidade, Posicionamento Estratégico e Próximos Passos.',
    detailed: 'Produza um relatório detalhado com Análise Comportamental, Mapa Simbólico, Padrões Inconscientes e Recomendações.',
    strategic: 'Produza um relatório estratégico com Roteiro de Carreira, Estratégias de Posicionamento e Plano de Desenvolvimento.'
  };

  return `${UNIVERSAL_PROMPT}\n\nDados do usuário:\n${JSON.stringify(data, null, 2)}\n\n${reportFocus[type]}`;
};

interface ReportGenerationProps {
  assessmentData: Partial<AssessmentData>;
  onBack: () => void;
}

const ReportGeneration: React.FC<ReportGenerationProps> = ({ assessmentData, onBack }) => {
  const [selectedReportType, setSelectedReportType] = useState<ReportType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [hasSaved, setHasSaved] = useState(false);
  const { saveAssessmentToHistory } = useAssessmentStorage();
  const assessmentComplete = isAssessmentComplete(assessmentData);

  // Análise de IA baseada nos dados do assessment
  const generateAnalysis = (): AnalysisResult => {
    const data = assessmentData;
    
    // Extração de insights dos dados
    const personalInfo = data.personalInfo;
    const behavioralProfile = data.behavioralProfile;
    const talentsAndFlow = data.talentsAndFlow;
    const impactMarkers = data.impactMarkers;
    const limitsAndNonNegotiables = data.limitsAndNonNegotiables;
    const symbolicMap = data.symbolicMap;
    const unconsciousPatterns = data.unconsciousPatterns;
    const strategicPositioning = data.strategicPositioning;
    const idealConditions = data.idealConditions;
    const finalSynthesis = data.finalSynthesis;

    // Análise da zona de genialidade baseada nos dados
    const geniusZone = {
      core: finalSynthesis?.greatestGift || "Facilitação de transformações sistêmicas",
      strengths: [
        ...(behavioralProfile?.traitKeywords?.slice(0, 3) || []),
        ...(talentsAndFlow?.flowMoments?.slice(0, 3) || []),
        ...(behavioralProfile?.energizingSituations?.slice(0, 2) || [])
      ].filter(Boolean),
      opportunities: [
        strategicPositioning?.areasOfInterest,
        ...(strategicPositioning?.acceptableProjects?.slice(0, 2) || [])
      ].filter(Boolean)
    };

    // Recomendações baseadas nos padrões identificados
    const recommendations = {
      immediate: [
        `Aproveitar sua principal força: ${finalSynthesis?.greatestGift}`,
        `Focar em ${strategicPositioning?.preferredRole || 'papel estratégico'}`,
        `Priorizar projetos que atendam: ${finalSynthesis?.mainProfessionalNeed}`
      ].filter(Boolean),
      strategic: [
        `Desenvolver ainda mais: ${talentsAndFlow?.naturalTalent}`,
        `Evitar: ${limitsAndNonNegotiables?.willNotDoAnymore?.[0]}`,
        `Buscar ambientes que: ${behavioralProfile?.potentiatingEnvironments?.[0]}`
      ].filter(Boolean),
      development: [
        `Trabalhar padrão: ${unconsciousPatterns?.patternsToHeal?.[0]}`,
        `Fortalecer: ${unconsciousPatterns?.spiritualPractices?.[0]}`,
        `Desenvolver: ${talentsAndFlow?.challengesYouLove?.[0]}`
      ].filter(Boolean)
    };

    // Perfil ideal baseado nas preferências
    const idealProfile = {
      role: strategicPositioning?.preferredRole || "Estrategista de Transformação",
      environment: behavioralProfile?.potentiatingEnvironments?.[0] || "Ambiente colaborativo e autônomo",
      conditions: [
        ...(limitsAndNonNegotiables?.minimumConditions?.slice(0, 3) || []),
        ...(idealConditions?.workModel?.slice(0, 2) || [])
      ].filter(Boolean)
    };

    // Fatores de risco baseados nos limites
    const riskFactors = [
      ...(limitsAndNonNegotiables?.toxicRoutinesOrEnvironments?.slice(0, 2) || []),
      ...(limitsAndNonNegotiables?.problematicLeadershipStyles?.slice(0, 2) || []),
      ...(strategicPositioning?.rejectedProjects?.slice(0, 1) || [])
    ].filter(Boolean);

    // Próximos passos baseados na síntese final
    const nextSteps = [
      `Buscar oportunidades que realizem: ${finalSynthesis?.desiredVersion}`,
      `Aplicar seus talentos em: ${strategicPositioning?.meaningfulWork}`,
      `Desenvolver networking em: ${strategicPositioning?.areasOfInterest}`,
      `Implementar práticas que fortaleçam: ${unconsciousPatterns?.spiritualPractices?.[0]}`,
      `Criar estratégia para superar: ${unconsciousPatterns?.patternsToHeal?.[0]}`
    ].filter(Boolean);

    return {
      geniusZone,
      recommendations,
      idealProfile,
      riskFactors,
      nextSteps,
      careerRoadmap: nextSteps,
      positioningStrategies: recommendations.strategic,
      developmentPlan: recommendations.development
    };
  };

  const handleGenerateReport = async (reportType: ReportType) => {
    if (!assessmentComplete) return;

    setSelectedReportType(reportType);
    setIsGenerating(true);

    // Build prompt for AI analysis
    const prompt = buildAnalysisPrompt(assessmentData as AssessmentData, reportType);
    console.log(prompt); // In real scenario, send this prompt to an AI service

    // Simular processamento de IA
    await new Promise(resolve => setTimeout(resolve, 3000));

    const analysis = generateAnalysis();
    setAnalysisResult(analysis);
    if (!hasSaved) {
      saveAssessmentToHistory();
      setHasSaved(true);
    }
    setIsGenerating(false);
  };

  const reportTypes = [
    {
      type: 'executive' as ReportType,
      title: 'Relatório Executivo',
      description: 'Síntese estratégica de 2-3 páginas',
      icon: Target,
      features: ['Zona de Genialidade', 'Posicionamento Estratégico', 'Próximos Passos'],
      color: 'from-primary/10 to-primary/5 border-primary/20'
    },
    {
      type: 'detailed' as ReportType,
      title: 'Relatório Detalhado',
      description: 'Análise completa de 8-12 páginas',
      icon: BookOpen,
      features: ['Análise Comportamental', 'Mapa Simbólico', 'Padrões Inconscientes', 'Recomendações Detalhadas'],
      color: 'from-secondary/10 to-secondary/5 border-secondary/20'
    },
    {
      type: 'strategic' as ReportType,
      title: 'Relatório Estratégico',
      description: 'Plano de ação de 6-8 páginas',
      icon: TrendingUp,
      features: ['Roteiro de Carreira', 'Estratégias de Posicionamento', 'Plano de Desenvolvimento'],
      color: 'from-accent/10 to-accent/5 border-accent/20'
    }
  ];

  if (analysisResult && selectedReportType) {
    const behavioralProfile = assessmentData.behavioralProfile;
    const symbolicMap = assessmentData.symbolicMap;
    const unconsciousPatterns = assessmentData.unconsciousPatterns;

    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-accent" />
              Mapa de Genialidade de {assessmentData.personalInfo?.fullName || 'Perfil'}
            </h1>
            <p className="text-muted-foreground">
              Análise completa baseada em IA com insights personalizados
            </p>
            {assessmentData.personalInfo?.linkedinUrl && (
              <p className="mt-2">
                <a
                  href={assessmentData.personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline break-all"
                >
                  {assessmentData.personalInfo.linkedinUrl}
                </a>
              </p>
            )}
          </div>

          {/* Camadas do Big Leap */}
          <div className="flex gap-4 mb-8 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:snap-none">
            {BIG_LEAP_LAYERS.map(({ title, icon: Icon }) => (
              <Card key={title} className="min-w-[16rem] flex-shrink-0 snap-center md:min-w-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="w-5 h-5 mr-2 text-primary" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Detalhes sobre {title.toLowerCase()}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedReportType === 'executive' && (
            <>
              {/* Zona de Genialidade */}
              <Card className="mb-8 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent">
                    <Brain className="w-6 h-6 mr-2" />
                    Zona de Genialidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Essência Central:</h4>
                      <p className="text-lg font-medium text-accent">{analysisResult.geniusZone.core}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          Principais Forças:
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.geniusZone.strengths.slice(0, 3).map((strength, index) => (
                            <li key={index} className="text-sm">• {strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-1" />
                          Oportunidades:
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.geniusZone.opportunities.slice(0, 3).map((opportunity, index) => (
                            <li key={index} className="text-sm">• {opportunity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posicionamento Estratégico */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Posicionamento Estratégico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Papel Ideal:</h4>
                      <Badge variant="secondary" className="text-sm">{analysisResult.idealProfile.role}</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ambiente:</h4>
                      <p className="text-sm">{analysisResult.idealProfile.environment}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Condições:</h4>
                      <ul className="text-sm space-y-1">
                        {analysisResult.idealProfile.conditions.slice(0, 2).map((condition, index) => (
                          <li key={index}>• {condition}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Passos */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {selectedReportType === 'detailed' && (
            <>
              {/* Análise Comportamental */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Análise Comportamental
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {behavioralProfile?.traitKeywords?.length ? (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Palavras que te definem</h4>
                      <div className="flex flex-wrap gap-2">
                        {behavioralProfile.traitKeywords.map(word => (
                          <Badge key={word} variant="secondary">{word}</Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Ambientes que energizam</h4>
                      <ul className="space-y-1 text-sm">
                        {behavioralProfile?.potentiatingEnvironments?.map((env, i) => (
                          <li key={i}>• {env}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ambientes que drenam</h4>
                      <ul className="space-y-1 text-sm">
                        {behavioralProfile?.limitingEnvironments?.map((env, i) => (
                          <li key={i}>• {env}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mapa Simbólico */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Mapa Simbólico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold">Caminho de Vida</h4>
                      <p>{symbolicMap?.lifePathNumber || '-'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Número da Alma</h4>
                      <p>{symbolicMap?.soulNumber || '-'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Número do Destino</h4>
                      <p>{symbolicMap?.destinyNumber || '-'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Signo Solar</h4>
                      <p>{symbolicMap?.sunSign || '-'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Padrões Inconscientes */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Padrões Inconscientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Padrões a curar</h4>
                      <ul className="space-y-1">
                        {unconsciousPatterns?.patternsToHeal?.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Práticas que fortalecem</h4>
                      <ul className="space-y-1">
                        {unconsciousPatterns?.spiritualPractices?.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recomendações Detalhadas */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Recomendações Detalhadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Ações Imediatas</h4>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.immediate.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Estratégias</h4>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.strategic.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Desenvolvimento</h4>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.development.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {analysisResult.riskFactors.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Riscos e Alertas</h4>
                      <ul className="space-y-1 text-sm">
                        {analysisResult.riskFactors.map((risk, i) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {selectedReportType === 'strategic' && (
            <>
              {/* Roteiro de Carreira */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Roteiro de Carreira</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.careerRoadmap.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estratégias de Posicionamento */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Estratégias de Posicionamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {analysisResult.positioningStrategies.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Plano de Desenvolvimento */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Plano de Desenvolvimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {analysisResult.developmentPlan.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              Voltar ao Dashboard
            </Button>

            <div className="flex space-x-4">
              <Button
                onClick={() => window.print()}
                variant="secondary"
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>

              <Button
                onClick={() => setAnalysisResult(null)}
                variant="outline"
              >
                Gerar Outro Tipo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Sparkles className="w-8 h-8 mr-3 text-accent" />
            Geração do Mapa de Genialidade
          </h1>
          <p className="text-muted-foreground">
            Escolha o tipo de relatório que melhor atende suas necessidades
          </p>
        </div>

        {!assessmentComplete && (
          <p className="text-center text-sm text-destructive mb-4">
            Preencha todas as informações do assessment para gerar o diagnóstico.
          </p>
        )}

        {/* Tipos de Relatório */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card
                key={report.type}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gradient-to-br ${report.color}`}
                onClick={() => !isGenerating && assessmentComplete && handleGenerateReport(report.type)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="w-6 h-6 mr-2" />
                    {report.title}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {report.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full mt-4"
                    disabled={isGenerating || !assessmentComplete}
                    variant={selectedReportType === report.type ? "default" : "outline"}
                  >
                    {isGenerating && selectedReportType === report.type ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Gerando com IA...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar Relatório
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Informações sobre o processo */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Brain className="w-5 h-5 mr-2" />
              Como Funciona a Análise de IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium mb-2">Análise Integrada:</h4>
                <ul className="space-y-1">
                  <li>• Correlação entre tipologias comportamentais</li>
                  <li>• Análise de padrões de flow e energia</li>
                  <li>• Identificação de talentos naturais</li>
                  <li>• Mapeamento de preferências ambientais</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Inteligência Simbólica:</h4>
                <ul className="space-y-1">
                  <li>• Numerologia aplicada à carreira</li>
                  <li>• Astrologia funcional para posicionamento</li>
                  <li>• Análise de padrões inconscientes</li>
                  <li>• Síntese de missão e propósito</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Voltar */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={onBack}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;