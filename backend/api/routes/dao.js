import { Router } from 'express';
import { getDaoContract } from '../../services/dao.js';

const router = Router();

router.get('/treasury', async (_req, res) => {
  try {
    const contract = getDaoContract();
    if (!contract) return res.status(500).json({ error: 'DAO contract not configured' });
    const balance = await contract.treasuryBalance();
    res.json({ ok: true, treasuryBalance: balance.toString() });
  } catch (e) {
    console.error('dao/treasury', e);
    res.status(500).json({ error: 'Failed to read treasury' });
  }
});

export default router;
