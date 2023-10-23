import express from 'express';
import { stringToDate } from './services/string-to-date.js';
import { parseText } from "./services/parse-text.js";
import dayjs from 'dayjs';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const app = express();


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

app.get('/', async (req, res) => {
  if ( req.header('X-Api-Key') !== process.env.API_KEY ) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const text = req.query.text;
  const tz = req.query.timezone;

  if ( !text ) {
    return res.status(400).json({
      error: 'Missing required parameter `text`',
    });
  }

  try {
    dayjs.tz(null, tz)
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid timezone',
    });
  }

  try {
    const parsedText = await parseText(text);

    const response = {
      original_text: text,
      temporal_text: parsedText.temporal_text,
      rest_text: parsedText.rest,
      date: stringToDate(parsedText.temp_en, tz),
      timezone: tz || 'UTC',
    };

    return res.json(response);
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
