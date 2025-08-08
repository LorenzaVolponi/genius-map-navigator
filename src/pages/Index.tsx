import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AssessmentForm from '@/components/AssessmentForm';
import ReportGeneration from '@/components/ReportGeneration';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'reports'>('dashboard');
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewReports = () => {
    // Carregar dados do assessment do localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('geniusMapAssessment');
      if (savedData) {
        try {
          setAssessmentData(JSON.parse(savedData));
        } catch (error) {
          console.error('Failed to parse assessment data', error);
        }
      }
    }
    setCurrentView('reports');
  };

  const handleAssessmentComplete = () => {
    // Carregar dados do assessment do localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('geniusMapAssessment');
      if (savedData) {
        try {
          setAssessmentData(JSON.parse(savedData));
        } catch (error) {
          console.error('Failed to parse assessment data', error);
        }
      }
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