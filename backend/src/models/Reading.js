// backend/src/models/Reading.js
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  id: { type: String, required: true },       // e.g., "XVI" or "The Tower"
  reversed: { type: Boolean, default: false },
  position: { type: String },                  // e.g., "Past", "Present", "Future"
}, { _id: false });

const ReadingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  spread: { type: String, enum: ['one', 'three', 'custom'], required: true },
  title: { type: String },
  notes: { type: String },
  tags: { type: [String], default: [] },
  cards: { type: [CardSchema], default: [] },
}, { timestamps: true });

export default mongoose.model('Reading', ReadingSchema);
