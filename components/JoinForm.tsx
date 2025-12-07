import React, { useState } from 'react';
import { ProfessionalCategory } from '../types.ts';

type JoinMode = 'REGISTER' | 'DELETE';
type DeleteStep = 'SEARCH' | 'CONFIRM' | 'SUCCESS';

const JoinForm: React.FC = () => {
  const [mode, setMode] = useState<JoinMode>('REGISTER');
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  
  // States for Deletion Flow
  const [deleteStep, setDeleteStep] = useState<DeleteStep>('SEARCH');
  const [searchEmail, setSearchEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSubmitted(true);
  };

  const handleDeleteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API search delay
    setTimeout(() => {
      setIsSearching(false);
      setDeleteStep('CONFIRM');
    }, 1500);
  };

  const handleConfirmDelete = () => {
    // Simulate deletion request
    setDeleteStep('SUCCESS');
  };

  const resetForms = () => {
    setRegisterSubmitted(false);
    setDeleteStep('SEARCH');
    setSearchEmail('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Área do Profissional</h2>
        <p className="mt-4 text-lg text-gray-500">Gerencie sua carreira no HandyMatch.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
          <button
            onClick={() => { setMode('REGISTER'); resetForms(); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'REGISTER' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Nova Inscrição
          </button>
          <button
            onClick={() => { setMode('DELETE'); resetForms(); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'DELETE' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Excluir Conta
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT FLOW */}
      {mode === 'DELETE' && (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-fade-in">
          <div className="bg-red-600 px-8 py-6">
            <h3 className="text-white font-bold text-xl flex items-center">
              <span className="material-symbols-outlined mr-3 text-2xl">person_remove</span>
              Excluir Cadastro
            </h3>
            <p className="text-red-100 mt-1 ml-9 text-sm">Remova seus dados da nossa plataforma permanentemente.</p>
          </div>

          <div className="p-8">
            {deleteStep === 'SEARCH' && (
              <form onSubmit={handleDeleteSearch} className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Para sua segurança, informe o e-mail cadastrado para localizarmos seu perfil.</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="searchEmail" className="block text-sm font-medium text-gray-700 mb-1">E-mail Cadastrado</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-400">mail</span>
                    </div>
                    <input 
                      required 
                      type="email" 
                      id="searchEmail" 
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-white pl-10 px-3 py-3 shadow-sm focus:border-red-500 focus:ring-red-500 focus:outline-none transition-colors" 
                      placeholder="seu@email.com" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSearching || !searchEmail}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-all
                    ${isSearching || !searchEmail ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {isSearching ? 'Localizando...' : 'Localizar Cadastro'}
                </button>
              </form>
            )}

            {deleteStep === 'CONFIRM' && (
              <div className="max-w-md mx-auto text-center animate-fade-in">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Perfil Encontrado</h4>
                <p className="text-gray-500 mb-6">
                  Localizamos o cadastro vinculado a <strong>{searchEmail}</strong>.
                  <br/>
                  <span className="text-red-600 font-semibold text-sm block mt-2">Atenção: Esta ação não pode ser desfeita.</span>
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleConfirmDelete}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all"
                  >
                    Confirmar Exclusão
                  </button>
                  <button 
                    onClick={() => setDeleteStep('SEARCH')}
                    className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {deleteStep === 'SUCCESS' && (
              <div className="max-w-md mx-auto text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-green-600 text-4xl">delete_forever</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Conta Excluída</h3>
                <p className="text-gray-600 mt-2">
                  Seus dados foram removidos da nossa base de dados com sucesso. Você não receberá mais solicitações de serviço.
                </p>
                <button 
                  onClick={resetForms}
                  className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Voltar ao início
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REGISTER FORM FLOW */}
      {mode === 'REGISTER' && (
        <>
          {registerSubmitted ? (
            <div className="max-w-xl mx-auto mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-green-800">Candidatura Recebida!</h3>
              <p className="text-green-700 mt-2 text-lg">Obrigado pelo seu interesse em se juntar ao HandyMatch. Seu perfil será analisado e entraremos em contato em breve.</p>
              <button 
                onClick={() => setRegisterSubmitted(false)}
                className="mt-8 px-6 py-2 bg-white text-green-700 border border-green-200 rounded-full font-medium hover:bg-green-50 transition-colors"
              >
                Enviar outra candidatura
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-fade-in">
              <div className="bg-blue-600 px-8 py-6">
                <h3 className="text-white font-bold text-xl flex items-center">
                  <span className="material-symbols-outlined mr-3 text-2xl">person_add</span>
                  Cadastro do Profissional
                </h3>
                <p className="text-blue-100 mt-1 ml-9 text-sm">Preencha seus dados para começar a receber pedidos.</p>
              </div>
              
              <form onSubmit={handleRegisterSubmit} className="p-8 space-y-8">
                
                {/* Personal Info Section */}
                <div>
                  <h4 className="text-gray-900 font-semibold mb-4 flex items-center text-lg">
                    <span className="material-symbols-outlined mr-2 text-blue-600">badge</span>
                    Informações Pessoais e Contato
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input required type="text" id="firstName" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                      <input required type="text" id="lastName" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors" placeholder="Seu sobrenome" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input required type="email" id="email" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                      <input required type="tel" id="phone" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors" placeholder="(11) 99999-9999" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Professional Details Section */}
                <div>
                  <h4 className="text-gray-900 font-semibold mb-4 flex items-center text-lg">
                    <span className="material-symbols-outlined mr-2 text-blue-600">work_history</span>
                    Detalhes do Serviço
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Profissão / Categoria</label>
                      <select id="category" className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white">
                        {Object.values(ProfessionalCategory).map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">Preço por Hora Estimado</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm font-bold">R$</span>
                        </div>
                        <input required type="number" id="hourlyRate" min="0" step="0.01" className="block w-full rounded-lg border border-gray-300 bg-white pl-10 px-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none" placeholder="0,00" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Tempo de Experiência</label>
                      <select id="experience" className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white">
                        <option>Iniciante (Menos de 1 ano)</option>
                        <option>Júnior (1-3 anos)</option>
                        <option>Pleno (3-5 anos)</option>
                        <option>Sênior (5-10 anos)</option>
                        <option>Mestre (10+ anos)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade</label>
                      <select id="availability" className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white">
                        <option>Tempo Integral (Comercial)</option>
                        <option>Meio Período</option>
                        <option>Finais de Semana</option>
                        <option>Plantão 24h</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Location Section */}
                <div>
                  <h4 className="text-gray-900 font-semibold mb-4 flex items-center text-lg">
                    <span className="material-symbols-outlined mr-2 text-blue-600">location_on</span>
                    Localização e Alcance
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Sua Base (Bairro/Cidade)</label>
                      <input required type="text" id="location" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" placeholder="Ex: Centro, São Paulo" />
                    </div>
                    
                    <div>
                      <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">Raio de Atendimento (km)</label>
                      <div className="relative rounded-md shadow-sm">
                        <input required type="number" id="radius" min="1" max="500" className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none" placeholder="Ex: 20" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">km</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Distância máxima que você se desloca até o cliente.</p>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Sobre o seu trabalho</label>
                  <textarea id="bio" rows={4} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" placeholder="Descreva suas habilidades, ferramentas que possui e o que te diferencia dos outros profissionais..."></textarea>
                </div>

                <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:translate-y-[-1px]">
                  Cadastrar Perfil Profissional
                </button>
              </form>
            </div>
          )}
        </>
      )}
      
      <p className="text-center text-gray-500 text-sm mt-6">
        Ao continuar, você concorda com nossos termos de serviço e política de privacidade.
      </p>
    </div>
  );
};

export default JoinForm;