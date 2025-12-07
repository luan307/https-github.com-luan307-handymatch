import React, { useState, useRef } from 'react';
import { analyzeHomeIssue } from '../services/geminiService.ts';
import { AnalysisResult } from '../types.ts';

interface ImageAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Arquivo muito grande. Por favor envie uma imagem com menos de 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract base64 data without the prefix
      const base64Data = imagePreview.split(',')[1];
      const result = await analyzeHomeIssue(base64Data);
      onAnalysisComplete(result);
    } catch (err) {
      setError("Falha ao analisar imagem. Tente novamente ou verifique sua conexão.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">O que precisa de conserto?</h2>
        <p className="text-gray-500 mt-2">Carregue uma foto do problema (cano vazando, azulejo quebrado, quarto bagunçado) e deixe a IA encontrar a ajuda certa.</p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          imagePreview ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded-lg shadow-md" 
            />
            <button 
              onClick={() => {
                setImagePreview(null);
                if(fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
              aria-label="Remove image"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ) : (
          <div 
            onClick={triggerFileInput}
            className="cursor-pointer py-8"
          >
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">add_a_photo</span>
            <p className="text-lg font-medium text-gray-900">Clique para carregar ou arraste e solte</p>
            <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG ou GIF (máx. 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
          <span className="material-symbols-outlined mr-2">error</span>
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={!imagePreview || isAnalyzing}
          className={`
            flex items-center justify-center px-8 py-3 rounded-full text-lg font-medium transition-all w-full sm:w-auto
            ${!imagePreview || isAnalyzing 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl shadow-blue-500/30'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analisando com Gemini 3 Pro...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2">auto_awesome</span>
              Analisar Problema
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageAnalyzer;