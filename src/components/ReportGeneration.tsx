import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  Shield,
  AlertCircle
} from 'lucide-react';

interface ReportGenerationProps {
  assessmentData: Partial<AssessmentData>;
  onBack: () => void;
}

const ReportGeneration: React.FC<ReportGenerationProps> = ({ assessmentData, onBack }) => {
  const [selectedReportType, setSelectedReportType] = useState<ReportType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        ...(talentsAndFlow?.flowMoments?.slice(0, 3) || []),
        ...(behavioralProfile?.energizingSituations?.slice(0, 2) || [])
      ].filter(Boolean),
      opportunities: [
        ...(strategicPositioning?.areasOfInterest?.slice(0, 3) || []),
        ...(strategicPositioning?.acceptableProjects?.slice(0, 2) || [])
      ].filter(Boolean)
    };

    // Recomendações baseadas nos padrões identificados
    const recommendations = {
      immediate: [
        `Aproveitar sua principal força: ${finalSynthesis?.greatestGift}`,
        `Focar em ${strategicPositioning?.preferredRole?.[0] || 'papel estratégico'}`,
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
      role: strategicPositioning?.preferredRole?.[0] || "Estrategista de Transformação",
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
      `Desenvolver networking em: ${strategicPositioning?.areasOfInterest?.[0]}`,
      `Implementar práticas que fortaleçam: ${unconsciousPatterns?.spiritualPractices?.[0]}`,
      `Criar estratégia para superar: ${unconsciousPatterns?.patternsToHeal?.[0]}`
    ].filter(Boolean);

    return {
      geniusZone,
      recommendations,
      idealProfile,
      riskFactors,
      nextSteps
    };
  };

  const handleGenerateReport = async (reportType: ReportType) => {
    setSelectedReportType(reportType);
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentData, reportType })
      });
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      const analysis: AnalysisResult = await response.json();
      setAnalysisResult(analysis);
    } catch {
      setError('Não foi possível gerar o relatório. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
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
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-accent" />
              Mapa de Genialidade Gerado
            </h1>
            <p className="text-muted-foreground">
              Análise completa baseada em IA com insights personalizados
            </p>
          </div>

          {/* Zona de Genialidade */}
          <Card className="mb-8 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center text-accent">
                <Brain className="w-6 h-6 mr-2" />
                Sua Zona de Genialidade
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

          {/* Perfil Ideal */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Perfil Profissional Ideal</CardTitle>
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

          {/* Recomendações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ações Imediatas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysisResult.recommendations.immediate.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estratégia de Médio Prazo</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysisResult.recommendations.strategic.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysisResult.recommendations.development.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Próximos Passos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Próximos Passos Estratégicos</CardTitle>
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

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao gerar relatório</AlertTitle>
            <AlertDescription className="flex flex-col space-y-4">
              <span>{error}</span>
              <Button
                onClick={() => selectedReportType && handleGenerateReport(selectedReportType)}
                disabled={isGenerating}
              >
                Tentar novamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Tipos de Relatório */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card 
                key={report.type} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gradient-to-br ${report.color}`}
                onClick={() => !isGenerating && handleGenerateReport(report.type)}
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
                    disabled={isGenerating}
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