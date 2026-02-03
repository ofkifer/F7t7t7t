
import { GoogleGenAI } from "@google/genai";

const SUPPORT_DB = "https://visiononesupportbot-default-rtdb.europe-west1.firebasedatabase.app";

export const getAIHelp = async (userPrompt: string, history: any[] = []) => {
  try {
    // Initialisierung innerhalb der Funktion für bessere Kompatibilität
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    let dynamicContext = "";
    try {
      const configRes = await fetch(`${SUPPORT_DB}/config/bot_knowledge.json`, {
        headers: { 'Accept': 'application/json' }
      });
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData) dynamicContext = typeof configData === 'string' ? configData : JSON.stringify(configData);
      }
    } catch (e) {
      console.warn("Knowledge base fetch skipped or failed.");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Du bist der VONE Support Assistent. 
        ZUSÄTZLICHES WISSEN: ${dynamicContext}
        PAKET-INFOS: Starter (40€), Performance (80€), Yearly Premium (120€, kein 4K), Diamond (200€, inkl. 4K, 2 Geräte), Black VIP (300€, 4 Geräte).
        Regeln: Antworte professionell, präzise und auf Deutsch. Halte dich kurz.`,
      }
    });
    return response.text || "Ich konnte keine Antwort generieren.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Der KI-Support ist momentan überlastet oder die Verbindung zum Server wurde unterbrochen.";
  }
};

export const makeFriendly = async (rawText: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Wandle diesen Text in eine sehr freundliche Kundenantwort um: "${rawText}"`,
      config: {
        systemInstruction: "Du bist ein professioneller Support-Ghostwriter.",
      }
    });
    return response.text || rawText;
  } catch (error) {
    return rawText;
  }
};
