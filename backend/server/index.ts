import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});