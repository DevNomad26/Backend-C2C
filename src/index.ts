import express from 'express';
import { env } from './config/env';
import prisma from './config/db';
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import authRouter from './routes/auth'
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRouter);


app.get('/health', async (_req, res) => {
  try { 
    //just checks the connection works
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok', 
      message: 'C2C API is running',
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected' 
    });
  }
});

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});