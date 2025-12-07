
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ImageAnalyzer from './components/ImageAnalyzer.tsx';
import ProfessionalList from './components/ProfessionalList.tsx';
import JoinForm from './components/JoinForm.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import { ViewState, AnalysisResult, ProfessionalCategory, Professional } from './types.ts';
import { MOCK_PROFESSIONALS } from './constants.ts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<ProfessionalCategory | undefined>(undefined);
  
  // State to hold the list of professionals (starts with mocks, but can be added to)
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view === 'HOME') {
      setAnalysisResult(undefined);
      setActiveFilter(undefined);
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setActiveFilter(result.category);
    setCurrentView('PRO_LIST');
  };

  const handleClearFilter = () => {
    setActiveFilter(undefined);
    setAnalysisResult(undefined);
  };

  const handleRegisterProfessional = (newPro: Professional) => {
    setProfessionals(prev => [newPro, ...prev]);
  };

  const handleDeleteProfessional = (email: string) => {
    setProfessionals(prev => prev.filter(p => p.email !== email));
  };

  const popularServices = [
    { icon: 'plumbing', label: 'Encanador', cat: ProfessionalCategory.PLUMBER },
    { icon: 'electrical_services', label: 'Eletricista', cat: ProfessionalCategory.ELECTRICIAN },
    { icon: 'cleaning_services', label: 'Limpeza', cat: ProfessionalCategory.CLEANER },
    { icon: 'construction', label: 'Pedreiro', cat: ProfessionalCategory.MASON },
    { icon: 'format_paint', label: 'Pintor', cat: ProfessionalCategory.PAINTER },
    { icon: 'carpenter', label: 'Carpinteiro', cat: ProfessionalCategory.CARPENTER },
    { icon: 'handyman', label: 'Marceneiro', cat: ProfessionalCategory.JOINER },
    { icon: 'grid_view', label: 'Gesseiro', cat: ProfessionalCategory.PLASTERER },
    { icon: 'key', label: 'Serralheiro', cat: ProfessionalCategory.LOCKSMITH },
    { icon: 'yard', label: 'Jardineiro', cat: ProfessionalCategory.GARDENER },
    { icon: 'pool', label: 'Piscineiro', cat: ProfessionalCategory.POOL_CLEANER },
    { icon: 'roofing', label: 'Telhador', cat: ProfessionalCategory.ROOFER },
    { icon: 'ac_unit', label: 'Ar Condicionado', cat: ProfessionalCategory.AC_INSTALLER },
    { icon: 'thermostat', label: 'Aquecimento', cat: ProfessionalCategory.HEATING_TECH },
    { icon: 'kitchen', label: 'Eletrodomésticos', cat: ProfessionalCategory.APPLIANCE_TECH },
    { icon: 'window', label: 'Vidraceiro', cat: ProfessionalCategory.GLAZIER },
    { icon: 'local_shipping', label: 'Mudanças', cat: ProfessionalCategory.MOVER },
    { icon: 'computer', label: 'Informática', cat: ProfessionalCategory.IT_TECH },
    { icon: 'chair', label: 'Reparo Móveis', cat: ProfessionalCategory.FURNITURE_REPAIR },
    { icon: 'build', label: 'Faz-tudo', cat: ProfessionalCategory.GENERAL },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'HOME' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <div className="py-12 bg-gray-50">
               <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold text-gray-900 mb-8">Serviços Populares</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {popularServices.map((s) => (
                      <button 
                        key={s.label}
                        onClick={() => {
                          setActiveFilter(s.cat);
                          setCurrentView('PRO_LIST');
                        }}
                        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center group border border-gray-100"
                      >
                        <span className="material-symbols-outlined text-3xl sm:text-4xl text-blue-500 group-hover:scale-110 transition-transform mb-3">{s.icon}</span>
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{s.label}</span>
                      </button>
                    ))}
                 </div>
               </div>
            </div>
          </>
        )}

        {currentView === 'ANALYZE' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <ImageAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          </div>
        )}

        {currentView === 'PRO_LIST' && (
          <ProfessionalList 
            professionals={professionals}
            filterCategory={activeFilter} 
            analysisResult={analysisResult}
            onClearFilter={handleClearFilter}
          />
        )}

        {currentView === 'JOIN' && (
          <JoinForm 
            onRegister={handleRegisterProfessional} 
            onDelete={handleDeleteProfessional}
          />
        )}

        {currentView === 'HOW_IT_WORKS' && (
          <HowItWorks onNavigate={handleNavigate} />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="material-symbols-outlined text-blue-400 mr-2">handyman</span>
                <span className="text-xl font-bold">HandyMatch</span>
              </div>
              <p className="text-gray-400 text-sm">
                Conecte-se com os melhores profissionais locais para todas as suas necessidades de manutenção residencial. Combinação com tecnologia de IA para tranquilidade imediata.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Para Proprietários</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer" onClick={() => handleNavigate('ANALYZE')}>Analisar Problema</li>
                <li className="hover:text-white cursor-pointer" onClick={() => handleNavigate('PRO_LIST')}>Profissionais</li>
                <li className="hover:text-white cursor-pointer" onClick={() => handleNavigate('HOW_IT_WORKS')}>Como funciona</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Para Profissionais</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer" onClick={() => handleNavigate('JOIN')}>Junte-se à Rede</li>
                <li className="hover:text-white cursor-pointer">Histórias de Sucesso</li>
                <li className="hover:text-white cursor-pointer">Suporte</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            &copy; 2024 HandyMatch AI. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
