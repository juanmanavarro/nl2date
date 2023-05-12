import express from 'express';
import { stringToDate } from './services/string-to-date.js';
import { parseText } from "./services/parse-text.js";

const app = express();

app.get('/', async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({
      error: 'Missing required parameter `text`',
    });
  }

  try {
    const parsedText = await parseText(text);

    return res.json({
      original_text: text,
      temporal_text: parsedText.temp,
      rest_text: parsedText.rest,
      date: stringToDate(parsedText.temp_en),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error',
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
