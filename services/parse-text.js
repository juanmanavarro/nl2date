import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const parseText = async (text) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Vamos a parsear frases. La respuesta debe de ser un JSON valido con las siguientes propiedades:
          temp: la parte de la frase que se refiere al tiempo, es decir, la indicacion temporal de la frase
          temp_en: la parte de la frase que se refiere al tiempo, es decir, la indicacion temporal de la frase. Traducela a ingles
          rest: la parte restante de la frase. Lo que queda al extraer la indicacion temporal de la frase original
          frase: "tengo dentista mañana a las 10"
          respuesta: { "temp": "mañana a las 10", "temp_en": "tomorrow at 10 a.m.", "rest": "tengo dentista" }
          frase: "ayer cene con mi amigo por la noche"
          respuesta: { "temp": "ayer por la noche", "temp_en": "last night", "rest": "cene con mi amigo" }
          frase: "1 en un minuto"
          respuesta: { "temp": "en un minuto", "temp_en": "in a minute", "rest": "1" }
          frase: "${text}"
          respuesta:`,
      },
    ],
    temperature: 0,
  });

  return JSON.parse(completion.data.choices[0].message.content);
};
