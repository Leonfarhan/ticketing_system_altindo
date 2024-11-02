import express from 'express';
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  respondToTicket,
  deleteTicket,
  getMyTickets
} from '../controllers/ticketController';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/:id', auth, getTicket);
router.put('/:id', auth, updateTicket);
router.post('/:id/response', auth, isAdmin, respondToTicket);
router.delete('/:id', auth, isAdmin, deleteTicket);
router.get('/me', auth, getMyTickets);

export default router;