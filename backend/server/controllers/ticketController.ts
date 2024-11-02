import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/database';
import { HttpError } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const clientId = req.user?.id;

    if (!title || !description || !clientId) {
      return next(new HttpError('Title, description, and client ID are required', 400));
    }

    const result = await pool.query(
      'INSERT INTO tickets (title, description, client_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, clientId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    next(new HttpError('Failed to create ticket: ' + error.message, 500));
  }
};

export const getTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { role, id } = req.user!;
    let query: string;
    let values: any[] = [];

    if (role === 'admin') {
      query = 'SELECT t.*, u.name as client_name FROM tickets t JOIN users u ON t.client_id = u.id';
    } else {
      query = 'SELECT * FROM tickets WHERE client_id = $1';
      values = [id];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error: any) {
    next(new HttpError('Failed to fetch tickets: ' + error.message, 500));
  }
};

export const getTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const { role, id: userId } = req.user!;

    if (isNaN(ticketId)) {
      return next(new HttpError('Invalid ticket ID', 400));
    }

    let query: string;
    let values: any[];

    if (role === 'admin') {
      query = 'SELECT t.*, u.name as client_name FROM tickets t JOIN users u ON t.client_id = u.id WHERE t.id = $1';
      values = [ticketId];
    } else {
      query = 'SELECT * FROM tickets WHERE id = $1 AND client_id = $2';
      values = [ticketId, userId];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return next(new HttpError('Ticket not found', 404));
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    next(new HttpError('Failed to fetch ticket: ' + error.message, 500));
  }
};

export const getMyTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const clientId = req.user!.id;

    const query = 'SELECT * FROM tickets WHERE client_id = $1';
    const values = [clientId];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error: any) {
    next(new HttpError('Failed to fetch tickets: ' + error.message, 500));
  }
}


export const updateTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const { title, description, status } = req.body;
    const { role, id: userId } = req.user!;

    if (isNaN(ticketId)) {
      return next(new HttpError('Invalid ticket ID', 400));
    }

    const ticket = await pool.query('SELECT * FROM tickets WHERE id = $1', [ticketId]);

    if (ticket.rows.length === 0) {
      return next(new HttpError('Ticket not found', 404));
    }

    if (role !== 'admin' && ticket.rows[0].client_id !== userId) {
      return next(new HttpError('Not authorized', 403));
    }

    const result = await pool.query(
      'UPDATE tickets SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [title, description, status, ticketId]
    );

    res.json(result.rows[0]);
  } catch (error: any) {
    next(new HttpError('Failed to update ticket: ' + error.message, 500));
  }
};

export const respondToTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const { response } = req.body;

    if (isNaN(ticketId) || !response) {
      return next(new HttpError('Ticket ID and response are required', 400));
    }

    const result = await pool.query(
      'UPDATE tickets SET admin_response = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [response, ticketId]
    );

    if (result.rows.length === 0) {
      return next(new HttpError('Ticket not found', 404));
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    next(new HttpError('Failed to respond to ticket: ' + error.message, 500));
  }
};

export const deleteTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id, 10);

    if (isNaN(ticketId)) {
      return next(new HttpError('Invalid ticket ID', 400));
    }

    const result = await pool.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [ticketId]);

    if (result.rows.length === 0) {
      return next(new HttpError('Ticket not found', 404));
    }

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error: any) {
    next(new HttpError('Failed to delete ticket: ' + error.message, 500));
  }
};