import mongoose, { Schema, Document } from 'mongoose';

export interface IWaitlist extends Document {
  fullName: string;
  email: string;
  createdAt: Date;
}

const WaitlistSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
