import React from 'react';
import { ViewState } from '../types.ts';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Manutenção residencial</span>{' '}
              <span className="block text-blue-600 xl:inline">simplificada pela IA</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Não sabe qual é o problema? Basta tirar uma foto. Nossa IA com tecnologia Gemini identifica o problema e combina você instantaneamente com profissionais locais de primeira linha, como encanadores, eletricistas e faxineiros.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => onNavigate('ANALYZE')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition-all"
                >
                  <span className="material-symbols-outlined mr-2">camera_alt</span>
                  Analisar Problema
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={() => onNavigate('PRO_LIST')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg transition-all"
                >
                  Buscar Profissionais
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;