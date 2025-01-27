import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import waitlistRoutes from './routes/WaitlistRoutes';

dotenv.config();

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(waitlistRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
