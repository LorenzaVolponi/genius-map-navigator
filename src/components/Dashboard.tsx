import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, FileText, Target, Zap, TrendingUp, Calendar } from 'lucide-react';
import { useAssessmentStorage } from '@/hooks/useAssessmentStorage';

interface DashboardProps {
  onStartAssessment: () => void;
  onViewReports: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAssessment, onViewReports }) => {
  const {
    getCompletionPercentage,
    assessmentData,
    getAssessmentsHistory,
    startNewAssessment,
  } = useAssessmentStorage();
  const completionPercentage = getCompletionPercentage();
  const hasStartedAssessment = completionPercentage > 0;
  const completedAnalyses = getAssessmentsHistory().length;

  const handleStart = () => {
    if (hasStartedAssessment) {
      startNewAssessment();
    }
    onStartAssessment();
  };

  const statsCards = [
    {
      title: "Análises Completas",
      value: String(completedAnalyses),
      description: "Mapas de genialidade finalizados",
      icon: Brain,
      color: "text-primary"
    },
    {
      title: "Insights Gerados",
      value: hasStartedAssessment ? "12+" : "0",
      description: "Descobertas sobre sua zona de genialidade",
      icon: Zap,
      color: "text-accent"
    },
    {
      title: "Potencial Mapeado",
      value: `${completionPercentage}%`,
      description: "Do seu perfil profissional",
      icon: Target,
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-10 text-center flex flex-col items-center gap-4">
          <Brain className="w-12 h-12 text-primary" />
          <h1 className="text-3xl font-bold">Mapa de Genialidade</h1>
          <p className="text-muted-foreground max-w-2xl">
            Descubra sua zona de genialidade profissional através de análise integral que combina
            tipologias comportamentais, numerologia, astrologia e histórico de carreira
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleStart}
            >
              {hasStartedAssessment ? 'Continuar Análise' : 'Iniciar Nova Análise'}
            </Button>
            {(hasStartedAssessment || completedAnalyses > 0) && (
              <Button
                variant="outline"
                size="lg"
                onClick={onViewReports}
              >
                <FileText className="w-5 h-5 mr-2" />
                Ver Relatórios
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        {hasStartedAssessment && (
          <Card className="mb-12 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Progresso da Análise
              </CardTitle>
              <CardDescription>
                Complete todos os blocos para gerar seus relatórios personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Conclusão geral</span>
                  <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {completionPercentage === 100 && (
                    <Badge variant="default" className="bg-success text-success-foreground">
                      <Zap className="w-3 h-3 mr-1" />
                      Pronto para relatórios
                    </Badge>
                  )}
                  {completionPercentage > 0 && completionPercentage < 100 && (
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      Em progresso
                    </Badge>
                  )}
                  {assessmentData.personalInfo?.fullName && (
                    <Badge variant="outline">
                      Informações básicas ✓
                    </Badge>
                  )}
                  {assessmentData.behavioralProfile?.mbti && (
                    <Badge variant="outline">
                      Perfil comportamental ✓
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                Análise Integral
              </CardTitle>
              <CardDescription>
                Mapeamento completo da sua zona de genialidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Tipologias comportamentais (MBTI, DISC, Eneagrama)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                  Análise numerológica e astrológica funcional
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  Histórico profissional e marcos de impacto
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-light rounded-full mr-3" />
                  Padrões inconscientes e potenciais cármicos
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-secondary" />
                Relatórios Personalizados
              </CardTitle>
              <CardDescription>
                Três formatos para diferentes necessidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-3" />
                  <strong>Executivo:</strong> Síntese de 2-3 páginas
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3" />
                  <strong>Detalhado:</strong> Análise completa de 8-12 páginas
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3" />
                  <strong>Estratégico:</strong> Plano de ação de 6-8 páginas
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;