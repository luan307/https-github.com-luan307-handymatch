
export enum ProfessionalCategory {
  PLUMBER = 'Encanador',
  ELECTRICIAN = 'Eletricista',
  CLEANER = 'Limpeza',
  MASON = 'Pedreiro',
  JOINER = 'Marceneiro',
  PAINTER = 'Pintor',
  GENERAL = 'Faz-tudo',
  GARDENER = 'Jardineiro',
  
  // New categories
  CARPENTER = 'Carpinteiro',
  PLASTERER = 'Gesseiro',
  LOCKSMITH = 'Serralheiro',
  POOL_CLEANER = 'Piscineiro',
  ROOFER = 'Telhador',
  AC_INSTALLER = 'Ar Condicionado',
  HEATING_TECH = 'Aquecimento',
  APPLIANCE_TECH = 'Eletrodomésticos',
  GLAZIER = 'Vidraceiro',
  MOVER = 'Mudanças',
  IT_TECH = 'Informática',
  FURNITURE_REPAIR = 'Reparo de Móveis'
}

export interface Professional {
  id: string;
  name: string;
  category: ProfessionalCategory;
  rating: number;
  reviews: number;
  hourlyRate: number;
  distance: string; // e.g., "2.5 km"
  imageUrl: string;
  available: boolean;
  phoneNumber: string;
}

export interface AnalysisResult {
  category: ProfessionalCategory;
  description: string;
  confidence: number;
  suggestedAction: string;
}

export type ViewState = 'HOME' | 'ANALYZE' | 'PRO_LIST' | 'JOIN' | 'HOW_IT_WORKS';

export type PaymentMethod = 'CREDIT' | 'DEBIT' | 'PIX' | 'BOLETO';