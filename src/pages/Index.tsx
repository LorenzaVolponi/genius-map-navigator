import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AssessmentForm from '@/components/AssessmentForm';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'reports'>('dashboard');

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewReports = () => {
    setCurrentView('reports');
  };

  const handleAssessmentComplete = () => {
    setCurrentView('reports');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'dashboard' && (
        <Dashboard 
          onStartAssessment={handleStartAssessment}
          onViewReports={handleViewReports}
        />
      )}
      
      {currentView === 'assessment' && (
        <AssessmentForm 
          onBack={handleBackToDashboard}
          onComplete={handleAssessmentComplete}
        />
      )}
      
      {currentView === 'reports' && (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Relatórios em Desenvolvimento</h2>
            <p className="text-muted-foreground mb-6">Sistema de geração de relatórios será implementado na próxima iteração</p>
            <button 
              onClick={handleBackToDashboard}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;