import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AssessmentForm from '@/components/AssessmentForm';
import ReportGeneration from '@/components/ReportGeneration';
import AnalysisHistory from '@/components/AnalysisHistory';
import { AssessmentData } from '@/types/assessment';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'history' | 'reports'>('dashboard');
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData> | null>(null);
  const [reportBackTarget, setReportBackTarget] = useState<'dashboard' | 'history'>('dashboard');

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewReports = () => {
    setCurrentView('history');
  };

  const handleSelectAnalysis = (data: Partial<AssessmentData>) => {
    setAssessmentData(data);
    setReportBackTarget('history');
    setCurrentView('reports');
  };

  const handleAssessmentComplete = () => {
    // Carregar dados do assessment do localStorage
    const savedData = localStorage.getItem('geniusMapAssessment');
    if (savedData) {
      setAssessmentData(JSON.parse(savedData));
    }
    setReportBackTarget('dashboard');
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

      {currentView === 'history' && (
        <AnalysisHistory
          onBack={handleBackToDashboard}
          onSelect={handleSelectAnalysis}
        />
      )}

      {currentView === 'reports' && (
        <ReportGeneration
          assessmentData={assessmentData || {}}
          onBack={reportBackTarget === 'history' ? handleViewReports : handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;