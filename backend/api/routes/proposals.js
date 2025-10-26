import { Router } from 'express';
import multer from 'multer';
import Proposal from '../../models/Proposal.js';
import { analyzeProposal } from '../../services/gemini.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Create proposal
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, amount, walletAddress } = req.body || {};
    if (!title || !description || amount === undefined) {
      return res.status(400).json({ error: 'title, description, amount are required' });
    }

    let file;
    if (req.file) {
      const { originalname, mimetype, size, buffer } = req.file;
      file = { filename: originalname, mimetype, size, data: buffer };
    }

    // AI analysis via Gemini (resilient)
    let ai = { summary: '', scores: [] };
    try {
      ai = await analyzeProposal({ title, description, amount });
    } catch (err) {
      console.warn('[proposals] Gemini analyze failed, continuing without AI fields:', err?.message || err);
    }

    const doc = await Proposal.create({
      title,
      description,
      amount: Number(amount),
      file,
      walletAddress,
      aiSummary: ai.summary,
      aiScores: ai.scores,
      status: 'submitted',
    });

    res.status(201).json({ ok: true, proposal: doc });
  } catch (err) {
    console.error('create proposal error', err);
    const msg = process.env.NODE_ENV === 'production' ? 'Failed to create proposal' : `Failed to create proposal: ${err.message}`;
    res.status(500).json({ error: msg });
  }
});

// List proposals (basic pagination)
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Proposal.find({}, { file: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Proposal.countDocuments(),
    ]);
    res.json({ ok: true, items, page, total });
  } catch (err) {
    console.error('list proposals error', err);
    const msg = process.env.NODE_ENV === 'production' ? 'Failed to list proposals' : `Failed to list proposals: ${err.message}`;
    res.status(500).json({ error: msg });
  }
});

// Get one
router.get('/:id', async (req, res) => {
  const item = await Proposal.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true, proposal: item });
});

export default router;
