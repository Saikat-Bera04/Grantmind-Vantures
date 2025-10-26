import { Router } from 'express';
import analysisRouter from './analysis.js';
import proposalsRouter from './proposals.js';
import daoRouter from './dao.js';

const router = Router();

router.use('/analysis', analysisRouter);
router.use('/proposals', proposalsRouter);
router.use('/dao', daoRouter);

export default router;
