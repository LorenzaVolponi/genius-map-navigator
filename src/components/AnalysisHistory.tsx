import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Trash2 } from 'lucide-react';
import { useAssessmentStorage } from '@/hooks/useAssessmentStorage';
import { AssessmentData } from '@/types/assessment';

interface AnalysisHistoryProps {
  onBack: () => void;
  onSelect: (data: Partial<AssessmentData>) => void;
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ onBack, onSelect }) => {
  const { getAssessmentsHistory, clearAssessmentsHistory } = useAssessmentStorage();
  const [history, setHistory] = React.useState(getAssessmentsHistory());

  const handleClear = () => {
    clearAssessmentsHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Button variant="outline" onClick={onBack} className="mb-6 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2" /> Minhas Análises
          </h1>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear} className="flex items-center">
              <Trash2 className="w-4 h-4 mr-1" /> Limpar histórico
            </Button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma análise encontrada.</p>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <Card key={item.id} className="shadow-card">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <Button variant="outline" onClick={() => onSelect(item.data)}>
                    Ver Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisHistory;
