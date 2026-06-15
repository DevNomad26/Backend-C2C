import express from 'express';
import { env } from './config/env';
import prisma from './config/db';
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import authRouter from './routes/auth'
import sessionRouter from './routes/session';
import contestRouter from './routes/contest';
import campRouter from './routes/camp';

const app = express();

//middlewares (global)
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//routes
app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/contests', contestRouter);
app.use('/api/camps', campRouter);

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

const startServer = async () => {
  try {
    // Test database connection before starting
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connected');

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();

