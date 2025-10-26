import { Router } from 'express';
import { analyzeProposal, buildProposalFromIdea } from '../../services/gemini.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, amount } = req.body || {};
    if (!title || !description || amount === undefined) {
      return res.status(400).json({ error: 'title, description, amount are required' });
    }
    const analysis = await analyzeProposal({ title, description, amount });
    res.json({ ok: true, analysis });
  } catch (err) {
    console.error('analysis error', err);
    const msg = process.env.NODE_ENV === 'production' ? 'Failed to analyze proposal' : `Failed to analyze proposal: ${err.message}`;
    res.status(500).json({ error: msg });
  }
});

export default router;

// Build proposal from freeform idea
router.post('/idea', async (req, res) => {
  try {
    const { idea } = req.body || {};
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'idea (string) is required' });
    }
    const built = await buildProposalFromIdea({ idea });
    res.json({ ok: true, proposal: built });
  } catch (err) {
    console.error('analysis/idea error', err);
    const msg = process.env.NODE_ENV === 'production' ? 'Failed to build proposal' : `Failed to build proposal: ${err.message}`;
    res.status(500).json({ error: msg });
  }
});
