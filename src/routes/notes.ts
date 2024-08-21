import { Router } from 'express';

const router = Router();

import { getAllNotes, createANote } from '../services/notesServices';
import BaseResponse, { FilterBase } from '../models/BaseResponse';
import Joi from 'joi';

router.get('/', async (req, res) => {
  const keyword = req.query.keyword?.toString();
  const page = req.query.page?.toString();
  const size = req.query.size?.toString();

  const filter: FilterBase = {
    keyword: keyword ?? '',
    page: page ? parseInt(page!) : 1,
    size: size ? parseInt(size!) : 20,
  };

  const result = await getAllNotes(filter);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
});

router.post('/', async (req, res) => {
  const createNoteSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    details: Joi.string().min(3).max(500).required(),
  });

  try {
    await createNoteSchema.validateAsync(req.body);
  } catch (error: any) {
    const validationResponse: BaseResponse<string> = {
      statusCode: 400,
      message: error.message,
      success: false,
    };
    return res.status(400).json(validationResponse);
  }

  const result = await createANote({ ...req.body });

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.status(201).json(result);
});

export default router;
