import React from 'react';
import { ViewState } from '../types.ts';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('HOME')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <span className="material-symbols-outlined text-white text-xl">handyman</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">HandyMatch</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('HOME')}
              className={`${currentView === 'HOME' ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate('HOW_IT_WORKS')}
              className={`${currentView === 'HOW_IT_WORKS' ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Como Funciona
            </button>
            <button 
              onClick={() => onNavigate('ANALYZE')}
              className={`${currentView === 'ANALYZE' ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Analisar Problema
            </button>
            <button 
              onClick={() => onNavigate('PRO_LIST')}
              className={`${currentView === 'PRO_LIST' ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Profissionais
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('JOIN')}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 hidden sm:block"
            >
              Trabalhe Conosco
            </button>
            <button 
              onClick={() => onNavigate('ANALYZE')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">document_scanner</span>
              <span>Scan IA</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;