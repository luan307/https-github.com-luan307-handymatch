import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ProfessionalCategory } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const analyzeHomeIssue = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Strictly requested model
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, works with png too usually in practice or can detect
              data: base64Image
            }
          },
          {
            text: `Analise esta imagem de um problema de manutenção doméstica. 
            Identifique a categoria profissional mais apropriada para resolver este problema a partir da seguinte lista: 
            [${Object.values(ProfessionalCategory).join(', ')}].
            
            Forneça uma breve descrição do problema visto na imagem.
            Forneça uma ação imediata sugerida para o proprietário da casa.
            Estime o nível de confiança (0-1).
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: Object.values(ProfessionalCategory),
              description: "O tipo de profissional necessário"
            },
            description: {
              type: Type.STRING,
              description: "Uma descrição concisa do problema visual"
            },
            suggestedAction: {
              type: Type.STRING,
              description: "Conselho imediato para o usuário"
            },
            confidence: {
              type: Type.NUMBER,
              description: "Nível de confiança entre 0 e 1"
            }
          },
          required: ["category", "description", "suggestedAction", "confidence"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Sem resposta do Gemini");
    }

    const data = JSON.parse(resultText) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Falha na análise do Gemini:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      category: ProfessionalCategory.GENERAL,
      description: "Não foi possível analisar a imagem estritamente. Por favor, descreva o problema manualmente.",
      suggestedAction: "Contate um faz-tudo geral para avaliação.",
      confidence: 0
    };
  }
};
