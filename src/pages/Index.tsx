import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AssessmentForm from '@/components/AssessmentForm';
import ReportGeneration from '@/components/ReportGeneration';
import type { AssessmentData } from '@/types/assessment';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'reports'>('dashboard');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewReports = () => {
    // Carregar dados do assessment do localStorage
    const savedData = localStorage.getItem('geniusMapAssessment');
    if (savedData) {
      setAssessmentData(JSON.parse(savedData));
    }
    setCurrentView('reports');
  };

  const handleAssessmentComplete = () => {
    // Carregar dados do assessment do localStorage
    const savedData = localStorage.getItem('geniusMapAssessment');
    if (savedData) {
      setAssessmentData(JSON.parse(savedData));
    }
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
        <ReportGeneration 
          assessmentData={assessmentData || {}}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;