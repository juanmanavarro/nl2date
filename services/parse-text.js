import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const parseText = async (text) => {
  const prompt = `Vamos a parsear frases. R debe de ser un JSON valido con las siguientes propiedades:
  temporal_text: la parte de P que se refiere al tiempo, es decir, la indicacion temporal de P
  temp_en: la parte de P que se refiere al tiempo, es decir, la indicacion temporal de P. Traducela a ingles
  rest: la parte restante de P. Lo que queda al extraer la indicacion temporal de P original

  P: "tengo dentista mañana a las 10"
  R: { "temporal_text": "mañana a las 10", "temp_en": "tomorrow at 10 a.m.", "rest": "tengo dentista" }

  P: "ayer cene con mi amigo por la noche"
  R: { "temporal_text": "ayer por la noche", "temp_en": "last night", "rest": "cene con mi amigo" }

  P: "1 en un minuto"
  R: { "temporal_text": "en un minuto", "temp_en": "in a minute", "rest": "1" }`;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt + `\nP: "${text}"\nR: `,
      },
    ],
    temperature: 0,
  });

  return JSON.parse(completion.data.choices[0].message.content);
};
