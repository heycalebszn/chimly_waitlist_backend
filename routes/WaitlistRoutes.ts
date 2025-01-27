import { Router } from 'express';
import Waitlist from '../models/Waitlist';

interface WaitlistRequest {
  fullName: string;
  email: string;
}

const router = Router();

router.post('/api/waitlist', async (req, res): Promise<void> => {
  const { fullName, email }: WaitlistRequest = req.body;

  if (!fullName || !email) {
    res.status(400).json({ message: 'Full name and email are required.' });
  }

  try {
    const waitlistEntry = new Waitlist({ fullName, email });
    await waitlistEntry.save();

    res.status(201).json({ message: 'Successfully added to the waitlist.' });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'This email is already on the waitlist.' });
    } else {
      console.error('Error adding to waitlist:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
});

export default router;
