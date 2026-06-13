import express from 'express';
import {env} from './config/env'
const app = express();
const PORT = env.PORT || 5000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', 
    message: 'Coding Club API is running',
    environment: env.NODE_ENV });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});