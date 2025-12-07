
import React, { useMemo, useState } from 'react';
import { ProfessionalCategory, AnalysisResult, Professional } from '../types.ts';
import BookingModal from './BookingModal.tsx';

interface ProfessionalListProps {
  professionals: Professional[];
  filterCategory?: ProfessionalCategory;
  analysisResult?: AnalysisResult;
  onClearFilter: () => void;
}

const ProfessionalList: React.FC<ProfessionalListProps> = ({ 
  professionals,
  filterCategory, 
  analysisResult,
  onClearFilter 
}) => {
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');
  const [selectedProForContact, setSelectedProForContact] = useState<Professional | null>(null);
  const [selectedProForHiring, setSelectedProForHiring] = useState<Professional | null>(null);

  const filteredPros = useMemo(() => {
    let pros = professionals;
    
    if (filterCategory) {
      pros = pros.filter(p => p.category === filterCategory);
    }

    return pros.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.hourlyRate - b.hourlyRate;
      // Mock distance sort (string comparison for demo)
      return parseFloat(a.distance) - parseFloat(b.distance);
    });
  }, [professionals, filterCategory, sortBy]);

  const sortLabels = {
    rating: 'Avaliação',
    distance: 'Distância',
    price: 'Preço'
  };

  const handleContactClick = (pro: Professional) => {
    setSelectedProForContact(pro);
  };
  
  const handleHireClick = (pro: Professional) => {
    setSelectedProForHiring(pro);
  };

  const closeContactModal = () => {
    setSelectedProForContact(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {analysisResult && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 flex items-center">
                  <span className="material-symbols-outlined mr-2 text-blue-600">check_circle</span>
                  Análise Completa
                </h3>
                <p className="mt-2 text-blue-800">
                  <span className="font-semibold">Problema:</span> {analysisResult.description}
                </p>
                <p className="mt-1 text-blue-800">
                  <span className="font-semibold">Sugestão:</span> {analysisResult.suggestedAction}
                </p>
                <p className="mt-3 text-sm text-blue-600 bg-white/50 inline-block px-3 py-1 rounded-full">
                  Categoria Identificada: <strong>{analysisResult.category}</strong> (Confiança: {(analysisResult.confidence * 100).toFixed(0)}%)
                </p>
              </div>
              <button 
                onClick={onClearFilter}
                className="text-blue-400 hover:text-blue-700 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10 text-blue-600">
             <span className="material-symbols-outlined text-9xl">engineering</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {filterCategory ? `Profissionais de ${filterCategory} Perto de Você` : 'Todos os Profissionais'}
        </h2>
        
        <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <span className="px-3 text-sm text-gray-500 font-medium">Ordenar por:</span>
          {(['rating', 'distance', 'price'] as const).map(option => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1 rounded-md text-sm capitalize transition-all ${
                sortBy === option 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {sortLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPros.length > 0 ? (
          filteredPros.map((pro) => (
            <div key={pro.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={pro.imageUrl} 
                  alt={pro.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center shadow-sm">
                  <span className="material-symbols-outlined text-yellow-500 text-sm mr-1">star</span>
                  {pro.rating} ({pro.reviews})
                </div>
                {pro.available && (
                   <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                     Disponível
                   </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{pro.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mt-1">{pro.category}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="material-symbols-outlined text-gray-400 mr-1 text-lg">location_on</span>
                  {pro.distance} de distância
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="material-symbols-outlined text-gray-400 mr-1 text-lg">payments</span>
                  R$ {pro.hourlyRate}/h
                </div>

                <div className="mt-5 flex gap-2">
                  <button 
                    onClick={() => handleContactClick(pro)}
                    className="flex-1 bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
                  >
                    Contatar
                  </button>
                  <button 
                    onClick={() => handleHireClick(pro)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-blue-500/20 shadow-lg text-sm flex items-center justify-center"
                  >
                     <span className="material-symbols-outlined text-sm mr-1">handshake</span>
                     Contratar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum profissional encontrado</h3>
            <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou procure uma categoria diferente.</p>
            {filterCategory && (
              <button 
                onClick={onClearFilter}
                className="mt-4 text-blue-600 font-medium hover:text-blue-800"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedProForHiring && (
        <BookingModal 
          professional={selectedProForHiring}
          onClose={() => setSelectedProForHiring(null)}
        />
      )}

      {/* Contact Modal */}
      {selectedProForContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-blue-600 p-6 text-center text-white relative">
              <button 
                onClick={closeContactModal}
                className="absolute top-4 right-4 text-blue-100 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="w-16 h-16 bg-white rounded-full mx-auto p-1 mb-3">
                <img src={selectedProForContact.imageUrl} alt={selectedProForContact.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">{selectedProForContact.name}</h3>
              <p className="text-blue-100 text-sm">{selectedProForContact.category}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-600 text-center mb-4 text-sm">Escolha como deseja falar com este profissional:</p>
              
              <a 
                href={`https://wa.me/55${selectedProForContact.phoneNumber}`} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all"
              >
                 <span className="material-symbols-outlined mr-2">chat</span>
                 WhatsApp
              </a>

              <a 
                href={`tel:${selectedProForContact.phoneNumber}`} 
                className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                 <span className="material-symbols-outlined mr-2">call</span>
                 Ligar Agora
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalList;
