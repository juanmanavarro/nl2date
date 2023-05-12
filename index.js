import express from 'express';

const app = express();

app.get('/', (req, res) => {
  if ( !req.query.text ) {
    return res.status(400).json({
      error: 'Missing required parameter `text`',
    });
  }

  res.json({
    text: req.query.text,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
