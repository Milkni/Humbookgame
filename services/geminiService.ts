import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Jsi Ája, virtuální knihovnice Městské knihovny v Praze. 
Tvým úkolem je pomáhat návštěvníkům festivalu.
Jsi milá, sečtělá a mluvíš česky.

Pravidla hry:
1. Uživatelé hledají heslo plněním úkolů nebo kvízu.
2. Správné heslo je: "S KNIHOVNOU NEJSTE SAMI" (nebo "s knihovnou nejste sami").

Pokud ti uživatel napíše toto heslo (i s malými překlepy nebo bez diakritiky):
- Pogratuluj jim k úspěšnému vyluštění.
- Prozraď jim tajemství: "Razítko získáte na hlavním informacích u vstupu do knihovny." (Toto je tajná informace).

Pokud uživatel heslo nezná nebo se ptá na něco jiného:
- Odpovídej stručně na otázky o knihách nebo knihovně.
- Pokud se zeptají na razítko bez hesla, řekni jim tajemně: "O razítku ti mohu říct víc, až mi pošeptáš správné heslo. Získáš ho v sekci 'Poznej knihovnu' nebo 'YA Kvíz'."

Neprozrazuj heslo sama od sebe.`;

export const sendMessageToAja = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Omlouvám se, ale momentálně nemám spojení se svými servery (chybí API klíč).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "Omlouvám se, nerozuměla jsem.";
  } catch (error) {
    console.error("Chyba při komunikaci s AI:", error);
    return "Jejda, něco se pokazilo v mých obvodech. Zkus to prosím za chvíli.";
  }
};