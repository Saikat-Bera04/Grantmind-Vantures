import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    filename: String,
    mimetype: String,
    size: Number,
    data: Buffer,
  },
  { _id: false }
);

const ProposalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    file: FileSchema,
    walletAddress: { type: String },
    aiSummary: { type: String },
    aiScores: [{ category: String, score: Number }],
    status: { type: String, enum: ['submitted', 'approved', 'rejected', 'funded'], default: 'submitted' },
  },
  { timestamps: true }
);

export default mongoose.model('Proposal', ProposalSchema);
