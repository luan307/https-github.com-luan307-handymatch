import React from 'react';
import { ViewState } from '../types.ts';

interface HowItWorksProps {
  onNavigate: (view: ViewState) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      icon: "person_search",
      title: "1. Escolha o profissional ideal",
      description: "Navegue pela lista de profissionais disponíveis, visualize avaliações reais de outros clientes, compare preços, prazos e especialidades. Assim, você escolhe com confiança quem melhor atende à sua necessidade."
    },
    {
      icon: "chat",
      title: "2. Combine o serviço",
      description: "Após selecionar o profissional, descreva o serviço desejado, envie fotos (se quiser) e alinhe expectativas como valor, horário e detalhes do trabalho. Tudo de forma rápida e organizada pelo próprio app."
    },
    {
      icon: "verified_user",
      title: "3. Serviço realizado com segurança",
      description: "O profissional vai até você no dia e horário combinados. Acompanhe o andamento e mantenha toda a comunicação registrada no aplicativo, garantindo segurança e transparência para ambas as partes."
    },
    {
      icon: "savings",
      title: "4. Pagamento somente após a sua aprovação",
      description: "O pagamento fica retido de forma segura até que o serviço seja concluído. Somente após a sua avaliação e confirmação de que tudo foi entregue conforme combinado, o valor é liberado para o profissional."
    },
    {
      icon: "reviews",
      title: "5. Avalie sua experiência",
      description: "Compartilhe sua opinião sobre o atendimento recebido. Suas avaliações ajudam outros usuários e incentivam os melhores profissionais a entregar sempre o máximo."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Como funciona o <span className="text-blue-600">HandyMatch</span>
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Simples, seguro e transparente. Veja como conectamos você aos melhores profissionais em poucos passos.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Line for larger screens */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded-full"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Side */}
              <div className="flex-1 w-full md:w-1/2 p-6">
                <div className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                   {/* Mobile Icon (visible only on small screens) */}
                   <div className="md:hidden flex justify-center mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="material-symbols-outlined text-3xl text-blue-600">{step.icon}</span>
                      </div>
                   </div>

                   <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                   <p className="text-gray-600 leading-relaxed">
                     {step.description}
                   </p>
                </div>
              </div>

              {/* Center Icon (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full items-center justify-center border-4 border-white shadow-lg z-10">
                <span className="material-symbols-outlined text-3xl text-white">{step.icon}</span>
              </div>

              {/* Empty Side for balance */}
              <div className="flex-1 w-full md:w-1/2 p-6 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Pronto para começar?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onNavigate('ANALYZE')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            <span className="material-symbols-outlined mr-2">document_scanner</span>
            Usar IA para Encontrar Ajuda
          </button>
          <button 
            onClick={() => onNavigate('PRO_LIST')}
            className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center"
          >
            <span className="material-symbols-outlined mr-2">search</span>
            Navegar Profissionais
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;