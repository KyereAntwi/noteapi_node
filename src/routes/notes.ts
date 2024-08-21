import { Router } from 'express';
const router = Router();

import { getAllNotes } from '../services/notesServices';
import { FilterBase } from '../models/BaseResponse';

router.get('/', async (req, res) => {
  const keyword = req.query.keyword;
  const page = req.query.page;
  const size = req.query.size;

  const filter: FilterBase = {};

  const result = await getAllNotes(filter);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
});

export default router;
