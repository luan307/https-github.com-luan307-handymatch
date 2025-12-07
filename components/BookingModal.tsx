import React, { useState } from 'react';
import { Professional, PaymentMethod } from '../types.ts';

interface BookingModalProps {
  professional: Professional;
  onClose: () => void;
}

type BookingStep = 'DETAILS' | 'PAYMENT' | 'ESCROW' | 'REVIEW' | 'SUCCESS';

const BookingModal: React.FC<BookingModalProps> = ({ professional, onClose }) => {
  const [step, setStep] = useState<BookingStep>('DETAILS');
  const [hours, setHours] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('CREDIT');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const totalCost = hours * professional.hourlyRate;
  const platformFee = totalCost * 0.10; // 10% fee
  const proEarnings = totalCost - platformFee;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep('ESCROW');
    }, 1500);
  };

  const handleCompletion = () => {
    setStep('SUCCESS');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center">
            <span className="material-symbols-outlined mr-2 text-blue-600">secure</span>
            Contratação Segura
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* Progress Indicator */}
          <div className="flex justify-between mb-8 text-xs font-medium text-gray-400">
            <div className={`flex items-center ${['DETAILS', 'PAYMENT', 'ESCROW', 'REVIEW', 'SUCCESS'].includes(step) ? 'text-blue-600' : ''}`}>1. Detalhes</div>
            <div className={`flex items-center ${['PAYMENT', 'ESCROW', 'REVIEW', 'SUCCESS'].includes(step) ? 'text-blue-600' : ''}`}>2. Pagamento</div>
            <div className={`flex items-center ${['ESCROW', 'REVIEW', 'SUCCESS'].includes(step) ? 'text-blue-600' : ''}`}>3. Serviço</div>
            <div className={`flex items-center ${['SUCCESS'].includes(step) ? 'text-green-600' : ''}`}>4. Avaliação & Liberação</div>
          </div>

          {step === 'DETAILS' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img src={professional.imageUrl} className="w-16 h-16 rounded-full object-cover" alt="Pro" />
                <div>
                  <h4 className="font-bold text-lg">{professional.name}</h4>
                  <p className="text-gray-500 text-sm">{professional.category}</p>
                  <p className="text-blue-600 text-sm font-medium">R$ {professional.hourlyRate}/hora</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimativa de horas necessárias</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-1 w-32">
                  <button onClick={() => setHours(Math.max(1, hours - 1))} className="p-2 hover:bg-gray-100 rounded text-gray-600">-</button>
                  <span className="flex-1 text-center font-bold">{hours}h</span>
                  <button onClick={() => setHours(hours + 1)} className="p-2 hover:bg-gray-100 rounded text-gray-600">+</button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({hours} horas)</span>
                  <span>R$ {totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de Serviço</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total a Pagar</span>
                  <span>R$ {totalCost.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={() => setStep('PAYMENT')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                Ir para Pagamento
              </button>
            </div>
          )}

          {step === 'PAYMENT' && (
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-gray-900">Escolha a forma de pagamento</h4>
              <p className="text-sm text-gray-500">O valor ficará retido com segurança pelo app até você confirmar que o serviço foi concluído.</p>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedMethod('CREDIT')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${selectedMethod === 'CREDIT' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <span className="material-symbols-outlined text-3xl mb-2">credit_card</span>
                  <span className="text-sm font-medium">Crédito</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('PIX')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${selectedMethod === 'PIX' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <span className="material-symbols-outlined text-3xl mb-2">qr_code_2</span>
                  <span className="text-sm font-medium">Pix</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('DEBIT')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${selectedMethod === 'DEBIT' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <span className="material-symbols-outlined text-3xl mb-2">account_balance_wallet</span>
                  <span className="text-sm font-medium">Débito</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('BOLETO')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${selectedMethod === 'BOLETO' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <span className="material-symbols-outlined text-3xl mb-2">receipt_long</span>
                  <span className="text-sm font-medium">Boleto</span>
                </button>
              </div>

              {selectedMethod === 'PIX' && (
                 <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="w-32 h-32 bg-white mx-auto mb-2 border border-gray-300 flex items-center justify-center">
                       <span className="material-symbols-outlined text-4xl text-gray-400">qr_code</span>
                    </div>
                    <p className="text-xs text-gray-500">Código Pix Simulado</p>
                 </div>
              )}

              <button onClick={handlePayment} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined mr-2">lock</span>
                Pagar R$ {totalCost.toFixed(2)}
              </button>
            </div>
          )}

          {step === 'ESCROW' && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="material-symbols-outlined text-blue-600 text-4xl">security</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Pagamento Retido com Segurança</h4>
                <p className="text-gray-500 mt-2">O valor de R$ {totalCost.toFixed(2)} está seguro. O profissional foi notificado para iniciar.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-left">
                <h5 className="font-bold text-yellow-800 text-sm flex items-center">
                  <span className="material-symbols-outlined mr-1 text-lg">pending</span>
                  Serviço em Andamento
                </h5>
                <p className="text-xs text-yellow-700 mt-1">
                  Aguarde o término do trabalho. Após isso, você deverá avaliar o profissional para liberar o dinheiro.
                </p>
              </div>

              <button onClick={() => setStep('REVIEW')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Serviço Concluído? Avaliar e Liberar
              </button>
            </div>
          )}

          {step === 'REVIEW' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                 <span className="material-symbols-outlined text-yellow-600 text-3xl">star</span>
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">Avalie para Liberar o Pagamento</h4>
                <p className="text-gray-500 text-sm mt-2">Sua confirmação libera o valor para o profissional.</p>
              </div>

              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                    <span className={`material-symbols-outlined text-4xl ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}>
                      star
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-yellow-600">
                {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito Bom' : rating === 3 ? 'Bom' : rating === 2 ? 'Ruim' : 'Péssimo'}
              </p>

              <textarea 
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                rows={3}
                placeholder="Escreva um comentário obrigatório sobre o serviço..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <button onClick={handleCompletion} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="material-symbols-outlined mr-2">verified</span>
                Confirmar Avaliação e Liberar Pagamento
              </button>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold text-gray-900">Pagamento Liberado!</h4>
                <p className="text-gray-500 mt-2">Obrigado pela sua avaliação. O profissional recebeu o valor.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-sm space-y-3 border border-gray-200">
                <h5 className="font-bold text-gray-900 border-b pb-2 mb-2">Resumo da Transação</h5>
                <div className="flex justify-between text-gray-600">
                  <span>Valor Pago</span>
                  <span className="font-medium">R$ {totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Avaliação Enviada</span>
                  <span className="flex items-center text-yellow-600 font-bold">
                    {rating} <span className="material-symbols-outlined text-[10px] ml-1">star</span>
                  </span>
                </div>
                <div className="flex justify-between text-green-700 font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>Repassado ao Profissional</span>
                  <span>R$ {proEarnings.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Fechar
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;