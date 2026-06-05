import * as FileSystem from "expo-file-system/legacy";
import { ScanResult } from "../types/scan";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SCAN_PROMPT = `
Analiza la imagen e identifica todos los residuos visibles.
El campo principal debe ser el residuo mas claro o importante de la imagen.
Si hay varios residuos visibles, agregalos en detectedItems.
Si solo hay un residuo visible, detectedItems debe tener solo ese residuo.
No inventes objetos que no se vean claramente.
Maximo 4 residuos detectados.
Responde solo con JSON valido y sin markdown.
Usa espanol simple.

Formato obligatorio:
{
  "residueName": "nombre corto del residuo",
  "category": "Plastico | Papel | Carton | Vidrio | Metal | Organico | Electronico | Peligroso | Otro",
  "isRecyclable": true,
  "shortDescription": "descripcion corta",
  "recommendation": "que debe hacer el usuario",
  "funFact": "dato util o curioso",
  "degradationTime": "tiempo aproximado de degradacion",
  "environmentalImpact": "impacto ambiental resumido",
  "detectedItems": [
    {
      "residueName": "nombre corto del residuo visible",
      "category": "Plastico | Papel | Carton | Vidrio | Metal | Organico | Electronico | Peligroso | Otro",
      "isRecyclable": true,
      "shortDescription": "descripcion corta",
      "recommendation": "que debe hacer el usuario con este residuo"
    }
  ]
}
`;

const parseGeminiJson = (text: string): ScanResult => {
  const cleanText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanText) as ScanResult;
};

export const analyzeResidueImage = async (
  imageUri: string
): Promise<ScanResult> => {
  if (!GEMINI_API_KEY) {
    throw new Error("Falta configurar EXPO_PUBLIC_GEMINI_API_KEY");
  }

  const base64Image = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: SCAN_PROMPT },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini error:", response.status, errorText);

    if (response.status === 429) {
      throw new Error(
        "Alcanzaste el limite gratuito de Gemini. Espera unos segundos e intenta nuevamente."
      );
    }

    if (response.status === 503) {
      throw new Error(
        "Gemini esta con alta demanda en este momento. Espera un poco e intenta nuevamente."
      );
    }

    throw new Error(
      `Gemini no pudo analizar la imagen (${response.status}). Revisa la consola.`
    );
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini no devolvio un resultado valido");
  }

  return parseGeminiJson(text);
};

