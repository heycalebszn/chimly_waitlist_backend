import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Waitlist, { IWaitlist } from './models/Waitlist';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Waitlist route
app.post('/api/waitlist', async (req: Request, res: Response) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name and email are required.' });
  }

  try {
    const waitlistEntry: IWaitlist = new Waitlist({ fullName, email });
    await waitlistEntry.save();

    res.status(201).json({ message: 'Successfully added to the waitlist.' });
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate email error
      res.status(409).json({ message: 'This email is already on the waitlist.' });
    } else {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
